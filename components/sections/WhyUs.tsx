import { principles } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

const icons: IconName[] = ["connect", "target", "measurement"];
const colors = ["var(--color-cyan)", "var(--color-coral)", "var(--color-mint)"];

export function WhyUs({ title = "Why OrcaVerse", eyebrow = "Our principles" }: { title?: string; eyebrow?: string }) {
  return (
    <section className="section-y" aria-label={title}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {principles.map((p, i) => (
            <li key={p.title} className="border-t border-slate pt-7" data-reveal style={{ ["--i" as string]: i }}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-mist">0{i + 1}</span>
                <span style={{ color: colors[i] }}>
                  <Icon name={icons[i]} size={26} />
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ice">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#c5d0de]">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
