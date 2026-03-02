"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Calendar } from "lucide-react";

/* ── Status helpers ──────────────────────────────────────────── */

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  Draft: { bg: "bg-gray-100", text: "text-gray-600" },
  Scheduled: { bg: "bg-blue-50", text: "text-blue-600" },
  Live: { bg: "bg-green-500", text: "text-white" },
  Completed: { bg: "bg-purple-100", text: "text-purple-700" },
  Archived: { bg: "bg-gray-100", text: "text-gray-500" },
};

function StatusBadge({ label }: { label: string }) {
  const style = STATUS_STYLES[label] || STATUS_STYLES.Draft;
  return (
    <span
      className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${style.bg} ${style.text}`}
    >
      {label}
    </span>
  );
}

/* ── Platform icons row ──────────────────────────────────────── */

function PlatformIcons({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex items-center gap-1.5">
      {platforms.includes("facebook") && (
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#1877F2]">
          <FaFacebookF className="w-3.5 h-3.5 text-white" />
        </span>
      )}
      {platforms.includes("instagram") && (
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <FaInstagram className="w-3.5 h-3.5 text-white" />
        </span>
      )}
    </div>
  );
}

/* ── Card props ──────────────────────────────────────────────── */

export interface CampaignCardProps {
  /** Campaign title */
  title: string;
  /** Display label for the status badge (e.g. "Live", "Draft") */
  statusLabel: string;
  /** Platform slugs: "facebook" | "instagram" */
  platforms: string[];
  /** Metric key-value pairs to render in small boxes */
  metrics: { label: string; value: string }[];
  /** Human-readable date range string */
  dateRange: string;
  /** Fallback text when no date range is set */
  notScheduledText?: string;
  /** i18n labels */
  labels?: {
    posts?: string;
    platforms?: string;
  };
  /** Number of posts */
  postsCount?: number;
  /** Click handler (usually router.push) */
  onClick?: () => void;
}

/* ── Component ───────────────────────────────────────────────── */

export default function CampaignCard({
  title,
  statusLabel,
  platforms,
  metrics,
  dateRange,
  notScheduledText = "Not scheduled yet",
  labels,
  postsCount,
  onClick,
}: CampaignCardProps) {
  const isUnscheduled = !dateRange || dateRange === notScheduledText;

  return (
    <button
      onClick={onClick}
      className="text-left bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer w-full"
    >
      {/* Title + Status */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight pr-3">
          {title}
        </h3>
        <StatusBadge label={statusLabel} />
      </div>

      {/* Posts + Platforms */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        {postsCount !== undefined && (
          <div>
            <span className="text-gray-400 font-medium">
              {labels?.posts || "Posts"}
            </span>
            <p className="text-gray-900 font-semibold">
              {postsCount} {(labels?.posts || "posts").toLowerCase()}
            </p>
          </div>
        )}
        <div>
          <span className="text-gray-400 font-medium">
            {labels?.platforms || "Platforms"}
          </span>
          <div className="mt-0.5">
            <PlatformIcons platforms={platforms} />
          </div>
        </div>
      </div>

      {/* Metric Boxes */}
      {metrics.length > 0 && (
        <div className="flex gap-3 mb-4">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-50/80 rounded-lg px-3.5 py-2.5 border border-gray-100/80"
            >
              <p className="text-[11px] text-gray-400 font-medium mb-0.5">
                {m.label}
              </p>
              <p className="text-sm font-bold text-gray-900">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Date Range */}
      <div
        className={`flex items-center gap-1.5 text-xs font-medium ${
          isUnscheduled ? "text-orange-500" : "text-primary"
        }`}
      >
        <Calendar className="w-3.5 h-3.5" />
        {dateRange || notScheduledText}
      </div>
    </button>
  );
}
