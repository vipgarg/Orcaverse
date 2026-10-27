"use client";

import Script from "next/script";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import { site } from "@/content/site";
import { services, accentVar } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

const STEPS = ["Your goal", "Scope", "Your details"] as const;
const initial: EnquiryState = { status: "idle" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Errors = NonNullable<EnquiryState["fieldErrors"]> & { consent?: string };

export function EnquiryForm({ preselectedService }: { preselectedService?: string }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Server result
  useEffect(() => {
    if (state.status === "success") router.push("/contact/thank-you");
    if (state.status === "error") {
      setErrors(state.fieldErrors ?? {});
      const fe = state.fieldErrors ?? {};
      if (fe.goal) setStep(0);
      else if (Object.keys(fe).length) setStep(2);
      liveRef.current?.focus();
    }
  }, [state, router]);

  // Move focus to the step heading when the step changes (announces it)
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  const validateDetails = (): Errors => {
    const f = formRef.current!;
    const v = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "").trim();
    const e: Errors = {};
    if (!v("name")) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(v("email"))) e.email = "Please enter a valid business email address.";
    if (!v("company")) e.company = "Please enter your company or brand.";
    if (v("message").length < 10) e.message = "Please add a few words about your objective (10+ characters).";
    if (!(f.elements.namedItem("consent") as HTMLInputElement).checked) e.consent = "Please confirm we may contact you about your enquiry.";
    return e;
  };

  const next = () => {
    if (step === 0 && !goal) {
      setErrors({ goal: "Choose the goal that fits best." });
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  // Submit manually (not via the form's action prop) so React doesn't reset
  // the fields after a failed attempt.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      next();
      return;
    }
    const errs = validateDetails();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const firstKey = Object.keys(errs)[0];
      (formRef.current?.elements.namedItem(firstKey) as HTMLElement | null)?.focus();
      return;
    }
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };

  const serverMessage = state.status === "error" ? state.message : undefined;

  return (
    <div className="surface relative rounded-[var(--radius-panel)] p-6 shadow-2xl shadow-black/40 md:p-9">
      {turnstileKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-mono uppercase tracking-[0.12em] text-aqua">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-mist">{STEPS[step]}</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span key={s} className="h-1 overflow-hidden rounded-full bg-slate">
              <span
                className="block h-full rounded-full bg-cyan transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${i <= step ? 1 : 0})`, transformOrigin: "left" }}
              />
            </span>
          ))}
        </div>
      </div>

      <p
        ref={liveRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={serverMessage ? "mb-6 flex gap-3 rounded-xl border border-danger/50 bg-danger/10 p-4 text-[15px] text-ice outline-none" : "sr-only"}
      >
        {serverMessage && <Icon name="close" size={20} className="mt-0.5 shrink-0 text-danger" />}
        {serverMessage}
      </p>

      <form ref={formRef} onSubmit={onSubmit} noValidate>
        {/* Honeypot */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Leave this empty
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* Step 1: goal */}
        <fieldset hidden={step !== 0}>
          <legend>
            <h2 ref={step === 0 ? stepHeadingRef : undefined} tabIndex={-1} className="text-2xl font-semibold text-ice outline-none">
              What's your primary growth goal?
            </h2>
          </legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-describedby={errors.goal ? "goal-error" : undefined}>
            {site.growthGoals.map((g) => {
              const on = goal === g.value;
              return (
                <label
                  key={g.value}
                  className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cyan ${
                    on ? "border-cyan bg-cyan/10" : "border-slate bg-abyss/50 hover:border-[#2a3f5c]"
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={g.value}
                    checked={on}
                    onChange={() => {
                      setGoal(g.value);
                      setErrors({});
                    }}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${on ? "border-cyan bg-cyan text-abyss" : "border-mist/60"}`}
                  >
                    {on && <Icon name="check" size={14} strokeWidth={2.5} />}
                  </span>
                  <span>
                    <span className="block font-semibold text-ice">{g.label}</span>
                    <span className="mt-0.5 block text-[13.5px] text-mist">{g.hint}</span>
                  </span>
                </label>
              );
            })}
          </div>
          <FieldError id="goal-error" msg={errors.goal} />
        </fieldset>

        {/* Step 2: scope */}
        <fieldset hidden={step !== 1}>
          <legend>
            <h2 ref={step === 1 ? stepHeadingRef : undefined} tabIndex={-1} className="text-2xl font-semibold text-ice outline-none">
              Tell us a little about scope
            </h2>
          </legend>
          <p className="mt-2 text-[15px] text-mist">All optional — it helps us prepare a useful first conversation.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="budget" className="mb-2 block text-[14px] font-medium text-ice">
                Monthly media budget
              </label>
              <select id="budget" name="budget" className="field-input" defaultValue="">
                <option value="">Prefer not to say</option>
                {site.budgetBands.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="mb-2 block text-[14px] font-medium text-ice">
                Timeline
              </label>
              <select id="timeline" name="timeline" className="field-input" defaultValue="">
                <option value="">Select a timeline</option>
                {site.timelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <fieldset className="mt-6">
            <legend className="mb-3 text-[14px] font-medium text-ice">Services of interest</legend>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <label key={s.slug} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="interests"
                    value={s.slug}
                    defaultChecked={s.slug === preselectedService}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate bg-abyss/50 px-4 text-[14px] text-mist transition-colors peer-checked:border-cyan peer-checked:bg-cyan/10 peer-checked:text-ice peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan">
                    <span className="h-2 w-2 rounded-full" style={{ background: accentVar[s.accent] }} />
                    {s.shortTitle}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </fieldset>

        {/* Step 3: details */}
        <fieldset hidden={step !== 2}>
          <legend>
            <h2 ref={step === 2 ? stepHeadingRef : undefined} tabIndex={-1} className="text-2xl font-semibold text-ice outline-none">
              How can we reach you?
            </h2>
          </legend>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field name="name" label="Full name" autoComplete="name" required error={errors.name} />
            <Field name="email" label="Business email" type="email" autoComplete="email" required error={errors.email} />
            <Field name="company" label="Company / brand" autoComplete="organization" required error={errors.company} />
            <Field name="website" label="Website or app URL" autoComplete="url" placeholder="example.com" error={errors.website} />
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-[14px] font-medium text-ice">
                Brief message <span className="text-coral">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={`message-help${errors.message ? " message-error" : ""}`}
                className="field-input resize-y"
              />
              <p id="message-help" className="mt-2 text-[13px] text-mist">
                Your objective, the channels you use today and the main challenge.
              </p>
              <FieldError id="message-error" msg={errors.message} />
            </div>
          </div>
          <label className="mt-6 flex cursor-pointer gap-3 text-[14px] leading-relaxed text-mist">
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-cyan"
            />
            <span>
              I agree to OrcaVerse contacting me about this enquiry. See our{" "}
              <Link href="/privacy" className="text-aqua underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <FieldError id="consent-error" msg={errors.consent} />
          {turnstileKey && <div className="cf-turnstile mt-6" data-sitekey={turnstileKey} data-theme="dark" />}
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-secondary">
              Back
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="btn btn-primary">
              <span className="relative z-10">Continue</span>
              <Icon name="arrow" size={18} className="btn-arrow relative z-10" />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={pending} aria-disabled={pending}>
              <span className="relative z-10">{pending ? "Sending…" : "Send Enquiry"}</span>
              {!pending && <Icon name="arrow" size={18} className="btn-arrow relative z-10" />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
  autoComplete,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[14px] font-medium text-ice">
        {label} {required ? <span className="text-coral">*</span> : <span className="font-normal text-mist">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="field-input"
      />
      <FieldError id={`${name}-error`} msg={error} />
    </div>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[13.5px] text-[#ff8f9a]">
      <Icon name="close" size={14} className="shrink-0" />
      {msg}
    </p>
  );
}
