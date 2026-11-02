import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $eventFilter, prefersReducedMotion } from '@/stores/ui';
import { sectorLabels, type EventItem, type Sector } from '@/data/events';

const filters: (Sector | 'all')[] = ['all', 'energy', 'mobility', 'health', 'tech'];
const Arrow = () => <svg aria-hidden="true"><use href="#arrow" /></svg>;

export default function EventsCarousel({ events }: { events: EventItem[] }) {
  // Hydrate with the server markup ("all"), then apply any filter chosen before this island loaded
  const stored = useStore($eventFilter);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const filter = mounted ? stored : 'all';
  const track = useRef<HTMLUListElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const bar = useRef<HTMLElement>(null);

  // Arrow states and the progress bar follow the track's scroll position
  const update = useCallback(() => {
    const t = track.current;
    if (!t || !back.current || !next.current || !bar.current) return;
    const max = t.scrollWidth - t.clientWidth;
    back.current.disabled = t.scrollLeft < 4;
    next.current.disabled = t.scrollLeft > max - 4;
    const visible = max > 0 ? t.clientWidth / t.scrollWidth : 1;
    bar.current.style.setProperty('--p', (visible + (1 - visible) * (max > 0 ? t.scrollLeft / max : 0)).toFixed(3));
  }, []);

  useEffect(() => {
    update();
    addEventListener('resize', update);
    return () => removeEventListener('resize', update);
  }, [update]);

  // Changing the filter jumps back to the start
  useLayoutEffect(() => {
    if (track.current) track.current.scrollLeft = 0;
    update();
  }, [filter, update]);

  const page = (dir: 1 | -1) => {
    const card = track.current?.querySelector<HTMLElement>('.card:not([hidden])');
    if (card) track.current!.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <div className="wrap events-grid">
      <div className="events-side" data-r>
        <div>
          <div className="eyebrow">Our event record</div>
          <h2>The rooms where ideas <span className="grad">met opportunity</span></h2>
        </div>
        <div className="filters" role="group" aria-label="Filter events by sector">
          {filters.map((f) => (
            <button key={f} className="filter" type="button" aria-pressed={filter === f} onClick={() => $eventFilter.set(f)}>
              {f === 'all' ? 'All' : sectorLabels[f]}
            </button>
          ))}
        </div>
        <div className="car-nav">
          <button ref={back} className="car-btn back" type="button" aria-label="Previous events" onClick={() => page(-1)}><Arrow /></button>
          <button ref={next} className="car-btn" type="button" aria-label="More events" onClick={() => page(1)}><Arrow /></button>
          <div className="car-bar" aria-hidden="true"><i ref={bar} /></div>
        </div>
      </div>

      <ul className="track" ref={track} tabIndex={0} aria-label="Past events" data-r style={{ '--d': 1 } as React.CSSProperties} onScroll={update}>
        {events.map((e) => (
          <li key={e.topic} className="card" data-sector={e.sector} hidden={filter !== 'all' && e.sector !== filter}>
            <div className="card-art" style={{ '--art': `url(${e.image.src})` } as React.CSSProperties}>
              <img src={e.image.src} alt={e.image.alt} width={e.image.width} height={e.image.height} loading="lazy" />
            </div>
            <div className="card-body">
              <span className="card-tag">{sectorLabels[e.sector]}</span>
              <h3>{e.title}</h3>
              <ul className="card-meta">
                <li><svg aria-hidden="true"><use href="#cal" /></svg>{e.dates}</li>
                <li><svg aria-hidden="true"><use href="#pin" /></svg>{e.location}</li>
              </ul>
              <a className="arrow-link card-foot" href="#contact" data-topic={e.topic}>
                Ask about related events <Arrow />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
