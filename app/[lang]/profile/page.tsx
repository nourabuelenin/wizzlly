import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import ProfilePageClient from "@/components/ProfilePageClient";

interface ProfilePageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Profile({ params }: ProfilePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ProfilePageClient dict={dict} lang={lang} />;
}
