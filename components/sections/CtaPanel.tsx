import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";

type Props = { title?: string; text?: string; button?: string; href?: string };

export function CtaPanel({
  title = "Let's scale what matters.",
  text = "Tell us what you're building, who you need to reach, and what growth means for your business.",
  button = "Start a Conversation",
  href = "/contact",
}: Props) {
  return (
    <section className="pb-20 pt-4 md:pb-28">
      <div className="container-x">
        <div
          className="relative isolate overflow-hidden rounded-[var(--radius-panel)] border border-slate bg-deep px-6 py-16 text-center md:px-16 md:py-24"
          data-reveal
        >
          <div aria-hidden="true" className="drift absolute -left-24 -top-32 -z-10 h-80 w-80 rounded-full bg-cyan/25 blur-[100px]" />
          <div aria-hidden="true" className="drift absolute -bottom-32 -right-16 -z-10 h-80 w-96 rounded-full bg-violet/30 blur-[110px]" />
          <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-60" />
          <h2 className="mx-auto max-w-3xl text-[34px] font-semibold leading-[1.1] text-ice md:text-[56px]">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#c5d0de] md:text-lg">{text}</p>
          <div className="mt-9 flex justify-center">
            <Magnetic>
              <Button href={href}>{button}</Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
