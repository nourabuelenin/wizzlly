"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import { useAuth } from "@/contexts/AuthProvider";
import enablrLogo from "@/public/images/enablr_logo_sec.webp";
import PatternDark from "@/public/images/Pattern_dark.webp";
import {
  LayoutDashboard,
  Megaphone,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Settings,
  ChevronDown,
  Repeat2,
  AlertCircle,
  LogOut,
  UserPlus,
} from "lucide-react";
import Image from "next/image";

const TwoColorRocket = ({ className, ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        fill="#9333ea"
        stroke="#9333ea"
      />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
};

interface DashboardSidebarProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

const SquareAnalytics = ({ className, fill = "currentColor", ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6Zm2 12v-4h2v4H8Zm4 0V8h2v8h-2Zm4 0v-6h2v6h-2Z"
      />
    </svg>
  );
};

export default function DashboardSidebar({ dict, lang }: DashboardSidebarProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const { profileData: rawProfileData, isGuest, logout } = useAuth();
  const profileData = rawProfileData as any;
  const [settingsOpen, setSettingsOpen] = useState(true);

  const dashboardDict = dict.dashboard?.sidebar || {};

  const brandName =
    profileData?.brand_identity?.brand_name ||
    profileData?.business_data?.business_name ||
    profileData?.user?.first_name ||
    "Luma Fashion";

  const email = profileData?.user?.email || "luma@enablr.com";

  const isMissingBrandIdentity = !profileData?.brand_identity;

  // Navigation items
  const navItems = [
    { key: "dashboard", path: `/${lang}/dashboard`, icon: LayoutDashboard, label: dashboardDict.dashboard || "Dashboard" },
    { key: "workspaces", path: `/${lang}/workspaces`, icon: TwoColorRocket, label: dashboardDict.workspaces || "Workspaces" },
    { key: "campaigns", path: `/${lang}/campaigns`, icon: Megaphone, label: dashboardDict.campaigns || "Campaigns" },
    { key: "market-overview", path: `/${lang}/market-overview`, icon: BriefcaseBusiness, label: dashboardDict.marketOverview || "Market Overview" },
    { key: "analytics", path: `/${lang}/analytics`, icon: SquareAnalytics, label: dashboardDict.analytics || "Analytics & Insights" },
  ];

  const isActive = (path: string) => {
    if (!currentPath) return false;
    // For dashboard, match exact to avoid matching other paths
    if (path.endsWith("/dashboard")) {
      return currentPath === path || currentPath === `${path}/`;
    }
    return currentPath.includes(path.split(`/${lang}/`)[1] || "");
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
      active
        ? "bg-gray-900 text-white"
        : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"
    }`;
  };

  const getIconClasses = (path: string) => {
    const active = isActive(path);
    return `w-4 h-4 ${active ? "text-white" : "text-gray-800"}`;
  };

  return (
    <aside className="flex flex-col w-64 h-screen bg-white border-r overflow-hidden shadow-sm flex-shrink-0">
      {/* User / Workspace Toggle */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between cursor-pointer group rounded-lg hover:bg-gray-50 p-2 -mx-2 transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex flex-shrink-0 items-center justify-center font-bold text-sm">
              {brandName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {brandName}
              </p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
          </div>
          <Repeat2 className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
        </div>
      </div>

      {/* Guest Banner */}
      {isGuest && (
        <div className="mx-3 mt-3 bg-amber-50 rounded-lg p-3 border border-amber-200">
          <p className="text-xs font-semibold text-amber-800">
            {dict.dashboard?.guestBanner?.title || "Guest Mode"}
          </p>
          <p className="text-[10px] text-amber-600 mt-0.5">
            {dict.dashboard?.guestBanner?.message || "You're viewing sample data."}
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("guestMode");
              router.push(`/${lang}/auth`);
            }}
            className="mt-2 text-[11px] font-semibold text-amber-800 hover:text-amber-900 underline"
          >
            {dict.dashboard?.guestBanner?.cta || "Sign up now"}
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => router.push(item.path)}
            className={`w-full ${getLinkClasses(item.path)}`}
          >
            <item.icon fill="currentColor" className={getIconClasses(item.path)} />
            <span>{item.label}</span>
          </button>
        ))}

        {/* Settings Dropdown */}
        <div className="pt-2">
          <button
            onClick={() => setSettingsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Settings fill="currentColor" className="w-4 h-4 text-gray-800" />
              <span className="text-gray-800">{dashboardDict.settings || "Settings"}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                settingsOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>

          {settingsOpen && (
            <div className="pl-12 pr-4 py-1 space-y-1">
              <button
                onClick={() => router.push(`/${lang}/settings/brand-identity`)}
                className="w-full text-left py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                {dashboardDict.brandIdentity || "Brand identity"}
              </button>
              <button
                onClick={() => router.push(`/${lang}/settings/manage-workspace`)}
                className="w-full text-left py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                {dashboardDict.manageWorkspace || "Manage Workspace"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area */}
      <div className="p-4 space-y-4">
        {/* Missing Brand Identity Banner */}
        {isMissingBrandIdentity && !isGuest && (
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 relative overflow-hidden">
            <div className="flex items-start gap-2 mb-1 z-10 relative">
              <div className="mt-0.5 text-purple-600">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">
                  {dict.dashboard?.missingBrand?.title || "Missing Brand Identity"}
                </h4>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {dict.dashboard?.missingBrand?.message || "Go to Settings > Brand identity to set it up"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        >
          {isGuest ? (
            <>
              <UserPlus className="w-4 h-4" />
              <span>{dict.dashboard?.guestBanner?.cta || "Sign up now"}</span>
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4" />
              <span>{dashboardDict.logout || "Logout"}</span>
            </>
          )}
        </button>
      </div>

      {/* Branding */}
      <div className="bg-foreground text-white relative overflow-hidden rounded-t-[50px] lg:rounded-tl-[24px] lg:rounded-tr-[24px] p-5 z-10">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image src={PatternDark} alt="Pattern" fill className="object-cover" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={enablrLogo}
            alt="ENABLR"
            height={40}
            className="object-contain"
          />
        </div>
        <p className="text-[10px] text-gray-400 border-t-1 pt-2 leading-tight">
          Your personal AI assistant, anytime, anywhere.
        </p>
      </div>
    </aside>
  );
}
