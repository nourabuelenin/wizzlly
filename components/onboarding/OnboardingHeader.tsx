"use client";

import Logo from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface OnboardingHeaderProps {
  currentLang: "en" | "ar";
}

export function OnboardingHeader({ currentLang }: OnboardingHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        <Logo className="w-20! h-20!" />
        <LanguageSwitcher currentLang={currentLang} textColor="text-gray-900" />
      </div>
    </div>
  );
}
