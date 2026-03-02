import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import CampaignDetailClient from "./CampaignDetailClient";

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export default async function CampaignDetailPage({ params }: PageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang as Locale);

  return <CampaignDetailClient dict={dict} lang={lang as Locale} campaignId={Number(id)} />;
}
