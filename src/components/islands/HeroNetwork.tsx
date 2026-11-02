import { useEffect, useRef } from 'react';
import { $motionPaused, prefersReducedMotion } from '@/stores/ui';

interface Node { x: number; y: number; vx: number; vy: number; r: number; hot: boolean }

/** Hero background: nodes drift and link up when near each other or the pointer. */
export default function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest<HTMLElement>('.hero');
    const ctx = canvas?.getContext('2d');
    if (!canvas || !hero || !ctx) return;

    const reduced = prefersReducedMotion();
    const style = getComputedStyle(document.documentElement);
    const gold = style.getPropertyValue('--color-accent').trim();
    const pale = style.getPropertyValue('--color-line-on-photo').trim();
    const pointer = { x: -999, y: -999 };
    let w = 0, h = 0, nodes: Node[] = [], visible = true, frame = 0;

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min((w * h) / 26000, 56));
      nodes = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: i % 7 === 0 ? 3 : 1.6, hot: i % 7 === 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const d = Math.min(w / 8, 150);
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
      if (visible && !$motionPaused.get() && !document.hidden) {
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        draw();
      }
      frame = requestAnimationFrame(step);
    };

    const onResize = () => { size(); draw(); };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    };
    const onLeave = () => { pointer.x = pointer.y = -999; };

    size(); draw();
    addEventListener('resize', onResize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    if (!reduced) {
      io.observe(hero);
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
      frame = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      removeEventListener('resize', onResize);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
