import type { Metadata } from "next";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="relative isolate flex min-h-[85svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x py-20 text-center">
        <div className="sonar relative mx-auto flex h-24 w-24 items-center justify-center" aria-hidden="true">
          <span className="sonar-ring" />
          <span className="sonar-ring" />
          <span className="sonar-ring" />
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint/15 text-mint">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
        </div>
        <p className="eyebrow mt-10 text-mint">Enquiry received</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-[40px] font-semibold leading-[1.1] text-ice md:text-[56px]">
          Thank you — your message is on its way.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#c5d0de]">
          We'll review your goals and get back to you{site.contact.responseTime ? ` ${site.contact.responseTime}` : " soon"}. In the
          meantime, explore how we work.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {site.contact.bookingUrl && (
            <Button href={site.contact.bookingUrl} external>
              Book a call now
            </Button>
          )}
          <Button href="/services" variant={site.contact.bookingUrl ? "secondary" : "primary"}>
            Explore our services
          </Button>
          <Button href="/" variant="secondary" arrow={false}>
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
