import { NextResponse } from "next/server";

import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || body.email.trim() === "") {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 }
    );
  }

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: body.email,
    event: "email_subscribed",
    properties: {
      email: body.email,
    },
  });
  posthog.identify({
    distinctId: body.email,
    properties: { email: body.email },
  });

  return NextResponse.json({ ok: true });
}
