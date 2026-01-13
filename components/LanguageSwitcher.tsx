"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";

const NEXT_LANG: Record<Locale, Locale> = {
  en: "ar",
  ar: "en",
};

const LANG_LABEL: Record<Locale, string> = {
  en: "EN",
  ar: "ع",
};

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
    <li>
      <Link
        href={redirectedPathname()}
        className="
          flex items-center gap-2
          px-3 py-1.5 rounded-full
           font-medium
          text-surface-muted
          hover:bg-background/5
          transition-colors text-base
        "
        aria-label={`Switch language to ${nextLang}`}
      >
        <Globe className="h-4 w-4" />
        <span>{LANG_LABEL[nextLang]}</span>
      </Link>
    </li>
  );
}
