import { Container } from './ui';
import { profile } from '../data/profile';

const linkClass = 'transition-colors hover:text-violet-300';

const Footer = ({ onLeave }: { onLeave: () => void }) => (
  <footer className="relative border-t border-white/5 py-10">
    <Container className="flex flex-col items-center justify-between gap-4 font-mono text-xs text-slate-500 sm:flex-row">
      <p>
        © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
          LinkedIn
        </a>
        <a href={profile.contact.github} target="_blank" rel="noreferrer" className={linkClass}>
          GitHub
        </a>
        <a href={profile.siteSource} target="_blank" rel="noreferrer" className={linkClass}>
          Site source
        </a>
        <button type="button" onClick={onLeave} className={linkClass}>
          ↺ Replay intro
        </button>
      </div>
    </Container>
  </footer>
);

export default Footer;
