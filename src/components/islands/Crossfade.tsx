import { useState } from 'react';
import { useLoop } from '@/hooks/useLoop';

interface Slide {
  src: string;
  alt?: string;
  position?: string;
  caption?: string;
}

interface Props {
  slides: Slide[];
  className: string;
  /** Shows the active slide's caption in a span with this class. */
  captionClass?: string;
  interval?: number;
  /** Loads the first image eagerly (use for above-the-fold reels). */
  priority?: boolean;
}

/** A stack of photos that crossfade on a timer. The CSS fades whichever has `.on`. */
export default function Crossfade({ slides, className, captionClass, interval = 5000, priority = false }: Props) {
  const [active, setActive] = useState(0);
  useLoop(interval, () => setActive((i) => (i + 1) % slides.length));

  return (
    <div className={className}>
      {slides.map((s, i) => (
        <img
          key={s.src}
          className={i === active ? 'on' : undefined}
          src={s.src}
          alt={s.alt ?? ''}
          style={s.position ? { objectPosition: s.position } : undefined}
          loading={priority && i === 0 ? 'eager' : 'lazy'}
          fetchPriority={priority && i === 0 ? 'high' : undefined}
        />
      ))}
      {captionClass && <span className={captionClass}>{slides[active].caption}</span>}
    </div>
  );
}
