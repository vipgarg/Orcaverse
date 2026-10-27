import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { SloganRotator } from "@/components/motion/SloganRotator";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[var(--header-h)]">
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-x grid min-h-[calc(100svh-var(--header-h))] items-center gap-10 py-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
        <div className="lg:col-span-7">
          <SloganRotator />
          <h1 className="mt-6 text-[42px] font-semibold leading-[1.05] text-ice sm:text-[56px] lg:text-[72px] lg:leading-[1.02]">
            <SplitText text="Dominating Every Screen, App & Algorithm." accent="Algorithm" />
          </h1>
          <p
            className="fade-up mt-6 max-w-xl text-[17px] leading-relaxed text-[#c5d0de] md:text-lg"
            style={{ ["--d" as string]: "350ms" }}
          >
            OrcaVerse helps ambitious brands reach the right users across paid media, programmatic, app ecosystems,
            retail media and connected TV — with a focus on accountable growth and measurable outcomes.
          </p>
          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ ["--d" as string]: "480ms" }}>
            <Magnetic>
              <Button href={site.primaryCta.href} className="w-full sm:w-auto">
                {site.primaryCta.label}
              </Button>
            </Magnetic>
            <Button href={site.secondaryCta.href} variant="secondary" arrow={false} className="w-full sm:w-auto">
              {site.secondaryCta.label}
            </Button>
          </div>
          <p className="fade-up mt-10 font-mono text-xs tracking-wide text-mist" style={{ ["--d" as string]: "600ms" }}>
            Meta · Google · DSPs · Retail Media · OTT
          </p>
        </div>
        <div className="fade-up relative mx-auto w-full max-w-[560px] lg:col-span-5 lg:max-w-none" style={{ ["--d" as string]: "200ms" }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
