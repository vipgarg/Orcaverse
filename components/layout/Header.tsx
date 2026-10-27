"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { services, accentVar } from "@/content/services";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes; click outside closes the mega-menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawerOpen) {
        setDrawerOpen(false);
        menuBtnRef.current?.focus();
      }
      setMegaOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [drawerOpen]);

  // Lock scroll and trap focus inside the drawer
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const root = drawerRef.current;
    const focusables = root?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trap);
    };
  }, [drawerOpen]);

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || megaOpen || drawerOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[240ms] ${
          solid ? "border-b border-slate/80 bg-abyss/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-abyss"
        >
          Skip to content
        </a>
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="OrcaVerse home" className="shrink-0 rounded-md">
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li ref={megaRef} className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                <div className="flex items-center">
                  <Link
                    href="/services"
                    className={`nav-link rounded-full py-2 pl-4 pr-1 text-[15px] font-medium transition-colors duration-150 ${
                      isActive("/services") ? "text-ice" : "text-mist hover:text-ice"
                    }`}
                    aria-current={isActive("/services") ? "page" : undefined}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    className="rounded-full p-2 text-mist transition-colors hover:text-ice"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    aria-label="Show all services"
                    onClick={() => setMegaOpen((o) => !o)}
                  >
                    <Icon
                      name="chevronDown"
                      size={16}
                      className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                {isActive("/services") && <ActiveDot />}

                {/* Mega-menu */}
                <div
                  id="mega-menu"
                  className={`absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 ${
                    megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="surface rounded-[var(--radius-panel)] p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
                    <ul className="grid grid-cols-2 gap-1">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-slate/60 focus-visible:bg-slate/60"
                          >
                            <span
                              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                              style={{ background: accentVar[s.accent], boxShadow: `0 0 12px ${accentVar[s.accent]}` }}
                            />
                            <span>
                              <span className="block text-[15px] font-semibold text-ice">{s.title}</span>
                              <span className="mt-0.5 block text-[13px] leading-snug text-mist">{s.summary}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-abyss/60 px-4 py-3">
                      <span className="text-sm text-mist">Not sure where to start?</span>
                      <Link href="/services" className="link-arrow text-sm">
                        Compare all services <Icon name="arrow" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              {nav.slice(1).map((item) => (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-150 ${
                      isActive(item.href) ? "text-ice" : "text-mist hover:text-ice"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {isActive(item.href) && <ActiveDot />}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={site.primaryCta.href} className="btn btn-primary btn-sm hidden sm:inline-flex">
              <span className="relative z-10">{site.primaryCta.label}</span>
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate text-ice lg:hidden"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              onClick={() => setDrawerOpen((o) => !o)}
            >
              <Icon name={drawerOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>

      </header>
      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-abyss transition-[opacity,visibility] duration-200 lg:hidden ${
          drawerOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-8 pt-6">
          <ul className="flex flex-col">
            <li>
              <Link href="/" className="block border-b border-slate py-4 font-display text-2xl font-semibold">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block border-b border-slate py-4 font-display text-2xl font-semibold ${
                    isActive(item.href) ? "text-cyan" : "text-ice"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
                {item.href === "/services" && (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-slate py-3">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="flex items-center gap-2 py-2 text-[15px] text-mist">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accentVar[s.accent] }} />
                          {s.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link href={site.primaryCta.href} className="btn btn-primary w-full">
              <span className="relative z-10">{site.primaryCta.label}</span>
              <Icon name="arrow" size={18} className="btn-arrow relative z-10" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

function ActiveDot() {
  return (
    <span
      aria-hidden="true"
      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]"
    />
  );
}
