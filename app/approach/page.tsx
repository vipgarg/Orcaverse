import { approachSteps } from "@/content/home";
import { pageMeta, breadcrumbs } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { WhyUs } from "@/components/sections/WhyUs";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Our Approach | OrcaVerse",
  description:
    "How OrcaVerse works: discover the opportunity, build the channel strategy, activate campaigns, then measure, learn and optimise.",
  path: "/approach",
});

const colors = ["var(--color-cyan)", "var(--color-violet)", "var(--color-coral)", "var(--color-mint)"];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="A disciplined loop, not a one-off launch"
        accentWord="loop"
        lead="Growth comes from asking the right question, testing deliberately and acting on what the data says. Here is exactly how we do it — and what you receive at every stage."
      >
        <Button href="/contact">Discuss Your Growth Goals</Button>
      </PageHero>

      <div className="container-x pb-12">
        {approachSteps.map((s, i) => (
          <section
            key={s.n}
            aria-labelledby={`stage-${s.n}`}
            className="grid gap-8 border-t border-slate py-16 md:py-24 lg:grid-cols-12 lg:gap-16"
          >
            {/* Pinned stage label */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
                <span className="font-mono text-sm" style={{ color: colors[i] }}>
                  Stage {s.n}
                </span>
                <h2 id={`stage-${s.n}`} className="mt-3 text-[40px] font-semibold leading-none text-ice md:text-[64px]">
                  {s.title}
                </h2>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#c5d0de]">{s.text}</p>
                <div className="mt-8 hidden h-1 w-full max-w-xs overflow-hidden rounded-full bg-slate lg:block">
                  <div className="h-full rounded-full" style={{ width: `${((i + 1) / approachSteps.length) * 100}%`, background: colors[i] }} />
                </div>
              </div>
            </div>
            {/* Detail panels */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              {[
                ["What we need from you", s.inputs],
                ["What we do", s.does],
                ["What you receive", s.receives],
              ].map(([label, items], j) => (
                <div
                  key={label as string}
                  className="spot-card p-7 md:p-8"
                  style={{ ["--accent" as string]: colors[i], ["--i" as string]: j }}
                  data-reveal
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-mist">{label as string}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {(items as string[]).map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[17px] text-ice">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: colors[i] }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <WhyUs title="The principles behind every stage" eyebrow="Working principles" />
      <CtaPanel title="Ready to start at stage one?" text="Tell us your goal and current setup. We'll take it from there." />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Approach", path: "/approach" }])} />
    </>
  );
}
