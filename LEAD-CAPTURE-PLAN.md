# Lead capture architecture plan

Proposal for handling `CtaSection` form submissions (Name, Email, Phone, Company, Solution Interest, About Your Event) and the notification emails they trigger.

Status: proposal, awaiting sign-off. No code written yet.

---

## 0. Recommendation in one paragraph

Use a **Next.js Server Action** as the submission handler, **Zod** for validation on both sides, **Resend** as the transactional provider, and send **no data to any database**. Two emails go out per submission: an internal lead notification to the idexi team with `Reply-To` set to the prospect, and an optional confirmation to the prospect. Protect the endpoint with a honeypot, a submit-timing check, in-process rate limiting, and Cloudflare Turnstile. Send from a dedicated subdomain (`mail.idexi.ai`) with SPF, DKIM, and a DMARC policy that starts at `p=none` and ratchets up after two to four weeks of monitoring.

The deliberate omissions matter as much as the picks: no database, no React Hook Form, no dedicated IP, no queue. Reasoning for each is below.

---

## 1. Three findings from the codebase that shape this plan

### 1.1 The form is currently discarding every lead, silently

`src/components/CtaSection.tsx` line 17:

```
function handleSubmit(event) {
  event.preventDefault();
  setSubmitted(true);   // no network call anywhere
}
```

The visitor then sees "Thanks, we'll be in touch." Nothing is sent, stored, or logged. If this page is reachable in production today, every inbound lead is being lost while the prospect believes they have made contact and is waiting for a reply.

For a pre-launch, demo-led business where PRODUCT.md states "every path funnels to a sales conversation," this is the highest-severity item in this document. It outranks every architectural preference below. If a fast interim fix is wanted, changing the button to a `mailto:` link pointed at `hello@idexi.ai` is a thirty-minute change that stops the bleeding while the real implementation is built.

### 1.2 You deploy as a Docker container, not on Vercel

`next.config.ts` sets `output: "standalone"` and there is a multi-stage `Dockerfile` producing a long-lived Node process. Consequences that rule out common advice:

- No Vercel WAF, no Vercel bot filtering, no platform-level rate limiting. Anything protective has to be built into the app.
- Secrets come from container runtime environment, not a Vercel dashboard.
- The process is long-lived, so in-memory rate limiting actually works, unlike on serverless where every invocation is cold. This is a genuine advantage of your setup.
- Gotcha: `NEXT_PUBLIC_*` variables are inlined at **build** time, not run time. A Turnstile site key passed only via `docker run -e` will be `undefined` in the browser bundle. It has to be a build argument in the Dockerfile. This is easy to miss and produces a confusing silent failure.

### 1.3 There is no idexi Supabase project

The only project on the connected Supabase account is "Investment & Debt Management," unrelated to this codebase. Supabase for idexi would be net-new infrastructure, not the reuse of something already running. This matters for the database question in section 3.

---

## 2. Provider: Resend, with a documented trigger to move to Postmark

### The two email flows have different risk profiles

Worth separating, because most comparisons treat "deliverability" as one number:

| Flow | Recipient | Deliverability risk |
|---|---|---|
| Lead notification | idexi's own inbox | Low. You control the receiving side and can allowlist the sender. |
| Prospect confirmation | A cold external address | Higher. Subject to the recipient's spam filtering with no prior engagement history. |

The business-critical email is the first one, and it is the easy case. That lowers the stakes on the provider choice considerably.

### The comparison

| | Resend | Postmark | SendGrid |
|---|---|---|---|
| Free tier | 3,000/mo | 100/mo (trial only) | ~100/day |
| Paid entry | $20/mo, 50k | $15/mo, 10k | ~$20/mo, 50k |
| Deliverability | Good; shared pools mix transactional and marketing | Best in class; refuses marketing senders on transactional infra | Variable; large mixed pools |
| Next.js DX | Best. React Email is built by the same team | Good, conventional SDK | Dated SDK, heavier |

### Recommendation: Resend

