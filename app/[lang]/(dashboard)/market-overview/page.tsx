import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import MarketOverviewPageClient from "./MarketOverviewPageClient";

interface MarketOverviewPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function MarketOverview({ params }: MarketOverviewPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <MarketOverviewPageClient dict={dict} lang={lang} />;
}
