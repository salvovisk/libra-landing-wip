# Backend Integration Spec — Libra Colf Landing Page

## Overview

The landing page handles Stripe checkout without authentication to maximize conversion. After a subscription is confirmed, the backend is responsible for:

1. Creating/updating the user account
2. Exposing a customer lookup endpoint so the landing page can reuse existing Stripe customers
3. Handling subscription lifecycle events via Stripe webhooks

This eliminates orphan customer accumulation and ensures clean 1:1 user↔Stripe customer mapping long-term.

---

## Current Landing Page Flow (no backend)

```
1. User fills billing form (client-side only, no Stripe calls)
2. POST /api/billing/payment-intent
     → scans Stripe customers by email
     → deletes zero-subscription orphans
     → creates new Stripe customer with billing metadata
     → creates SetupIntent
     → returns { clientSecret, customerId, priceId }
3. User enters card → confirms SetupIntent
4. POST /api/billing/subscription
     → verifies SetupIntent ownership
     → checks trial eligibility (scans subscription history)
     → creates subscription with or without trial
     → cleans up remaining orphan customers
     → returns { subscriptionId, status }
5. Frontend shows success screen → user clicks "Accedi alla piattaforma"
```

---

## Phase 1: Customer Lookup Endpoint

The landing page will call this endpoint **before** creating a new Stripe customer. If a customer is found, it is reused — no duplicate customers ever.

### Endpoint

```
POST /api/stripe/lookup-customer
Content-Type: application/json

Request:
{
  "email": "user@example.com"
}

Response 200 — customer found:
{
  "customerId": "cus_xxx"
}

Response 200 — no customer:
{
  "customerId": null
}

Response 500 — internal error (landing page will fall through to create new customer)
```

### Backend implementation requirements

- Query your users table by email
- If user exists and has a `stripeCustomerId`: return it
- If user exists but no `stripeCustomerId`: return `null` (will be created by landing page)
- If user does not exist: return `null`
- **Do not create anything** — read-only endpoint

### Security

- This endpoint is unauthenticated (no session available on landing page)
- Rate limit by IP: max 10 requests/minute
- Do not return any user data other than `customerId`
- Email is the only lookup key — do not expose whether an account exists beyond `customerId: null`

---

## Phase 2: Webhook Handler

The backend must handle these Stripe webhook events. Register the webhook endpoint in the Stripe dashboard pointing to your backend.

### Required events to subscribe to

| Event | Purpose |
|-------|---------|
| `customer.subscription.created` | Provision user account after successful checkout |
| `customer.subscription.updated` | Handle plan changes, trial conversions |
| `customer.subscription.deleted` | Deactivate account on cancellation/expiry |
| `invoice.payment_failed` | Notify user, optionally suspend access |

### Webhook security

All events must be verified using `stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET)` before processing.

---

### Event: `customer.subscription.created`

Fired when a subscription is successfully created from the landing page.

**Payload fields to read:**

```javascript
const subscription = event.data.object; // Stripe.Subscription

// Customer info
const customerId = subscription.customer;           // "cus_xxx"

// Retrieve the customer to get email + metadata
const customer = await stripe.customers.retrieve(customerId);
// customer.email                                   // "user@example.com"
// customer.name                                    // company name or full name
// customer.address                                 // { line1, postal_code, city, country }

// Billing metadata (set by landing page at customer creation)
// customer.metadata.billingName                    // user's personal name (always)
// customer.metadata.invoiceRequested               // "true" | "false"
// customer.metadata.vatNumber                      // "IT12345678901" or ""
// customer.metadata.taxCode                        // "RSSMRA80A01H501U" or ""
// customer.metadata.pec                            // "nome@pec.it" or ""
// customer.metadata.planId                         // e.g. "private-base"
// customer.metadata.priceId                        // "price_xxx"

// Subscription metadata (set by landing page at subscription creation)
// subscription.metadata.planId                     // e.g. "private-base"
// subscription.metadata.priceId                    // "price_xxx"
// subscription.metadata.trialUsed                  // "true" | "false"
// subscription.metadata.trialWaived                // "true" | "false"

// Subscription details
const status = subscription.status;                 // "active" | "trialing"
const trialEnd = subscription.trial_end;            // Unix timestamp or null
const currentPeriodEnd = subscription.current_period_end; // Unix timestamp
const priceId = subscription.items.data[0].price.id;
```