At your expected volume (tens of leads per month pre-launch), Resend's free tier covers you entirely while Postmark's 100/month trial does not, and Resend's React Email integration means the notification template is a React component living in the same repo with the same typing and tooling as everything else.

Postmark is genuinely better on deliverability, and I want to be straightforward that this is a real tradeoff rather than pretending the pick is free. The reason it does not decide the matter here: the email that must not fail is the one going to your own inbox, where you control receipt.

**Write the send behind a small internal module** (something like `src/lib/email.ts` exposing `sendLeadNotification()`). Both providers are a single HTTPS POST underneath, so with that seam in place, switching is an afternoon rather than a refactor.

**Move to Postmark when** any of these become true: you begin sending prospect-facing confirmations at meaningful volume, you observe inbox placement problems in DMARC or provider analytics, or transactional email becomes load-bearing for the product itself (ticket delivery for idexi Pass, gallery links for idexi Face). That last one is worth flagging: **when idexi Pass and idexi Face ship, they will send high-volume, business-critical mail to attendees.** That is a materially different problem from a contact form, it is the case Postmark is built for, and it deserves its own evaluation rather than inheriting whatever the contact form happened to use.

---

## 3. Architecture: Server Action, and explicitly no database

### Server Action over Route Handler

Use a Server Action. Reasoning:

- It is a mutation triggered from inside your own app, which is precisely the case Server Actions are designed for. A Route Handler is the right tool when you need an HTTP surface for external callers such as webhooks or a mobile client, and you have neither.
- End-to-end typing with no manually maintained request/response contract.
- `useActionState` gives you pending and error states natively, which the current form lacks entirely.
- Progressive enhancement: with `<form action={...}>` the form still submits if the JS bundle fails to load.

**One security point worth being precise about, because it is widely misunderstood.** A Server Action is not a private function. Every `"use server"` export compiles to a publicly callable HTTP POST endpoint that anyone can hit with curl. Next.js adds same-origin checks and encrypted action IDs, which stop casual cross-site abuse, but for an unauthenticated public form the practical security posture is identical to a Route Handler. Choosing a Server Action buys ergonomics, not protection. Every guard in section 5 is still mandatory.

### No database, and this is a compliance argument, not a complexity one

You asked whether a database trigger or Supabase Edge Function should process this. My recommendation is no, and the primary reason is not over-engineering.

PRODUCT.md carries this hard constraint:

> Privacy Policy and Terms of Service are not yet drafted or attorney-reviewed. Until they are, no surface may state specific data-retention periods, deletion/non-retention guarantees, compliance certifications (GDPR, BIPA, or similar), data-processing-location claims, or legal-basis/consent/data-subject-rights claims.

This form collects name, email, phone, company, and free-text event details. That is personal data. **Standing up a database turns idexi into the operator of a PII datastore**, which brings retention policy obligations, data subject access and deletion request handling, and breach notification duties. You would be taking on all of that while your own product documentation says you cannot yet make retention or rights claims. The infrastructure would be committing you to something the legal record is not ready to support.

Relaying through email avoids creating that new datastore. The data transits the provider (short-lived logs under their processor terms) and lands in a mailbox your team already operates as an ordinary business record. That is a materially smaller obligation surface.

Add persistence when there is a real reason: a CRM integration, lead attribution reporting, or a sales pipeline that outgrows an inbox. By then the privacy policy should exist and can describe the storage accurately. Doing it in that order is much easier than retrofitting disclosure onto data you already collected.

### Secrets

`RESEND_API_KEY` is read server-side only, inside the Server Action. It is never prefixed `NEXT_PUBLIC_`, so it is never bundled. Supply it as a container runtime variable through your platform's secret mechanism. Verified already in place: `.gitignore` line 34 covers `.env*`, so local secrets will not be committed by accident.

---

## 4. Deliverability and domain health

Assuming the sending domain is `idexi.ai`, consistent with the `hello@idexi.ai` address already published on the FAQ page.

### Send from a subdomain

