import type { RegisterData, LoginData, AuthResponse } from "@/models/Auth";

export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/signup", {
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

    // Store token and user data if provided
    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
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
    const response = await fetch("/api/auth/signin", {
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

    // Store token and user data if provided
    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
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

    await fetch("/api/auth/logout", {
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
    localStorage.removeItem("user");
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export async function getProfile(): Promise<AuthResponse & { user?: any }> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const response = await fetch("/api/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to fetch profile",
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

export async function updateProfile(data: {
  first_name?: string;
  last_name?: string;
  email?: string;
  knowledge_base?: any;
}): Promise<AuthResponse & { user?: any }> {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const response = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to update profile",
      };
    }

    // Update stored user data
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}
