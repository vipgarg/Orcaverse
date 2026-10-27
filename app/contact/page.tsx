import { site } from "@/content/site";
import { services } from "@/content/services";
import { pageMeta, breadcrumbs } from "@/lib/metadata";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SplitText } from "@/components/motion/SplitText";
import { Icon } from "@/components/ui/Icon";
import { Placeholder } from "@/components/ui/Placeholder";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Contact OrcaVerse | Discuss Your Growth Goals",
  description:
    "Talk with OrcaVerse about your app, e-commerce or digital acquisition goals and explore a potential growth engagement.",
  path: "/contact",
});

const nextSteps = [
  { q: "What happens next?", a: "We review your enquiry and reply to arrange a short call about your goals." },
  { q: "Who will reply?", a: "Someone from our team who works on the channels you're interested in." },
  { q: "What should I prepare?", a: "Your main goal, current channels, a rough budget range and what has or hasn't worked so far." },
];

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const preselected = services.some((s) => s.slug === service) ? service : undefined;
  const { contact, flags } = site;

  return (
    <>
      <section className="relative isolate overflow-hidden pt-[var(--header-h)]">
        <div className="hero-glow absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow fade-up">Contact</p>
            <h1 className="mt-5 text-[42px] font-semibold leading-[1.05] text-ice md:text-6xl">
              <SplitText text="Discuss your growth goals" accent="growth" />
            </h1>
            <p className="fade-up mt-6 text-[17px] leading-relaxed text-[#c5d0de] md:text-lg" style={{ ["--d" as string]: "300ms" }}>
              Whether you're scaling an app, growing an e-commerce brand or reworking your media mix, tell us what you're
              building and who you need to reach.
            </p>

            <ul className="fade-up mt-10 flex flex-col gap-4" style={{ ["--d" as string]: "420ms" }}>
              {contact.email ? (
                <ContactRow icon="mail" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              ) : (
                <li>
                  <Placeholder label="contact email" />
                </li>
              )}
              {contact.phone && (
                <ContactRow icon="phone" label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
              )}
              {flags.showWhatsApp && contact.whatsapp && (
                <ContactRow icon="chat" label="WhatsApp" value="Message us on WhatsApp" href={`https://wa.me/${contact.whatsapp}`} external />
              )}
              {contact.bookingUrl ? (
                <ContactRow icon="calendar" label="Prefer to talk?" value="Book a 30-minute call" href={contact.bookingUrl} external />
              ) : (
                <li>
                  <Placeholder label="booking link (optional)" />
                </li>
              )}
              {contact.city && <ContactRow icon="pin" label="Based in" value={contact.city} />}
            </ul>

            {contact.responseTime && <p className="mt-8 text-[15px] text-mist">We typically reply {contact.responseTime}.</p>}
            <p className="mt-8 max-w-md text-[13.5px] leading-relaxed text-mist">
              We use the details you share only to respond to your enquiry. Read our{" "}
              <a href="/privacy" className="text-aqua underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="fade-up lg:col-span-7" style={{ ["--d" as string]: "200ms" }}>
            <EnquiryForm preselectedService={preselected} />
          </div>
        </div>
      </section>

      <section className="border-t border-slate/60 py-16 md:py-20">
        <div className="container-x grid gap-8 md:grid-cols-3">
          {nextSteps.map((n, i) => (
            <div key={n.q} data-reveal style={{ ["--i" as string]: i }}>
              <h2 className="text-lg font-semibold text-ice">{n.q}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{n.a}</p>
            </div>
          ))}
        </div>
      </section>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: "mail" | "phone" | "chat" | "calendar" | "pin";
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate bg-deep text-aqua">
        <Icon name={icon} size={20} />
      </span>
      <span>
        <span className="block text-[13px] text-mist">{label}</span>
        <span className="block font-semibold text-ice">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          className="group flex items-center gap-4 rounded-xl transition-colors hover:text-aqua"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {body}
        </a>
      ) : (
        <div className="flex items-center gap-4">{body}</div>
      )}
    </li>
  );
}
