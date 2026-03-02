import { NextResponse } from "next/server";

/**
 * Centralized proxy utility for all Next.js API routes.
 *
 * All backend calls go through this function so that:
 * - Backend URL is never exposed to the client
 * - Token format is always `Bearer`
 * - Timeout, error handling, and logging are consistent
 */

const BACKEND_BASE_URL = process.env.API_GAD_BASE_URL ?? "http://134.209.30.66";
const DEFAULT_TIMEOUT_MS = 30_000;

interface ProxyOptions {
  /** Override request body (for POST/PATCH/PUT). If null, reads from `req.body`. */
  body?: Record<string, unknown> | null;
  /** Extra headers to merge into the upstream request. */
  extraHeaders?: Record<string, string>;
  /** Timeout in milliseconds. Default: 30 000. */
  timeoutMs?: number;
  /** If true, forward query params from the incoming request to the upstream URL. */
  forwardQuery?: boolean;
  /** If true, skip reading/sending JSON body (for GET/DELETE). */
  skipBody?: boolean;
}

/**
 * Proxy an incoming Next.js API request to the backend.
 *
 * @param req     - The incoming `Request` object from a Next.js route handler.
 * @param method  - HTTP method for the upstream call.
 * @param path    - Upstream path relative to the API root, e.g. `"/api/stg2/auth/me/"`.
 * @param options - Optional overrides (body, headers, timeout, query forwarding).
 *
 * @example
 * // Simple authenticated GET:
 * export async function GET(req: Request) {
 *   return proxyRequest(req, "GET", "/api/stg2/auth/me/");
 * }
 *
 * // POST with custom body:
 * export async function POST(req: Request) {
 *   return proxyRequest(req, "POST", "/api/stg2/auth/guest/");
 * }
 */
export async function proxyRequest(
  req: Request,
  method: string,
  path: string,
  options: ProxyOptions = {},
): Promise<NextResponse> {
  const {
    body: bodyOverride,
    extraHeaders = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
    forwardQuery = false,
    skipBody = false,
  } = options;

  // ── Build upstream URL ──────────────────────────────────────────
  let upstreamUrl = `${BACKEND_BASE_URL}${path}`;

  if (forwardQuery) {
    const incomingUrl = new URL(req.url);
    if (incomingUrl.search) {
      upstreamUrl += incomingUrl.search;
    }
  }

  // ── Extract auth token from incoming request ────────────────────
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  // ── Build headers ──────────────────────────────────────────────
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // ── Build body ─────────────────────────────────────────────────
  let bodyPayload: string | undefined;
  if (!skipBody && method !== "GET" && method !== "DELETE") {
    if (bodyOverride !== undefined) {
      bodyPayload = bodyOverride ? JSON.stringify(bodyOverride) : undefined;
    } else {
      try {
        const parsed = await req.json();
        bodyPayload = JSON.stringify(parsed);
      } catch {
        // No body — that's fine for some POSTs
      }
    }
  }

  // ── Make upstream request ──────────────────────────────────────
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(upstreamUrl, {
      method,
      headers,
      body: bodyPayload,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // ── Parse response ──────────────────────────────────────────
    const responseText = await response.text();
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            (data as any).error ||
            (data as any).detail ||
            `Upstream error (${response.status})`,
          details: data,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { success: true, ...data },
      { status: response.status },
    );
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { success: false, error: "Request timeout — backend not responding" },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Connection to backend failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}