**Backend logic:**

```
1. Look up user by customer.email in your users table

2. If user exists:
   a. Update stripeCustomerId = customerId (if not already set)
   b. Update subscriptionId, planId, subscriptionStatus
   c. If status === "trialing": set trialEndsAt = trialEnd
   d. Grant platform access

3. If user does not exist:
   a. Create new user account:
      - email = customer.email
      - name = customer.metadata.billingName
      - stripeCustomerId = customerId
      - subscriptionId = subscription.id
      - planId = subscription.metadata.planId
      - subscriptionStatus = status
      - trialEndsAt = trialEnd (null if not trialing)
      - invoiceRequested = customer.metadata.invoiceRequested === "true"
      - vatNumber = customer.metadata.vatNumber
      - taxCode = customer.metadata.taxCode
      - pec = customer.metadata.pec
   b. Generate credentials / magic link
   c. Send welcome email (see Email Templates section below)

4. Idempotency: use subscription.id as idempotency key — this event may fire more than once
```

---

### Event: `customer.subscription.updated`

Fired on plan changes, trial conversion to paid, payment method updates, renewals.

**Key cases to handle:**

```
1. Trial ends → becomes active:
   subscription.status changed from "trialing" to "active"
   → update user.subscriptionStatus = "active"
   → update user.trialEndsAt = null (or keep for audit)
   → send "trial ended, first charge processed" email

2. Plan upgrade/downgrade:
   subscription.items.data[0].price.id changed
   → update user.planId
   → update user.priceId
   → send plan change confirmation email

3. Subscription renewed:
   subscription.current_period_end updated
   → update user.currentPeriodEnd
   → no email needed

4. Past due:
   subscription.status = "past_due"
   → send payment failure notification
   → optionally restrict platform access (grace period recommended: 7 days)
```

---

### Event: `customer.subscription.deleted`

Fired when subscription is canceled or expires after all retries fail.

```
subscription.status = "canceled"
subscription.canceled_at = Unix timestamp

→ update user.subscriptionStatus = "canceled"
→ revoke platform access (or set access_until = subscription.current_period_end for grace period)
→ send cancellation confirmation email
```

---

### Event: `invoice.payment_failed`

Fired when a renewal charge fails. Stripe retries automatically (configured in Stripe dashboard).

```
invoice.attempt_count       // 1, 2, 3...
invoice.next_payment_attempt // Unix timestamp or null (null = final attempt failed)
invoice.subscription        // subscription ID

→ if next_payment_attempt: send "payment failed, will retry" email
→ if next_payment_attempt is null: Stripe will fire subscription.deleted — handle there
```

---

## Trial Logic Reference

The landing page computes trial eligibility and writes the result to subscription metadata. The backend must read and respect this — do not recompute.

### How trial eligibility is determined (landing page logic)

```
configuredTrialDays = product.metadata.trialDays or price.metadata.trialDays (e.g. 30)

previousTrialUsed = any past subscription for this email where:
  - trial_start is not null (Stripe actually ran a trial)
  - status is not "incomplete" or "incomplete_expired" (subscription was activated, not abandoned)

if previousTrialUsed:
  trialDays = 0         → subscription created without trial
  trialWaived = "true"  → metadata flag
else:
  trialDays = configuredTrialDays
  trialWaived = "false"
```

### Subscription metadata values

| `subscription.metadata.trialUsed` | `subscription.metadata.trialWaived` | Meaning |
|---|---|---|
| `"false"` | `"false"` | Plan has no trial configured, paid from day 1 |
| `"true"` | `"false"` | Trial granted and running (status: "trialing") |
| `"true"` | `"true"` | User had a previous trial — charged immediately, no trial |

### Backend rules

