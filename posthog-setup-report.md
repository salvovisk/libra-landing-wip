<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Libra Colf landing site (Next.js 16.2.3 App Router). The integration covers the full acquisition-to-conversion funnel with both client-side and server-side event tracking, a reverse proxy for reliable event ingestion, and automatic exception capture.

## Changes made

| File | Change |
|------|--------|
| `instrumentation-client.ts` | **Created** — initializes PostHog client-side via Next.js 15.3+ instrumentation hook; enables exception capture and reverse proxy |
| `next.config.mjs` | **Updated** — added `/ingest/*` reverse proxy rewrites to `eu-assets.i.posthog.com` / `eu.i.posthog.com` + `skipTrailingSlashRedirect` |
| `lib/posthog-server.ts` | **Created** — singleton `getPostHogClient()` helper for server-side `posthog-node` usage in API routes |
| `.env.local` | **Updated** — added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |

## Events instrumented

| Event | Description | File |
|-------|-------------|------|
| `hero_cta_clicked` | User clicks a hero CTA button (free trial or learn more) | `components/hero-enriched.tsx` |
| `billing_cycle_changed` | User toggles between monthly and yearly billing | `components/pricing-engine.tsx` |
| `plan_cta_clicked` | User clicks the CTA on a pricing plan card | `components/pricing-engine.tsx` |
| `checkout_opened` | Embedded checkout modal opens after payment intent is ready | `components/pricing-engine.tsx` |
| `checkout_payment_submitted` | User submits the payment form | `components/embedded-checkout.tsx` |
| `checkout_completed` | Payment confirmed and subscription activated (client-side) | `components/embedded-checkout.tsx` |
| `checkout_error` | Stripe or network error shown to user during checkout | `components/embedded-checkout.tsx` |
| `lead_magnet_cta_clicked` | User clicks the bottom-of-page CTA ("Scegli il tuo piano") | `components/lead-magnet-section.tsx` |
| `cookie_consent_accepted` | User explicitly accepts cookie consent | `components/cookie-banner.tsx` |
| `cookie_consent_declined` | User declines cookie consent | `components/cookie-banner.tsx` |
| `checkout_initiated` | **Server-side** — payment intent created, Stripe customer registered | `app/api/billing/payment-intent/route.ts` |
| `subscription_created` | **Server-side** — Stripe subscription successfully created and activated | `app/api/billing/subscription/route.ts` |
| `subscription_creation_failed` | **Server-side** — subscription creation failed | `app/api/billing/subscription/route.ts` |
| `email_subscribed` | **Server-side** — user submitted email to the subscribe endpoint | `app/api/subscribe/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/174017/dashboard/665960
- **Checkout conversion funnel** (plan CTA → checkout opened → payment submitted → completed): https://eu.posthog.com/project/174017/insights/4W04zr8R
- **Subscriptions created over time** (daily revenue conversions): https://eu.posthog.com/project/174017/insights/ieTmtKmu
- **Hero CTA clicks** (top-of-funnel engagement by button): https://eu.posthog.com/project/174017/insights/xhx1TAWI
- **Checkout errors** (error events by stage): https://eu.posthog.com/project/174017/insights/d4psMNqO
- **Billing cycle preference** (monthly vs yearly toggle usage): https://eu.posthog.com/project/174017/insights/tjCsZ6ho

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
