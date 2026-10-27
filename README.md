# OrcaVerse website

**Live:** https://orcaverse.orcaverse-admin.workers.dev

Marketing site for OrcaVerse, built from the *OrcaVerse Premium Website Architecture* document.

**Stack:** Next.js 15 (App Router, static generation) on Cloudflare Workers · TypeScript · Tailwind CSS v4 · self-hosted fonts (Fontsource). No animation libraries: motion is CSS plus a small 2D-canvas particle hero.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck
npm run preview    # build and run in the Cloudflare Workers runtime locally
```

Copy `.env.example` to `.env.local` and fill in values when deploying.

## Pages

| Route | Notes |
| --- | --- |
| `/` | Hero with particle orca pod, platform marquee, positioning, service bento, approach, industries, principles, proof (gated), FAQ, CTA |
| `/services` | Orbit hero, sticky pillar nav, six pillar sections, platform matrix, engagement model, FAQ |
| `/services/[slug]` | One page per pillar (6), with Service + Breadcrumb JSON-LD |
| `/approach` | Four stages with pinned labels and detail panels |
| `/about` | Story, the orca-pod metaphor, principles, team (gated) |
| `/contact` | 3-step enquiry form; `?service=<slug>` preselects a service |
| `/contact/thank-you` | Confirmation with sonar animation (noindex) |
| `/privacy`, `/terms`, `/cookies` | Draft policies, flagged until legal review |
| 404 | "Lost at sea" |

`sitemap.xml`, `robots.txt`, the favicon and the Open Graph image are generated from `app/`.

## Deploying to Cloudflare (GitHub-connected)

The site runs on **Cloudflare Workers** through the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare). The config is in `wrangler.jsonc` and `open-next.config.ts`. Prerendered pages are served from the Worker's static assets, so no KV or R2 storage is needed.

### One-time setup

1. In the Cloudflare dashboard go to **Workers & Pages → Create application → Import a repository**, connect GitHub and pick `vipgarg/Orcaverse`.
2. Use these settings:

   | Setting | Value |
   | --- | --- |
   | Project / Worker name | `orcaverse` (must match `name` in `wrangler.jsonc`) |
   | Production branch | `main` (merge this branch first, or pick the branch you deploy from) |
   | Build command | `npx opennextjs-cloudflare build` |
   | Deploy command | `npx opennextjs-cloudflare deploy` |
   | Non-production branch deploy command | `npx opennextjs-cloudflare upload` |
   | Root directory | `/` |

3. Under the build settings' **Variables**, add the build-time values. They are baked into the page at build time:
   - `NEXT_PUBLIC_SITE_URL`: your live URL, e.g. `https://www.yourdomain.com`. If unset, the workers.dev URL from `.env.production` is used.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: only if you use Turnstile
4. Click **Save and Deploy**. The first build takes a few minutes, then the site is live at `https://orcaverse.<your-subdomain>.workers.dev`.

### After the first deploy

- **Form delivery:** in the Worker's **Settings → Variables and Secrets**, add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (and/or `FORM_WEBHOOK_URL`, `TURNSTILE_SECRET_KEY`) as **secrets**. Until then the live form shows an honest "not available" message.
- **Custom domain:** in **Settings → Domains & Routes → Add → Custom domain**, enter your domain. It must be on Cloudflare DNS; SSL is automatic. Then update `NEXT_PUBLIC_SITE_URL` and redeploy.
- **Every push** to the production branch redeploys. Pushes to other branches create preview versions.

### Deploying from your own machine (optional)

```bash
npx wrangler login
npm run deploy
```

For local secrets with `npm run preview`, copy `.dev.vars.example` to `.dev.vars`.

## Where to edit content

| What | File |
| --- | --- |
| Contact details, socials, legal name, CTAs, form options, **content gates** | `content/site.ts` |
| Six service pillars (copy, capabilities, platforms, FAQs) | `content/services.ts` |
| Platforms, approach steps, industries, principles, home FAQ, proof metrics, team | `content/home.ts` |
| Colours, type, motion tokens | `app/globals.css` (`@theme` and `:root`) |
| Logo (placeholder) | `components/ui/Logo.tsx`, `app/icon.svg` |

### Content gates

Anything the client must approve stays hidden until it is supplied and switched on in `site.flags`:

- `showProof`: metric tiles and testimonial (also needs data in `content/home.ts`)
- `showTeam`: team cards on About
- `showWhatsApp`: WhatsApp link on Contact (needs `contact.whatsapp`)
- `showPlatformStrip` / `showPlatformLogos`: platform marquee (text labels only for now)
- `legalReviewed`: removes the "Draft for review" notice on policy pages

Contact fields set to `null` are never rendered in production. In development a dashed **"Client to confirm"** marker shows where each one will appear.

## Contact form delivery

The form posts to a server action (`app/contact/actions.ts`) with server-side validation, a honeypot field and optional Cloudflare Turnstile.

- **Email:** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (sends through Resend).
- **CRM / automation:** set `FORM_WEBHOOK_URL` to receive each enquiry as JSON.
- **Spam protection:** set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.

With nothing configured, development logs the enquiry to the console and shows success. Production shows an honest error instead of pretending the message was sent.

## Before launch: client to confirm

- [ ] Platforms OrcaVerse actively works with (`content/home.ts`, `content/services.ts`); logo usage rights
- [ ] Contact email, phone, city, booking link, social links, registered business name
- [ ] Budget bands and currency in the form (`site.budgetBands`)
- [ ] All draft copy, the service pillars and FAQ answers
- [ ] Brand logo (current mark is a placeholder) and display font (Space Grotesk stands in for Clash Display or Satoshi)
- [ ] Privacy, Terms and Cookies reviewed by an adviser, then `legalReviewed: true`
- [ ] Production `NEXT_PUBLIC_SITE_URL` (build variable) and form delivery secrets in Cloudflare
- [ ] Analytics: none installed. Add only with approval and a consent setup.

## Accessibility and motion

- Skip link, visible cyan focus rings, keyboard-operable mega-menu and mobile drawer (Escape closes, focus trapped)
- Form errors are announced and shown with text, not colour alone
- `prefers-reduced-motion` turns off the particle canvas, marquee, parallax-style drift and reveal offsets
- The particle hero loads only on screens 768px and wider, after the page is idle; a static SVG pod renders first and on mobile
