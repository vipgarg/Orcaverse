import Link from "next/link";
import { services, accentVar } from "@/content/services";
import { pageMeta, breadcrumbs } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceOrbit } from "@/components/sections/ServiceOrbit";
import { PillarNav } from "@/components/sections/PillarNav";
import { PillarVisual } from "@/components/sections/PillarVisual";
import { Faq } from "@/components/sections/Faq";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Digital Advertising & Growth Services | OrcaVerse",
  description:
    "Explore OrcaVerse capabilities across paid media, programmatic and in-app ads, mobile user acquisition, commerce media, OTT/CTV and measurement.",
  path: "/services",
});

const engagement = [
  { title: "Align on the objective", text: "Agree the goal, audience, constraints and how success will be judged." },
  { title: "Design the plan", text: "Choose channels, budgets and tests, with measurement built in from the start." },
  { title: "Launch and learn", text: "Go live with structured tests and early read-outs on what is working." },
  { title: "Optimise and report", text: "Move budget toward results and report on the metrics that drive decisions." },
];

const servicesFaq = [
  { q: "Do I have to use every service?", a: "No. Many clients start with one or two pillars. We recommend the mix that fits your goal, and expand only when it makes sense." },
  { q: "Can you work with our in-house team or other agencies?", a: "Yes. We can own specific channels or work alongside existing teams with clear responsibilities." },
  { q: "How quickly can campaigns go live?", a: "It depends on access, tracking and creative readiness. We agree a launch timeline during planning." },
  { q: "Which markets do you cover?", a: "Tell us where your customers are and we will confirm platform availability for those markets." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Six ways we grow your business"
        accentWord="grow"
        lead="From paid social and search to programmatic, app acquisition, retail media, OTT and measurement — each pillar is strong on its own, and stronger planned together."
        visual={<ServiceOrbit />}
      />
      <PillarNav />

      <div className="container-x">
        {services.map((s, i) => {
          const accent = accentVar[s.accent];
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="grid items-center gap-10 border-b border-slate/60 py-16 last:border-b-0 md:py-24 lg:grid-cols-12 lg:gap-16"
            >
              <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`} data-reveal>
                <p className="eyebrow" style={{ color: accent }}>
                  0{i + 1} · {s.title}
                </p>
                <h2 id={`${s.slug}-title`} className="mt-4 text-[30px] font-semibold leading-[1.15] text-ice md:text-[40px]">
                  {s.headline}
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-[#c5d0de]">{s.body}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {s.capabilities.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] text-ice">
                      <Icon name="check" size={20} className="mt-0.5 shrink-0" style={{ color: accent }} />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={`/services/${s.slug}`} className="link-arrow">
                    How we approach {s.shortTitle} <Icon name="arrow" size={16} />
                  </Link>
                  <Link href={`/contact?service=${s.slug}`} className="text-[15px] text-mist underline-offset-4 hover:text-ice hover:underline">
                    Talk to a specialist
                  </Link>
                </div>
              </div>
              <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`} data-reveal style={{ ["--i" as string]: 1 }}>
                <PillarVisual service={s} />
              </div>
            </section>
          );
        })}
      </div>

      {/* Platform matrix */}
      <section className="section-y bg-deep/40" aria-labelledby="matrix-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Platforms"
            title={<span id="matrix-title">Platforms by service area</span>}
            lead="The platforms we plan and buy across, grouped by the pillar they support."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.slug} className="surface rounded-[var(--radius-card)] p-6" data-reveal style={{ ["--i" as string]: i }}>
                <p className="flex items-center gap-2 text-[15px] font-semibold text-ice">
                  <span className="h-2 w-2 rounded-full" style={{ background: accentVar[s.accent] }} />
                  {s.title}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.platforms.map((p) => (
                    <li key={p} className="rounded-[var(--radius-chip)] border border-slate bg-abyss/60 px-3 py-1.5 text-[13px] text-[#c5d0de]">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement model */}
      <section className="section-y" aria-labelledby="engagement-title">
        <div className="container-x">
          <SectionHeading eyebrow="Engagement" title={<span id="engagement-title">How an engagement works</span>} />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {engagement.map((e, i) => (
              <li key={e.title} className="spot-card p-6" data-reveal style={{ ["--i" as string]: i }}>
                <span className="font-mono text-sm text-aqua">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-ice">{e.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mist">{e.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={servicesFaq} title="Services FAQ" />
      <CtaPanel title="Not sure which mix is right?" text="Share your goal and current channels. We'll suggest where to start." button="Discuss Your Growth Goals" />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
    </>
  );
}
