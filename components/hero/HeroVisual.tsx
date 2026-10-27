import { ORCA_BODY, ORCA_FIN, ORCA_PATCHES, POD } from "./orca";
import { OrcaPodLoader } from "./OrcaPodLoader";

/**
 * Hero artwork. A static SVG pod renders immediately (and is all that shows on
 * mobile and with reduced motion); the particle canvas fades in over it on
 * capable desktops once the page is idle.
 */
export function HeroVisual() {
  return (
    <div className="relative aspect-[5/4] w-full" aria-hidden="true">
      {/* Orbit paths */}
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <linearGradient id="orbit-g" x1="0" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#19C8F2" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FF7A70" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g className="orbit">
          <ellipse cx="250" cy="200" rx="230" ry="150" stroke="url(#orbit-g)" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="480" cy="200" r="4" fill="#19C8F2" />
        </g>
        <g className="orbit slow">
          <ellipse cx="250" cy="200" rx="180" ry="185" stroke="#1B2B40" strokeWidth="1" />
          <circle cx="250" cy="15" r="3.5" fill="#8B5CF6" />
          <circle cx="70" cy="200" r="3" fill="#4DE0B5" />
        </g>
      </svg>

      {/* Static pod (fallback and first paint) */}
      <svg viewBox="0 0 500 400" className="orca-static drift absolute inset-0 h-full w-full transition-opacity duration-700">
        <defs>
          <linearGradient id="orca-g" x1="0" y1="0" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8BE9FA" />
            <stop offset="0.55" stopColor="#19C8F2" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="orca-glow">
            <stop stopColor="#19C8F2" stopOpacity="0.35" />
            <stop offset="1" stopColor="#19C8F2" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="250" cy="210" rx="210" ry="140" fill="url(#orca-glow)" />
        {POD.map((o, i) => (
          <g key={i} transform={`translate(${o.x * 500} ${o.y * 400}) scale(${o.s * 2.5})`} opacity={1 - i * 0.18}>
            <path d={ORCA_BODY} fill="url(#orca-g)" fillOpacity="0.14" stroke="url(#orca-g)" strokeWidth={1.2 / (o.s * 2.5)} />
            <path d={ORCA_FIN} fill="url(#orca-g)" fillOpacity="0.14" stroke="url(#orca-g)" strokeWidth={1.2 / (o.s * 2.5)} />
            <path d={ORCA_PATCHES} fill="#F4F7FB" fillOpacity="0.55" />
          </g>
        ))}
      </svg>

      <OrcaPodLoader />
    </div>
  );
}
