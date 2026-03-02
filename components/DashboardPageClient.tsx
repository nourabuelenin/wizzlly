"use client";

import { useAuth } from "@/contexts/AuthProvider";
import KPISummary from "@/components/dashboard/KPISummary";
import {
  PerformanceOverTime,
  LifecycleOverview,
  SpendVsResults,
  EngagementByPlatform,
  EngagementByContentType,
} from "@/components/dashboard/ChartsGroup";
import PostingHeatmap from "@/components/dashboard/PostingHeatmap";
import PageShell from "@/components/dashboard/PageShell";
import { type Locale } from "@/lib/i18n/config";
import { LayoutDashboard } from "lucide-react";

interface DashboardPageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

export default function DashboardPageClient({
  dict,
  lang,
}: DashboardPageClientProps) {
  // profileData contains dynamic API response — cast for property access
  const { profileData: rawProfileData } = useAuth();
  const profileData = rawProfileData as any;

  const brandName =
    profileData?.brand_identity?.brand_name ||
    profileData?.business_data?.business_name ||
    profileData?.user?.first_name ||
    "User";

  return (
    <PageShell
      icon={
        <LayoutDashboard
          fill="currentColor"
          className="w-4 h-4 text-gray-900"
        />
      }
      title={dict.dashboard?.overview?.title || "Dashboard"}
      heroTitle={
        dict.dashboard?.overview?.heroTitle ||
        "enablr, your marketing assistant"
      }
      heroSubtitle={
        dict.dashboard?.overview?.heroSubtitle ||
        "AI-powered insights and campaign generation"
      }
    >
      <KPISummary />
      <PerformanceOverTime />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LifecycleOverview />
        <SpendVsResults />
        <EngagementByPlatform />
        <EngagementByContentType />
      </div>
      <PostingHeatmap />
    </PageShell>
  );
}
