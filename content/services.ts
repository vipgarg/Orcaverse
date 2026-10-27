/**
 * The six service pillars. Draft copy from the architecture document:
 * every platform and capability must be confirmed by the client before launch.
 */

export type Accent = "cyan" | "violet" | "aqua" | "coral" | "ott" | "mint";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: "performance" | "programmatic" | "mobile" | "retail" | "ott" | "measurement";
  accent: Accent;
  /** One-line card copy */
  summary: string;
  /** Outcome-led headline */
  headline: string;
  /** 50–90 words */
  body: string;
  capabilities: string[];
  platforms: string[];
  problem: string;
  approach: { title: string; text: string }[];
  whoFor: string[];
  faqs: { q: string; a: string }[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    shortTitle: "Performance",
    icon: "performance",
    accent: "cyan",
    summary: "Paid media planning and optimisation across search and social, aligned to business goals.",
    headline: "Paid media that answers to the business, not the dashboard",
    body: "We plan, launch and optimise paid acquisition across search and social with one question in mind: what does this spend return to the business? Budgets, bids, audiences and creative are tuned against the commercial outcome you care about — revenue, qualified customers or efficient cost per acquisition — rather than clicks or impressions in isolation.",
    capabilities: [
      "Media planning and budget allocation",
      "Meta Ads and Google Ads management",
      "App campaigns (Google UAC)",
      "Audience and creative testing",
      "ROAS and CAC optimisation",
    ],
    platforms: ["Meta", "Google Ads", "Google App Campaigns"],
    problem:
      "Spend grows faster than results. Campaigns are optimised to platform metrics, and nobody can say with confidence which budget is actually producing customers.",
    approach: [
      { title: "Audit and baseline", text: "Review account structure, tracking and the numbers that matter to the business." },
      { title: "Restructure and launch", text: "Rebuild campaigns around clear objectives, audiences and testable creative." },
      { title: "Optimise to outcome", text: "Shift budget toward what produces customers, not what produces clicks." },
    ],
    whoFor: ["Brands scaling paid acquisition", "Teams moving from agency-of-record to performance focus", "Apps and D2C businesses"],
    faqs: [
      { q: "Which platforms do you manage?", a: "Search and social platforms including Meta and Google Ads, plus Google App Campaigns for app businesses." },
      { q: "Do you take over existing accounts?", a: "Yes. We usually start with an audit of the current setup before changing anything." },
      { q: "What do you optimise toward?", a: "The business outcome agreed at the start — for example cost per acquisition, ROAS or qualified leads." },
    ],
    metaDescription:
      "Performance marketing across Meta, Google and app campaigns, optimised toward ROAS, CAC and business outcomes.",
  },
  {
    slug: "programmatic-in-app",
    title: "Programmatic & In-App Advertising",
    shortTitle: "Programmatic",
    icon: "programmatic",
    accent: "violet",
    summary: "Reach relevant audiences across supported DSP and in-app advertising environments.",
    headline: "Audience-led buying across the open app ecosystem",
    body: "Beyond the walled gardens is a large, fragmented world of in-app inventory. We plan and run audience-led programmatic buying across supported DSPs, matching the right partner to the objective — reach, re-engagement or acquisition — and keeping inventory quality and downstream performance in view throughout.",
    capabilities: [
      "DSP selection and campaign management",
      "In-app and programmatic inventory buying",
      "Re-engagement and retargeting",
      "Inventory quality and placement review",
    ],
    platforms: ["Moloco", "Liftoff", "RZR", "AppLovin"],
    problem:
      "Growth on Meta and Google has plateaued, but programmatic feels opaque: too many partners, unclear quality, and results that are hard to compare.",
    approach: [
      { title: "Match partner to goal", text: "Choose DSPs and inventory based on the objective and audience, not habit." },
      { title: "Test with control", text: "Launch structured tests with clear measurement so partners can be compared fairly." },
      { title: "Scale what holds", text: "Grow spend where quality and downstream value hold up." },
    ],
    whoFor: ["App businesses beyond the first channels", "Gaming and fintech apps", "Brands seeking incremental reach"],
    faqs: [
      { q: "Which DSPs do you work with?", a: "Partners such as Moloco, Liftoff and RZR, selected per campaign objective." },
      { q: "Is programmatic only for large budgets?", a: "Not necessarily. We size tests to give a clear read before recommending scale." },
      { q: "How do you handle inventory quality?", a: "We review placements and downstream metrics, not only top-of-funnel volume." },
    ],
    metaDescription:
      "Programmatic and in-app advertising across supported DSPs, with audience-led buying and inventory quality in view.",
  },
  {
    slug: "mobile-user-acquisition",
    title: "Mobile User Acquisition",
    shortTitle: "Mobile UA",
    icon: "mobile",
    accent: "aqua",
    summary: "Build and optimise acquisition campaigns designed around user quality and downstream value.",
    headline: "Installs that turn into active, valuable users",
    body: "An install is the start of the story, not the end. We build app acquisition programmes around the users you actually want — the ones who register, transact, subscribe or play — and optimise campaigns, audiences and creative toward those downstream events across the channels that suit your app.",
    capabilities: [
      "Campaign setup across app channels",
      "Audience and creative testing",
      "Event-based optimisation",
      "Cohort and quality analysis",
    ],
    platforms: ["Google App Campaigns", "Meta", "Moloco", "Liftoff"],
    problem:
      "Install volume looks healthy, but too few users go on to register, transact or return — and cost per valuable user keeps rising.",
    approach: [
      { title: "Define the valuable user", text: "Agree which in-app events signal real value for your business." },
      { title: "Build for quality", text: "Structure campaigns and creative tests around those events." },
      { title: "Read cohorts, not totals", text: "Judge channels by how their users behave over time." },
    ],
    whoFor: ["Fintech apps", "Gaming and entertainment apps", "Consumer and commerce apps"],
    faqs: [
      { q: "Do you optimise for installs or events?", a: "We agree the meaningful in-app events up front and optimise toward them wherever the platform allows." },
      { q: "Do I need an MMP?", a: "An attribution partner makes cross-channel measurement far more reliable. We can help set one up." },
      { q: "Which app categories do you work with?", a: "Fintech, gaming and consumer apps are a natural fit; tell us about yours." },
    ],
    metaDescription:
      "Mobile user acquisition focused on user quality and downstream value, not install volume alone.",
  },
  {
    slug: "retail-quick-commerce-media",
    title: "Retail & Quick-Commerce Media",
    shortTitle: "Retail media",
    icon: "retail",
    accent: "coral",
    summary: "Connect product discovery and purchase intent across supported retail and quick-commerce media.",
    headline: "Be found at the moment shoppers are ready to buy",
    body: "Shoppers increasingly discover and buy inside marketplaces and quick-commerce apps. We run paid media that puts your products in front of that intent — sponsored listings, search and display placements — and connect it with the rest of your marketing so retail media contributes to growth rather than living in a silo.",
    capabilities: [
      "Amazon Ads management",
      "Quick-commerce ads (Swiggy, Zepto)",
      "Retail search and sponsored listings",
      "D2C and marketplace growth planning",
    ],
    platforms: ["Amazon Ads", "Swiggy", "Zepto"],
    problem:
      "Products get lost in crowded marketplaces, and retail media budgets are run separately from the rest of marketing with little sense of incremental impact.",
    approach: [
      { title: "Map the shelf", text: "Understand where your category is searched and bought on each platform." },
      { title: "Win the moments", text: "Prioritise the keywords, placements and products with the clearest intent." },
      { title: "Connect the channels", text: "Align retail media with paid social and search so efforts reinforce each other." },
    ],
    whoFor: ["D2C brands", "FMCG and consumer brands", "Brands selling on quick-commerce apps"],
    faqs: [
      { q: "Which retail platforms do you cover?", a: "Amazon Ads and quick-commerce platforms such as Swiggy and Zepto, subject to category availability." },
      { q: "Can you work alongside our marketplace team?", a: "Yes. We can focus on media while your team manages catalogue and operations." },
      { q: "How is success measured?", a: "Against agreed commerce metrics such as sales, ROAS and share of search where data is available." },
    ],
    metaDescription:
      "Retail and quick-commerce media across Amazon, Swiggy and Zepto, connecting discovery with purchase intent.",
  },
  {
    slug: "ott-connected-tv",
    title: "OTT & Connected TV",
    shortTitle: "OTT & CTV",
    icon: "ott",
    accent: "ott",
    summary: "Plan video-led reach across supported OTT/CTV inventory where suitable for the audience and objective.",
    headline: "Big-screen reach, planned with performance discipline",
    body: "Streaming has moved premium video to the living-room screen and the phone in your hand. We plan OTT and connected TV campaigns where they fit the audience and objective, choosing inventory deliberately and connecting video reach to the measurement and acquisition work happening elsewhere in your plan.",
    capabilities: [
      "OTT and CTV media planning",
      "Audience and inventory selection",
      "Video campaign management",
      "Reach and frequency planning",
    ],
    platforms: ["JioHotstar", "Other OTT/CTV platforms"],
    problem:
      "TV-scale reach feels out of reach or unaccountable, and video budgets are planned without a link to the rest of the funnel.",
    approach: [
      { title: "Check the fit", text: "Confirm OTT/CTV suits the audience, objective and creative available." },
      { title: "Plan the reach", text: "Select inventory and set reach and frequency goals deliberately." },
      { title: "Connect to the funnel", text: "Read video alongside search, app and site signals." },
    ],
    whoFor: ["Brands building awareness at scale", "Apps launching in new markets", "Consumer brands with video creative"],
    faqs: [
      { q: "Which OTT platforms can you buy?", a: "Platforms such as JioHotstar, and other OTT/CTV inventory where access is confirmed." },
      { q: "Do we need TV-style creative?", a: "Video creative suited to the big screen works best; we can advise on formats." },
      { q: "Is OTT measurable?", a: "Reach and completion are measurable; we also read its effect alongside other channel signals." },
    ],
    metaDescription:
      "OTT and connected TV advertising planned with performance discipline, from inventory selection to measurement.",
  },
  {
    slug: "measurement-optimisation",
    title: "Measurement & Conversion Optimisation",
    shortTitle: "Measurement",
    icon: "measurement",
    accent: "mint",
    summary: "Use attribution, conversion insights and performance analysis to guide smarter decisions.",
    headline: "Turn campaign signals into confident decisions",
    body: "Good decisions need trustworthy numbers. We help set up and read attribution, analyse the funnel from first touch to conversion, and find the changes — in media, landing pages or onboarding — that improve efficiency and conversion quality. The aim is simple: know what is working, and act on it faster.",
    capabilities: [
      "MMP attribution setup (e.g. AppsFlyer)",
      "Funnel and conversion analysis",
      "Conversion rate optimisation (CRO)",
      "ROAS and CAC analysis",
      "Reporting that supports decisions",
    ],
    platforms: ["AppsFlyer", "Other MMPs", "Platform reporting"],
    problem:
      "Every platform claims credit, reports disagree, and the team spends more time reconciling numbers than acting on them.",
    approach: [
      { title: "Fix the foundations", text: "Audit tracking and attribution so the numbers can be trusted." },
      { title: "Find the leaks", text: "Analyse the funnel to see where users and value drop away." },
      { title: "Test and improve", text: "Prioritise changes by impact and validate them with data." },
    ],
    whoFor: ["Teams with multi-channel spend", "Apps using or adopting an MMP", "Businesses with conversion drop-off"],
    faqs: [
      { q: "Do you set up attribution tools?", a: "Yes, including mobile measurement partners such as AppsFlyer, alongside web analytics." },
      { q: "What does reporting look like?", a: "Reporting focused on decisions and agreed metrics. Cadence is set at the start of an engagement." },
      { q: "Can you help with landing pages?", a: "We analyse conversion paths and recommend and test improvements." },
    ],
    metaDescription:
      "Measurement and conversion optimisation: attribution, funnel analysis, CRO and ROAS/CAC analysis.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** CSS colour for each accent (matches tokens in globals.css). */
export const accentVar: Record<Accent, string> = {
  cyan: "var(--color-cyan)",
  violet: "var(--color-violet)",
  aqua: "var(--color-aqua)",
  coral: "var(--color-coral)",
  ott: "var(--color-violet)",
  mint: "var(--color-mint)",
};
