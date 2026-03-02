"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { handleFacebookCallback } from "@/lib/api/stg2-auth";
import { type Locale } from "@/lib/i18n/config";

type CallbackStatus = "processing" | "success" | "error";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const lang = (params?.lang as Locale) || "en";

  const [status, setStatus] = useState<CallbackStatus>("processing");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code) {
        setStatus("error");
        setErrorMessage("No authorization code received from Facebook.");
        return;
      }

      const result = await handleFacebookCallback(code, state || "");

      if (result.success && result.auth_token) {
        setStatus("success");

        // Determine where to redirect:
        // New users → onboarding, existing users → dashboard
        const redirectTo = result.is_new_user
          ? `/${lang}/onboarding`
          : `/${lang}/dashboard`;

        // Short delay so user sees the success state
        setTimeout(() => {
          router.push(redirectTo);
        }, 800);
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Authentication failed.");
      }
    };

    processCallback();
  }, [searchParams, lang, router]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full mx-4 text-center">
      {status === "processing" && (
        <>
          <div className="flex justify-center mb-4">
            <svg
              className="animate-spin h-8 w-8 text-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                className="opacity-75"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Signing you in…
          </h2>
          <p className="text-gray-500 text-sm">
            Verifying your Facebook account.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome!
          </h2>
          <p className="text-gray-500 text-sm">Redirecting you now…</p>
        </>
      )}

      {status === "error" && (
        <>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 text-sm mb-6">{errorMessage}</p>
          <button
            onClick={() => router.push(`/${lang}/auth`)}
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-sm transition-colors"
          >
            Back to Sign In
          </button>
        </>
      )}
    </div>
  );
}

function CallbackFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full mx-4 text-center">
      <div className="flex justify-center mb-4">
        <svg
          className="animate-spin h-8 w-8 text-primary"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            className="opacity-75"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading…</h2>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={<CallbackFallback />}>
        <CallbackContent />
      </Suspense>
    </div>
  );
}
