import { accentVar, type Service } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

/** Decorative panel for a pillar: icon in concentric rings with platform chips orbiting. */
export function PillarVisual({ service }: { service: Service }) {
  const accent = accentVar[service.accent];
  return (
    <div
      className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-panel)] border border-slate bg-deep"
      aria-hidden="true"
    >
      <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, ${accent} 22%, transparent), transparent 70%)` }} />
      <div className="grid-lines absolute inset-0 -z-10 opacity-70" />
      {[180, 260, 340].map((d, i) => (
        <span
          key={d}
          className="absolute rounded-full border"
          style={{ width: d, height: d, borderColor: `color-mix(in oklab, ${accent} ${30 - i * 8}%, transparent)` }}
        />
      ))}
      <span
        className="drift relative flex h-24 w-24 items-center justify-center rounded-3xl border bg-abyss"
        style={{ color: accent, borderColor: accent, boxShadow: `0 0 60px -12px ${accent}` }}
      >
        <Icon name={service.icon} size={44} />
      </span>
      <ul className="absolute inset-x-6 bottom-6 flex flex-wrap justify-center gap-2">
        {service.platforms.map((p) => (
          <li key={p} className="rounded-full border border-slate bg-abyss/80 px-3 py-1 text-xs text-[#c5d0de] backdrop-blur">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
