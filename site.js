(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = false;

  $('#year').textContent = new Date().getFullYear();

  // Timers that stop while the visitor has paused motion
  const every = (ms, fn) => { if (!reduced) setInterval(() => { if (!paused && !document.hidden) fn(); }, ms); };

  // Pause control for all looping motion
  const motion = $('#motion');
  motion.addEventListener('click', () => {
    paused = !paused;
    root.classList.toggle('paused', paused);
    motion.setAttribute('aria-pressed', String(paused));
    motion.textContent = paused ? 'Play motion' : 'Pause motion';
  });

  // Nav: solid after the hero, scroll progress, current section
  const nav = $('#nav');
  const progress = $('#progress');
  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    progress.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    nav.classList.toggle('solid', scrollY > 40);
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  const toggle = $('.nav-toggle');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
  });

  const links = $$('.nav-links a');
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('current', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  // Scroll reveals
  // Polled as well as bound to scroll, so content can never stay hidden if frames are throttled
  let unrevealed = $$('[data-r]');
  const revealCheck = () => {
    unrevealed = unrevealed.filter(el => {
      if (el.getBoundingClientRect().top >= innerHeight * 0.94) return true;
      el.classList.add('in');
      return false;
    });
    if (!unrevealed.length) { clearInterval(revealTimer); removeEventListener('scroll', revealCheck); }
  };
  const revealTimer = setInterval(revealCheck, 250);
  addEventListener('scroll', revealCheck, { passive: true });
  revealCheck();

  // Looping SVG scenes and the map only run while on screen
  const live = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('live', e.isIntersecting)));
  $$('.scene, .map').forEach(el => live.observe(el));

  // Stat counters
  if (!reduced) {
    $$('[data-count]').forEach((el, i) => {
      const end = Number(el.dataset.count);
      const start = performance.now() + 500 + i * 120;
      const tick = now => {
        const t = Math.min(Math.max((now - start) / 1300, 0), 1);
        el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * end);
        if (t < 1) requestAnimationFrame(tick);
      };
      el.textContent = '0';
      requestAnimationFrame(tick);
    });
  }

  // Hero photo reel inside the orbit
  const slides = $$('#reel img');
  const reelCap = $('#reel-cap');
  let slide = 0;
  every(5000, () => {
    slides[slide].classList.remove('on');
    slide = (slide + 1) % slides.length;
    slides[slide].classList.add('on');
    reelCap.textContent = slides[slide].dataset.caption;
  });

  // Hero connection network: nodes link up as they drift near each other or the pointer
  const canvas = $('#net');
  const hero = $('.hero');
  const ctx = canvas.getContext('2d');
  const style = getComputedStyle(root);
  const gold = style.getPropertyValue('--color-accent').trim();
  const pale = style.getPropertyValue('--color-line-on-photo').trim();
  let w = 0, h = 0, nodes = [], heroVisible = true;
  const pointer = { x: -999, y: -999 };
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(w * h / 26000, 56));
    nodes = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: i % 7 === 0 ? 3 : 1.6, hot: i % 7 === 0
    }));
  };
  const reach = () => Math.min(w / 8, 150);
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const d = reach();
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < d) {
          ctx.globalAlpha = (1 - dist / d) * 0.55;
          ctx.strokeStyle = a.hot || b.hot ? gold : pale;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const toPointer = Math.hypot(a.x - pointer.x, a.y - pointer.y);
      if (toPointer < d * 1.3) {
        ctx.globalAlpha = (1 - toPointer / (d * 1.3)) * 0.9;
        ctx.strokeStyle = gold; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
      }
      ctx.globalAlpha = a.hot ? 0.95 : 0.6;
      ctx.fillStyle = a.hot ? gold : pale;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
  const step = () => {
    if (heroVisible && !paused && !document.hidden) {
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      draw();
    }
    requestAnimationFrame(step);
  };
  size();
  draw();
  addEventListener('resize', () => { size(); draw(); });
  if (!reduced) {
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -999; });
    requestAnimationFrame(step);
  }

  // Statement fills in word by word as it scrolls through the viewport
  const fill = $('#fill');
  let fillWords = [];
  if (!reduced) {
    fill.innerHTML = fill.textContent.split(' ').map(w => `<span class="fw">${w}</span>`).join(' ');
    fillWords = $$('.fw', fill);
  }
  const parallax = reduced ? [] : $$('.par');
  const onScrollTop = () => {
    if (fillWords.length) {
      const r = fill.getBoundingClientRect();
      const p = Math.min(Math.max((innerHeight * 0.9 - r.top) / (innerHeight * 0.5), 0), 1);
      const lit = Math.ceil(p * fillWords.length);
      fillWords.forEach((w, i) => w.classList.toggle('on', i < lit));
    }
    parallax.forEach(f => {
      const r = f.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      f.firstElementChild.style.setProperty('--y', (c * -6).toFixed(2) + '%');
    });
  };
  addEventListener('scroll', onScrollTop, { passive: true });
  addEventListener('resize', onScrollTop);
  onScrollTop();

  // Crossfade in the "why" card
  const whyPhotos = $$('#why-photo img');
  let why = 0;
  every(5000, () => {
    whyPhotos[why].classList.remove('on');
    why = (why + 1) % whyPhotos.length;
    whyPhotos[why].classList.add('on');
  });

  // Seamless loops: repeat each row until it covers the screen plus one full cycle, at any width
  const loops = [...$$('.marquee').map(m => [m, '.m-group']), [$('.ticker'), '.t-group']];
  const fillLoops = () => {
    if (reduced) return;
    loops.forEach(([row, sel]) => {
      const first = $(sel, row);
      const width = first.getBoundingClientRect().width;
      if (!width) return;
      const need = Math.ceil(row.clientWidth / width) + 1;
      while ($$(sel, row).length < need) {
        const copy = first.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        $$('img', copy).forEach(img => { img.alt = ''; });
        row.append(copy);
      }
    });
  };
  fillLoops();
  addEventListener('resize', fillLoops);
  addEventListener('load', fillLoops);
  if (document.fonts) document.fonts.ready.then(fillLoops);

  // Event carousel
  const track = $('#track');
  const back = $('#car-back');
  const next = $('#car-next');
  const bar = $('#car-bar');
  const carCards = () => $$('.card', track).filter(c => !c.hidden);
  const updateCar = () => {
    const max = track.scrollWidth - track.clientWidth;
    back.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft > max - 4;
    const visible = max > 0 ? track.clientWidth / track.scrollWidth : 1;
    bar.style.setProperty('--p', (visible + (1 - visible) * (max > 0 ? track.scrollLeft / max : 0)).toFixed(3));
  };
  const page = dir => {
    const c = carCards()[0];
    if (c) track.scrollBy({ left: dir * (c.offsetWidth + 16), behavior: reduced ? 'auto' : 'smooth' });
  };
  back.addEventListener('click', () => page(-1));
  next.addEventListener('click', () => page(1));
  track.addEventListener('scroll', updateCar, { passive: true });
  addEventListener('resize', updateCar);
  updateCar();

  const filters = $$('.filter');
  const applyFilter = key => {
    filters.forEach(f => f.setAttribute('aria-pressed', String(f.dataset.filter === key)));
    $$('.card', track).forEach(c => { c.hidden = key !== 'all' && c.dataset.sector !== key; });
    track.scrollLeft = 0;
    updateCar();
  };
  filters.forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
  $$('[data-goto]').forEach(a => a.addEventListener('click', () => applyFilter(a.dataset.goto)));

  // Services accordion with a wipe between photos
  const expItems = $$('.exp-item');
  const expPhotos = $$('.exp-photo img');
  expItems.forEach((item, i) => $('.exp-btn', item).addEventListener('click', () => {
    expItems.forEach((it, n) => {
      it.classList.toggle('open', n === i);
      $('.exp-btn', it).setAttribute('aria-expanded', String(n === i));
    });
    expPhotos.forEach((p, n) => p.classList.toggle('on', n === i));
  }));

  // Floating "Talk to us" steps aside when the form is on screen
  const talk = $('#float-talk');
  new IntersectionObserver(([e]) => talk.classList.toggle('away', e.isIntersecting), { rootMargin: '0px 0px -30% 0px' }).observe($('#contact'));

  // Enquiry form
  const form = $('#enquiry');
  const interest = $('#interest');
  const message = $('#f-message');
  const note = $('#path-note');
  const paths = {
    attend: ['Conferences & summits', "Tell us your industry and we'll point you to the relevant programme."],
    partner: ['Partnerships & sponsorship', "Tell us who you want to reach and we'll talk through sponsorship and exhibition options."],
    organise: ['Conferences & summits', 'Share your brief. Venue, speakers, registration, sponsors and exhibitors can all sit with us.']
  };
  const radios = $$('input[name="path"]');
  const setPath = value => {
    interest.value = paths[value][0];
    note.textContent = paths[value][1];
  };
  radios.forEach(r => r.addEventListener('change', () => setPath(r.value)));
  $$('[data-path]').forEach(a => a.addEventListener('click', () => {
    radios.find(r => r.value === a.dataset.path).checked = true;
    setPath(a.dataset.path);
  }));
  $$('[data-interest]').forEach(a => a.addEventListener('click', () => { interest.value = a.dataset.interest; }));
  $$('[data-topic]').forEach(a => a.addEventListener('click', () => {
    interest.value = 'Conferences & summits';
    message.value = `I'd like to know about upcoming programmes related to ${a.dataset.topic}.`;
  }));

  const validate = input => {
    const ok = input.checkValidity();
    input.closest('.field').classList.toggle('bad', !ok);
    if (ok) { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
    else { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', input.id + '-err'); }
    return ok;
  };
  const required = $$('[required]', form);
  required.forEach(i => i.addEventListener('blur', () => { if (i.value) validate(i); }));
  required.forEach(i => i.addEventListener('input', () => { if (i.closest('.field').classList.contains('bad')) validate(i); }));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = required.filter(i => !validate(i));
    if (bad.length) { bad[0].focus(); return; }
    const d = new FormData(form);
    const body = `Hello Aayera,\n\n${d.get('message')}\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}`;
    location.href = `mailto:info@aayera.com?subject=${encodeURIComponent('Enquiry: ' + d.get('interest'))}&body=${encodeURIComponent(body)}`;
    $('#form-status').textContent = "Your draft should now be open in your email app. If it didn't open, email info@aayera.com directly.";
  });
})();
