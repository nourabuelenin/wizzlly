"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatInterface from "@/components/ChatInterface";
import AuthModal from "@/components/AuthModal";
import { type Locale } from "@/lib/i18n/config";

interface ChatPageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

export default function ChatPageClient({ dict, lang }: ChatPageClientProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authKey, setAuthKey] = useState(0);

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setAuthKey((prev) => prev + 1); // Force ChatHeader to re-check auth
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar dict={dict} />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <ChatHeader
          key={authKey}
          dict={dict}
          lang={lang}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
        <ChatInterface dict={dict} />
      </div>

      {/* Auth Modal */}
      <AuthModal
        dict={dict}
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
      />
    </div>
  );
}
