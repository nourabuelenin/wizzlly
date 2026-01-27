"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { type Locale } from "@/lib/i18n/config";

interface AuthClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function AuthClient({ dict }: AuthClientProps) {
  const params = useParams();
  const lang = params.lang as Locale;
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 3000,
          style: {
            padding: "16px",
            minWidth: "250px",
          },
          success: {
            duration: 3000,
            style: {
              background: "#D1FAE5",
              color: "#065F46",
              border: "1px solid #10B981",
              padding: "16px",
            },
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#FEE2E2",
              color: "#991B1B",
              border: "1px solid #EF4444",
              padding: "16px",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      {isSignUp ? (
        <SignUp
          onToggleSignIn={() => setIsSignUp(false)}
          dict={dict}
          lang={lang}
        />
      ) : (
        <SignIn
          onToggleSignUp={() => setIsSignUp(true)}
          dict={dict}
          lang={lang}
        />
      )}
    </>
  );
}
