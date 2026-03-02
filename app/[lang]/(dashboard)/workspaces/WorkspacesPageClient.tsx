"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { type Locale } from "@/lib/i18n/config";
import { Briefcase } from "lucide-react";

interface WorkspacesPageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

export default function WorkspacesPageClient({ dict, lang }: WorkspacesPageClientProps) {
  const { profileData, isGuest } = useAuth();

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          {dict.dashboard?.pages?.workspaces?.title || "Workspaces"}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto w-full px-4 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {dict.dashboard?.pages?.workspaces?.title || "Workspaces"}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            {dict.dashboard?.pages?.workspaces?.description || "Manage your AI-powered workspaces and conversations."}
          </p>
          {isGuest && (
            <p className="text-sm text-purple-600 mt-4 font-medium">
              🔒 Sign up to create and manage workspaces
            </p>
          )}
        </div>
      </div>
    </>
  );
}