Send as `noreply@mail.idexi.ai` rather than from the root domain. Reputation is tracked per sending domain, so isolating automated mail on a subdomain means a future deliverability incident cannot damage the root domain your team uses for human correspondence. This is cheap now and awkward to retrofit later.

### DNS records

1. **SPF.** A TXT record on the sending subdomain containing the provider's `include:` mechanism. One SPF record per domain, no exceptions; two records is a permanent error that fails the check outright.
2. **DKIM.** The CNAME or TXT keys the provider issues during domain verification. Use 2048-bit if offered.
3. **DMARC.** A TXT record at `_dmarc.idexi.ai`. Start at `p=none` with a `rua=` reporting address. This is monitor-only and changes no delivery behavior, which is exactly what you want at first.

### DMARC rollout

Deploy at `p=none`, then read the aggregate reports for two to four weeks to confirm that everything legitimately sending as idexi (this app, Google Workspace or whatever hosts your mail, any future CRM) is passing alignment. Then move to `p=quarantine`, and to `p=reject` once the reports are clean. Skipping the monitoring period is the standard way teams silently break their own mail.

### Two mistakes to avoid explicitly

- **Do not set `From:` to the prospect's address** on the internal notification, however convenient it looks in the inbox. You are not authorized to send as their domain, so it fails SPF and DMARC and trains filters against you. Set `From:` to your own sending address and put the prospect in **`Reply-To`**. Your team still just hits reply, and alignment stays intact.
- **Do not request a dedicated IP.** This is the part of the question where the honest answer contradicts the usual advice. Dedicated IPs need sustained volume, on the order of thousands of messages per day, to establish reputation. At tens of messages per month a dedicated IP stays permanently unwarmed and will deliver *worse* than the provider's shared pool, which carries the aggregate good reputation of all its senders. Take the shared pool. Similarly, **formal sender warm-up is not applicable at your volume**; your natural sending pattern is already below any rate that would trip throttling. Revisit both if attendee-facing mail from Pass or Face arrives.

---

## 5. Validation and spam protection

### Zod on the server, HTML5 on the client, and probably not React Hook Form

**Zod is non-negotiable server-side.** Define one schema, parse the payload inside the Server Action before anything else, and treat client-side validation as a UX affordance with zero trust value. Anyone can post arbitrary JSON directly to the action.

On the client, I want to push back gently on the Zod + React Hook Form default. RHF is a good library, but this codebase is deliberately dependency-light: no CSS framework, hand-rolled `<style>` blocks, four runtime dependencies total. Adding a form library plus a resolver adapter for a **single six-field form** does not clear that bar. Native HTML5 constraints (`required`, `type="email"`, `type="tel"`) already give instant inline feedback with no bundle cost, and `useActionState` returns server-side field errors for display.

Reach for React Hook Form when a second or third non-trivial form appears, or when you need multi-step state or complex cross-field conditionals. For this form it is weight without a matching benefit. This is a recommendation rather than a rule, and if you expect several more forms shortly, adopting it now to avoid a later migration is a perfectly defensible call.

### Layered spam defense

Cheapest and least intrusive first:

1. **Honeypot field.** A visually hidden input that humans never fill. Any submission with it populated is dropped. Free, invisible, and catches the large majority of naive bots. Hide it with CSS positioning rather than `display:none`, and mark it `aria-hidden` with `tabIndex={-1}` so screen readers and keyboard users skip it.
2. **Submission timing.** Embed a signed timestamp on render; reject submissions returned in under roughly three seconds. Bots post instantly, humans do not type six fields that fast.
3. **Rate limiting.** Cap submissions per IP per window. Your long-lived container makes a simple in-memory LRU viable with no Redis dependency. Caveat to document in the code: the counter is per-instance, so horizontal scaling weakens it and would call for a shared store.
4. **Cloudflare Turnstile.** Invisible to real users, free at any volume, no cookie consent implications, and it does not require your site to be behind Cloudflare's CDN. The token has to be verified server-side inside the action; a client-side-only integration is decorative. Note the build-time environment variable gotcha from section 1.2.

