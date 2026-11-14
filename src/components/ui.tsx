import { useEffect, useRef, useState, type ReactNode } from 'react';

// --- Shared building blocks for the site ---

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
);

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 font-mono text-[11px] text-violet-200">
    {children}
  </span>
);

export const SectionHeading = ({ index, label, title }: { index: string; label: string; title: ReactNode }) => (
  <Reveal className="mb-12 md:mb-16">
    <p className="mb-3 font-mono text-sm text-violet-400">
      <span className="text-violet-300/50">{index}</span> // {label}
    </p>
    <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
  </Reveal>
);

// Desktop-style window chrome, used to frame screenshots and the profile photo
export const WindowFrame = ({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) => (
  <div
    className={`overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-[0_24px_60px_-24px_rgba(106,77,169,0.6)] ${className}`}
  >
    <div className="flex h-9 items-center gap-2 border-b border-white/5 bg-ink-800 px-4">
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-violet-400/60" />
      {title && <span className="ml-2 truncate font-mono text-[11px] text-slate-500">{title}</span>}
    </div>
    {children}
  </div>
);

// Fades content up the first time it scrolls into view
export const Reveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};
