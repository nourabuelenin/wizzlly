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
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AuthModal({
  dict,
  isOpen: externalIsOpen,
  onOpenChange,
}: AuthModalProps) {
  const params = useParams();
  const lang = params.lang as Locale;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  // Open modal after 1 second (only if not externally controlled)
  useEffect(() => {
    if (externalIsOpen === undefined) {
      const timer = setTimeout(() => setInternalIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [externalIsOpen]);

  const handleSuccess = () => {
    setIsOpen(false);
    // Trigger storage event to update all auth-dependent components
    window.dispatchEvent(new Event("storage"));
  };

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
