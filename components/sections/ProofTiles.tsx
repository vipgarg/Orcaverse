import { proof } from "@/content/home";
import { site } from "@/content/site";
import { Counter } from "@/components/motion/Counter";

/** Gated: renders only with site.flags.showProof AND approved data in content/home.ts. */
export function ProofTiles() {
  if (!site.flags.showProof || (proof.metrics.length === 0 && !proof.quote)) return null;
  return (
    <section className="section-y" aria-label="Results">
      <div className="container-x">
        {proof.metrics.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proof.metrics.map((m, i) => (
              <li key={m.label} className="surface rounded-[var(--radius-card)] p-7" data-reveal style={{ ["--i" as string]: i }}>
                <p className="font-display text-5xl font-semibold text-gradient">
                  <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="mt-3 text-[15px] text-mist">{m.label}</p>
              </li>
            ))}
          </ul>
        )}
        {proof.quote && (
          <figure className="mx-auto mt-16 max-w-3xl text-center" data-reveal>
            <blockquote className="font-display text-2xl leading-snug text-ice md:text-3xl">“{proof.quote.text}”</blockquote>
            <figcaption className="mt-6 text-[15px] text-mist">
              {proof.quote.name}, {proof.quote.role}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
