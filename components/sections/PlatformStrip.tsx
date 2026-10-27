"use client";

import { useState } from "react";
import { platforms } from "@/content/home";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Two marquee rows of platform names. Pauses on hover/focus and via the button. */
export function PlatformStrip() {
  const [paused, setPaused] = useState(false);
  if (!site.flags.showPlatformStrip) return null;

  const half = Math.ceil(platforms.length / 2);
  const rows = [platforms.slice(0, half), platforms.slice(half)];

  return (
    <section aria-labelledby="platforms-title" className="relative border-y border-slate/70 bg-deep/40 py-8">
      <div className="container-x mb-5 flex items-center justify-between gap-4">
        <h2 id="platforms-title" className="font-mono text-xs uppercase tracking-[0.12em] text-mist">
          Platforms and partners we work across
        </h2>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-xs text-mist hover:text-ice motion-reduce:hidden"
          aria-pressed={paused}
        >
          <Icon name={paused ? "play" : "pause"} size={14} />
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="marquee flex flex-col gap-3 overflow-hidden" data-paused={paused}>
        {rows.map((row, r) => (
          <div key={r} className={`marquee-track ${r === 1 ? "reverse" : ""}`}>
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 ? "true" : undefined}>
                {/* Repeat so one copy is always wider than the viewport */}
                {[...row, ...row, ...row].map((p, i) => (
                  <li
                    key={`${p}-${i}`}
                    aria-hidden={i >= row.length ? "true" : undefined}
                    className="whitespace-nowrap rounded-full border border-slate bg-abyss/60 px-5 py-2.5 font-display text-[15px] font-medium text-[#c5d0de]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
