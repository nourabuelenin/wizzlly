"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Settings, Share2, User, LogIn, LogOut } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getAuthToken, logout } from "@/lib/api/auth";

interface ChatHeaderProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
  onOpenAuth?: () => void;
  onAuthChange?: (isAuth: boolean) => void;
}

export default function ChatHeader({
  dict,
  lang,
  onOpenAuth,
  onAuthChange,
}: ChatHeaderProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = !!getAuthToken();
      setIsAuthenticated(authStatus);
      if (onAuthChange) {
        onAuthChange(authStatus);
      }
    };

    checkAuth();

    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [onAuthChange]);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    toast.success(dict.auth.toast.logoutSuccess);
    
    // Redirect to chat page after logout
    router.push(`/${lang}/chat`);
  };

  const handleProfileClick = () => {
    router.push(`/${lang}/profile`);
  };

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

        {!isAuthenticated ? (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-black text-white hover:opacity-90 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            {dict.chat.header.login}
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {dict.chat.header.logout}
          </button>
        )}

        <div className="ltr:ml-2 ltr:border-l ltr:pl-2 rtl:mr-2 rtl:border-r rtl:pr-2 flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={handleProfileClick}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          )}
          <LanguageSwitcher currentLang={lang} textColor="text-gray-800" />
        </div>
      </div>
    </header>
  );
}
