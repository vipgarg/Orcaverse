import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService, accentVar } from "@/content/services";
import { pageMeta, breadcrumbs } from "@/lib/metadata";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { PillarVisual } from "@/components/sections/PillarVisual";
import { Faq } from "@/components/sections/Faq";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SpotlightGroup } from "@/components/motion/SpotlightGroup";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: `${s.title} | OrcaVerse`, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Params) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const accent = accentVar[s.accent];
  const idx = services.indexOf(s);
  const related = [services[(idx + 1) % services.length], services[(idx + 2) % services.length]];

  return (
    <div style={{ ["--accent" as string]: accent }}>
      <PageHero
        eyebrow={`Services · ${s.title}`}
        title={s.headline}
        lead={<p>{s.body}</p>}
        visual={<PillarVisual service={s} />}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/contact?service=${s.slug}`}>{site.primaryCta.label}</Button>
          <Button href="/services" variant="secondary" arrow={false}>
            All services
          </Button>
        </div>
      </PageHero>

      {/* Problem */}
      <section className="section-y border-t border-slate/60">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" style={{ color: accent }}>
              The problem we solve
            </p>
          </div>
          <p className="font-display text-[26px] font-medium leading-snug text-ice md:text-[34px] lg:col-span-8" data-reveal>
            {s.problem}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y bg-deep/40" aria-labelledby="approach-title">
        <div className="container-x">
          <p className="eyebrow" style={{ color: accent }}>
            How we approach it
          </p>
          <h2 id="approach-title" className="mt-4 text-[30px] font-semibold text-ice md:text-[44px]">
            Three steps, one loop
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {s.approach.map((a, i) => (
              <li key={a.title} className="spot-card p-7" data-reveal style={{ ["--i" as string]: i }}>
                <span className="font-mono text-sm" style={{ color: accent }}>
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ice">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#c5d0de]">{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities, platforms, who it suits */}
      <section className="section-y">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="surface rounded-[var(--radius-card)] p-7" data-reveal>
            <h2 className="text-lg font-semibold text-ice">Capabilities</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {s.capabilities.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] text-[#c5d0de]">
                  <Icon name="check" size={20} className="shrink-0" style={{ color: accent }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface rounded-[var(--radius-card)] p-7" data-reveal style={{ ["--i" as string]: 1 }}>
            <h2 className="text-lg font-semibold text-ice">Platforms and tools</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.platforms.map((p) => (
                <li key={p} className="rounded-[var(--radius-chip)] border border-slate bg-abyss/60 px-3 py-1.5 text-[14px] text-[#c5d0de]">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface rounded-[var(--radius-card)] p-7" data-reveal style={{ ["--i" as string]: 2 }}>
            <h2 className="text-lg font-semibold text-ice">Who it suits</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {s.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-[15px] text-[#c5d0de]">
                  <Icon name="arrowUpRight" size={18} className="mt-0.5 shrink-0" style={{ color: accent }} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq items={s.faqs} title={`${s.shortTitle} FAQ`} />

      {/* Related */}
      <section className="pb-16 md:pb-24" aria-labelledby="related-title">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-title" className="text-[26px] font-semibold text-ice md:text-[34px]">
              Works well with
            </h2>
            <Link href="/services" className="link-arrow hidden text-[15px] sm:inline-flex">
              All services <Icon name="arrow" size={16} />
            </Link>
          </div>
          <SpotlightGroup className="mt-8 grid gap-4 md:grid-cols-2">
            {related.map((r, i) => (
              <ServiceCard key={r.slug} service={r} index={i} />
            ))}
          </SpotlightGroup>
        </div>
      </section>

      <CtaPanel
        title={`Talk to us about ${s.title}`}
        text="Tell us about your goals and current setup. We'll come back with how we'd approach it."
        button="Start a Conversation"
        href={`/contact?service=${s.slug}`}
      />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.metaDescription,
            serviceType: s.title,
            provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
            url: new URL(`/services/${s.slug}`, site.url).toString(),
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.title, path: `/services/${s.slug}` },
          ]),
        ]}
      />
    </div>
  );
}
