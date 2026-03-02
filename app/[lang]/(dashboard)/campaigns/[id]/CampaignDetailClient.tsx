"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import { type Locale } from "@/lib/i18n/config";
import { getCampaignFull } from "@/lib/api/campaigns";
import { dummyCampaigns, buildDummyDetail } from "@/data/dummy-dashboard-data";
import Image from "next/image";
import enablrIcon from "@/public/images/enablr_icon.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  Megaphone,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Check,
} from "lucide-react";

/* ================================================================
   Props
   ================================================================ */

interface CampaignDetailClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
  campaignId: number;
}

/* ================================================================
   Status Badge
   ================================================================ */

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  draft: { bg: "bg-gray-100", text: "text-gray-600" },
  active: { bg: "bg-green-500", text: "text-white" },
  completed: { bg: "bg-purple-100", text: "text-purple-700" },
  archived: { bg: "bg-gray-100", text: "text-gray-500" },
};

function StatusBadge({ status, label }: { status: string; label: string }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.draft;
  return (
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${style.bg} ${style.text}`}
    >
      {label}
    </span>
  );
}

/* ================================================================
   Platform Icons (inline row)
   ================================================================ */

function PlatformIconsRow({ platforms }: { platforms: string[] }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {platforms.includes("facebook") && (
        <span className="flex items-center justify-center w-5 h-5 rounded bg-[#1877F2]">
          <FaFacebookF className="w-3 h-3 text-white" />
        </span>
      )}
      {platforms.includes("instagram") && (
        <span className="flex items-center justify-center w-5 h-5 rounded bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <FaInstagram className="w-3 h-3 text-white" />
        </span>
      )}
    </span>
  );
}

/* ================================================================
   Accordion
   ================================================================ */

function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-50">{children}</div>
      )}
    </div>
  );
}

/* ── Shared sub-section card ─────────────────────────────────── */

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mt-4">
      <h4 className="text-[15px] font-bold text-gray-900 mb-3">{title}</h4>
      {children}
    </div>
  );
}

/* ================================================================
   Priority Badge (for execution phases)
   ================================================================ */

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "bg-purple-600 text-white",
  High: "bg-purple-500 text-white",
  Medium: "bg-purple-300 text-white",
  Low: "bg-gray-200 text-gray-600",
};

function PriorityBadge({ label }: { label: string }) {
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[label] || "bg-gray-100 text-gray-600"}`}
    >
      {label}
    </span>
  );
}

function OwnerBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
      {label}
    </span>
  );
}

/* ================================================================
   Strategy Content
   ================================================================ */

