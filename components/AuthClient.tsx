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
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
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
