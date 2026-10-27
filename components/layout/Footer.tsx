import Link from "next/link";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Placeholder } from "@/components/ui/Placeholder";

export function Footer() {
  const { contact, social } = site;
  const socials = (
    [
      ["linkedin", social.linkedin, "LinkedIn"],
      ["instagram", social.instagram, "Instagram"],
      ["x", social.x, "X"],
    ] as [IconName, string | null, string][]
  ).filter(([, url]) => url);

  return (
    <footer id="site-footer" className="relative border-t border-slate bg-abyss">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">{site.positioning}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-aqua">{site.supportingLine}</p>
        </div>

        <FooterCol title="Pages" className="md:col-span-2">
          <li>
            <Link href="/" className="footer-link">
              Home
            </Link>
          </li>
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="footer-link">
                {n.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Services" className="md:col-span-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="footer-link">
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Get in touch" className="md:col-span-3">
          {contact.email ? (
            <li>
              <a href={`mailto:${contact.email}`} className="footer-link inline-flex items-center gap-2">
                <Icon name="mail" size={16} /> {contact.email}
              </a>
            </li>
          ) : (
            <li>
              <Placeholder label="email" />
            </li>
          )}
          {contact.phone && (
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="footer-link inline-flex items-center gap-2">
                <Icon name="phone" size={16} /> {contact.phone}
              </a>
            </li>
          )}
          {contact.city && (
            <li className="inline-flex items-center gap-2 text-[15px] text-mist">
              <Icon name="pin" size={16} /> {contact.city}
            </li>
          )}
          <li>
            <Link href="/contact" className="link-arrow mt-1 text-[15px]">
              Start a conversation <Icon name="arrow" size={16} />
            </Link>
          </li>
          {socials.length > 0 ? (
            <li className="flex gap-2 pt-2">
              {socials.map(([icon, url, label]) => (
                <a
                  key={icon}
                  href={url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate text-mist transition-colors hover:border-aqua hover:text-ice"
                >
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </li>
          ) : (
            <li>
              <Placeholder label="social links" />
            </li>
          )}
        </FooterCol>
      </div>

      <div className="border-t border-slate">
        <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName ?? site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="footer-link text-[13px]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="footer-link text-[13px]">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="footer-link text-[13px]">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-mist">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}
