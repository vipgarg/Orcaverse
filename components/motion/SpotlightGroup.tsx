"use client";

import type { ReactNode } from "react";

/** Feeds pointer position into --mx/--my on the hovered .spot-card. */
export function SpotlightGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".spot-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className={className} onPointerMove={onMove}>
      {children}
    </div>
  );
}