Layers one through three cost nothing and require no third party. My suggestion is to ship those first, watch actual spam volume for a couple of weeks, and add Turnstile if anything gets through. Turnstile is genuinely good, but adding a third-party script preemptively for a problem you have not yet observed is worth a moment's thought.

---

## 6. Do not repeat the silent-failure bug

The current code's real defect is not the missing endpoint, it is that it **reports success unconditionally**. Whatever gets built must not preserve that behavior in a new form.

- If the provider call fails, surface a real error and show the direct `hello@idexi.ai` address as a fallback path. A prospect who sees an honest error will email you; one who sees a false "thanks" will not.
- Do not `await` the confirmation email to the prospect on the critical path. The internal notification is what must succeed. Send the confirmation opportunistically and let it fail without failing the request.
- Consider a second internal recipient (a shared sales alias, or a Slack inbound-email address) as cheap redundancy against one mailbox misfiling a message.
- Log failures with a correlation ID and the error, **not** the full form payload. Verbose PII in container logs recreates in an unmanaged, harder-to-audit place exactly the datastore that section 3 argues against creating deliberately.

---

## 7. Decisions I need from you

1. **Sending domain.** Is `idexi.ai` correct and do you control its DNS? Everything in section 4 depends on it.
2. **Recipient.** Which inbox should lead notifications reach? `hello@idexi.ai`, a personal address, or a new sales alias?
3. **Confirmation email to the prospect.** Send one or not? It is a nicer experience and it is the flow with real deliverability exposure.
4. **Resend or Postmark.** My recommendation is Resend now with the documented switch trigger. Say the word if you would rather pay from day one for Postmark's deliverability.
5. **React Hook Form.** Skip it as I suggest, or adopt it now in anticipation of more forms?
6. **Interim mitigation.** Do you want the `mailto:` stopgap today, or is the form not yet publicly reachable, making this moot?

---

## 8. Implementation sequence, once approved

1. Provider account, domain verification, DNS records live, DMARC at `p=none`.
2. Zod schema plus the `sendLeadNotification()` module seam.
3. Server Action with validation, honeypot, timing check, and rate limiting.
4. Rewire `CtaSection` to `useActionState` with genuine pending, error, and success states.
5. Test: valid submit, each validation failure, provider outage simulated by an invalid key, honeypot trip, rate limit trip.
6. Confirm the sent mail passes SPF, DKIM, and DMARC using a tool such as mail-tester before announcing anything.
7. Watch DMARC aggregate reports for two to four weeks, then ratchet the policy.
8. Add Turnstile if observed spam justifies it.

---

## Sources

- [Best Transactional Email API in 2026 (Postmark vs Resend vs SendGrid), EmailSendX](https://emailsendx.com/blog/best-transactional-email-api-2026)
- [Resend vs SendGrid vs Postmark Pricing at 1K, 10K, 100K, Vibe Coder Blog](https://blog.vibecoder.me/email-service-pricing-resend-sendgrid-postmark)
- [Transactional Email for Bootstrapped SaaS 2026, F3 Fund It](https://f3fundit.com/transactional-email-bootstrapped-saas-resend-sendgrid-postmark-mailgun-2026/)
- [Guides: Server Actions, Next.js documentation](https://nextjs.org/docs/app/guides/server-actions)
- [How to create forms with Server Actions, Next.js documentation](https://nextjs.org/docs/app/guides/forms)
- [Next.js Server Actions in Production: 2026 Patterns, Digital Applied](https://www.digitalapplied.com/blog/nextjs-server-actions-production-patterns-2026-guide)
- [Contact Form Spam Prevention, Turnstile vs hCaptcha vs Honeypot, Aidxn Design](https://aidxn.com/blog/contact-form-spam-prevention-hcaptcha-turnstile-2026/)
- [Best CAPTCHA for Contact Forms 2026, splitforms](https://splitforms.com/blog/best-captcha-for-contact-form)
