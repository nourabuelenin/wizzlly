/**
 * Client-side service for STG2 authentication.
 *
 * All functions call Next.js proxy routes (never the backend directly).
 * Token is stored in localStorage as "authToken" and reused via getAuthToken().
 */

import { getAuthToken } from "./auth";

/** Authenticated fetch helper — attaches Bearer token to all requests. */
async function fetchWithBearer(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(url, { ...options, headers });
}

// ── Facebook OAuth ─────────────────────────────────────────────

/**
 * Get the Facebook OAuth redirect URL from the backend.
 * The caller should then redirect the browser to the returned `auth_url`.
 *
 * @param redirectUri - The URI Facebook should redirect back to after auth.
 *                      Built dynamically from `window.location.origin + /[lang]/auth/callback`.
 */
export async function getFacebookAuthUrl(
  redirectUri: string,
): Promise<{ success: boolean; auth_url?: string; error?: string }> {
  try {
    const params = new URLSearchParams({ redirect_uri: redirectUri });
    const res = await fetch(`/api/stg2/auth/facebook/url/?${params}`);
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

/**
 * Exchange the Facebook OAuth code for an auth token.
 * Called from the `/auth/callback` page after Facebook redirects back.
 *
 * On success, stores the token in localStorage.
 */
export async function handleFacebookCallback(
  code: string,
  state: string,
): Promise<{
  success: boolean;
  auth_token?: string;
  user?: Record<string, unknown>;
  is_new_user?: boolean;
  error?: string;
}> {
  try {
    const params = new URLSearchParams({ code, state });
    const res = await fetch(`/api/stg2/auth/facebook/callback/?${params}`);
    const data = await res.json();

    if (data.success && data.auth_token) {
      localStorage.setItem("authToken", data.auth_token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      // Clear any leftover guest flag
      localStorage.removeItem("guestMode");
    }

    return data;
  } catch {
    return { success: false, error: "Network error" };
  }
}

// ── Guest Session ──────────────────────────────────────────────

/**
 * Create a guest session.
 * Returns a real auth token + is_guest flag + auto-created facebook_page_id.
 *
 * @param name - Optional display name for the guest user.
 */
export async function createGuestSession(name?: string): Promise<{
  success: boolean;
  auth_token?: string;
  is_guest?: boolean;
  facebook_page_id?: string;
  error?: string;
}> {
  try {
    const body = name ? { name } : {};
    const res = await fetch("/api/stg2/auth/guest/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.success && data.auth_token) {
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("guestMode", "true");
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    }

    return data;
  } catch {
    return { success: false, error: "Network error" };
  }
}

// ── Token Validation ───────────────────────────────────────────

/**
 * Verify the current token is valid via `stg2/auth/me/`.
 * Used by AuthProvider on page load.
 */
export async function verifyToken(): Promise<{
  success: boolean;
  user?: Record<string, unknown>;
  is_guest?: boolean;
  error?: string;
}> {
  try {
    const res = await fetchWithBearer("/api/stg2/auth/me/");
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}
