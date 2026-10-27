import type { ReactNode } from "react";
import { SplitText } from "@/components/motion/SplitText";

type Props = { eyebrow: string; title: string; accentWord?: string; lead: ReactNode; visual?: ReactNode; children?: ReactNode };

/** Inner-page hero: eyebrow, split-text H1, lead, optional visual on the right. */
export function PageHero({ eyebrow, title, accentWord, lead, visual, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[var(--header-h)]">
      <div className="hero-glow absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <div className={`container-x grid items-center gap-10 py-16 md:py-24 ${visual ? "lg:grid-cols-12" : ""}`}>
        <div className={visual ? "lg:col-span-7" : "max-w-4xl"}>
          <p className="eyebrow fade-up">{eyebrow}</p>
          <h1 className="mt-5 text-[42px] font-semibold leading-[1.05] text-ice md:text-6xl lg:text-[68px]">
            <SplitText text={title} accent={accentWord} />
          </h1>
          <div className="fade-up mt-6 max-w-2xl text-[17px] leading-relaxed text-[#c5d0de] md:text-lg" style={{ ["--d" as string]: "300ms" }}>
            {lead}
          </div>
          {children && (
            <div className="fade-up mt-8" style={{ ["--d" as string]: "420ms" }}>
              {children}
            </div>
          )}
        </div>
        {visual && (
          <div className="fade-up mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" style={{ ["--d" as string]: "200ms" }} aria-hidden="true">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
