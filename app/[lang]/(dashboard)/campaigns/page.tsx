import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import CampaignsPageClient from "./CampaignsPageClient";

interface CampaignsPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Campaigns({ params }: CampaignsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <CampaignsPageClient dict={dict} lang={lang} />;
}
