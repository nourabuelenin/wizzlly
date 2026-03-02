"use client";

import React, { ReactNode } from "react";
import Logo from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useParams } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import Image from "next/image";
import patternImage from "@/public/images/onboardingPattern.png";

interface AuthLayoutProps {
  children: ReactNode;
  rightPanel: ReactNode;
  hideLogo?: boolean;
}

export default function AuthLayout({ children, rightPanel, hideLogo = false }: AuthLayoutProps) {
  const params = useParams();
  const currentLang = (params?.lang as Locale) || "en";

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900 relative">
      {/* Global Language Switcher */}
      <div className="absolute top-8 right-8 z-50">
        <LanguageSwitcher currentLang={currentLang} textColor="text-gray-800" />
      </div>

      {/* Left Column - Active Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:w-[60%] lg:flex-none xl:w-[55%] relative">
        <div className="w-full max-w-md">
          {!hideLogo && (
            <div className="absolute top-8 left-8 z-20">
              <Logo />
            </div>
          )}
          {children}
        </div>
        
        <div className="absolute bottom-6 left-8 text-[11px] text-gray-500">
          ENABLR — Strategic marketing powered by insight and responsible creativity. © 2026. All Rights Reserved
        </div>
      </div>

      {/* Right Column - Decor/Stepper/Testimonial */}
      <div className="hidden lg:flex flex-1 relative bg-[#e2ebf9] overflow-hidden items-center justify-center rounded-bl-[80px] shadow-[inset_0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Background Pattern */}
        <Image
          src={patternImage}
          alt="Pattern"
          fill
          className="object-cover opacity-60 mix-blend-multiply"
          priority
        />
        
        {/* Overlay gradient (purple/blue mix matching design) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe]/40 via-[#e9d5ff]/40 to-[#d8b4fe]/40 z-0"></div>

        {/* Dynamic Right Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {rightPanel}
        </div>
      </div>
    </div>
  );
}
