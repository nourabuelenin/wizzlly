import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { defaultLocale, locales, type Locale } from "./config";

export function getLocale(request: Request): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // Filter out invalid locale codes (like '*') and unsupported locales
  const validLanguages = languages.filter(
    (lang) => lang !== "*" && locales.includes(lang as Locale)
  );

  // If no valid languages found, use default locale
  if (validLanguages.length === 0) {
    return defaultLocale;
  }

  return match(
    validLanguages,
    locales as unknown as string[],
    defaultLocale
  ) as Locale;
}
