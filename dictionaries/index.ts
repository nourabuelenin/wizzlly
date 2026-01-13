import en from "./en.json";
import ar from "./ar.json";
import { type Locale } from "@/lib/i18n/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dictionaries: Record<Locale, Record<string, any>> = {
  en,
  ar,
};

export const getDictionary = async (locale: Locale) => dictionaries[locale];
