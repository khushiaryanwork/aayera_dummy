/**
 * Seamless loops for the client logo rows and the footer ticker: repeat each
 * group until it covers the row plus one full cycle, at any screen width.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const rows = [
  ...[...document.querySelectorAll<HTMLElement>('.marquee')].map((row) => [row, '.m-group'] as const),
  ...[...document.querySelectorAll<HTMLElement>('.ticker')].map((row) => [row, '.t-group'] as const),
];

const fillLoops = () => {
  if (reduced) return;
  rows.forEach(([row, sel]) => {
    const first = row.querySelector<HTMLElement>(sel);
    if (!first) return;
    const width = first.getBoundingClientRect().width;
    if (!width) return;
    const need = Math.ceil(row.clientWidth / width) + 1;
    while (row.querySelectorAll(sel).length < need) {
      const copy = first.cloneNode(true) as HTMLElement;
      copy.setAttribute('aria-hidden', 'true');
      copy.querySelectorAll('img').forEach((img) => (img.alt = ''));
      row.append(copy);
    }
  });
};

fillLoops();
addEventListener('resize', fillLoops);
addEventListener('load', fillLoops);
document.fonts?.ready.then(fillLoops);

export {};
