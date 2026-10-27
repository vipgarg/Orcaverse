import { approachSteps } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Four-step path. Horizontal line draws in on desktop, vertical timeline on mobile. */
export function ApproachSteps({ eyebrow = "How we work", title = "A clear path from goal to growth" }: { eyebrow?: string; title?: string }) {
  return (
    <section className="section-y relative overflow-hidden bg-deep/40" aria-label="Our approach">
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lead="Every engagement follows the same disciplined loop, so you always know what happens next and why."
        />
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6" data-reveal-group>
          {/* Connecting line */}
          <span
            aria-hidden="true"
            className="draw-line absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-cyan via-violet to-mint lg:block"
          />
          <span
            aria-hidden="true"
            className="draw-line vertical absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-cyan via-violet to-mint lg:hidden"
          />
          {approachSteps.map((s, i) => (
            <li key={s.n} className="relative pl-20 lg:pl-0" data-reveal style={{ ["--i" as string]: i + 1 }}>
              <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-slate bg-abyss font-mono text-sm text-aqua shadow-[0_0_0_6px_var(--color-abyss)] lg:relative">
                {s.n}
              </span>
              <h3 className="text-xl font-semibold text-ice lg:mt-7">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#c5d0de]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
