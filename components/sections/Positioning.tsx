import { site } from "@/content/site";

/** Large statement whose words brighten as they scroll through the viewport (CSS scroll-driven). */
export function Positioning() {
  const words = site.positioning.split(" ");
  return (
    <section className="section-y">
      <div className="container-x">
        <p className="eyebrow mb-6 text-center">Who we are</p>
        <p className="scroll-brighten mx-auto max-w-5xl text-center font-display text-[28px] font-medium leading-[1.25] tracking-tight text-ice md:text-[44px] md:leading-[1.2]">
          {words.map((w, i) => (
            <span key={i}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  );
}
