import Link from "next/link";
import { accentVar, type Service } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({ service, featured = false, index = 0 }: { service: Service; featured?: boolean; index?: number }) {
  const accent = accentVar[service.accent];
  return (
    <article
      className={`spot-card flex h-full flex-col p-6 md:p-7 ${featured ? "featured-border md:p-9" : ""}`}
      style={{ ["--accent" as string]: accent, ["--i" as string]: index }}
      data-reveal
    >
      <span
        className="card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border"
        style={{ color: accent, borderColor: `color-mix(in oklab, ${accent} 35%, transparent)`, background: `color-mix(in oklab, ${accent} 10%, transparent)` }}
      >
        <Icon name={service.icon} size={24} />
      </span>
      <h3 className={`mt-6 font-semibold text-ice ${featured ? "text-[26px] md:text-[32px]" : "text-[21px]"}`}>{service.title}</h3>
      <p className={`mt-3 leading-relaxed text-[#c5d0de] ${featured ? "max-w-lg text-[17px]" : "text-[15px]"}`}>
        {featured ? service.body : service.summary}
      </p>
      {featured && <FeaturedArt accent={accent} />}
      <ul className="mt-5 flex flex-wrap gap-2">
        {service.capabilities.slice(0, featured ? 4 : 3).map((c) => (
          <li key={c} className="rounded-[var(--radius-chip)] border border-slate bg-abyss/50 px-2.5 py-1 text-[12.5px] text-mist">
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <Link href={`/services/${service.slug}`} className="link-arrow text-[15px]">
          Explore {service.shortTitle}
          <Icon name="arrow" size={16} />
          <span className="sr-only"> — {service.title}</span>
        </Link>
      </div>
    </article>
  );
}

/** Abstract rising signal lines for the featured tile (decorative, no data). */
function FeaturedArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 600 160" className="mt-8 hidden w-full lg:block" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="feat-fill" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor={accent} stopOpacity="0.25" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120].map((y) => (
        <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#1B2B40" strokeDasharray="3 6" />
      ))}
      <path d="M0 140 C80 135 120 110 190 112 S300 80 360 70 S480 30 600 18 V160 H0 Z" fill="url(#feat-fill)" />
      <path d="M0 140 C80 135 120 110 190 112 S300 80 360 70 S480 30 600 18" stroke={accent} strokeWidth="2" />
      <path d="M0 150 C100 148 160 138 240 132 S380 118 460 104 S560 92 600 88" stroke="#8B5CF6" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="4 5" />
      <circle cx="600" cy="18" r="5" fill={accent} />
      <circle cx="600" cy="18" r="12" stroke={accent} strokeOpacity="0.4" />
    </svg>
  );
}
