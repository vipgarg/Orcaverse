"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Sticky bottom CTA on small screens after 40% scroll; hidden near the footer and on Contact. */
export function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let footerVisible = false;
    const footer = document.getElementById("site-footer");
    const io = footer
      ? new IntersectionObserver(([e]) => {
          footerVisible = e.isIntersecting;
          update();
        })
      : null;
    if (footer) io?.observe(footer);

    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setShow(progress > 0.4 && !footerVisible);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      io?.disconnect();
    };
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate bg-abyss/90 p-3 backdrop-blur-xl transition-transform duration-[240ms] sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <Link href={site.primaryCta.href} className="btn btn-primary w-full" tabIndex={show ? 0 : -1}>
        <span className="relative z-10">{site.primaryCta.label}</span>
        <Icon name="arrow" size={18} className="btn-arrow relative z-10" />
      </Link>
    </div>
  );
}
