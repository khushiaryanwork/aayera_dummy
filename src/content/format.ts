import type { Client } from './types';
import { marqueeRows } from './site-config';

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z'));

/** "21–22 June 2021", "28 June – 2 July 2021", or "30 December 2021 – 2 January 2022". */
export function formatDateRange(start: string, end?: string): string {
  if (!end || end === start) return fmt(start, { day: 'numeric', month: 'long', year: 'numeric' });
  const [sy, sm] = start.split('-');
  const [ey, em] = end.split('-');
  const endFull = fmt(end, { day: 'numeric', month: 'long', year: 'numeric' });
  if (sy !== ey) return `${fmt(start, { day: 'numeric', month: 'long', year: 'numeric' })} – ${endFull}`;
  if (sm !== em) return `${fmt(start, { day: 'numeric', month: 'long' })} – ${endFull}`;
  return `${fmt(start, { day: 'numeric' })}–${endFull}`;
}

/** Splits logos evenly across the marquee rows, earlier rows taking any remainder. */
export function splitIntoRows(logos: Client[]) {
  const n = marqueeRows.length;
  const base = Math.floor(logos.length / n);
  const extra = logos.length % n;
  let i = 0;
  return marqueeRows
    .map((row, r) => {
      const size = base + (r < extra ? 1 : 0);
      const clients = logos.slice(i, i + size);
      i += size;
      return { ...row, clients };
    })
    .filter((row) => row.clients.length);
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Escapes plain text and turns email addresses into mailto links. */
export function linkifyEmails(text: string): string {
  return escapeHtml(text).replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, (m) => `<a href="mailto:${m}">${m}</a>`);
}
