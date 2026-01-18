"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

interface AuthModalProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function AuthModal({ dict }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Open modal after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {isSignUp ? (
        <SignUp onToggleSignIn={() => setIsSignUp(false)} dict={dict} compact />
      ) : (
        <SignIn onToggleSignUp={() => setIsSignUp(true)} dict={dict} compact />
      )}
    </Modal>
  );
}
