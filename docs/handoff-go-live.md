# Libra Colf Landing — Handoff & Go-Live Checklist

_Last updated: 2026-05-07_

---

## What was done this session

### PostHog instrumentation (client-side)
- `pricing-engine.tsx` — all events wired:
  - `plan_cta_clicked` — fires on every plan CTA, carries `plan_id`, `plan_name`, `billing_cycle`, `persona`
  - `checkout_opened` — fires after successful `/api/billing/payment-intent` response
  - `checkout_payment_submitted` — fires on form submit in `embedded-checkout.tsx`
  - `checkout_abandoned` — fires on modal close if subscription not yet completed
  - `compare_plans_opened` — fires when "Confronta Piani" accordion opens
  - `hero_cta_clicked` — fires on hero buttons (already existed)
  - `lead_magnet_cta_clicked` — fires on "Scegli il tuo piano" CTA in bottom section
  - `billing_cycle_changed` — fires on monthly/annual toggle
  - `$set_once` — records `first_plan_viewed`, `first_billing_cycle`, `first_persona` on first checkout open
- `cookie-banner.tsx` — opt-in/opt-out wired to `posthog.opt_in_capturing()` / `posthog.opt_out_capturing()`
- `instrumentation-client.ts` — session recording configured with `maskAllInputs: true`, `maskTextSelector: "[data-sensitive]"`

### PostHog instrumentation (server-side)
- `app/api/billing/payment-intent/route.ts` — captures `checkout_initiated` + identifies user with email, name, plan, billing interval
- `app/api/billing/subscription/route.ts` — captures `subscription_created` + identifies user with subscription status, plan, trial state

### PostHog dashboard (project 174017, dashboard 665960)
- Dashboard renamed: "Libra Colf — Performance Landing Page"
- All 11 insights renamed to Italian
- Tiles reordered into logical narrative: Conversion → Revenue → Top of Funnel → Pricing/Checkout
- Alert created: email to salvo.visk@gmail.com if daily subscriptions drop 50%
- Insight "Iscrizioni lista d'attesa" renamed to "Clic CTA finale" (it tracks bottom-page CTA, not email capture)

### Docs
- `docs/posthog-guida-cliente.md` — full Italian onboarding guide for the client

---

## What is NOT done yet — required before go-live

### 1. `posthog.identify()` client-side (CRITICAL for funnel stitching)
**Problem:** `checkout_payment_submitted` fires client-side with anonymous distinct ID. `subscription_created` fires server-side with email as distinct ID. PostHog cannot join them → funnel shows broken steps.

**Fix:** In `components/pricing-engine.tsx`, inside `prepareCheckout()`, after `checkout_opened` capture, add:

```typescript
posthog.identify(billingDetails.email, {
  email: billingDetails.email,
  name: billingDetails.name,
});
```

Location: `pricing-engine.tsx` ~line 344, right after the `posthog.capture("checkout_opened", ...)` call.

---

### 2. PostHog text section headers (manual, in UI)
MCP cannot create text/markdown tiles. Must be added manually in PostHog UI.

1. Open https://eu.posthog.com/project/174017/dashboard/665960
2. Click **"+ Add text card"** 4 times, place before each group:
   - `🎯 Conversione` — before "Funnel di conversione"
   - `💰 Abbonamenti` — before "Abbonamenti nel tempo"
   - `📣 Top of Funnel` — before "Clic sull'hero"
   - `🛒 Pagina Prezzi & Checkout` — before "Clic sui piani per segmento"

---

### 3. Enable Session Replay in PostHog project settings (manual)
SDK config alone (`instrumentation-client.ts`) is not enough.

PostHog UI → **Project Settings** → **Session Replay** → toggle on.

---

### 4. Environment variables on production server
These must be set in the deployment environment (Vercel / Docker / wherever):

```
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_...       # PostHog project token
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

Currently using test/dev keys. Switch to live Stripe keys before going live.

---

### 5. Stripe products — set `planId` metadata
Billing helpers read `price.metadata.planId` or `product.metadata.planId`. Verify all live Stripe products/prices have this metadata set, otherwise `plan_id` will be empty in PostHog events.

Check in Stripe dashboard: Products → each product → Metadata → `planId` should match the IDs in `lib/site-data.ts`.

---

### 6. Commit all changes
Large diff sitting uncommitted (31 files, ~900 insertions). Before deploy:

```bash
git add components/pricing-engine.tsx \
        components/embedded-checkout.tsx \
        components/cookie-banner.tsx \
        components/lead-magnet-section.tsx \
        app/api/billing/payment-intent/route.ts \
        app/api/billing/subscription/route.ts \
        instrumentation-client.ts \
        lib/posthog-server.ts \
        next.config.mjs \
        package.json package-lock.json \
        docs/
git commit -m "Add PostHog instrumentation, billing flow, and analytics dashboard"
```

---

### 7. PostHog project transfer to client (post-launch, optional)
After go-live, if client wants their own PostHog account:
- **Option A (recommended):** PostHog UI → Settings → Project → Transfer to another organization. Moves everything including historical data.
- **Option B:** Invite client as member to SvDev org (simpler, you retain admin).

---

## Key file map

| File | Purpose |
|---|---|
| `instrumentation-client.ts` | PostHog browser init, session recording config |
| `lib/posthog-server.ts` | PostHog Node.js client (server-side events) |
| `components/cookie-banner.tsx` | GDPR consent → opt-in/opt-out |
| `components/pricing-engine.tsx` | All client-side analytics events |
| `components/embedded-checkout.tsx` | Stripe payment form, checkout events |
| `app/api/billing/payment-intent/route.ts` | Creates Stripe customer + SetupIntent, fires `checkout_initiated` |
| `app/api/billing/subscription/route.ts` | Creates Stripe subscription, fires `subscription_created` |
| `docs/posthog-guida-cliente.md` | Client-facing PostHog guide (Italian) |

## PostHog dashboard
- Project: 174017 (Default project, org SvDev)
- Dashboard: 665960 — "Libra Colf — Performance Landing Page"
- Alert: daily subscription drop >50% → salvo.visk@gmail.com
