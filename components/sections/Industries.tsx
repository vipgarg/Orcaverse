import { industries } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function Industries() {
  return (
    <section className="section-y" aria-label="Who we help">
      <div className="container-x">
        <SectionHeading eyebrow="Who we help" title="Built for app-led and commerce businesses" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <li
              key={ind.title}
              className="spot-card group p-6"
              style={{ ["--accent" as string]: ind.accent, ["--i" as string]: i }}
              data-reveal
            >
              <span className="card-icon inline-flex" style={{ color: ind.accent }}>
                <Icon name={ind.icon} size={28} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ice">{ind.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{ind.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
