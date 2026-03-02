import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import AnalyticsPageClient from "./AnalyticsPageClient";

interface AnalyticsPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Analytics({ params }: AnalyticsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AnalyticsPageClient dict={dict} lang={lang} />;
}
