import { useEffect, useRef, useState, type CSSProperties } from 'react';
import startImg from '../assets/intro/start.jpg';
import transitionMp4 from '../assets/intro/transition.mp4';
import transitionWebm from '../assets/intro/transition.webm';
import reverseMp4 from '../assets/intro/transition-reverse.mp4';
import reverseWebm from '../assets/intro/transition-reverse.webm';

// --- INTRO: idle desk scene -> click -> zoom into the monitor -> site ---
// When `returning` (the site's Leave button), it runs backwards first:
// violet screen covers the site -> zoom out of the monitor -> idle desk scene.

type Phase = 'covering' | 'unzooming' | 'idle' | 'zooming' | 'flash' | 'leaving';

// How fast the 5s Luma zoom plays back (2.75x ≈ 1.8s)
const PLAYBACK_RATE = 2.75;
// Average colour of the last video frame, used for the flash into the site
const SCREEN_VIOLET = '#6A4DA9';

// Element positions as % of the 16:9 scene, measured from start.jpg (1920x1080)
const SCREEN = { left: 35.05, top: 41.85, width: 30.05, height: 31.3 };
const SKY = { left: 9.9, top: 7, width: 13.8, height: 48 };
const MUG = { left: 29.7, top: 76.4 };
const KEYBOARD = { left: 38.8, top: 81, width: 21.6, height: 7 };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Generated once per page load so they stay stable across re-renders
const STARS = Array.from({ length: 24 }, () => ({
  left: rand(0, 100),
  top: rand(0, 100),
  size: rand(1, 2.6),
  delay: rand(0, 5),
  duration: rand(2, 5),
}));

const DUST = Array.from({ length: 30 }, () => ({
  left: rand(25, 75),
  top: rand(38, 92),
  size: rand(1, 3),
  delay: rand(0, 12),
  duration: rand(9, 18),
  drift: rand(-4, 4),
}));

const STEAM = [0, 1.6, 3.2].map((delay, i) => ({ delay, sway: i % 2 ? -1.2 : 1.2 }));

const box = (r: { left: number; top: number; width?: number; height?: number }): CSSProperties => ({
  left: `${r.left}%`,
  top: `${r.top}%`,
  width: r.width !== undefined ? `${r.width}%` : undefined,
  height: r.height !== undefined ? `${r.height}%` : undefined,
});

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface IntroProps {
  onDone: () => void;
  returning?: boolean;
  // Called once the violet screen fully hides the site, so the page underneath can reset unseen
  onCovered?: () => void;
}