function StrategyContent({ strategy }: { strategy: any }) {
  if (!strategy || Object.keys(strategy).length === 0) {
    return (
      <p className="text-gray-400 text-sm py-3">
        No strategy data available.
      </p>
    );
  }

  // Structured format
  const overview = strategy.campaign_overview;
  const audience = strategy.target_audience;
  const messaging = strategy.key_messaging;

  // Fallback: if no structured keys exist, render raw
  if (!overview && !audience && !messaging) {
    return (
      <div className="space-y-4 pt-4">
        {Object.entries(strategy).map(([key, value]) => (
          <div key={key}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {key.replace(/_/g, " ")}
            </h4>
            <p className="text-sm text-gray-800">
              {typeof value === "string"
                ? value
                : JSON.stringify(value, null, 2)}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Campaign Overview */}
      {overview && (
        <SubSection title="Campaign Overview">
          <p className="text-sm text-gray-600 leading-relaxed">{overview}</p>
        </SubSection>
      )}

      {/* Target Audience */}
      {audience && (
        <SubSection title="Target Audience">
          {typeof audience === "string" ? (
            <p className="text-sm text-gray-600 leading-relaxed">{audience}</p>
          ) : (
            <div className="space-y-3 text-sm text-gray-700">
              {audience.description && (
                <div>
                  <p className="font-semibold text-gray-800">Description:</p>
                  <ul className="list-disc list-inside ml-1 text-gray-600">
                    <li>{audience.description}</li>
                  </ul>
                </div>
              )}
              {audience.demographics && (
                <div>
                  <p className="font-semibold text-gray-800">Demographics:</p>
                  <ul className="list-disc list-inside ml-1 text-gray-600">
                    <li>{audience.demographics}</li>
                  </ul>
                </div>
              )}
              {audience.psychographics && (
                <div>
                  <p className="font-semibold text-gray-800">
                    Psychographics:
                  </p>
                  <ul className="list-disc list-inside ml-1 text-gray-600">
                    <li>{audience.psychographics}</li>
                  </ul>
                </div>
              )}
              {audience.behaviors && (
                <div>
                  <p className="font-semibold text-gray-800">Behaviors:</p>
                  <ul className="list-disc list-inside ml-1 text-gray-600">
                    <li>{audience.behaviors}</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </SubSection>
      )}

      {/* Key Messaging */}
      {messaging && (
        <SubSection title="Key Messaging">
          {Array.isArray(messaging) ? (
            <div className="space-y-4">
              {messaging.map((msg: any, i: number) => (
                <div key={i} className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-800">
                    {msg.title || `Message ${i + 1}`}:
                  </p>
                  <ul className="list-disc list-inside ml-1 text-gray-600 mb-1">
                    <li>{msg.text}</li>
                  </ul>
                  {msg.rationale && (
                    <>
                      <p className="font-semibold text-gray-800">Rationale:</p>
                      <ul className="list-disc list-inside ml-1 text-gray-600">
                        <li>{msg.rationale}</li>
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed">
              {String(messaging)}
            </p>
          )}
        </SubSection>
      )}
    </div>
  );
}

/* ================================================================
   Plan Content
   ================================================================ */

function PlanContent({ plan }: { plan: any }) {
  if (!plan || Object.keys(plan).length === 0) {
    return (
      <p className="text-gray-400 text-sm py-3">No plan data available.</p>
    );
  }

  const details = plan.campaign_details;
  const budget = plan.budget;
  const phases = plan.execution_phases;
  const timeline = plan.timeline_overview;
  const deliverables = plan.deliverables;
  const criteria = plan.success_criteria;

  // Fallback: raw rendering if no structured keys
  if (!details && !budget && !phases && !timeline && !deliverables && !criteria) {
    return (
      <div className="space-y-4 pt-4">
        {Object.entries(plan).map(([key, value]) => (
          <div key={key}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {key.replace(/_/g, " ")}
            </h4>
            {typeof value === "object" && value !== null ? (
              <pre className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-gray-800">{String(value)}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Campaign Details */}
      {details && (
        <SubSection title="Campaign Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {[
              ["Campaign Name", details.campaign_name],
              ["Brand", details.brand],
              ["Campaign Objective", details.campaign_objective],
              ["Content Type", details.content_type],
              ["Platforms", details.platforms],
              ["Start & End Dates", details.start_end_dates],
            ].map(
              ([label, value]) =>
                value && (
                  <div key={label as string}>
                    <p className="text-gray-400 font-medium text-xs mb-0.5">
                      {label}
                    </p>
                    <p className="text-gray-800">{value}</p>
                  </div>
                ),
            )}
          </div>
        </SubSection>
      )}

      {/* Budget Allocation */}
      {budget && (
        <SubSection title="Budget Allocation">
          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-400 font-medium text-xs mb-0.5">
                Total Budget
              </p>
              <p className="text-gray-900 font-semibold">{budget.total_budget}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium text-xs mb-0.5">
                Daily Budget
              </p>
              <p className="text-gray-900 font-semibold">{budget.daily_budget}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium text-xs mb-0.5">
                Duration
              </p>
              <p className="text-gray-900 font-semibold">{budget.duration}</p>
            </div>
          </div>
          {budget.breakdown && (
            <div className="space-y-2 border-t border-gray-100 pt-3">
              {budget.breakdown.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold text-primary">
                    {item.amount}{" "}
                    <span className="text-gray-400 font-normal">
                      ({item.percentage})
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </SubSection>
      )}

      {/* Execution Phases */}
      {phases && Array.isArray(phases) && (
        <SubSection title="Execution Phases">
          <div className="space-y-6">
            {phases.map((phase: any) => (
              <div key={phase.number} className="flex gap-4">
                {/* Phase number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 mt-0.5">
                  {phase.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-[15px]">
                    {phase.title}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">{phase.duration}</p>
                  <div className="space-y-3">
                    {phase.tasks?.map((task: any, ti: number) => (
                      <div key={ti}>
                        <p className="text-sm text-gray-700 leading-relaxed mb-1.5">
                          <span className="text-gray-400 mr-1">{">"}</span>
                          {task.text}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {task.priority && (
                            <PriorityBadge label={task.priority} />
                          )}
                          {task.owner && <OwnerBadge label={task.owner} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SubSection>
      )}

      {/* Timeline Overview */}
      {timeline && Array.isArray(timeline) && (
        <SubSection title="Timeline Overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeline.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                <p className="text-xs text-gray-400 font-medium mb-0.5">
                  {item.title}
                </p>
                <p className="font-bold text-gray-900 text-sm mb-1">
                  {item.duration}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SubSection>
      )}

      {/* Deliverables */}
      {deliverables && Array.isArray(deliverables) && (
        <SubSection title="Deliverables">
          <ul className="space-y-2">
            {deliverables.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </SubSection>
      )}

      {/* Success Criteria */}
      {criteria && (
        <SubSection title="Success Criteria">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {criteria.minimum_requirements && (
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-2">
                  Minimum Requirements
                </p>
                <ul className="space-y-2">
                  {criteria.minimum_requirements.map(
                    (item: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
            {criteria.optimal_outcomes && (
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-2">
                  Optimal Outcomes
                </p>
                <ul className="space-y-2">
                  {criteria.optimal_outcomes.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SubSection>
      )}
    </div>
  );
}

/* ================================================================
   Publishing Timeline (Calendar)
   ================================================================ */

function PublishingTimeline({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-gray-400 text-sm py-3">No scheduled posts.</p>
    );
  }

  const scheduledPosts = posts.filter((p) => p.scheduling?.publish_at);
  if (scheduledPosts.length === 0) {
    return (
      <p className="text-gray-400 text-sm py-3">No scheduled posts.</p>
    );
  }

  const dates = scheduledPosts.map((p) => new Date(p.scheduling.publish_at));
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  const startMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const endMonth = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);

  // Generate weeks (Sat-start)
  const weeks: Date[][] = [];
  const current = new Date(startMonth);
  current.setDate(current.getDate() - ((current.getDay() + 1) % 7));

  while (current <= endMonth || weeks.length === 0) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
    if (current > endMonth && weeks.length >= 4) break;
  }

  const dayLabels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];

  const postsByDate: Record<string, any[]> = {};
  scheduledPosts.forEach((post) => {
    const dateKey = new Date(post.scheduling.publish_at)
      .toISOString()
      .split("T")[0];
    if (!postsByDate[dateKey]) postsByDate[dateKey] = [];
    postsByDate[dateKey].push(post);
  });

  return (
    <div className="pt-4">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-px mb-1">
        {dayLabels.map((d) => (
          <div
            key={d}
            className="text-xs font-semibold text-gray-500 text-center py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden">
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const dateKey = day.toISOString().split("T")[0];
            const dayPosts = postsByDate[dateKey] || [];
            const isInRange = day >= startMonth && day <= endMonth;

            return (
              <div
                key={`${wi}-${di}`}
                className={`bg-white min-h-[80px] p-1.5 ${!isInRange ? "opacity-40" : ""}`}
              >
                <span className="text-[11px] text-gray-400 font-medium">
                  {day.getDate() === 1
                    ? `${day.toLocaleDateString("en-US", { month: "short" })} ${day.getDate()}`
                    : day.getDate()}
                </span>
                {dayPosts.map((post: any, pi: number) => (
                  <div
                    key={pi}
                    className="mt-1 bg-primary/10 rounded px-1.5 py-1 text-[10px] font-medium text-primary truncate border border-primary/20"
                  >
                    <span className="truncate block">
                      {post.title || `Post ${post.post_number}`}
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {post.platform === "facebook" && (
                        <span className="flex items-center justify-center w-3 h-3 rounded-sm bg-[#1877F2]">
                          <FaFacebookF className="w-2 h-2 text-white" />
                        </span>
                      )}
                      {post.platform === "instagram" && (
                        <span className="flex items-center justify-center w-3 h-3 rounded-sm bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                          <FaInstagram className="w-2 h-2 text-white" />
                        </span>
                      )}
                      <span className="text-[9px] text-gray-500">
                        {new Date(
                          post.scheduling.publish_at,
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

/* ================================================================
   Additional Information
   ================================================================ */

function AdditionalInfo({
  keyMessage,
  targetAudience,
  dict,
}: {
  keyMessage: string;
  targetAudience: string;
  dict: any;
}) {
  const d = dict?.dashboard?.pages?.campaigns?.detail || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          {d.keyMessage || "Key Message"}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {keyMessage || "—"}
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          {d.targetAudience || "Target Audience"}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {targetAudience || "—"}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   Main Component
   ================================================================ */

export default function CampaignDetailClient({
  dict,
  lang,
  campaignId,
}: CampaignDetailClientProps) {
  const router = useRouter();
  const { isGuest } = useAuth();
  const d = (dict as any)?.dashboard?.pages?.campaigns?.detail || {};
  const c = (dict as any)?.dashboard?.pages?.campaigns || {};

  const [campaign, setCampaign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "analytics">(
    "details",
  );

  useEffect(() => {
    const fetchCampaign = async () => {
      setIsLoading(true);

      if (isGuest) {
        const dummy = dummyCampaigns.find((c) => c.id === campaignId);
        if (dummy) setCampaign(buildDummyDetail(dummy));
        setIsLoading(false);
        return;
      }

      const result = await getCampaignFull(campaignId);
      if (result.success && result.campaign) {
        setCampaign(result.campaign);
      }
      setIsLoading(false);
    };

    fetchCampaign();
  }, [campaignId, isGuest]);

  /* ── Loading ─────────────────────────────────────────── */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg
          className="animate-spin h-8 w-8 text-primary"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            className="opacity-75"
          />
        </svg>
      </div>
    );
  }

  /* ── Not found ───────────────────────────────────────── */

  if (!campaign) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500 font-medium">Campaign not found.</p>
        <button
          onClick={() => router.push(`/${lang}/campaigns`)}
          className="mt-4 text-primary font-semibold hover:underline"
        >
          ← {d.backToCampaigns || "Campaigns"}
        </button>
      </div>
    );
  }

  /* ── Derived values ──────────────────────────────────── */

  const statusLabel =
    campaign.status === "active"
      ? c.statusLive || "Live"
      : campaign.status === "completed"
        ? c.statusCompleted || "Completed"
        : campaign.status === "draft"
          ? c.statusDraft || "Draft"
          : campaign.status;

  const platforms: string[] = [];
  if (campaign._ui?.platforms) {
    platforms.push(...campaign._ui.platforms);
  } else {
    const type =
      campaign.external?.connected_account_type ||
      campaign.connected_account_type;
    if (type === "facebook_page" || type === "ad_account")
      platforms.push("facebook");
    if (type === "instagram_account" || type === "ad_account")
      platforms.push("instagram");
  }

  const dateRange =
    campaign._ui?.dateRange ||
    (() => {
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
    })();

  const campaignTitle = campaign.title || campaign.campaign_title;

  /* ── Render ──────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* ── Top Bar Pill (Breadcrumb) ──────────────────── */}
      <div className="flex items-center gap-2 w-full bg-white rounded-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] border border-gray-100 px-6 py-4">
        <button
          onClick={() => router.push(`/${lang}/campaigns`)}
          className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5"
        >
          <Megaphone className="w-4 h-4" />
          {d.backToCampaigns || "Campaigns"}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-sm font-bold text-gray-900 truncate">
          {campaignTitle}
        </span>
        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100/80 text-gray-500 rounded-full border border-gray-200 ml-1">
          Plus
        </span>
      </div>

      {/* ── Main Content Block ────────────────────────── */}
      <div className="bg-white rounded-[2rem] shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] border border-gray-100/80 w-full overflow-hidden mb-12">
        <div className="w-full mx-auto pb-10">
          {/* Hero Section */}
          <div className="text-center pt-10 pb-6 relative bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-white overflow-hidden mb-2">
            <div className="flex justify-center mb-5">
              <Image
                src={enablrIcon}
                alt="enablr"
                width={80}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#111827] tracking-tight">
                {campaignTitle}
              </h2>
              <StatusBadge status={campaign.status} label={statusLabel} />
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>
                {statusLabel}: {dateRange}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                {c.platforms || "Platforms"}
                <PlatformIconsRow platforms={platforms} />
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-8 border-b border-gray-100 px-6 mb-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {d.campaignDetails || "Campaign Details"}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "analytics"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {d.campaignAnalytics || "Campaign Analytics"}
            </button>
          </div>

          {/* Tab Content */}
          <div className="px-6 lg:px-10">
            {activeTab === "details" && (
              <div className="flex flex-col gap-4">
                <Accordion
                  title={d.strategy || "Campaign Strategy"}
                  icon={<Megaphone className="w-5 h-5 text-gray-500" />}
                >
                  <StrategyContent strategy={campaign.strategy || {}} />
                </Accordion>

                <Accordion
                  title={d.plan || "Campaign Plan"}
                  icon={<Megaphone className="w-5 h-5 text-gray-500" />}
                >
                  <PlanContent plan={campaign.plan || {}} />
                </Accordion>

                <Accordion
                  title={d.timeline || "Publishing Timeline"}
                  icon={<Megaphone className="w-5 h-5 text-gray-500" />}
                  defaultOpen={true}
                >
                  <PublishingTimeline posts={campaign.posts || []} />
                </Accordion>

                <Accordion
                  title={d.additionalInfo || "Additional Information"}
                  icon={<Megaphone className="w-5 h-5 text-gray-500" />}
                  defaultOpen={true}
                >
                  <AdditionalInfo
                    keyMessage={campaign.branding?.key_message || ""}
                    targetAudience={campaign.target_audience || ""}
                    dict={dict}
                  />
                </Accordion>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="text-center py-16">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                  {d.analyticsWip || "Campaign analytics coming soon."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
