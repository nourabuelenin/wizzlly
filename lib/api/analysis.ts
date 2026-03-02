export interface AnalysisResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  is_connected?: boolean;
}

/**
 * Common request wrapper for analysis endpoints
 */
async function fetchAnalysis<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<AnalysisResponse<T>> {
  try {
    const res = await fetch(`/api/analysis${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || data.detail || "Request failed",
      };
    }

    // Some endpoints wrap in { success: true, ... }, some just return data.
    // We'll normalize to always return `data: data`.
    return { success: true, data };
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    return { success: false, error: "Network error occurred." };
  }
}

// ── Profiles ──────────────────────────────────────────────────

export async function getBusinessProfiles() {
  return fetchAnalysis("/profiles/");
}

export async function createBusinessProfile(profileData: any) {
  return fetchAnalysis("/profiles/", {
    method: "POST",
    body: JSON.stringify(profileData),
  });
}

// ── SWOT / Business Analysis ──────────────────────────────────

export async function getLatestSwot(businessProfileId?: number) {
  const query = businessProfileId
    ? `?business_profile_id=${businessProfileId}`
    : "";
  return fetchAnalysis(`/swot/latest/${query}`);
}

export async function runSwotAnalysis(businessProfile: any, options?: any) {
  return fetchAnalysis("/swot/run_analysis/", {
    method: "POST",
    body: JSON.stringify({ business_profile: businessProfile, options }),
  });
}

// ── Market Analysis ───────────────────────────────────────────

export async function getLatestMarket() {
  return fetchAnalysis("/market/latest/");
}

export async function runMarketAnalysis(businessProfile: any, options?: any) {
  return fetchAnalysis("/market/run_analysis/", {
    method: "POST",
    body: JSON.stringify({ business_profile: businessProfile, options }),
  });
}

// ── Competitor Analysis ───────────────────────────────────────

export async function getLatestCompetitor() {
  return fetchAnalysis("/competitor/latest/");
}

export async function runCompetitorAnalysis(
  businessProfile: any,
  options?: any,
) {
  return fetchAnalysis("/competitor/run_analysis/", {
    method: "POST",
    body: JSON.stringify({ business_profile: businessProfile, options }),
  });
}
