"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const INTERVAL = 2000;

/**
 * Hero slogan: "You name it — [rotating word] — we have it."
 * Words share one grid cell; the slot's width eases to fit the current word.
 * Static with reduced motion.
 */
export function SloganRotator() {
  const words = site.sloganWords;
  const [i, setI] = useState(0);
  const [width, setWidth] = useState<number>();
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Size the slot to the active word (re-measured once fonts load)
  useLayoutEffect(() => {
    const measure = () => setWidth(wordRefs.current[i]?.offsetWidth);
    measure();
    document.fonts?.ready.then(measure);
  }, [i]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      clearInterval(id);
      id = setInterval(() => setI((n) => (n + 1) % words.length), INTERVAL);
    };
    const onVis = () => (document.hidden ? clearInterval(id) : start());
    // Begin rotating once the intro animation has played
    const t = setTimeout(start, 900);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimeout(t);
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [words.length]);

  const prev = (i - 1 + words.length) % words.length;

  return (
    <p className="slogan fade-up inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-2xl border border-slate bg-deep/60 px-4 py-2.5 font-display text-[17px] font-medium leading-tight text-ice backdrop-blur sm:rounded-full sm:py-2 sm:pl-3 sm:pr-5 sm:text-[21px]">
      <span className="sr-only">{site.slogan}</span>
      {/* Two unbreakable halves, so small screens wrap cleanly between them */}
      <span aria-hidden="true" className="inline-flex items-center gap-2.5 whitespace-nowrap">
        <span className="slogan-spark relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inset-0 rounded-full bg-cyan" />
        </span>
        You name it
        <span className="text-mist">—</span>
      </span>
      <span aria-hidden="true" className="inline-flex items-center gap-2.5 whitespace-nowrap">
        <span className="slogan-slot" style={width ? { width } : undefined}>
          {words.map((w, n) => (
            <span
              key={w}
              ref={(el) => {
                wordRefs.current[n] = el;
              }}
              className="slogan-word text-gradient font-semibold"
              data-state={n === i ? "in" : n === prev ? "out" : "wait"}
            >
              {w}
            </span>
          ))}
        </span>
        <span className="text-mist">—</span>
        <span className="slogan-tail text-aqua">we have it.</span>
      </span>
    </p>
  );
}
