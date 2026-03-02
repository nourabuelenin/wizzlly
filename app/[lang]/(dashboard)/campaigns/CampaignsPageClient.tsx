"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import { type Locale } from "@/lib/i18n/config";
import { listCampaigns, type CampaignListItem } from "@/lib/api/campaigns";
import { dummyCampaigns } from "@/data/dummy-dashboard-data";
import PageShell from "@/components/dashboard/PageShell";
import CampaignCard from "@/components/dashboard/CampaignCard";
import {
  Megaphone,
  Search,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";

interface CampaignsPageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

/* ── Helpers to extract display data from API campaign ────── */

function getStatusLabel(campaign: any, dict: any): string {
  if (campaign._ui?.statusLabel) return campaign._ui.statusLabel;
  const status = campaign.status;
  const c = dict?.dashboard?.pages?.campaigns;
  if (status === "draft") return c?.statusDraft || "Draft";
  if (status === "active") return c?.statusLive || "Live";
  if (status === "completed") return c?.statusCompleted || "Completed";
  if (status === "archived") return c?.statusArchived || "Archived";
  return status;
}

function getPlatforms(campaign: any): string[] {
  if (campaign._ui?.platforms) return campaign._ui.platforms;
  const type = campaign.connected_account_type;
  if (type === "facebook_page") return ["facebook"];
  if (type === "instagram_account") return ["instagram"];
  if (type === "ad_account") return ["facebook", "instagram"];
  return [];
}

function getMetrics(campaign: any): { label: string; value: string }[] {
  if (campaign._ui?.metrics) return campaign._ui.metrics;
  return [
    { label: "Posts", value: String(campaign.posts_count || 0) },
    { label: "Status", value: campaign.status },
  ];
}

function getDateRange(campaign: any, notScheduled: string): string {
  if (campaign._ui?.dateRange !== undefined) {
    return campaign._ui.dateRange || notScheduled;
  }
  if (campaign.created_at && campaign.updated_at) {
    const start = new Date(campaign.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const end = new Date(campaign.updated_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${start} – ${end}`;
  }
  return notScheduled;
}

/* ── Constants ───────────────────────────────────────────────── */

const PAGE_SIZE = 6;

/* ── Component ───────────────────────────────────────────────── */

export default function CampaignsPageClient({
  dict,
  lang,
}: CampaignsPageClientProps) {
  const router = useRouter();
  const { isGuest, isAuthenticated } = useAuth();
  const c = (dict as any)?.dashboard?.pages?.campaigns || {};

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // ── Fetch campaigns ──────────────────────────────────────
  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      if (isGuest) {
        setCampaigns(dummyCampaigns);
        setTotal(dummyCampaigns.length);
        setIsLoading(false);
        return;
      }

      const params: Record<string, any> = {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
      };
      if (statusFilter !== "all") params.status = statusFilter;

      const result = await listCampaigns(params);
      if (result.success && result.campaigns) {
        setCampaigns(result.campaigns);
        setTotal(result.total || result.campaigns.length);
      } else {
        setCampaigns(dummyCampaigns);
        setTotal(dummyCampaigns.length);
      }
      setIsLoading(false);
    };

    fetchCampaigns();
  }, [isGuest, isAuthenticated, currentPage, statusFilter]);

  // ── Client-side search filtering ─────────────────────────
  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return campaigns;
    const q = searchQuery.toLowerCase();
    return campaigns.filter(
      (c: any) =>
        c.campaign_title?.toLowerCase().includes(q) ||
        c.campaign_description?.toLowerCase().includes(q)
    );
  }, [campaigns, searchQuery]);

  // ── For guest mode, also client-side filter by status ────
  const displayCampaigns = useMemo(() => {
    if (!isGuest || statusFilter === "all") return filteredCampaigns;
    return filteredCampaigns.filter((c: any) => {
      if (statusFilter === "active") return c.status === "active";
      return c.status === statusFilter;
    });
  }, [filteredCampaigns, isGuest, statusFilter]);

  const totalPages = Math.ceil(
    (isGuest ? displayCampaigns.length : total) / PAGE_SIZE
  );
  const paginatedCampaigns = isGuest
    ? displayCampaigns.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      )
    : displayCampaigns;

  const statusOptions = [
    { value: "all", label: c.allStatuses || "All Statuses" },
    { value: "draft", label: c.statusDraft || "Draft" },
    { value: "active", label: c.statusLive || "Live" },
    { value: "completed", label: c.statusCompleted || "Completed" },
    { value: "archived", label: c.statusArchived || "Archived" },
  ];

  const notScheduledText = c.notScheduled || "Not scheduled yet";

  return (
    <PageShell
      icon={<Megaphone className="w-4 h-4 text-gray-900" />}
      title={c.title || "Campaigns"}
      heroTitle={c.title || "Campaigns"}
      heroSubtitle={c.subtitle || "Recent marketing campaigns performance."}
    >
      {/* ── Search + Filters ──────────────────────────────── */}
      <div className="flex items-center gap-3 mb-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={c.searchPlaceholder || "Search for campaign"}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {c.filters || "Filters"}
            <ChevronRight
              className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-90" : ""}`}
            />
          </button>
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg py-1 min-w-[180px] z-20">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setStatusFilter(opt.value);
                    setShowFilters(false);
                    setCurrentPage(1);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                    statusFilter === opt.value
                      ? "bg-primary/5 text-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Campaign Cards Grid ───────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-5 bg-gray-100 rounded w-2/3 mb-4" />
              <div className="h-4 bg-gray-50 rounded w-1/3 mb-6" />
              <div className="flex gap-3">
                <div className="h-14 bg-gray-50 rounded-lg flex-1" />
                <div className="h-14 bg-gray-50 rounded-lg flex-1" />
              </div>
            </div>
          ))}
        </div>
      ) : paginatedCampaigns.length === 0 ? (
        <div className="text-center py-16">
          <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">
            {c.noCampaigns || "No campaigns found"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedCampaigns.map((campaign: any) => (
            <CampaignCard
              key={campaign.id}
              title={campaign.campaign_title}
              statusLabel={getStatusLabel(campaign, dict)}
              platforms={getPlatforms(campaign)}
              metrics={getMetrics(campaign)}
              dateRange={getDateRange(campaign, notScheduledText)}
              notScheduledText={notScheduledText}
              postsCount={campaign.posts_count}
              labels={{ posts: c.posts || "Posts", platforms: c.platforms || "Platforms" }}
              onClick={() => router.push(`/${lang}/campaigns/${campaign.id}`)}
            />
          ))}
        </div>
      )}

      {/* ── Pagination ────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
          >
            {c.previous || "Previous"}
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let page: number;
            if (totalPages <= 5) {
              page = i + 1;
            } else if (currentPage <= 3) {
              page = i + 1;
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + i;
            } else {
              page = currentPage - 2 + i;
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          {totalPages > 5 && (
            <>
              <span className="text-gray-400 px-1">…</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
          >
            {c.next || "Next"}
          </button>
        </div>
      )}
    </PageShell>
  );
}
