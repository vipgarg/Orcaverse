import { services, accentVar } from "@/content/services";
import { LogoMark } from "@/components/ui/Logo";

/** Orbit graphic: six coloured nodes (one per pillar) around the brand mark. */
export function ServiceOrbit() {
  const R = 160;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="-210 -210 420 420" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <circle r={R} stroke="#1B2B40" />
        <circle r={R - 60} stroke="#1B2B40" strokeDasharray="2 6" />
        <g className="orbit">
          {services.map((s, i) => {
            const a = (i / services.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(a) * R;
            const y = Math.sin(a) * R;
            return (
              <g key={s.slug}>
                <line x1={0} y1={0} x2={x} y2={y} stroke={accentVar[s.accent]} strokeOpacity="0.25" />
                <circle cx={x} cy={y} r="16" fill={accentVar[s.accent]} fillOpacity="0.12" stroke={accentVar[s.accent]} />
                <circle cx={x} cy={y} r="4" fill={accentVar[s.accent]} />
              </g>
            );
          })}
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-slate bg-deep shadow-[0_0_60px_-10px_var(--color-cyan)]">
          <LogoMark size={52} />
        </div>
      </div>
    </div>
  );
}
