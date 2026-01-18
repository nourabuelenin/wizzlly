"use client";

import { useState } from "react";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

interface AuthClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
}

export default function AuthClient({ dict }: AuthClientProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      {isSignUp ? (
        <SignUp onToggleSignIn={() => setIsSignUp(false)} dict={dict} />
      ) : (
        <SignIn onToggleSignUp={() => setIsSignUp(true)} dict={dict} />
      )}
    </>
  );
}
