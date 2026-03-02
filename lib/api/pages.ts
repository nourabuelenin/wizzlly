/**
 * Client-side service for Facebook Page management.
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
 * List all connected Facebook pages for the current user.
 */
export async function listPages(): Promise<{
  success: boolean;
  pages?: Array<{
    id: number;
    facebook_page_id: string;
    page_name: string;
    page_category: string;
    is_active: boolean;
  }>;
  error?: string;
}> {
  try {
    const res = await fetchWithBearer("/api/stg2/facebook-pages/");
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

/**
 * Select a Facebook page as the active page for this user.
 *
 * @param pageId - The internal page ID (not the Facebook page ID).
 */
export async function selectPage(pageId: number): Promise<{
  success: boolean;
  active_page?: Record<string, unknown>;
  error?: string;
}> {
  try {
    const res = await fetchWithBearer("/api/stg2/facebook-pages/select/", {
      method: "POST",
      body: JSON.stringify({ page_id: pageId }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

/**
 * Get the currently active Facebook page.
 */
export async function getActivePage(): Promise<{
  success: boolean;
  page?: {
    id: number;
    facebook_page_id: string;
    page_name: string;
    page_category: string;
  };
  error?: string;
}> {
  try {
    const res = await fetchWithBearer("/api/stg2/facebook-pages/active/");
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}
