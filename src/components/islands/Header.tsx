import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $motionPaused } from '@/stores/ui';

interface Props {
  links: { href: string; label: string }[];
  email: string;
  logo: string;
}

export default function Header({ links, email, logo }: Props) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const paused = useStore($motionPaused);
  const progress = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // Solid background after the hero, plus the scroll progress bar
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const max = root.scrollHeight - innerHeight;
      progress.current?.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : '0');
      setSolid(scrollY > 40);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  // Highlight the link for the section in the middle of the viewport
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Pause control for all looping motion (CSS animations key off html.paused)
  useEffect(() => {
    document.documentElement.classList.toggle('paused', paused);
  }, [paused]);

  return (
    <header className={['nav', solid && 'solid', open && 'open'].filter(Boolean).join(' ')} id="nav">
      <div className="wrap nav-in">
        <a className="nav-logo" href="#top" aria-label="Aayera home">
          <img src={logo} alt="Aayera, Connecting Aces" width={164} height={82} />
        </a>
        <nav className="nav-links" id="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={current === l.href ? 'current' : undefined} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <button className="motion-btn" type="button" aria-pressed={paused} onClick={() => $motionPaused.set(!paused)}>
            {paused ? 'Play motion' : 'Pause motion'}
          </button>
        </nav>
        <div className="nav-actions">
          <a className="btn btn-line" href={`mailto:${email}`}>Email us</a>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
        <button ref={toggle} className="nav-toggle" type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div className="progress" ref={progress} aria-hidden="true" />
    </header>
  );
}
