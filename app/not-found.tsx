import { Button } from "@/components/ui/Button";
import { ORCA_BODY, ORCA_FIN } from "@/components/hero/orca";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x py-20 text-center">
        <svg viewBox="0 0 200 100" className="drift mx-auto w-56 md:w-72" aria-hidden="true">
          <defs>
            <linearGradient id="nf-g" x1="0" y1="0" x2="200" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8BE9FA" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path d={ORCA_BODY} fill="url(#nf-g)" fillOpacity="0.15" stroke="url(#nf-g)" strokeWidth="1.2" />
          <path d={ORCA_FIN} fill="url(#nf-g)" fillOpacity="0.15" stroke="url(#nf-g)" strokeWidth="1.2" />
        </svg>
        <p className="eyebrow mt-10">Error 404</p>
        <h1 className="mt-4 text-[44px] font-semibold leading-tight text-ice md:text-[64px]">Lost at sea</h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] text-[#c5d0de]">
          This page has drifted out of range. Let&apos;s get you back to the pod.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary" arrow={false}>
            Our services
          </Button>
          <Button href="/contact" variant="secondary" arrow={false}>
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
