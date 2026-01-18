import { Settings, Share2, Sparkles } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface ChatHeaderProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

export default function ChatHeader({ dict, lang }: ChatHeaderProps) {
  return (
    <header className="py-5 shrink-0 px-4 flex items-center justify-between border-b">
      {/* Left */}
      <div className="flex items-center gap-2">
        <p className="font-medium">{dict.chat.header.title}</p>
        <span className="text-xs font-semibold text-gray-700 border px-2 py-0.5 rounded-full">
          {dict.chat.header.badge}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border hover:bg-gray-100 cursor-pointer">
          <Settings className="w-4 h-4" />
          {dict.chat.header.configuration}
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border hover:bg-gray-100 cursor-pointer">
          <Share2 className="w-4 h-4" />
          {dict.chat.header.share}
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-black text-white hover:opacity-90 cursor-pointer">
          <Sparkles className="w-4 h-4" />
          {dict.chat.header.newChat}
        </button>

        <div className="ltr:ml-2 ltr:border-l ltr:pl-2 rtl:mr-2 rtl:border-r rtl:pr-2">
          <LanguageSwitcher currentLang={lang} textColor="text-gray-800" />
        </div>
      </div>
    </header>
  );
}
