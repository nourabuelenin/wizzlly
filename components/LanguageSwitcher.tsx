"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";

const NEXT_LANG: Record<Locale, Locale> = { en: "ar", ar: "en" };
const LANG_LABEL: Record<Locale, string> = { en: "EN", ar: "ع" };

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();
  const nextLang = NEXT_LANG[currentLang];

  const redirectedPathname = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = nextLang;
    return segments.join("/");
  };

  return (
    <Link
      href={redirectedPathname()}
      className="flex items-center justify-center gap-2 px-4 py-4 rounded-full font-medium text-foreground bg-background/20 backdrop-blur-md hover:bg-background/80 transition-colors text-base"
      aria-label={`Switch language to ${nextLang}`}
    >
        <Globe className="h-5 w-5" />
      <span>{LANG_LABEL[nextLang]}</span>
    </Link>
  );
}
