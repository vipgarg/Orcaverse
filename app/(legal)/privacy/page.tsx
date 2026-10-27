import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Privacy Policy | OrcaVerse",
  description: "How OrcaVerse collects and uses personal information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const who = site.legalName ?? site.name;
  return (
    <LegalPage title="Privacy Policy" updated="To be confirmed at launch">
      <p>
        This policy explains how {who} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information submitted through this
        website.
      </p>
      <h2>Information we collect</h2>
      <p>When you send an enquiry through our contact form, we collect the details you choose to provide:</p>
      <ul>
        <li>Your name, business email address and company or brand name</li>
        <li>Your website or app URL, if provided</li>
        <li>Your growth goal, budget range, timeline and services of interest, if provided</li>
        <li>The message you write to us</li>
      </ul>
      <p>
        Our hosting provider may also process standard technical information (such as IP address and browser type) to deliver
        and secure the website.
      </p>
      <h2>How we use it</h2>
      <p>
        We use your enquiry details only to respond to you and to discuss a potential engagement. We do not sell your
        information.
      </p>
      <h2>Who processes it</h2>
      <p>
        Enquiries are delivered to our team using a third-party email delivery service, and the website is hosted by a
        third-party hosting provider. These providers process data on our behalf.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This website does not currently use analytics or advertising cookies. See our <a href="/cookies">Cookie Policy</a> for
        details.
      </p>
      <h2>How long we keep it</h2>
      <p>We keep enquiry information only as long as needed to respond and to manage any resulting business relationship.</p>
      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct or delete the personal information you have shared with us
        {site.contact.email ? (
          <>
            {" "}
            by emailing <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </>
        ) : null}
        .
      </p>
    </LegalPage>
  );
}
