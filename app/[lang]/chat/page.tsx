import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatInterface from "@/components/ChatInterface";

interface ChatPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Chat({ params }: ChatPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar dict={dict} />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <ChatHeader dict={dict} lang={lang} />
        <ChatInterface dict={dict} />
      </div>
    </div>
  );
}
