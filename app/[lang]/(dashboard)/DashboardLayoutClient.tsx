"use client";

import AuthProvider, { useAuth } from "@/contexts/AuthProvider";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { type Locale } from "@/lib/i18n/config";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

function DashboardShell({
  children,
  dict,
  lang,
}: DashboardLayoutClientProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 font-sans">
        <DashboardSidebar dict={dict} lang={lang} />
        <div className="flex flex-col flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 text-gray-900 overflow-y-auto">
          <div className="flex-1 flex items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-100 min-h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* Sidebar */}
      <DashboardSidebar dict={dict} lang={lang} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="flex flex-col w-full mx-auto h-full text-gray-900 pb-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayoutClient({
  children,
  dict,
  lang,
}: DashboardLayoutClientProps) {
  return (
    <AuthProvider lang={lang}>
      <DashboardShell dict={dict} lang={lang}>
        {children}
      </DashboardShell>
    </AuthProvider>
  );
}