const Intro = ({ onDone, returning = false, onCovered }: IntroProps) => {
  const [phase, setPhase] = useState<Phase>(returning ? 'covering' : 'idle');
  // Returning starts transparent and fades in over the site
  const [shown, setShown] = useState(!returning);
  const [forwardVisible, setForwardVisible] = useState(false);
  const [reverseVisible, setReverseVisible] = useState(false);
  const forwardRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Lock page scroll and take keyboard focus while the intro is up
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    rootRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    if (!returning) return;
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [returning]);

  // Timed phase changes: covering -> unzooming, flash -> leaving -> done
  useEffect(() => {
    if (phase === 'covering') {
      // Wait for the 700ms fade-in to finish so the violet fully covers the site
      const t = setTimeout(() => {
        onCovered?.();
        const video = reverseRef.current;
        if (!video || prefersReducedMotion()) {
          setPhase('idle');
          return;
        }
        setPhase('unzooming');
        video.playbackRate = PLAYBACK_RATE;
        video.play().catch(() => setPhase('idle'));
      }, 750);
      return () => clearTimeout(t);
    }
    if (phase === 'flash') {
      const t = setTimeout(() => setPhase('leaving'), 250);
      return () => clearTimeout(t);
    }
    if (phase === 'leaving') {
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onDone, onCovered]);

  const enter = () => {
    if (phase !== 'idle') return;
    const video = forwardRef.current;
    if (!video || prefersReducedMotion()) {
      setPhase('leaving');
      return;
    }
    setPhase('zooming');
    setReverseVisible(false);
    video.playbackRate = PLAYBACK_RATE;
    video.play().catch(() => setPhase('leaving'));
  };

  const idle = phase === 'idle';
  // Stay violet until the reverse video is actually on screen (its first frame is the violet screen)
  const violetCover =
    phase === 'covering' || (phase === 'unzooming' && !reverseVisible) || phase === 'flash' || phase === 'leaving';

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      aria-label="Enter portfolio"
      onClick={enter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          enter();
        }
      }}
      className={`fixed inset-0 z-[100] overflow-hidden bg-black outline-none transition-opacity duration-700 ${
        idle ? 'cursor-pointer' : ''
      } ${shown && phase !== 'leaving' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* 16:9 scene that always covers the viewport, so % positions line up with the image */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 'max(100vw, 177.78vh)', height: 'max(100vh, 56.25vw)' }}
      >
        <img src={startImg} alt="" className="absolute inset-0 w-full h-full select-none" draggable={false} />

        {/* Ambient effects */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${idle ? 'opacity-100' : 'opacity-0'}`}>
          {/* Stars in the window */}
          <div className="absolute overflow-hidden" style={box(SKY)}>
            {STARS.map((s, i) => (
              <span
                key={i}
                className="intro-anim absolute rounded-full bg-white"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: s.size,
                  height: s.size,
                  boxShadow: '0 0 4px rgba(255,255,255,0.8)',
                  animation: `intro-twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* Monitor glow + bloom */}
          <div
            className="intro-anim absolute rounded-[3%]"
            style={{
              ...box(SCREEN),
              background: 'radial-gradient(ellipse at 50% 60%, rgba(196,170,255,0.35), transparent 70%)',
              mixBlendMode: 'screen',
              animation: 'intro-pulse 4.5s ease-in-out infinite',
            }}
          />
          <div
            className="intro-anim absolute"
            style={{
              left: `${SCREEN.left - 8}%`,
              top: `${SCREEN.top - 10}%`,
              width: `${SCREEN.width + 16}%`,
              height: `${SCREEN.height + 22}%`,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(124,92,230,0.28), transparent 65%)',
              filter: 'blur(30px)',
              mixBlendMode: 'screen',
              animation: 'intro-pulse 4.5s ease-in-out infinite',
            }}
          />

          {/* Keyboard underglow */}
          <div
            className="intro-anim absolute"
            style={{
              ...box(KEYBOARD),
              background: 'radial-gradient(ellipse at 50% 50%, rgba(150,110,255,0.4), transparent 70%)',
              filter: 'blur(14px)',
              mixBlendMode: 'screen',
              animation: 'intro-pulse 3.2s 0.8s ease-in-out infinite',
            }}
          />

          {/* Dust in the monitor light */}
          {DUST.map((d, i) => (
            <span
              key={i}
              className="intro-anim absolute rounded-full bg-violet-100"
              style={{
                left: `${d.left}%`,
                top: `${d.top}%`,
                width: d.size,
                height: d.size,
                opacity: 0,
                filter: 'blur(0.5px)',
                ['--drift' as string]: `${d.drift}vw`,
                animation: `intro-dust ${d.duration}s ${d.delay}s linear infinite`,
              }}
            />
          ))}

          {/* Steam from the mug */}
          {STEAM.map((s, i) => (
            <span
              key={i}
              className="intro-anim absolute rounded-full"
              style={{
                left: `${MUG.left}%`,
                top: `${MUG.top - 6}%`,
                width: '1.4%',
                height: '6%',
                opacity: 0,
                background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.5), transparent 70%)',
                filter: 'blur(6px)',
                ['--sway' as string]: `${s.sway}vw`,
                animation: `intro-steam 4.8s ${s.delay}s ease-out infinite`,
              }}
            />
          ))}
        </div>

        {/* Zoom out of the monitor (Leave). Its last frame is the desk scene, so hiding it at the end is seamless. */}
        {returning && (
          <video
            ref={reverseRef}
            muted
            playsInline
            preload="auto"
            onPlaying={() => setReverseVisible(true)}
            onEnded={() => {
              setPhase('idle');
              setReverseVisible(false);
            }}
            className={`absolute inset-0 w-full h-full ${reverseVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={reverseWebm} type="video/webm" />
            <source src={reverseMp4} type="video/mp4" />
          </video>
        )}

        {/* Zoom into the monitor, revealed once it is actually playing to avoid a black frame */}
        <video
          ref={forwardRef}
          muted
          playsInline
          preload="auto"
          poster={startImg}
          onPlaying={() => setForwardVisible(true)}
          onEnded={() => setPhase('flash')}
          className={`absolute inset-0 w-full h-full ${forwardVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={transitionWebm} type="video/webm" />
          <source src={transitionMp4} type="video/mp4" />
        </video>
      </div>

      {/* Edge vignette for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />

      {/* Welcome copy, in the empty space above the monitor. Remounted once after Leave so the rise animation replays. */}
      <div
        key={returning && (idle || phase === 'zooming' || phase === 'flash' || phase === 'leaving') ? 'back' : 'first'}
        className={`pointer-events-none absolute inset-x-0 top-[9vh] px-4 text-center transition-all duration-300 ${
          idle ? 'opacity-100' : 'opacity-0 -translate-y-4'
        }`}
      >
        {/* Sizes follow viewport height so the copy always clears the monitor (which starts ~42% down) */}
        <p
          className="intro-rise font-mono text-violet-300/80 tracking-[0.3em] uppercase"
          style={{ animationDelay: '0.2s', fontSize: 'clamp(0.65rem, 1.6vh, 0.9rem)', marginBottom: '1.5vh' }}
        >
          Kene Obiekwe · Portfolio
        </p>
        <h1
          className="intro-rise font-display font-bold tracking-tight leading-none bg-gradient-to-b from-white to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]"
          style={{ animationDelay: '0.5s', fontSize: 'clamp(2.5rem, min(11vh, 15vw), 8rem)' }}
        >
          {returning ? 'Welcome back' : 'Welcome'}
        </h1>
        <p
          className="intro-rise font-mono text-slate-300"
          style={{ animationDelay: '1.1s', fontSize: 'clamp(0.75rem, 2vh, 1.05rem)', marginTop: '3vh' }}
        >
          <span className="intro-anim inline-block" style={{ animation: 'intro-pulse 2.4s ease-in-out infinite' }}>
            click anywhere to view portfolio
          </span>
          <span className="intro-anim ml-1 text-violet-300" style={{ animation: 'intro-blink 1s steps(1) infinite' }}>_</span>
        </p>
      </div>

      {/* Violet screen: covers the site on Leave, and flashes from the last video frame into the site on enter */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity ${violetCover ? 'opacity-100 duration-200' : 'opacity-0 duration-300'}`}
        style={{ background: SCREEN_VIOLET }}
      />
    </div>
  );
};

export default Intro;
