import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

// --- Fixed, animated night-sky backdrop behind every page ---
// Layers: drifting starfield, nebula glows, shooting stars, floating line-art
// icons (with scroll parallax), a cursor spotlight and a scroll-progress rail.

const svgProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const Planet = () => (
  <svg {...svgProps}>
    <circle cx="24" cy="24" r="10" />
    <ellipse cx="24" cy="24" rx="20" ry="6" transform="rotate(-20 24 24)" />
    <circle cx="20" cy="20" r="1.5" />
  </svg>
);

const MoonClouds = () => (
  <svg {...svgProps}>
    <path d="M30 6a13 13 0 1 0 10 21 10 10 0 1 1-10-21z" />
    <path d="M4 36h16a4 4 0 1 0-4-4" />
    <path d="M10 42h22a3 3 0 1 0-3-3" />
    <circle cx="40" cy="38" r="1.2" />
  </svg>
);

const Sparkle = () => (
  <svg {...svgProps}>
    <path d="M24 4c1.2 12 7.8 18.8 20 20-12.2 1.2-18.8 8-20 20-1.2-12-7.8-18.8-20-20 12.2-1.2 18.8-8 20-20z" />
  </svg>
);

const Code = () => (
  <svg {...svgProps}>
    <path d="M16 14 6 24l10 10M32 14l10 10-10 10M27 10l-6 28" />
  </svg>
);

const Terminal = () => (
  <svg {...svgProps}>
    <rect x="5" y="9" width="38" height="30" rx="3" />
    <path d="M5 16h38M12 24l5 4-5 4M21 33h9" />
  </svg>
);

const Chip = () => (
  <svg {...svgProps}>
    <rect x="13" y="13" width="22" height="22" rx="2" />
    <rect x="19" y="19" width="10" height="10" />
    <path d="M19 13V7M24 13V7M29 13V7M19 41v-6M24 41v-6M29 41v-6M13 19H7M13 24H7M13 29H7M41 19h-6M41 24h-6M41 29h-6" />
  </svg>
);

const Database = () => (
  <svg {...svgProps}>
    <ellipse cx="24" cy="11" rx="14" ry="5" />
    <path d="M10 11v26c0 2.8 6.3 5 14 5s14-2.2 14-5V11M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5" />
  </svg>
);

const Chart = () => (
  <svg {...svgProps}>
    <path d="M6 42h36M10 34l9-10 7 6 12-14" />
    <circle cx="19" cy="24" r="1.5" />
    <circle cx="26" cy="30" r="1.5" />
    <circle cx="38" cy="16" r="1.5" />
  </svg>
);

interface FloatingIcon {
  icon: ReactNode;
  pos: CSSProperties;
  size: number;
  depth: number; // parallax strength
  duration: number;
  delay: number;
  opacity: number;
  show: string; // breakpoint visibility
}

const ICONS: FloatingIcon[] = [
  { icon: <Planet />, pos: { left: '5%', top: '20%' }, size: 70, depth: 0.05, duration: 9, delay: 0, opacity: 0.3, show: 'hidden md:block' },
  { icon: <Sparkle />, pos: { right: '9%', top: '13%' }, size: 26, depth: 0.02, duration: 5, delay: 1, opacity: 0.5, show: 'block' },
  { icon: <Code />, pos: { right: '4%', top: '44%' }, size: 50, depth: 0.08, duration: 8, delay: 2, opacity: 0.28, show: 'hidden md:block' },
  { icon: <MoonClouds />, pos: { left: '3%', top: '60%' }, size: 84, depth: 0.04, duration: 11, delay: 0.5, opacity: 0.3, show: 'hidden lg:block' },
  { icon: <Terminal />, pos: { right: '8%', top: '76%' }, size: 52, depth: 0.06, duration: 10, delay: 3, opacity: 0.25, show: 'hidden lg:block' },
  { icon: <Chip />, pos: { left: '10%', top: '86%' }, size: 44, depth: 0.09, duration: 7, delay: 1.5, opacity: 0.25, show: 'hidden md:block' },
  { icon: <Database />, pos: { right: '3%', top: '62%' }, size: 40, depth: 0.03, duration: 9, delay: 4, opacity: 0.22, show: 'hidden xl:block' },
  { icon: <Chart />, pos: { left: '4%', top: '40%' }, size: 44, depth: 0.07, duration: 8.5, delay: 2.5, opacity: 0.22, show: 'hidden xl:block' },
  { icon: <Sparkle />, pos: { left: '22%', top: '7%' }, size: 16, depth: 0.03, duration: 4, delay: 0, opacity: 0.6, show: 'block' },
  { icon: <Sparkle />, pos: { left: '50%', top: '94%' }, size: 18, depth: 0.05, duration: 6, delay: 2, opacity: 0.45, show: 'block' },
  { icon: <Sparkle />, pos: { right: '24%', top: '88%' }, size: 14, depth: 0.04, duration: 4.5, delay: 1, opacity: 0.5, show: 'hidden sm:block' },
];

const SHOOTING_STARS = [
  { top: '12%', left: '85%', duration: 13, delay: 3 },
  { top: '30%', left: '60%', duration: 17, delay: 9 },
  { top: '6%', left: '45%', duration: 21, delay: 15 },
];

const Backdrop = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Feed scroll position / progress and pointer position to CSS variables
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (!reduceMotion) el.style.setProperty('--scroll', String(window.scrollY));
      el.style.setProperty('--progress', String(max > 0 ? Math.min(window.scrollY / max, 1) : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onPointerMove = (e: PointerEvent) => {
      el.style.setProperty('--mx', `${e.clientX}px`);
      el.style.setProperty('--my', `${e.clientY}px`);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Nebula glows */}
      <div className="nebula left-[-15vw] top-[-10vh] h-[60vw] w-[60vw] bg-violet-700/20" />
      <div className="nebula right-[-20vw] top-[40vh] h-[55vw] w-[55vw] bg-fuchsia-700/10" style={{ animationDelay: '-12s' }} />

      {/* Stars */}
      <div className="starfield" />
      <div className="starfield-far" />

      {/* Shooting stars */}
      {SHOOTING_STARS.map((s, i) => (
        <span
          key={i}
          className="shooting-star"
          style={{ top: s.top, left: s.left, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }}
        />
      ))}

      {/* Floating line-art icons: outer layer = scroll parallax, inner = gentle bob */}
      {ICONS.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.show}`}
          style={{ ...item.pos, transform: `translate3d(0, calc(var(--scroll, 0) * ${-item.depth}px), 0)` }}
        >
          <div
            className="float-icon text-violet-300"
            style={{
              width: item.size,
              height: item.size,
              opacity: item.opacity,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.icon}
          </div>
        </div>
      ))}

      {/* Cursor spotlight (mouse/trackpad only) */}
      <div className="spotlight" />

      {/* Scroll progress rail, a nod to the timeline line in the reference template */}
      <div className="absolute bottom-[20vh] left-6 top-[20vh] hidden w-px bg-gradient-to-b from-transparent via-violet-400/30 to-transparent xl:block">
        <span
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgba(167,139,250,0.7)]"
          style={{ top: 'calc(var(--progress, 0) * 100%)' }}
        />
      </div>
    </div>
  );
};

export default Backdrop;
