"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { type Locale } from "@/lib/i18n/config";
import { Settings } from "lucide-react";

interface ManageWorkspacePageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

export default function ManageWorkspacePageClient({ dict, lang }: ManageWorkspacePageClientProps) {
  const { isGuest } = useAuth();

  return (
    <>
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          {dict.dashboard?.pages?.settings?.manageWorkspace?.title || "Manage Workspace"}
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-4 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {dict.dashboard?.pages?.settings?.manageWorkspace?.title || "Manage Workspace"}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            {dict.dashboard?.pages?.settings?.manageWorkspace?.description || "Configure workspace settings, members, and preferences."}
          </p>
          {isGuest && (
            <p className="text-sm text-purple-600 mt-4 font-medium">
              🔒 Sign up to manage your workspace
            </p>
          )}
        </div>
      </div>
    </>
  );
}
