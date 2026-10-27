import type { ReactNode } from "react";
import { site } from "@/content/site";

/** Plain 720px reading layout for policy pages, with a draft notice until legal review. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="container-x pb-24 pt-[calc(var(--header-h)+56px)]">
      <div className="mx-auto max-w-[720px]">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-[40px] font-semibold leading-tight text-ice md:text-[52px]">{title}</h1>
        <p className="mt-3 text-[14px] text-mist">Last updated: {updated}</p>
        {!site.flags.legalReviewed && (
          <p className="mt-8 rounded-xl border border-coral/50 bg-coral/10 p-4 text-[14px] leading-relaxed text-ice">
            Draft for review. This page describes how the website currently works and must be reviewed by a qualified
            adviser before publication.
          </p>
        )}
        <div className="prose-legal mt-10">{children}</div>
      </div>
    </article>
  );
}
