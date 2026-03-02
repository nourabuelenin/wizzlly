"use client";

import Image from "next/image";
import enablrIcon from "@/public/images/enablr_icon.png";

interface PageShellProps {
  /** Lucide icon element for the top bar pill */
  icon: React.ReactNode;
  /** Title shown in the top bar pill */
  title: string;
  /** Big heading inside the gradient hero */
  heroTitle: string;
  /** Optional subtitle below the hero heading */
  heroSubtitle?: string;
  /** Page-specific content rendered inside the main content block */
  children: React.ReactNode;
}

/**
 * Shared page layout used by Dashboard, Campaigns, and other dashboard pages.
 * Provides:
 *  1. A top bar "pill" (white rounded bar with icon + title)
 *  2. A main white card with gradient hero section + logo
 *  3. A padded content zone for page-specific children
 */
export default function PageShell({
  icon,
  title,
  heroTitle,
  heroSubtitle,
  children,
}: PageShellProps) {
  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* ── Top Bar Pill ─────────────────────────────────── */}
      <div className="flex items-center justify-between w-full bg-white rounded-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] border border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          {icon}
          <h1 className="text-lg font-extrabold text-gray-900 flex items-center gap-2 tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* ── Main Content Block ───────────────────────────── */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] border border-gray-100/80 w-full overflow-hidden mb-12">
        <div className="w-full mx-auto space-y-8 pb-10">
          {/* Hero Section */}
          <div className="text-center pt-10 pb-6 relative bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-white overflow-hidden mb-6">
            <div className="flex justify-center mb-5">
              <Image
                src={enablrIcon}
                alt="enablr"
                width={100}
                height={63}
                className="object-contain"
              />
            </div>
            <h2 className="text-[34px] md:text-[40px] font-extrabold text-[#111827] tracking-tight">
              {heroTitle}
            </h2>
            {heroSubtitle && (
              <p className="text-gray-500 mt-2 text-[15px] md:text-base font-medium">
                {heroSubtitle}
              </p>
            )}
          </div>

          {/* Page Content */}
          <div className="px-6 lg:px-10 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
