"use client";

import { useState } from "react";
import { getFacebookAuthUrl } from "@/lib/api/stg2-auth";
import { useParams } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";

interface FacebookSignInButtonProps {
  text?: string;
}

export default function FacebookSignInButton({
  text = "Sign in with Facebook",
}: FacebookSignInButtonProps) {
  const params = useParams();
  const lang = (params?.lang as Locale) || "en";
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Build redirect URI dynamically — never hardcode
      const redirectUri = `${window.location.origin}/${lang}/auth/callback`;
      const result = await getFacebookAuthUrl(redirectUri);

      if (result.success && result.auth_url) {
        // Redirect browser to Facebook OAuth page
        window.location.href = result.auth_url;
      } else {
        console.error("Failed to get Facebook auth URL:", result.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Facebook auth error:", err);
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.888V14.89H7.898V12H10.438V9.797C10.438 7.278 11.933 5.888 14.237 5.888C15.334 5.888 16.485 6.084 16.485 6.084V8.552H15.218C13.972 8.552 13.562 9.325 13.562 10.114V12H16.36L15.912 14.89H13.562V21.888C18.343 21.128 22 16.991 22 12C22 6.477 17.523 2 12 2Z"
          fill="#1877F2"
        />
      </svg>
      <span className="text-sm font-semibold text-gray-700">
        {isLoading ? "Redirecting…" : text}
      </span>
    </button>
  );
}
