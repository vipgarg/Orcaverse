"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { services } from "@/content/services";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "company" | "message" | "goal" | "website", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, email: 200, company: 160, website: 300, message: 4000 };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured; honeypot still applies
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: bots fill hidden fields. Pretend success so they move on.
  if (clean(formData.get("company_website"), 10)) return { status: "success" };

  const data = {
    goal: clean(formData.get("goal"), 60),
    budget: clean(formData.get("budget"), 60),
    timeline: clean(formData.get("timeline"), 60),
    interests: formData.getAll("interests").map((v) => clean(v, 80)).filter(Boolean),
    name: clean(formData.get("name"), MAX.name),
    email: clean(formData.get("email"), MAX.email),
    company: clean(formData.get("company"), MAX.company),
    website: clean(formData.get("website"), MAX.website),
    message: clean(formData.get("message"), MAX.message),
    consent: formData.get("consent") === "on",
  };

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  const goalLabel = site.growthGoals.find((g) => g.value === data.goal)?.label;
  if (!goalLabel) fieldErrors.goal = "Choose the goal that fits best.";
  if (!data.name) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) fieldErrors.email = "Please enter a valid business email address.";
  if (!data.company) fieldErrors.company = "Please enter your company or brand.";
  if (data.message.length < 10) fieldErrors.message = "Please add a few words about your objective (10+ characters).";
  if (data.website && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(data.website))
    fieldErrors.website = "That doesn't look like a valid URL.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }
  if (!data.consent) {
    return { status: "error", message: "Please confirm you agree to us contacting you about your enquiry." };
  }

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!(await verifyTurnstile(clean(formData.get("cf-turnstile-response"), 4000), ip))) {
    return { status: "error", message: "We couldn't verify you're human. Please try again." };
  }

  const interestLabels = data.interests.map((s) => services.find((x) => x.slug === s)?.title ?? s);
  const lines: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Website / app", data.website || "—"],
    ["Primary goal", goalLabel!],
    ["Budget", data.budget || "—"],
    ["Timeline", data.timeline || "—"],
    ["Services of interest", interestLabels.join(", ") || "—"],
    ["Message", data.message],
  ];

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const webhook = process.env.FORM_WEBHOOK_URL;

  if (!(resendKey && to && from) && !webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] Delivery not configured; logging instead:\n" + lines.map(([k, v]) => `${k}: ${v}`).join("\n"));
      return { status: "success" };
    }
    const missing = Object.entries({ RESEND_API_KEY: resendKey, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from })
      .filter(([, v]) => !v)
      .map(([k]) => k);
    console.error(`[enquiry] No delivery configured. Missing: ${missing.join(", ")} (or set FORM_WEBHOOK_URL).`);
    return { status: "error", message: "Sorry, our enquiry form isn't available right now. Please try again later." };
  }

  try {
    const jobs: Promise<Response>[] = [];
    if (resendKey && to && from) {
      jobs.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to: to.split(",").map((s) => s.trim()),
            reply_to: data.email,
            subject: `New enquiry: ${data.company} — ${goalLabel}`,
            text: lines.map(([k, v]) => `${k}: ${v}`).join("\n"),
            html: `<table cellpadding="6">${lines
              .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
              .join("")}</table>`,
          }),
        }),
      );
    }
    if (webhook) {
      jobs.push(
        fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, goal: goalLabel, interests: interestLabels, submittedAt: new Date().toISOString() }),
        }),
      );
    }
    const results = await Promise.all(jobs);
    const failed = results.filter((r) => !r.ok);
    if (failed.length) {
      // Include the provider's reason (e.g. Resend "domain is not verified") in the Worker logs
      const reasons = await Promise.all(failed.map(async (r) => `${r.url} ${r.status}: ${(await r.text()).slice(0, 300)}`));
      throw new Error(`Delivery failed — ${reasons.join(" | ")}`);
    }
    console.info(`[enquiry] Delivered enquiry from ${data.company}`);
    return { status: "success" };
  } catch (err) {
    console.error("[enquiry]", err);
    return {
      status: "error",
      message: site.contact.email
        ? `Sorry, something went wrong sending your enquiry. Please try again or email us at ${site.contact.email}.`
        : "Sorry, something went wrong sending your enquiry. Please try again.",
    };
  }
}