- **Never grant a second trial** to a user whose past subscription has `trial_start != null` and `status != incomplete/incomplete_expired`
- When `trialWaived = "true"`: user already consumed their trial — communicate clearly in welcome email ("addebito immediato, prova gratuita già utilizzata")
- When `status = "trialing"`: do not charge anything — Stripe handles the trial-end charge automatically
- Store `trialEndsAt` from `subscription.trial_end` for displaying in the platform UI

---

## Email Templates

### 1. Welcome — new subscriber, no trial (or trial waived)

**Trigger:** `customer.subscription.created` where `trialWaived = "true"` OR `trialUsed = "false"`

```
Subject: Benvenuto in Libra Colf — abbonamento attivo

Body:
- Conferma abbonamento attivo per piano [planId]
- Prossimo rinnovo: [current_period_end]
- Link accesso piattaforma: https://app.libracolf.it
- Se trialWaived = "true": nota "Prova gratuita già utilizzata in precedenza"
```

### 2. Welcome — new subscriber with trial

**Trigger:** `customer.subscription.created` where `status = "trialing"` and `trialWaived = "false"`

```
Subject: La tua prova gratuita è iniziata — [X] giorni gratis

Body:
- Conferma prova gratuita attiva
- Fine prova: [trial_end formatted as date]
- Primo addebito: [trial_end] per €[amount]/[interval]
- Nessun addebito fino a [trial_end]
- Link accesso piattaforma: https://app.libracolf.it
- Link per cancellare prima del rinnovo
```

### 3. Trial ending soon (optional but recommended)

**Trigger:** Scheduled job 3 days before `trial_end`

```
Subject: La tua prova gratuita termina tra 3 giorni

Body:
- Reminder scadenza prova
- Data primo addebito
- Importo e piano
- Link per cancellare o continuare
```

### 4. Trial converted to paid

**Trigger:** `customer.subscription.updated` where status changed `trialing → active`

```
Subject: Abbonamento attivato — primo pagamento elaborato

Body:
- Conferma primo addebito avvenuto
- Importo addebitato
- Prossimo rinnovo: [current_period_end]
```

### 5. Payment failed

**Trigger:** `invoice.payment_failed` where `next_payment_attempt` is not null

```
Subject: Problema con il pagamento — riproveremo a breve

Body:
- Pagamento non riuscito
- Prossimo tentativo: [next_payment_attempt]
- Link per aggiornare metodo di pagamento in Stripe customer portal
```

---

## Landing Page Changes Required (Phase 1 integration)

Once the lookup endpoint is live, the landing page `payment-intent` route needs a small update:

```typescript
// Before creating customer, call backend lookup
const lookupRes = await fetch(`${BACKEND_URL}/api/stripe/lookup-customer`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: body.billingDetails.email }),
}).catch(() => null);

const existingCustomerId = lookupRes?.ok
  ? (await lookupRes.json()).customerId as string | null
  : null;

// If found, update customer details and create SetupIntent against existing customer
if (existingCustomerId) {
  await stripe.customers.update(existingCustomerId, {
    name: ...,
    address: ...,
    metadata: ...,
  });
  // skip stripe.customers.create
  // proceed with stripe.setupIntents.create({ customer: existingCustomerId, ... })
}
// else: create new customer as today
```

This is the only landing page change needed for Phase 1. Everything else stays the same.

---

## Environment Variables Required

Add to landing page `.env.local`:

```
BACKEND_API_URL=https://api.libracolf.it   # internal backend base URL
BACKEND_API_SECRET=xxx                      # shared secret for server-to-server calls (optional but recommended)
```

---

## Stripe Dashboard Configuration

1. **Webhook endpoint:** Register `https://api.libracolf.it/webhooks/stripe` for events listed above
2. **Smart Retries:** Enable in Billing settings (3-4 retry attempts over 7 days recommended)
3. **Customer portal:** Enable so users can self-manage payment methods and cancellations
4. **Trial settings:** Ensure "Cancel at trial end" is OFF — trials should convert to paid automatically
