import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "left", as: Tag = "h2", className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="eyebrow mb-4" data-reveal>
          {eyebrow}
        </p>
      )}
      <Tag
        className={`${Tag === "h1" ? "text-[42px] leading-[1.05] md:text-6xl" : "text-[30px] leading-[1.15] md:text-[44px] md:leading-[1.1]"} font-semibold text-ice`}
        data-reveal
        style={{ ["--i" as string]: 1 }}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={`mt-5 text-[17px] leading-relaxed text-[#c5d0de] md:text-lg ${center ? "mx-auto" : ""} max-w-2xl`}
          data-reveal
          style={{ ["--i" as string]: 2 }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
