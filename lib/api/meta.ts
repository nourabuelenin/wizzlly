/**
 * Client-side service for Meta integration (connect, status, disconnect).
 * All calls go through Next.js proxy routes.
 */

import { getAuthToken } from "./auth";

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

/**
 * Get the Meta connect OAuth URL.
 * After user grants page/ad permissions, Facebook redirects to `redirectUri`.
 */
export async function getMetaConnectUrl(
  redirectUri: string,
): Promise<{ success: boolean; auth_url?: string; error?: string }> {
  try {
    const params = new URLSearchParams({ redirect_uri: redirectUri });
    const res = await fetchWithBearer(`/api/stg2/meta/connect/url/?${params}`);
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

/**
 * Exchange Meta OAuth code for page tokens.
 * Called from the Meta callback page.
 */
export async function handleMetaCallback(
  code: string,
  state: string,
): Promise<{
  success: boolean;
  pages_connected?: number;
  error?: string;
}> {
  try {
    const params = new URLSearchParams({ code, state });
    const res = await fetchWithBearer(
      `/api/stg2/meta/connect/callback/?${params}`,
    );
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

/**
 * Check if Meta is currently connected for this user.
 */
export async function getMetaStatus(): Promise<{
  success: boolean;
  is_connected?: boolean;
  facebook_user_id?: string;
  error?: string;
}> {
  try {
    const res = await fetchWithBearer("/api/stg2/meta/status/");
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}
