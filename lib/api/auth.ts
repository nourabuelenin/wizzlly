import type { RegisterData, LoginData, AuthResponse } from "@/models/Auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_GAD_BASE_URL || "http://134.209.30.66";

export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle validation errors with details
      if (result.details) {
        const errorMessages = Object.entries(result.details)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`,
          )
          .join("; ");
        return {
          success: false,
          error: result.error || "Validation failed",
          details: result.details,
        };
      }

      return {
        success: false,
        error: result.error || "Registration failed",
      };
    }

    // Store token if provided
    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Login failed",
      };
    }

    // Store token if provided
    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

export async function logout(): Promise<void> {
  try {
    const token = localStorage.getItem("authToken");

    await fetch(`${API_BASE_URL}/api/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({}),
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("authToken");
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
