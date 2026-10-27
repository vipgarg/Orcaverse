import { pageMeta } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Cookie Policy | OrcaVerse",
  description: "How the OrcaVerse website uses cookies and similar technologies.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="To be confirmed at launch">
      <p>This website does not currently set analytics, advertising or tracking cookies.</p>
      <h2>Strictly necessary technologies</h2>
      <p>
        Our hosting provider and, if enabled, our spam-protection service may use strictly necessary technologies to deliver
        the website securely and to protect our contact form from abuse.
      </p>
      <h2>If this changes</h2>
      <p>
        If we add analytics or other non-essential cookies in future, we will update this page and ask for your consent where
        required.
      </p>
    </LegalPage>
  );
}
