import { Fragment } from "react";

/**
 * Word-by-word headline reveal. Pure CSS: the words are in the HTML from the
 * first byte and animate in on load, so text never waits for JavaScript.
 */
export function SplitText({ text, accent }: { text: string; accent?: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="split-word" style={{ ["--i" as string]: i }}>
              <span className={accent && w.replace(/[^\w&]/g, "") === accent ? "text-gradient" : undefined}>{w}</span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </>
  );
}
