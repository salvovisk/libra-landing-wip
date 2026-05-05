"use client";

import { useMemo, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { Appearance, SetupIntent } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Loader2 } from "lucide-react";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

type EmbeddedCheckoutProps = {
  clientSecret: string;
  intentType: "payment" | "setup";
  subscriptionId?: string;
  customerId?: string;
  priceId?: string;
  featured?: boolean;
  onSuccess: () => void;
};

type SetupIntentError = {
  code?: string;
  setup_intent?: Pick<SetupIntent, "id" | "payment_method" | "status">;
};

function getIntentIdFromClientSecret(clientSecret: string) {
  return clientSecret.split("_secret_")[0] || null;
}

function CheckoutForm({
  clientSecret,
  intentType,
  subscriptionId,
  customerId,
  priceId,
  featured,
  onSuccess,
}: EmbeddedCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentElementReady, setPaymentElementReady] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Controlla i dati di pagamento.");
      setSubmitting(false);
      return;
    }

    if (intentType === "setup") {
      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      const alreadySucceeded = result.error
        ? (result.error as SetupIntentError).code === "setup_intent_unexpected_state" &&
          (result.error as SetupIntentError).setup_intent?.status === "succeeded"
        : false;

      if (result.error && !alreadySucceeded) {
        setError(result.error.message ?? "Pagamento non riuscito. Riprova.");
        setSubmitting(false);
        return;
      }

      const setupIntent = alreadySucceeded
        ? (result.error as SetupIntentError).setup_intent
        : result.setupIntent;
      const paymentMethodId =
        setupIntent && typeof setupIntent.payment_method === "string"
          ? setupIntent.payment_method
          : null;
      const setupIntentId = setupIntent?.id ?? getIntentIdFromClientSecret(clientSecret);

      if (subscriptionId) {
        setSubmitting(false);
        onSuccess();
        return;
      }

      if (!customerId || !priceId || !setupIntentId) {
        setError("Pagamento salvato, ma non siamo riusciti ad attivare l'abbonamento.");
        setSubmitting(false);
        return;
      }

      const subscriptionRes = await fetch("/api/billing/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          priceId,
          paymentMethodId,
          setupIntentId,
        }),
      });
      const subscriptionData: { ok: boolean; error?: string } = await subscriptionRes.json();

      if (!subscriptionData.ok) {
        setError(subscriptionData.error ?? "Pagamento salvato, ma abbonamento non attivato.");
        setSubmitting(false);
        return;
      }
    } else {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message ?? "Pagamento non riuscito. Riprova.");
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div className="relative min-h-[420px]">
        {!paymentElementReady ? <PaymentElementSkeleton /> : null}
        <div className={paymentElementReady ? "opacity-100 transition-opacity duration-200" : "pointer-events-none absolute inset-0 opacity-0"}>
          <PaymentElement
            options={{ layout: "tabs" }}
            onReady={() => setPaymentElementReady(true)}
          />
        </div>
      </div>
      {error ? (
        <p className={`text-sm font-medium ${featured ? "text-rose-100" : "text-rose-500"}`}>
          {error}
        </p>
      ) : null}
      <p className="text-xs leading-5 text-muted">
        Confermando il pagamento accetti i{" "}
        <a href="/termini" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-2 hover:underline">
          Termini e Condizioni
        </a>{" "}
        e autorizzi il trattamento dei dati secondo la{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-2 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
      <button
        type="submit"
        disabled={!stripe || submitting}
        className={`flex w-full items-center justify-center gap-2 rounded-[14px] px-[22px] py-[15px] text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-70 ${
          featured
            ? "bg-white text-primary hover:bg-slate-50"
            : "bg-primary text-white hover:-translate-y-0.5 hover:bg-[#0a3478]"
        }`}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Conferma...</span>
          </>
        ) : (
          "Conferma pagamento"
        )}
      </button>
    </form>
  );
}

function PaymentElementSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden="true">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-[72px] rounded-[14px] border border-line bg-slate-100" />
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-5 w-56 rounded-full bg-slate-200" />
        <div className="h-[68px] rounded-[14px] border border-line bg-slate-100" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="h-5 w-36 rounded-full bg-slate-200" />
          <div className="h-[68px] rounded-[14px] border border-line bg-slate-100" />
        </div>
        <div className="space-y-3">
          <div className="h-5 w-32 rounded-full bg-slate-200" />
          <div className="h-[68px] rounded-[14px] border border-line bg-slate-100" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-5 w-20 rounded-full bg-slate-200" />
        <div className="h-[68px] rounded-[14px] border border-line bg-slate-100" />
      </div>
    </div>
  );
}

export function EmbeddedCheckout({
  clientSecret,
  intentType,
  subscriptionId,
  customerId,
  priceId,
  featured,
  onSuccess,
}: EmbeddedCheckoutProps) {
  const appearance = useMemo<Appearance>(
    () => ({
      theme: "none" as unknown as Appearance["theme"],
      variables: {
        fontFamily: "Inter, sans-serif",
        colorPrimary: "#0b3b88",
        colorText: "#0f1c2c",
        borderRadius: "14px",
      },
      rules: {
        ".Input": {
          border: "1px solid #dbe3f0",
          boxShadow: "none",
          padding: "15px 22px",
          borderRadius: "14px",
          fontSize: "15px",
        },
        ".Input:focus": {
          border: "1px solid #0b3b88",
          boxShadow: "0 0 0 2px rgba(11,59,136,0.1)",
        },
        ".Label": {
          color: featured ? "#e8efff" : "#0f1c2c",
          fontSize: "13px",
          fontWeight: "600",
        },
        ".Tab": {
          border: "1px solid #dbe3f0",
          borderRadius: "14px",
          padding: "15px 22px",
          boxShadow: "none",
        },
        ".Tab--selected": {
          border: "1px solid #0b3b88",
          boxShadow: "0 0 0 2px rgba(11,59,136,0.1)",
        },
      },
    }),
    [featured]
  );

  if (!stripePromise) {
    return (
      <p className={`mt-4 text-sm font-medium ${featured ? "text-rose-100" : "text-rose-500"}`}>
        Configura NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY per mostrare il pagamento incorporato.
      </p>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <CheckoutForm
        clientSecret={clientSecret}
        intentType={intentType}
        subscriptionId={subscriptionId}
        customerId={customerId}
        priceId={priceId}
        featured={featured}
        onSuccess={onSuccess}
      />
    </Elements>
  );
}

export function CheckoutSuccess({
  featured,
  onClose,
}: {
  featured?: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={`mt-6 rounded-[24px] border px-5 py-6 text-center ${
        featured ? "border-white/20 bg-white/12 text-white" : "border-emerald-500/20 bg-emerald-500/8 text-ink"
      }`}
    >
      <div
        className={`mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full ${
          featured ? "bg-white/18" : "bg-emerald-500/12"
        }`}
      >
        <Check className={`h-7 w-7 ${featured ? "text-white" : "text-emerald"}`} strokeWidth={2.4} />
      </div>
      <p className="mt-4 text-xl font-extrabold tracking-[-0.04em]">Abbonamento attivato</p>
      <p className={`mx-auto mt-2 max-w-sm text-sm leading-6 ${featured ? "text-blue-100/80" : "text-muted"}`}>
        Benvenuto in Libra Colf. Riceverai una email di conferma con i dettagli del tuo abbonamento.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <a
          href="https://app.libracolf.it"
          className={`flex w-full items-center justify-center rounded-[14px] px-[22px] py-[15px] text-sm font-bold transition ${
            featured
              ? "bg-white text-primary hover:bg-slate-50"
              : "bg-primary text-white hover:bg-[#0a3478]"
          }`}
        >
          Accedi alla piattaforma
        </a>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className={`text-sm font-semibold underline-offset-4 hover:underline ${
              featured ? "text-white/85" : "text-primary"
            }`}
          >
            Torna ai piani
          </button>
        ) : null}
      </div>
    </div>
  );
}
