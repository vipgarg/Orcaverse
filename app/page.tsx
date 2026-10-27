import { faqs } from "@/content/home";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { Hero } from "@/components/sections/Hero";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { Positioning } from "@/components/sections/Positioning";
import { ServiceBento } from "@/components/sections/ServiceBento";
import { ApproachSteps } from "@/components/sections/ApproachSteps";
import { Industries } from "@/components/sections/Industries";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProofTiles } from "@/components/sections/ProofTiles";
import { Faq } from "@/components/sections/Faq";
import { CtaPanel } from "@/components/sections/CtaPanel";

export const metadata = pageMeta({
  title: "OrcaVerse | Performance & Programmatic Growth",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <Positioning />
      <ServiceBento />
      <ApproachSteps />
      <Industries />
      <WhyUs />
      <ProofTiles />
      <Faq items={faqs} />
      <CtaPanel />
    </>
  );
}
