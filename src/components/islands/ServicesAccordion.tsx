import { useState } from 'react';

interface Service {
  title: string;
  body: string;
  cta: string;
  interest: string;
  photo: { src: string; alt: string; position?: string };
}

/** One panel open at a time; the photo wipes to match the open service. */
export default function ServicesAccordion({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="exp" id="exp">
      <div className="exp-photo">
        {services.map((s, i) => (
          <img key={s.photo.src} className={i === open ? 'on' : undefined} src={s.photo.src} alt={s.photo.alt} loading="lazy" style={s.photo.position ? { objectPosition: s.photo.position } : undefined} />
        ))}
      </div>
      <div className="exp-list" data-r style={{ '--d': 1 } as React.CSSProperties}>
        {services.map((s, i) => (
          <div key={s.title} className={i === open ? 'exp-item open' : 'exp-item'}>
            <button className="exp-btn" type="button" aria-expanded={i === open} aria-controls={`x${i}`} onClick={() => setOpen(i)}>
              {s.title}
              <span className="plus" aria-hidden="true" />
            </button>
            <div className="exp-panel" id={`x${i}`}>
              <div>
                <p>{s.body}</p>
                <a className="arrow-link" href="#contact" data-interest={s.interest}>
                  {s.cta} <svg aria-hidden="true"><use href="#arrow" /></svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
