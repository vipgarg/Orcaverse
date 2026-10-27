"use client";

import { useRef, type ReactNode } from "react";

/** Pulls its child up to `strength` px toward the pointer. Fine pointers only. */
export function Magnetic({ children, strength = 6 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2 * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2 * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </span>
  );
}
