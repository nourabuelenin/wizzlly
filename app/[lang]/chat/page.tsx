import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import ChatPageClient from "@/components/ChatPageClient";

interface ChatPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Chat({ params }: ChatPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ChatPageClient dict={dict} lang={lang} />;
}
