/**
 * Scroll-driven effects for static (non-React) markup:
 * reveals, on-screen-only SVG loops, the word-by-word statement fill and photo parallax.
 */
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)] as T[];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveals. Polled as well as bound to scroll, so content can never stay hidden if frames are throttled.
let unrevealed = $$('[data-r]');
const revealCheck = () => {
  unrevealed = unrevealed.filter((el) => {
    if (el.getBoundingClientRect().top >= innerHeight * 0.94) return true;
    el.classList.add('in');
    return false;
  });
  if (!unrevealed.length) {
    clearInterval(revealTimer);
    removeEventListener('scroll', revealCheck);
  }
};
const revealTimer = setInterval(revealCheck, 250);
addEventListener('scroll', revealCheck, { passive: true });
revealCheck();

// Looping SVG scenes and the map only animate while on screen
const live = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle('live', e.isIntersecting)));
$$('.scene, .map').forEach((el) => live.observe(el));

// Statement fills in word by word, and photos drift slightly, as they pass through the viewport
const fill = document.querySelector<HTMLElement>('#fill');
let fillWords: HTMLElement[] = [];
if (fill && !reduced) {
  fill.innerHTML = (fill.textContent ?? '').split(' ').map((w) => `<span class="fw">${w}</span>`).join(' ');
  fillWords = $$('.fw', fill);
}
const parallax = reduced ? [] : $$('.par');

const onScroll = () => {
  if (fill && fillWords.length) {
    const r = fill.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight * 0.9 - r.top) / (innerHeight * 0.5), 0), 1);
    const lit = Math.ceil(p * fillWords.length);
    fillWords.forEach((w, i) => w.classList.toggle('on', i < lit));
  }
  parallax.forEach((f) => {
    const r = f.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    (f.firstElementChild as HTMLElement | null)?.style.setProperty('--y', (c * -6).toFixed(2) + '%');
  });
};
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// Hero stat counters
if (!reduced) {
  $$('[data-count]').forEach((el, i) => {
    const end = Number(el.dataset.count);
    const start = performance.now() + 500 + i * 120;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / 1300, 0), 1);
      el.textContent = String(Math.round((1 - Math.pow(1 - t, 3)) * end));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  });
}

// Floating "Talk to us" steps aside when the contact form is on screen
const talk = document.querySelector('#float-talk');
const contact = document.querySelector('#contact');
if (talk && contact) {
  new IntersectionObserver(([e]) => talk.classList.toggle('away', e.isIntersecting), { rootMargin: '0px 0px -30% 0px' }).observe(contact);
}

export {};
