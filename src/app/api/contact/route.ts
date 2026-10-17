import { NextResponse } from "next/server";

// In-memory sliding window rate limiter per IP address
// Tracks request timestamps per client IP. Cleans up stale entries periodically.
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // 5 submissions per 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip) || { timestamps: [] };

  // Remove timestamps older than the rate limit window
  const recentTimestamps = record.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitStore.set(ip, { timestamps: recentTimestamps });
    return true;
  }

  recentTimestamps.push(now);
  rateLimitStore.set(ip, { timestamps: recentTimestamps });

  // Periodically purge old keys if map exceeds 500 entries
  if (rateLimitStore.size > 500) {
    for (const [key, val] of rateLimitStore.entries()) {
      const active = val.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, { timestamps: active });
      }
    }
  }

  return false;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((s) => s.trim());
    if (ips[0]) return ips[0];
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // 1. IP Rate Limiting Check
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            "Too many submissions from this connection. Please wait 10 minutes before trying again.",
        },
        {
          status: 429,
          headers: { "Retry-After": "600" },
        }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, message, budget, projectType, timeline, website, _gotcha } = body;

    // 2. Honeypot check for spam bots
    // Legitimate users will not fill hidden fields 'website' or '_gotcha'
    if (website || _gotcha) {
      // Silently succeed to mislead spam bots
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received.",
        },
        { status: 200 }
      );
    }

    // 3. Server-side validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    const trimmedBudget = typeof budget === "string" ? budget.trim() : "";
    const trimmedProjectType = typeof projectType === "string" ? projectType.trim() : "";
    const trimmedTimeline = typeof timeline === "string" ? timeline.trim() : "";
    const allowedBudgets = new Set(["under-2k", "2-5k", "5-10k", "10k-plus"]);
    const allowedTypes = new Set(["landing", "marketing", "figma", "migration", "template"]);
    const allowedTimelines = new Set(["asap", "2-weeks", "1-month", "flexible"]);

    if (!trimmedName || !trimmedEmail || !trimmedMessage || !trimmedBudget || !trimmedProjectType || !trimmedTimeline) {
      return NextResponse.json(
        { error: "Project type, budget, timeline, name, email, and message are all required." },
        { status: 400 }
      );
    }

    if (!allowedBudgets.has(trimmedBudget) || !allowedTypes.has(trimmedProjectType) || !allowedTimelines.has(trimmedTimeline)) {
      return NextResponse.json(
        { error: "Please choose a valid project type, budget, and timeline." },
        { status: 400 }
      );
    }

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    // RFC 5322 compliant email regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 120) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 3,000 characters." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      budget: trimmedBudget,
      projectType: trimmedProjectType,
      timeline: trimmedTimeline,
      message: trimmedMessage,
      timestamp,
      source: "Portfolio Contact Form",
    };

    // 4. Webhook forwarding via CONTACT_WEBHOOK_URL env var
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (!webhookUrl || !webhookUrl.startsWith("http")) {
      return NextResponse.json(
        {
          error: "Form service unavailable. Please email directly.",
          unavailable: true,
        },
        { status: 503 }
      );
    }

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        const errText = await webhookResponse.text().catch(() => "");
        console.error(
          `Webhook endpoint returned status ${webhookResponse.status}: ${errText}`
        );
        return NextResponse.json(
          {
            error:
              "Failed to deliver message via contact webhook. Please email directly.",
          },
          { status: 502 }
        );
      }
    } catch (webhookErr) {
      console.error("Error dispatching contact webhook:", webhookErr);
      return NextResponse.json(
        {
          error:
            "Network failure communicating with contact webhook. Please email directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been delivered. I will get back to you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in contact API handler:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
