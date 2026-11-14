import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { btnPrimary } from './styles';

// A plain mailto: link does nothing for visitors without a desktop mail app,
// so let them pick where to write from (or just copy the address).

const email = profile.contact.email;
const subject = encodeURIComponent('Hello Kene');

const OPTIONS = [
  { label: 'Gmail', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`, external: true },
  { label: 'Outlook', href: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${subject}`, external: true },
  { label: 'Default mail app', href: `mailto:${email}?subject=${subject}`, external: false },
];

// Fallback for browsers/embeds where the async Clipboard API is blocked
const legacyCopy = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
};

const EmailButton = () => {
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (copyState === 'idle') return;
    const t = setTimeout(() => setCopyState('idle'), 2000);
    return () => clearTimeout(t);
  }, [copyState]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState('copied');
    } catch {
      setCopyState(legacyCopy(email) ? 'copied' : 'failed');
    }
  };

  const itemClass = 'block w-full rounded-lg px-4 py-2.5 text-left text-sm text-slate-200 transition-colors hover:bg-violet-500/15 hover:text-white';

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" className={btnPrimary}>
        Email me <span aria-hidden className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-20 mt-3 w-60 -translate-x-1/2 rounded-xl border border-white/10 bg-ink-800/95 p-2 text-left shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-md"
        >
          <p className="px-4 pb-2 pt-1 font-mono text-[11px] uppercase tracking-widest text-slate-500">Write from</p>
          {OPTIONS.map((option) => (
            <a
              key={option.label}
              role="menuitem"
              href={option.href}
              target={option.external ? '_blank' : undefined}
              rel={option.external ? 'noreferrer' : undefined}
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              {option.label} {option.external && <span className="text-slate-500">↗</span>}
            </a>
          ))}
          <div className="my-1 border-t border-white/5" />
          <button type="button" role="menuitem" onClick={copy} className={itemClass}>
            {copyState === 'copied' ? '✓ Copied!' : copyState === 'failed' ? 'Copy failed — use the address below' : 'Copy email address'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailButton;
