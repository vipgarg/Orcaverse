import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";

type Props = { items: { q: string; a: string }[]; title?: string; eyebrow?: string; withSchema?: boolean };

export function Faq({ items, title = "Questions, answered", eyebrow = "FAQ", withSchema = true }: Props) {
  return (
    <section className="section-y" aria-label="Frequently asked questions">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-[30px] font-semibold leading-tight text-ice md:text-[44px]">{title}</h2>
        </div>
        <div className="lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="faq group border-b border-slate">
              <summary className="flex items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold text-ice transition-colors hover:text-aqua md:text-lg">
                {f.q}
                <span className="faq-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate text-aqua">
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-[#c5d0de]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </section>
  );
}
