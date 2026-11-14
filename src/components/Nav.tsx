import { Link } from 'react-router-dom';

const LINKS = [
  { id: 'about', label: 'About', show: 'inline-block' },
  { id: 'experience', label: 'Experience', show: 'hidden md:inline-block' },
  { id: 'projects', label: 'Projects', show: 'inline-block' },
  { id: 'certifications', label: 'Certifications', show: 'hidden lg:inline-block' },
];

const PowerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
    <path d="M12 3v8M6.3 7.3a8 8 0 1 0 11.4 0" />
  </svg>
);

const Nav = ({ onLeave }: { onLeave: () => void }) => (
  <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
    <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-ink-900/70 px-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md sm:px-5">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-violet-400/30 bg-violet-500/15 font-display font-bold text-violet-200">
          K
        </span>
        <span className="hidden font-mono text-sm text-white sm:inline">
          kene<span className="text-violet-400">_</span>obiekwe
        </span>
      </Link>

      <div className="flex items-center gap-0.5 font-mono text-xs sm:gap-1 sm:text-sm">
        {LINKS.map((link) => (
          <Link
            key={link.id}
            to={`/#${link.id}`}
            className={`${link.show} rounded-lg px-2 py-2 text-slate-400 transition-colors hover:text-white sm:px-3`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/#contact"
          className="ml-1 rounded-lg border border-violet-400/40 bg-violet-500/15 px-2.5 py-2 text-violet-100 transition-colors hover:bg-violet-500/30 sm:px-4"
        >
          Contact
        </Link>
        <button
          type="button"
          onClick={onLeave}
          title="Leave — back to the desk"
          aria-label="Leave the portfolio and return to the intro"
          className="ml-1 flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-2 text-slate-400 transition-colors hover:border-rose-400/50 hover:text-rose-200 sm:ml-2 sm:px-3"
        >
          <PowerIcon />
          <span className="hidden sm:inline">Leave</span>
        </button>
      </div>
    </nav>
  </header>
);

export default Nav;
