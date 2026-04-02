import { useEffect, useRef, useCallback } from 'react';
import './Cursor.css';

const TRAIL_COUNT = 14;

export default function Cursor() {
  const dotRef    = useRef(null);
  const crossRef  = useRef(null);
  const scanRef   = useRef(null);
  const canvasRef = useRef(null);

  const mouse   = useRef({ x: -300, y: -300 });
  const smooth  = useRef({ x: -300, y: -300 });
  const trail   = useRef(Array(TRAIL_COUNT).fill({ x: -300, y: -300 }));
  const hovering  = useRef(false);
  const glitchTO  = useRef(null);
  const rafId     = useRef(null);
  const magnets   = useRef([]);

  const refreshMagnets = useCallback(() => {
    magnets.current = Array.from(
      document.querySelectorAll('a, button, [role="button"]')
    );
  }, []);

  const getMagnetOffset = useCallback((x, y) => {
    const RADIUS = 60;
    let best = null, bestDist = Infinity;
    for (const el of magnets.current) {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      const d  = Math.hypot(x - cx, y - cy);
      if (d < RADIUS && d < bestDist) { best = { cx, cy, d }; bestDist = d; }
    }
    if (!best) return { ox: 0, oy: 0 };
    const s = (1 - best.d / RADIUS) * 0.38;
    return { ox: (best.cx - x) * s, oy: (best.cy - y) * s };
  }, []);

  const spawnRipple = useCallback((x, y) => {
    ['cursor-ripple', 'cursor-ripple ripple-2'].forEach((cls, i) => {
      const el = document.createElement('div');
      el.className = cls;
      el.style.cssText = `left:${x}px;top:${y}px;animation-delay:${i * 80}ms`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 900);
    });
  }, []);

  const triggerGlitch = useCallback(() => {
    [crossRef, scanRef].forEach(r => r.current?.classList.add('glitching'));
    clearTimeout(glitchTO.current);
    glitchTO.current = setTimeout(() => {
      [crossRef, scanRef].forEach(r => r.current?.classList.remove('glitching'));
    }, 450);
  }, []);

  // Main RAF loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      const { x: mx, y: my } = mouse.current;
      const { ox, oy } = getMagnetOffset(mx, my);

      // Smooth crosshair lags behind mouse
      smooth.current.x += (mx + ox - smooth.current.x) * 0.12;
      smooth.current.y += (my + oy - smooth.current.y) * 0.12;

      // Trail — prepend current mouse position
      trail.current = [{ x: mx, y: my }, ...trail.current.slice(0, TRAIL_COUNT - 1)];

      // Hard-snap the dot
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`;

      // Smooth-snap the crosshair
      const sx = smooth.current.x, sy = smooth.current.y;
      if (crossRef.current)
        crossRef.current.style.transform = `translate(${sx}px,${sy}px)`;
      if (scanRef.current)
        scanRef.current.style.transform  = `translate(${sx}px,${sy}px)`;

      // Draw particle trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hue = hovering.current ? 148 : 185;
      trail.current.forEach((pt, i) => {
        if (pt.x < -200) return;
        const t     = 1 - i / TRAIL_COUNT;
        const alpha = t * 0.55;
        const size  = t * 3.5;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle   = `hsla(${hue},100%,65%,${alpha})`;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = `hsla(${hue},100%,65%,0.4)`;
        ctx.fill();
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
    };
  }, [getMagnetOffset]);

  // Event listeners
  useEffect(() => {
    refreshMagnets();
    const mo = new MutationObserver(refreshMagnets);
    mo.observe(document.body, { childList: true, subtree: true });

    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY }; };

    const onDown = e => {
      dotRef.current?.classList.add('clicking');
      crossRef.current?.classList.add('clicking');
      spawnRipple(e.clientX, e.clientY);
    };

    const onUp = () => {
      dotRef.current?.classList.remove('clicking');
      crossRef.current?.classList.remove('clicking');
    };

    const onOver = e => {
      if (e.target.closest('a,button,[role="button"],input,textarea')) {
        hovering.current = true;
        dotRef.current?.classList.add('hovering');
        crossRef.current?.classList.add('hovering');
        triggerGlitch();
      }
    };

    const onOut = e => {
      if (e.target.closest('a,button,[role="button"],input,textarea')) {
        hovering.current = false;
        dotRef.current?.classList.remove('hovering');
        crossRef.current?.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout',  onOut);

    return () => {
      mo.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout',  onOut);
      clearTimeout(glitchTO.current);
    };
  }, [spawnRipple, triggerGlitch, refreshMagnets]);

  return (
    <>
      {/* Particle trail canvas */}
      <canvas ref={canvasRef} className="cursor-trail-canvas" />

      {/* Hard-following center dot */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Smooth-following crosshair */}
      <div ref={crossRef} className="cursor-crosshair">
        <span className="arm top"    />
        <span className="arm right"  />
        <span className="arm bottom" />
        <span className="arm left"   />
        <span className="bracket tl" />
        <span className="bracket tr" />
        <span className="bracket bl" />
        <span className="bracket br" />
        <span className="scan-arc"   />
        <span className="cursor-tag">SYS</span>
      </div>

      {/* Glitch overlay — separate element so it can offset independently */}
      <div ref={scanRef} className="cursor-scan-overlay" />
    </>
  );
}
