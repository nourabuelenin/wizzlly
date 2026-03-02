"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { type Locale } from "@/lib/i18n/config";
import PageShell from "@/components/dashboard/PageShell";
import {
  Briefcase,
  Sparkles,
  Target,
  LineChart,
  Users,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Award,
  BarChart3,
  Globe,
  PieChart,
} from "lucide-react";
import {
  getLatestSwot,
  getLatestMarket,
  getLatestCompetitor,
  runSwotAnalysis,
  runMarketAnalysis,
  runCompetitorAnalysis,
} from "@/lib/api/analysis";
import {
  dummySwotData,
  dummyMarketData,
  dummyCompetitorData,
} from "@/data/dummy-market-data";

interface MarketOverviewPageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

type TabKey = "business" | "market" | "competitor";

export default function MarketOverviewPageClient({
  dict,
  lang,
}: MarketOverviewPageClientProps) {
  const { isGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("business");

  // Data states
  const [swotData, setSwotData] = useState<any>(null);
  const [marketData, setMarketData] = useState<any>(null);
  const [competitorData, setCompetitorData] = useState<any>(null);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (isGuest) {
        // Simulate empty state first, or just load data if you want it pre-filled
        // For guest mode, let's start empty to show the beautiful empty states,
        // and clicking "Analyze" will load the dummy data.
        setSwotData(null);
        setMarketData(null);
        setCompetitorData(null);
        setIsLoading(false);
        return;
      }

      try {
        const [swotRes, marketRes, compRes] = await Promise.all([
          getLatestSwot(),
          getLatestMarket(),
          getLatestCompetitor(),
        ]);
        if (swotRes.success && swotRes.data && !(swotRes.data as any).error) setSwotData(swotRes.data);
        if (marketRes.success && marketRes.data && !(marketRes.data as any).error) setMarketData(marketRes.data);
        if (compRes.success && compRes.data && !(compRes.data as any).error) setCompetitorData(compRes.data);
      } catch (err) {
        console.error("Failed to fetch market overview data", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isGuest]);

  // Action handlers
  const handleAnalyze = async (type: TabKey) => {
    setIsAnalyzing(true);
    if (isGuest) {
      // Simulate analysis delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (type === "business") setSwotData(dummySwotData);
      if (type === "market") setMarketData(dummyMarketData);
      if (type === "competitor") setCompetitorData(dummyCompetitorData);
      setIsAnalyzing(false);
      return;
    }

    try {
      if (type === "business") {
        const res = await runSwotAnalysis({}); // requires business_profile ID in real app
        if (res.success && res.data) setSwotData(res.data);
      } else if (type === "market") {
        const res = await runMarketAnalysis({});
        if (res.success && res.data) setMarketData(res.data);
      } else if (type === "competitor") {
        const res = await runCompetitorAnalysis({});
        if (res.success && res.data) setCompetitorData(res.data);
      }
    } catch (err) {
      console.error(`Failed to run ${type} analysis`, err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /* ── 1. Empty State Renderer ───────────────────────────────── */

  const renderEmptyState = (type: TabKey) => {
    const config = {
      business: {
        title: "Want a closer look at your business?",
        desc: "Generate a full AI-powered business report including strengths, weaknesses, opportunities, competitor insights, and growth recommendations.",
        steps: ["Analyze your brand data", "Evaluate market position", "Get actionable growth insights"],
        btnText: "Analyze My Business",
      },
      market: {
        title: "Want to understand your market better?",
        desc: "Get a comprehensive overview of your market landscape including trends, demand patterns, audience insights, and potential gaps you can leverage.",
        steps: ["Analyze industry trends", "Identify target audience segments", "Discover market opportunities"],
        btnText: "Analyze My Market",
      },
      competitor: {
        title: "Curious how you compare to competitors?",
        desc: "Understand how competitors position themselves, where they outperform, and where your brand can stand out and win.",
        steps: ["Identify key competitors", "Compare positioning & strategy", "Reveal competitive advantages"],
        btnText: "Analyze My Competitors",
      },
    }[type];

    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="w-20 h-20 bg-indigo-50/80 rounded-full flex items-center justify-center mb-6 shadow-sm border border-indigo-100/50">
          <Sparkles className="w-10 h-10 text-indigo-400" />
        </div>
        <h3 className="text-[28px] font-bold text-gray-900 mb-4 tracking-tight">
          {config.title}
        </h3>
        <p className="text-base text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          {config.desc}
        </p>

        {/* 3 Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 w-full max-w-4xl text-sm font-medium text-gray-600">
          {config.steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-gray-200 text-gray-400 text-xs font-bold">
                {idx + 1}
              </span>
              <span>{step}</span>
              {idx < config.steps.length - 1 && (
                <div className="hidden md:block w-12 h-px bg-gray-200 ml-4"></div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => handleAnalyze(type)}
          disabled={isAnalyzing}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors shadow-md disabled:opacity-70 flex flex-col items-center justify-center min-w-[240px]"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
              </svg>
              Analyzing...
            </span>
          ) : (
            <span>{config.btnText}</span>
          )}
        </button>
        <p className="text-xs text-gray-400 mt-3 font-medium">Takes less than 30 seconds</p>
      </div>
    );
  };

  /* ── 2. Filled State Renderers ─────────────────────────────── */

  const renderBusinessData = () => {
    if (!swotData) return renderEmptyState("business");
    return (
      <div className="space-y-6">
        {/* Top Row: Snapshot & Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              Business Snapshot
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400 font-medium mb-1">Company & Industry</p>
                <p className="text-gray-900 font-semibold">{swotData.business_profile_name} — <span className="text-gray-600 font-normal">{swotData.industry_niche}</span></p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-1">Value Proposition</p>
                <p className="text-gray-800 leading-relaxed">{swotData.value_proposition}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-1">Target Segment</p>
                <p className="text-gray-800 leading-relaxed">{swotData.target_customer_segment}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-1.5">Key Differentiators</p>
                <div className="flex flex-wrap gap-2">
                  {swotData.key_differentiators?.map((d: string, i: number) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Customer Journey Overview
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1.5 rounded-full bg-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Awareness</p>
                  <p className="text-sm text-gray-700">{swotData.awareness_channels?.join(", ")}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 rounded-full bg-pink-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Consideration</p>
                  <p className="text-sm text-gray-700">{swotData.consideration_factors?.join(", ")}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Conversion</p>
                  <p className="text-sm text-gray-700">{swotData.conversion_triggers?.join(", ")}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 rounded-full bg-orange-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Retention</p>
                  <p className="text-sm text-gray-700">{swotData.retention_drivers?.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SWOT Matrix */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-indigo-500" />
            SWOT Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100">
              <h4 className="text-emerald-800 font-bold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Strengths
              </h4>
              <ul className="space-y-2">
                {swotData.strengths?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-emerald-500 mt-1">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Weaknesses */}
            <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
              <h4 className="text-orange-800 font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Weaknesses
              </h4>
              <ul className="space-y-2">
                {swotData.weaknesses?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-orange-500 mt-1">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Opportunities */}
            <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
              <h4 className="text-blue-800 font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Opportunities
              </h4>
              <ul className="space-y-2">
                {swotData.opportunities?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-blue-500 mt-1">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Threats */}
            <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-100">
              <h4 className="text-rose-800 font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Threats
              </h4>
              <ul className="space-y-2">
                {swotData.threats?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-rose-500 mt-1">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMarketData = () => {
    if (!marketData) return renderEmptyState("market");
    return (
      <div className="space-y-6">
        {/* TAM SAM SOM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <h4 className="font-bold text-gray-900">TAM (Total Market)</h4>
            </div>
            <p className="text-3xl font-extrabold text-blue-600 mb-2">{marketData.tam_value}</p>
            <p className="text-sm text-gray-600 mb-2">{marketData.tam_description}</p>
            <p className="text-xs text-gray-400 font-medium">Source: {marketData.tam_source}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-5 h-5 text-indigo-500" />
              <h4 className="font-bold text-gray-900">SAM (Serviceable)</h4>
            </div>
            <p className="text-3xl font-extrabold text-indigo-600 mb-2">{marketData.sam_value}</p>
            <p className="text-sm text-gray-600 mb-2">{marketData.sam_description}</p>
            <p className="text-xs text-gray-400 font-medium">Source: {marketData.sam_source}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-500" />
              <h4 className="font-bold text-gray-900">SOM (Obtainable)</h4>
            </div>
            <p className="text-3xl font-extrabold text-purple-600 mb-2">{marketData.som_value}</p>
            <p className="text-sm text-gray-600 mb-2">{marketData.som_description}</p>
            <p className="text-xs text-gray-400 font-medium">Source: {marketData.som_source}</p>
          </div>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Market Trends & Opportunities
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Key Trends</h4>
                <ul className="space-y-2">
                  {marketData.market_trends?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Opportunities</h4>
                <ul className="space-y-2">
                  {marketData.opportunities?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Growth & Demand
            </h3>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Projected Growth</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-gray-900">{marketData.growth_rate?.amount}</span>
                  <span className="text-sm text-gray-500">{marketData.growth_rate?.description}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Demand Signals</p>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Search Volume</p>
                    <p className="text-sm font-medium text-gray-800">{marketData.demand_data?.search_volume}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Seasonality</p>
                    <p className="text-sm font-medium text-gray-800">{marketData.demand_data?.seasonality}</p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Potential Challenges</p>
                <ul className="space-y-2">
                  {marketData.challenges?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompetitorData = () => {
    if (!competitorData) return renderEmptyState("competitor");
    return (
      <div className="space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Direct Competitors
            </h3>
            <div className="space-y-3">
              {competitorData.direct_competitors?.map((comp: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1">{comp.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{comp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                Alternative Solutions
              </h3>
              <ul className="space-y-2">
                {competitorData.alternative_solutions?.map((alt: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {alt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6 shadow-sm flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                Your Advantages
              </h3>
              <ul className="space-y-2 mb-6">
                {competitorData.your_advantages?.map((adv: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {adv}
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Strategic Gaps
              </h3>
              <ul className="space-y-2">
                {competitorData.your_gaps?.map((gap: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-orange-500 mt-0.5 font-bold">•</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison Matrix */}
        {competitorData.comparison_matrix && (
          <div className="bg-white rounded-2xl border border-gray-100 p-1 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                Comparison Matrix
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 text-gray-500 font-semibold">
                  <tr>
                    {competitorData.comparison_matrix.headers?.map((h: string, i: number) => (
                      <th key={i} className="px-6 py-4 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {competitorData.comparison_matrix.rows?.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-primary font-medium">{row.you}</td>
                      <td className="px-6 py-4 text-gray-600">{row.comp1}</td>
                      <td className="px-6 py-4 text-gray-600">{row.comp2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ── Main Render ───────────────────────────────────────────── */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
        </svg>
      </div>
    );
  }

  // Derive dynamic page title based on active tab
  const getTabLabel = (key: TabKey) => {
    if (key === "business") return "Business Analysis";
    if (key === "market") return "Market Analysis";
    if (key === "competitor") return "Competitor Analysis";
    return "";
  };

  return (
    <PageShell
      icon={<Briefcase className="w-4 h-4" />}
      title={getTabLabel(activeTab)}
      heroTitle="enablr, your marketing assistant"
      heroSubtitle="AI-powered insights and campaign generation"
    >
      <div className="w-full">
        {/* Tabs */}
        <div className="flex items-center justify-center gap-6 md:gap-10 border-b border-gray-100 mb-8 mx-auto w-full max-w-2xl px-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab("business")}
            className={`pb-3 text-sm font-bold border-b-[3px] transition-colors whitespace-nowrap ${
              activeTab === "business"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Business Analysis
          </button>
          <button
            onClick={() => setActiveTab("market")}
            className={`pb-3 text-sm font-bold border-b-[3px] transition-colors whitespace-nowrap ${
              activeTab === "market"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Market Analysis
          </button>
          <button
            onClick={() => setActiveTab("competitor")}
            className={`pb-3 text-sm font-bold border-b-[3px] transition-colors whitespace-nowrap ${
              activeTab === "competitor"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Competitor Analysis
          </button>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "business" && renderBusinessData()}
          {activeTab === "market" && renderMarketData()}
          {activeTab === "competitor" && renderCompetitorData()}
        </div>
      </div>
    </PageShell>
  );
}
