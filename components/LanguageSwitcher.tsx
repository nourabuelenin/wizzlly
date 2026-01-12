"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex gap-4 items-center">
      {locales.map((locale) => {
        const isActive = currentLang === locale;
        return (
          <Link
            key={locale}
            href={redirectedPathname(locale)}
            className={`px-3  py-1 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-foreground text-background font-semibold"
                : "bg-black/[.05] dark:bg-white/[.06] hover:bg-black/[.1] dark:hover:bg-white/[.1]"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
