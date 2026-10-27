/** Shared content blocks: platforms, approach, industries, principles, FAQ, proof. */

/** Only list platforms the agency genuinely works with (client to confirm). */
export const platforms = [
  "Meta",
  "Google",
  "Moloco",
  "Liftoff",
  "AppLovin",
  "Amazon Ads",
  "Swiggy",
  "Zepto",
  "JioHotstar",
  "RZR",
  "AppsFlyer",
];

export const approachSteps = [
  {
    n: "01",
    title: "Discover",
    short: "Discover the opportunity",
    text: "Understand the business goal, audience, current channels and what success should look like.",
    inputs: ["Business goals and constraints", "Current channel performance", "Tracking and data access"],
    does: ["Review accounts, funnel and measurement", "Identify gaps and quick wins", "Agree the metrics that matter"],
    receives: ["A clear baseline", "An agreed definition of success"],
  },
  {
    n: "02",
    title: "Plan",
    short: "Build the channel strategy",
    text: "Choose the channels, budgets, audiences and tests that best fit the objective.",
    inputs: ["The agreed baseline and goals", "Budget range", "Creative and product inputs"],
    does: ["Select channels and partners", "Allocate budget and set tests", "Define measurement for each channel"],
    receives: ["A channel plan with budget and tests", "A measurement plan"],
  },
  {
    n: "03",
    title: "Activate",
    short: "Activate campaigns",
    text: "Launch campaigns with structured tests so every channel teaches us something.",
    inputs: ["Approved plan", "Creative assets", "Platform access"],
    does: ["Build and launch campaigns", "Run audience and creative tests", "Monitor quality from day one"],
    receives: ["Live campaigns", "Early read-outs on what is working"],
  },
  {
    n: "04",
    title: "Measure & Optimise",
    short: "Measure, learn and optimise",
    text: "Read the results, move budget toward what works and keep improving.",
    inputs: ["Campaign and attribution data", "Business outcomes"],
    does: ["Analyse results by channel and cohort", "Reallocate budget", "Plan the next round of tests"],
    receives: ["Decision-focused reporting", "A rolling optimisation plan"],
  },
];

export const industries = [
  { title: "Fintech", text: "Acquisition built around verified, transacting users.", icon: "fintech" as const, accent: "var(--color-cyan)" },
  { title: "Gaming & Apps", text: "Players and users who stay, play and pay.", icon: "gaming" as const, accent: "var(--color-violet)" },
  { title: "D2C E-commerce", text: "Efficient growth across your site and marketplaces.", icon: "ecommerce" as const, accent: "var(--color-coral)" },
  { title: "Retail & Quick Commerce", text: "Visibility where shoppers search and buy.", icon: "retail" as const, accent: "var(--color-mint)" },
];

export const principles = [
  {
    title: "Connected-channel thinking",
    text: "Paid social, search, programmatic, app and retail media planned as one system, not separate silos.",
  },
  {
    title: "Quality over vanity volume",
    text: "We optimise for the users and customers who create value, not for the cheapest clicks or installs.",
  },
  {
    title: "Measurement-led optimisation",
    text: "Decisions follow the data. We set up measurement first, then test, learn and reallocate.",
  },
];

export const faqs = [
  {
    q: "What does OrcaVerse do?",
    a: "We are an omnichannel performance and programmatic growth agency. We plan and run paid media, programmatic and in-app advertising, mobile user acquisition, retail and quick-commerce media, OTT/CTV and measurement — as one coordinated plan.",
  },
  {
    q: "Which platforms do you work with?",
    a: "Our work spans platforms such as Meta, Google, Moloco, Liftoff, Amazon Ads, Swiggy, Zepto and JioHotstar. The right mix depends on your goals and audience.",
  },
  {
    q: "Who do you typically work with?",
    a: "App-led and commerce businesses — including fintech, gaming and consumer apps, D2C brands and brands selling through retail and quick-commerce platforms.",
  },
  {
    q: "How does an engagement start?",
    a: "With a conversation about your goals, followed by a review of your current channels and measurement. From there we agree a plan, launch, and optimise together.",
  },
  {
    q: "How do you measure success?",
    a: "Against the business outcomes we agree at the start — such as cost per acquisition, ROAS or quality of users — rather than platform metrics in isolation.",
  },
  {
    q: "What should I prepare for the first call?",
    a: "Your main growth goal, the channels you use today, a rough budget range, and anything that has or hasn't worked so far. A short brief is plenty.",
  },
];

/**
 * Proof section. Hidden unless site.flags.showProof is true AND entries exist.
 * Only add metrics, quotes and logos with written client permission.
 */
export const proof: {
  metrics: { value: number; suffix?: string; prefix?: string; label: string }[];
  quote: { text: string; name: string; role: string } | null;
} = {
  metrics: [],
  quote: null,
};

/**
 * Team members. Hidden unless site.flags.showTeam is true AND entries exist.
 */
export const team: { name: string; role: string; photo?: string; linkedin?: string }[] = [];
