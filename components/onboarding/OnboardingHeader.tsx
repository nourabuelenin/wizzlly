"use client";

import Logo from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface OnboardingHeaderProps {
  currentLang: "en" | "ar";
}

export function OnboardingHeader({ currentLang }: OnboardingHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-background">
      <div className="flex items-center justify-between px-8 py-4">
        <Logo className="w-16! h-16!" />
        <LanguageSwitcher
          currentLang={currentLang}
          textColor="text-foreground"
        />
      </div>
    </div>
  );
}
