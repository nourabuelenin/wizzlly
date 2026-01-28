import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import DashboardPageClient from "@/components/DashboardPageClient";

interface DashboardPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Dashboard({ params }: DashboardPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <DashboardPageClient dict={dict} lang={lang} />;
}
