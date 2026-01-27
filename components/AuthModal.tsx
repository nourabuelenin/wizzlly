"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Modal from "@/components/Modal";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { type Locale } from "@/lib/i18n/config";

interface AuthModalProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function AuthModal({ dict }: AuthModalProps) {
  const params = useParams();
  const lang = params.lang as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Open modal after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSuccess = () => {
    setIsOpen(false);
  };

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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {isSignUp ? (
          <SignUp
            onToggleSignIn={() => setIsSignUp(false)}
            onSuccess={handleSuccess}
            dict={dict}
            lang={lang}
            compact
          />
        ) : (
          <SignIn
            onToggleSignUp={() => setIsSignUp(true)}
            onSuccess={handleSuccess}
            dict={dict}
            lang={lang}
            compact
          />
        )}
      </Modal>
    </>
  );
}
