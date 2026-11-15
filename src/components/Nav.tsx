import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const PowerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
    <path d="M12 3v8M6.3 7.3a8 8 0 1 0 11.4 0" />
  </svg>
);

// Tracks which section is under the top third of the viewport (home page only).
// After a nav click, the clicked section stays highlighted while the page scrolls to it.
const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);
  const clicked = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let idle = 0;

    const compute = () => {
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = 'contact';
      setActive(current);
    };

    const onScroll = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        if (clicked.current) clicked.current = null; // the click's scroll has finished: keep its highlight
        else compute();
      }, 150);
      if (clicked.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };

    frame = requestAnimationFrame(compute);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  const select = useCallback((id: string) => {
    clicked.current = id;
    setActive(id);
    // If the page doesn't need to scroll (already there), release the click lock anyway
    window.setTimeout(() => {
      if (clicked.current === id) clicked.current = null;
    }, 1500);
  }, []);

  return [enabled ? active : null, select] as const;
};

const Nav = ({ onLeave }: { onLeave: () => void }) => {
  const { pathname } = useLocation();
  const [active, select] = useActiveSection(pathname === '/');
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close the mobile menu on Escape or a click outside it
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const go = (id: string) => {
    select(id);
    setOpen(false);
  };

  const linkClass = (id: string) =>
    `rounded-lg border px-3 py-2 transition-colors ${
      active === id
        ? 'border-violet-400/40 bg-violet-500/15 text-violet-100'
        : 'border-transparent text-slate-300 hover:text-white'
    }`;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav className="relative mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-ink-900/70 px-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md sm:px-5">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-violet-400/30 bg-violet-500/15 font-display font-bold text-violet-200">
            K
          </span>
          <span className="font-mono text-sm text-white">
            kene<span className="text-violet-400">_</span>obiekwe
          </span>
        </Link>

        <div className="flex items-center gap-1 font-mono text-sm">
          {/* Full link row on large screens */}
          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={() => go(link.id)}
                aria-current={active === link.id ? 'true' : undefined}
                className={linkClass(link.id)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Menu toggle below lg */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-2 text-slate-300 transition-colors hover:border-violet-400/40 hover:text-white lg:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-[5px] h-0.5 w-4 rounded bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${open ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
            </span>
            <span className="hidden text-xs sm:inline">Menu</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLeave();
            }}
            title="Leave — back to the desk"
            aria-label="Leave the portfolio and return to the intro"
            className="ml-1 flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-2 text-slate-300 transition-colors hover:border-rose-400/50 hover:text-rose-200 sm:ml-2 sm:px-3"
          >
            <PowerIcon />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>

        {/* Dropdown menu below lg */}
        <div
          id="mobile-menu"
          inert={!open}
          className={`absolute inset-x-0 top-full mt-2 origin-top rounded-2xl border border-white/10 bg-ink-900 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 lg:hidden ${
            open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-[0.98] opacity-0'
          }`}
        >
          <ul className="grid gap-1 font-mono text-sm sm:grid-cols-2">
            {LINKS.map((link, i) => (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  onClick={() => go(link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`flex items-center gap-3 ${linkClass(link.id)} py-3`}
                >
                  <span className="text-xs text-violet-400/60">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
