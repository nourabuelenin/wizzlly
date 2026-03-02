import { getAuthToken } from "./auth";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || "An API error occurred");
  }
  return data;
}

export async function saveBusinessData(data: Record<string, any>) {
  return fetchWithAuth("/api/stg2/business/data/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function saveBrandIdentity(data: Record<string, any>) {
  return fetchWithAuth("/api/stg2/brand-identity/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchFullProfile() {
  return fetchWithAuth("/api/stg2/profile/complete/", {
    method: "GET",
  });
}
