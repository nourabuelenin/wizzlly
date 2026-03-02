"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/lib/api/stg2-auth";
import { fetchFullProfile } from "@/lib/api/business";
import { logout as apiLogout } from "@/lib/api/auth";
import { dummyProfileData } from "@/data/dummy-dashboard-data";
import { type Locale } from "@/lib/i18n/config";

interface AuthContextType {
  user: Record<string, unknown> | null;
  profileData: Record<string, unknown> | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profileData: null,
  isAuthenticated: false,
  isGuest: false,
  isLoading: true,
  logout: async () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
  lang: Locale;
}

export default function AuthProvider({ children, lang }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [profileData, setProfileData] = useState<Record<string, unknown> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const guestMode = localStorage.getItem("guestMode");

        if (token) {
          // ── Step 1: Validate token via stg2/auth/me/ ──────────
          const meResult = await verifyToken();

          if (!meResult.success) {
            // Token invalid or expired — clean up and redirect
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            localStorage.removeItem("guestMode");
            router.push(`/${lang}/auth`);
            return;
          }

          // ── Step 2: Set auth state from /me response ──────────
          const isGuestUser = meResult.is_guest === true || guestMode === "true";
          setIsGuest(isGuestUser);

          if (isGuestUser) {
            // Guest users get dummy profile data
            setUser(meResult.user ?? dummyProfileData.user);
            setProfileData(dummyProfileData);
          } else {
            // Authenticated users get real profile data
            setUser(meResult.user ?? null);

            // ── Step 3: Fetch full profile for dashboard data ───
            try {
              const profileResult = await fetchFullProfile();
              if (profileResult.success) {
                setProfileData(profileResult);
              } else {
                // Profile fetch failed but token is valid —
                // set basic user data and continue
                setProfileData({ user: meResult.user });
              }
            } catch {
              setProfileData({ user: meResult.user });
            }
          }

          setIsAuthenticated(true);
        } else if (guestMode === "true") {
          // Guest mode without token (legacy fallback) —
          // show dummy data but mark as unauthenticated
          setIsGuest(true);
          setProfileData(dummyProfileData);
          setUser(dummyProfileData.user);
        } else {
          // No auth, no guest — redirect to auth
          router.push(`/${lang}/auth`);
          return;
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("guestMode");
        router.push(`/${lang}/auth`);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [lang, router]);

  const logout = useCallback(async () => {
    try {
      if (isAuthenticated && !isGuest) {
        await apiLogout();
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clear all auth state
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("guestMode");
      setUser(null);
      setProfileData(null);
      setIsAuthenticated(false);
      setIsGuest(false);
      router.push(`/${lang}/auth`);
    }
  }, [isAuthenticated, isGuest, lang, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profileData,
        isAuthenticated,
        isGuest,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
