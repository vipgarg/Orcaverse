import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Terms of Use | OrcaVerse",
  description: "Terms governing use of the OrcaVerse website.",
  path: "/terms",
});

export default function TermsPage() {
  const who = site.legalName ?? site.name;
  return (
    <LegalPage title="Terms of Use" updated="To be confirmed at launch">
      <p>These terms govern your use of this website, operated by {who}. By using the website you agree to them.</p>
      <h2>Website content</h2>
      <p>
        The content on this website is provided for general information about our services. It is not an offer or a guarantee
        of any particular result. Any engagement is governed by a separate written agreement.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The website design, text and graphics belong to {who} unless stated otherwise. Third-party names and trademarks belong
        to their respective owners; their mention does not imply endorsement or partnership.
      </p>
      <h2>Acceptable use</h2>
      <p>Please do not misuse the website, including by attempting to disrupt it or submitting false or malicious content.</p>
      <h2>Liability</h2>
      <p>We work to keep the website accurate and available but cannot guarantee it will always be error-free or uninterrupted.</p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top of this page shows when they last changed.</p>
    </LegalPage>
  );
}
