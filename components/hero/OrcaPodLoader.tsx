"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OrcaPod = dynamic(() => import("./OrcaPod"), { ssr: false });

/** Loads the particle canvas only on wide screens, without reduced motion, after idle. */
export function OrcaPodLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!wide.matches || calm.matches) return;
    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);

  return enabled ? <OrcaPod /> : null;
}
