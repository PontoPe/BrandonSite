"use client";

import { useEffect, useRef } from "react";

/**
 * A Cryptic field.
 *
 * Cryptics — Pattern among them — are described as fractal geometry that never
 * settles: mathematics rather than weather, raised on a surface and always
 * moving. So this is generated rather than drawn. A square lattice subdivides
 * recursively, and each subdivision's midpoint is displaced by a travelling
 * wave, which means the small scales ripple faster than the large ones and the
 * grid never quite closes on itself.
 *
 * The surface layers get the storm; the deep layer gets this. The register
 * changing is the point — descending should not just look darker, it should
 * look like a different kind of thing.
 */

const ROOT = 360; // px per top-level cell before subdivision
const DEPTH = 4;
const FPS = 30;

export default function CrypticField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** One cell: split it, draw the split, recurse into the four children. */
    const cell = (x: number, y: number, size: number, depth: number, t: number) => {
      if (depth === 0 || size < 9) return;
      const half = size / 2;
      // The displacement scales with the cell, so detail ripples faster than
      // structure — which is what makes it read as fractal rather than as a grid.
      const wave =
        Math.sin(x * 0.009 + y * 0.011 + t) * half * 0.26 +
        Math.cos(x * 0.017 - y * 0.007 + t * 1.4) * half * 0.14;
      const mx = x + half + wave;
      const my = y + half - wave;

      ctx.moveTo(x, my);
      ctx.lineTo(x + size, my);
      ctx.moveTo(mx, y);
      ctx.lineTo(mx, y + size);

      cell(x, y, half, depth - 1, t);
      cell(x + half, y, half, depth - 1, t);
      cell(x, y + half, half, depth - 1, t);
      cell(x + half, y + half, half, depth - 1, t);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const styles = getComputedStyle(canvas);
      ctx.strokeStyle = styles.color;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      for (let x = -ROOT; x < w + ROOT; x += ROOT) {
        for (let y = -ROOT; y < h + ROOT; y += ROOT) {
          cell(x, y, ROOT, DEPTH, t);
        }
      }
      ctx.stroke();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now / 5200);
    };

    resize();
    if (still) {
      draw(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
      if (still) draw(0);
    };
    window.addEventListener("resize", onResize);

    // Nothing to animate for a tab nobody is looking at.
    const onVisibility = () => {
      if (still) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="cryptic-field" aria-hidden />;
}
