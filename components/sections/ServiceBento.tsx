import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SpotlightGroup } from "@/components/motion/SpotlightGroup";
import { ServiceCard } from "./ServiceCard";

/** 6 service tiles: one featured large tile plus five standard tiles. */
export function ServiceBento() {
  const [featured, ...rest] = services;
  return (
    <section className="section-y" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title={<span id="services-title">Six connected ways to grow</span>}
            lead="Each discipline is strong on its own. Planned together, they compound."
          />
          <div data-reveal>
            <Button href="/services" variant="secondary">
              All services
            </Button>
          </div>
        </div>
        <SpotlightGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
          <div className="md:col-span-2 lg:row-span-2">
            <ServiceCard service={featured} featured />
          </div>
          {rest.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i + 1} />
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}
