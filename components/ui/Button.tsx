import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "primary", size = "md", arrow = true, className = "", external }: Props) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && <Icon name="arrow" size={18} className="btn-arrow relative z-10" />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
