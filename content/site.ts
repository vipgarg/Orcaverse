/**
 * Site-wide settings and content gates.
 *
 * Everything the client still has to confirm lives here. A `null` value is
 * never rendered in production; in development a dashed placeholder shows
 * where it will appear (see components/ui/Placeholder.tsx).
 */

export const site = {
  name: "OrcaVerse",
  tagline: "Dominating Every Screen, App & Algorithm",
  supportingLine: "Acquire Smarter. Scale Further.",
  slogan: "You name it, we have it.",
  /** Words that rotate inside the hero slogan. Keep to services the agency offers. */
  sloganWords: ["Meta Ads", "Google Ads", "Programmatic", "Mobile UA", "Quick Commerce", "OTT & CTV", "Attribution"],
  description:
    "OrcaVerse connects performance marketing, programmatic advertising, app growth, commerce media and measurement to support accountable digital growth.",
  positioning:
    "One coordinated growth partner across paid media, programmatic, app acquisition, retail media and measurement.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  primaryCta: { label: "Discuss Your Growth Goals", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },

  /** Client to confirm. Leave null to hide. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    /** Full international number without + or spaces, e.g. 919800000000 */
    whatsapp: null as string | null,
    city: null as string | null,
    /** Cal.com / Calendly booking URL */
    bookingUrl: null as string | null,
    /** Expected reply time, only if the client commits to it */
    responseTime: null as string | null,
  },

  /** Client to confirm. Leave null to hide. */
  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
    x: null as string | null,
  },

  /** Registered business name for the footer and legal pages. */
  legalName: null as string | null,

  /**
   * Content gates. A gated section renders only when its flag is true AND
   * its data exists. Do not switch these on without written client approval.
   */
  flags: {
    showPlatformStrip: true,
    showPlatformLogos: false,
    showProof: false,
    showTeam: false,
    showWhatsApp: false,
    /** Set true once Privacy, Terms and Cookies have had legal review. */
    legalReviewed: false,
  },

  /** Budget bands offered in the enquiry form (optional field). */
  budgetBands: [
    "Not sure yet",
    "Under ₹5 lakh / month",
    "₹5–20 lakh / month",
    "₹20–50 lakh / month",
    "₹50 lakh+ / month",
  ],

  timelines: ["As soon as possible", "Within 1–3 months", "3+ months", "Just exploring"],

  growthGoals: [
    { value: "app-installs", label: "App installs", hint: "Grow quality installs and in-app actions" },
    { value: "customer-acquisition", label: "Customer acquisition", hint: "Win new customers efficiently" },
    { value: "ecommerce-sales", label: "E-commerce sales", hint: "Drive orders across D2C and marketplaces" },
    { value: "roas-cac", label: "ROAS / CAC improvement", hint: "Make existing spend work harder" },
    { value: "brand-reach", label: "Brand reach", hint: "Reach the right audiences at scale" },
    { value: "other", label: "Something else", hint: "Tell us in your own words" },
  ],
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
