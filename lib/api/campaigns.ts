/**
 * Client-side service for Campaign management.
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

export interface CampaignListItem {
  id: number;
  campaign_title: string;
  campaign_description: string;
  status: "draft" | "active" | "completed" | "archived";
  connected_account_type: string;
  connected_account_name: string;
  is_external: boolean;
  external_source: string;
  meta_objective: string;
  has_ai_content: boolean;
  posts_count: number;
  target_audience: string;
  brand_colors: string;
  created_at: string;
  updated_at: string;
  is_editable: boolean;
}

export interface CampaignPost {
  id: string;
  post_number: number;
  type: string;
  platform: string;
  status: string;
  title: string;
  headline: string;
  caption: string;
  description: string;
  image: {
    description: string;
    generation_prompt: string;
    generated_image_url: string;
  };
  cta: {
    type: string;
    text: string;
    url: string;
  };
  targeting: Record<string, unknown>;
  scheduling: {
    publish_at: string;
    recommended_time: string;
    best_day: string;
    delay_after_previous: number;
  };
  performance_goals: Record<string, unknown>;
  creative_notes: string;
  published_at: string | null;
  external_post_id: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignFull {
  id: number;
  title: string;
  description: string;
  status: string;
  objective: string;
  strategy: Record<string, unknown>;
  plan: Record<string, unknown>;
  posts: CampaignPost[];
  posts_count: number;
  generation_context: Record<string, unknown>;
  generation_metadata: Record<string, unknown>;
  branding: {
    brand_colors: string;
    logo_url: string;
    logo_position: string;
    key_message: string;
    sub_message: string;
  };
  target_audience: string;
  external: Record<string, unknown>;
  meta_insights: Record<string, unknown>;
  last_insights_sync: string | null;
  source_session_id: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * List all campaigns for the current user.
 */
export async function listCampaigns(params?: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{
  success: boolean;
  total?: number;
  count?: number;
  campaigns?: CampaignListItem[];
  error?: string;
}> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set("status", params.status);
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.offset) searchParams.set("offset", String(params.offset));

    const query = searchParams.toString();
    const url = `/api/campaigns/${query ? `?${query}` : ""}`;
    const res = await fetchWithBearer(url);
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

/**
 * Get full campaign detail including strategy, plan, and all posts.
 */
export async function getCampaignFull(id: number): Promise<{
  success: boolean;
  campaign?: CampaignFull;
  error?: string;
}> {
  try {
    const res = await fetchWithBearer(`/api/campaigns/${id}/full/`);
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}
