import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "OrcaVerse | Performance & Programmatic Growth", template: "%s | OrcaVerse" },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#080D16",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Opt into scroll-reveal styles only when JS runs. If the app fails to
          hydrate within 3s (blocked script, Rocket Loader, network error), drop
          the class so sections that would have animated in stay visible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3000)})(document.documentElement)",
          }}
        />
      </head>
      <body>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCta />
        <RevealObserver />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: site.name,
            url: site.url,
            description: site.description,
            slogan: site.tagline,
            ...(site.contact.email ? { email: site.contact.email } : {}),
            ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
            ...(site.legalName ? { legalName: site.legalName } : {}),
            sameAs: Object.values(site.social).filter(Boolean),
          }}
        />
      </body>
    </html>
  );
}
