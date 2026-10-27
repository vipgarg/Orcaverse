"use client";

import { useEffect, useRef } from "react";
import { ORCA_BODY, ORCA_FIN, ORCA_PATCHES, POD } from "./orca";

type P = {
  x: number;
  y: number;
  tx: number; // orca target
  ty: number;
  sx: number; // scattered "network" target
  sy: number;
  r: number;
  c: string;
  ph: number;
};

const COLORS = ["#19C8F2", "#19C8F2", "#8BE9FA", "#8BE9FA", "#19C8F2", "#8B5CF6", "#4DE0B5", "#FF7A70"];
const LINK_NODES = 150;
const LINK_DIST = 72;

/**
 * Particle orca pod. Points assemble into three orcas on load, drift gently,
 * scatter away from the cursor, and dissolve into a connected network as the
 * hero scrolls out of view. 2D canvas, no dependencies.
 */
export default function OrcaPod() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const container = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const hero = container.closest("section") ?? container;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    let raf = 0;
    let running = true;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterise the pod to an offscreen canvas and sample filled pixels
      const off = document.createElement("canvas");
      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
      const o = off.getContext("2d")!;
      const body = new Path2D(ORCA_BODY);
      const fin = new Path2D(ORCA_FIN);
      const patches = new Path2D(ORCA_PATCHES);
      const unit = w / 500;
      for (const orca of POD) {
        o.save();
        o.translate(orca.x * w, orca.y * h);
        o.scale(orca.s * 2.5 * unit, orca.s * 2.5 * unit);
        o.globalCompositeOperation = "source-over";
        o.fill(body);
        o.fill(fin);
        o.globalCompositeOperation = "destination-out";
        o.fill(patches);
        o.restore();
      }
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(4, Math.round(w / 110));
      const pts: [number, number][] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) pts.push([x, y]);
        }
      }

      const prev = parts;
      parts = pts.map(([x, y], i) => {
        const jx = x + (Math.random() - 0.5) * step;
        const jy = y + (Math.random() - 0.5) * step;
        const a = Math.random() * Math.PI * 2;
        const d = 0.25 + Math.random() * 0.6;
        const sx = w / 2 + Math.cos(a) * d * w * 0.7;
        const sy = h / 2 + Math.sin(a) * d * h * 0.7;
        const old = prev[i];
        return {
          x: old ? old.x : sx,
          y: old ? old.y : sy,
          tx: jx,
          ty: jy,
          sx,
          sy,
          r: 0.6 + Math.random() * 1.3,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          ph: Math.random() * Math.PI * 2,
        };
      });
      // Link nodes are a random spread of the points
      for (let i = parts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [parts[i], parts[j]] = [parts[j], parts[i]];
      }
    };

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      const t = (now - start) / 1000;
      const intro = ease(Math.min(1, t / 1.6));
      const hr = hero.getBoundingClientRect();
      const scatter = Math.min(1, Math.max(0, -hr.top / (hr.height * 0.75)));
      const s = ease(scatter);

      ctx.clearRect(0, 0, w, h);

      for (const p of parts) {
        const gx = p.tx + (p.sx - p.tx) * s + Math.sin(t * 0.6 + p.ph) * 1.4;
        const gy = p.ty + (p.sy - p.ty) * s + Math.cos(t * 0.5 + p.ph) * 1.4;
        let goalX = p.sx + (gx - p.sx) * intro;
        let goalY = p.sy + (gy - p.sy) * intro;

        const dx = goalX - pointer.x;
        const dy = goalY - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 90 * 90) {
          const dist = Math.sqrt(dist2) || 1;
          const push = (1 - dist / 90) * 26;
          goalX += (dx / dist) * push;
          goalY += (dy / dist) * push;
        }

        p.x += (goalX - p.x) * 0.09;
        p.y += (goalY - p.y) * 0.09;

        ctx.globalAlpha = 0.55 + 0.45 * Math.sin(t * 1.4 + p.ph) ** 2;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Network links appear as the pod disperses
      if (s > 0.04) {
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = "#19C8F2";
        const n = Math.min(LINK_NODES, parts.length);
        for (let i = 0; i < n; i++) {
          const a = parts[i];
          for (let j = i + 1; j < n; j++) {
            const b = parts[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < LINK_DIST * LINK_DIST) {
              ctx.globalAlpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.45 * s;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    build();
    container.dataset.live = "true";
    canvas.style.opacity = "1";
    raf = requestAnimationFrame(frame);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(build, 200);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(container);
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(resizeT);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      delete container.dataset.live;
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
