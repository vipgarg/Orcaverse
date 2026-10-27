"use client";

import { useEffect, useState } from "react";
import { services, accentVar } from "@/content/services";

/** Sticky chip nav under the header; highlights the pillar currently in view. */
export function PillarNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    services.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Service pillars" className="sticky top-[var(--header-h)] z-30 border-y border-slate/70 bg-abyss/85 backdrop-blur-xl">
      <ul className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
        {services.map((s) => {
          const on = active === s.slug;
          return (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                aria-current={on ? "true" : undefined}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors duration-200 ${
                  on ? "border-transparent bg-slate text-ice" : "border-slate text-mist hover:text-ice"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: accentVar[s.accent] }} />
                {s.shortTitle}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
