import Image from "next/image";
import { pageMeta, breadcrumbs } from "@/lib/metadata";
import { site } from "@/content/site";
import { team } from "@/content/home";
import { PageHero } from "@/components/sections/PageHero";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { HeroVisual } from "@/components/hero/HeroVisual";

export const metadata = pageMeta({
  title: "About OrcaVerse | Omnichannel Growth Agency",
  description:
    "Learn about OrcaVerse's approach to coordinated digital acquisition, campaign optimisation and performance measurement.",
  path: "/about",
});

const pod: { icon: IconName; title: string; text: string; color: string }[] = [
  { icon: "compass", title: "Intelligence", text: "Orcas read their environment and adapt. We plan from data and adjust as signals change.", color: "var(--color-cyan)" },
  { icon: "connect", title: "Coordination", text: "A pod moves as one. Our channels are planned together, not in isolation.", color: "var(--color-violet)" },
  { icon: "wave", title: "Reach", text: "Orcas range across every ocean. We help brands reach users across every screen that matters.", color: "var(--color-mint)" },
];

const principles = [
  { title: "Connect channels", text: "Treat paid media, programmatic, app, retail and measurement as one system." },
  { title: "Optimise toward meaningful outcomes", text: "Judge success by business results, not platform vanity metrics." },
  { title: "Learn from measurement", text: "Build reliable measurement first, then let it guide every decision." },
];

export default function AboutPage() {
  const showTeam = site.flags.showTeam && team.length > 0;
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built like a pod"
        accentWord="pod"
        lead="OrcaVerse is an omnichannel performance and programmatic growth agency built for the modern app ecosystem."
        visual={<HeroVisual />}
      />

      <section className="section-y border-t border-slate/60">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Our story</p>
          </div>
          <div className="space-y-6 text-[19px] leading-relaxed text-[#c5d0de] md:text-[22px] lg:col-span-8" data-reveal>
            <p className="text-ice">
              We bring paid media, programmatic buying, app acquisition, commerce media and measurement into one coordinated
              growth conversation.
            </p>
            <p>
              Our approach is built around a simple idea: reach matters, but the quality of that reach matters more. By
              connecting channel strategy with disciplined testing and measurement, we help teams make clearer decisions
              about where to invest and how to improve performance.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-deep/40" aria-labelledby="name-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why the name"
            title={<span id="name-title">What an orca pod teaches about growth</span>}
            lead="Orcas hunt in coordinated pods — intelligent, purposeful and far-ranging. It's how we think marketing should work."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {pod.map((p, i) => (
              <li key={p.title} className="spot-card p-7" style={{ ["--accent" as string]: p.color, ["--i" as string]: i }} data-reveal>
                <span className="card-icon inline-flex" style={{ color: p.color }}>
                  <Icon name={p.icon} size={30} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ice">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#c5d0de]">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="principles-title">
        <div className="container-x">
          <SectionHeading eyebrow="Operating principles" title={<span id="principles-title">How we work, in three lines</span>} />
          <ol className="mt-12 divide-y divide-slate border-y border-slate">
            {principles.map((p, i) => (
              <li key={p.title} className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline" data-reveal style={{ ["--i" as string]: i }}>
                <span className="font-mono text-sm text-aqua md:col-span-1">0{i + 1}</span>
                <h3 className="text-2xl font-semibold text-ice md:col-span-5">{p.title}</h3>
                <p className="text-[16px] leading-relaxed text-[#c5d0de] md:col-span-6">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {showTeam && (
        <section className="section-y bg-deep/40" aria-labelledby="team-title">
          <div className="container-x">
            <SectionHeading eyebrow="Team" title={<span id="team-title">The people behind the pod</span>} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <li key={m.name} className="surface overflow-hidden rounded-[var(--radius-card)]" data-reveal>
                  {m.photo && (
                    <Image src={m.photo} alt={m.name} width={400} height={400} className="aspect-square w-full object-cover" />
                  )}
                  <div className="p-5">
                    <p className="font-semibold text-ice">{m.name}</p>
                    <p className="text-sm text-mist">{m.role}</p>
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="link-arrow mt-3 text-sm">
                        LinkedIn <Icon name="arrowUpRight" size={14} />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaPanel title="Have a growth challenge? Let's talk." text="Tell us where you want to grow. We'll show you how we'd approach it." button="Start a Conversation" />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
