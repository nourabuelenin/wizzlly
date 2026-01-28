"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import { type Locale } from "@/lib/i18n/config";
import { getProfile } from "@/lib/api/auth";
import {
  Building2,
  Palette,
  Globe,
  Settings,
  Users,
  Edit2,
  MapPin,
  DollarSign,
  Clock,
  Target,
} from "lucide-react";

interface ProfilePageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

// Mock data based on the API response structure
const mockProfileData = {
  knowledge_base: {
    brand_name: "Adwat Digital Solutions",
    industry: "Technology",
    brand_colors: ["#FF5733", "#3498DB", "#2ECC71"],
    logo_url: "https://example.com/logo.png",
    brand_description:
      "Leading provider of innovative digital solutions, specializing in AI-powered marketing automation and creative content generation for modern businesses.",
    ad_account_id: "act_123456789",
    business_id: "biz_987654321",
    currency: "USD",
    timezone: "America/New_York",
    country: "US",
    historical_insights: {},
    target_audience: {
      demographics: "Business owners, Marketing professionals, Entrepreneurs",
      interests: ["Digital Marketing", "AI Technology", "Business Growth"],
      pain_points: [
        "Limited time for content creation",
        "Inconsistent brand messaging",
        "Low engagement rates",
      ],
    },
    preferred_platforms: ["facebook", "instagram", "linkedin"],
    preferred_tone: "professional",
    preferred_language: "en",
  },
};

export default function ProfilePageClient({
  dict,
  lang,
}: ProfilePageClientProps) {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const result = await getProfile();

        if (result.success && result.user) {
          setProfileData(result.user);
        } else {
          setError(result.error || "Failed to load profile");
          toast.error("Failed to load profile");
          
          // If not authenticated, redirect to auth
          if (result.error === "Not authenticated") {
            router.push(`/${lang}/auth`);
          }
        }
      } catch (err) {
        setError("An unexpected error occurred");
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [lang, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar dict={dict} lang={lang} />
        <div className="flex flex-col flex-1">
          <ChatHeader dict={dict} lang={lang} />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !profileData) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar dict={dict} lang={lang} />
        <div className="flex flex-col flex-1">
          <ChatHeader dict={dict} lang={lang} />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || "Profile not found"}</p>
              <button
                onClick={() => router.push(`/${lang}/dashboard`)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const kb = profileData.knowledge_base || {};

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar dict={dict} lang={lang} />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <ChatHeader dict={dict} lang={lang} />

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                    {(kb.brand_name || profileData.username || "U")
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {kb.brand_name || `${profileData.first_name} ${profileData.last_name}` || profileData.username}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {kb.industry || profileData.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/${lang}/onboarding`)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Grid Layout for Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Information */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Business Information
                  </h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Brand Name</p>
                    <p className="text-gray-900 font-medium">
                      {kb.brand_name || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="text-gray-900 font-medium">
                      {kb.industry || "Not set"}
                    </p>
                  </div>
                  {kb.brand_description && (
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {kb.brand_description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Brand Colors */}
              {kb.brand_colors && kb.brand_colors.length > 0 && (
                <div className="bg-white rounded-lg border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-gray-700" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Brand Colors
                    </h2>
                  </div>
                  <div className="flex gap-3">
                    {kb.brand_colors.map((color: string, index: number) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p className="text-xs text-gray-600 mt-2 font-mono">
                          {color}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Account Settings */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Account Settings
                  </h2>
                </div>
                <div className="space-y-3">
                  {kb.business_id && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Business ID</p>
                        <p className="text-gray-900 font-mono text-sm">
                          {kb.business_id}
                        </p>
                      </div>
                    </div>
                  )}
                  {kb.currency && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Currency</p>
                        <p className="text-gray-900 font-medium">
                          {kb.currency}
                        </p>
                      </div>
                    </div>
                  )}
                  {kb.timezone && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Timezone</p>
                        <p className="text-gray-900 text-sm">
                          {kb.timezone}
                        </p>
                      </div>
                    </div>
                  )}
                  {kb.country && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Country</p>
                        <p className="text-gray-900 font-medium">
                          {kb.country}
                        </p>
                      </div>
                    </div>
                  )}
                  {!kb.business_id && !kb.currency && !kb.timezone && !kb.country && (
                    <p className="text-sm text-gray-500">No account settings configured yet</p>
                  )}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Preferences
                  </h2>
                </div>
                <div className="space-y-3">
                  {kb.preferred_platforms && kb.preferred_platforms.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">
                        Preferred Platforms
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {kb.preferred_platforms.map((platform: string) => (
                          <span
                            key={platform}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {kb.preferred_tone && (
                    <div>
                      <p className="text-sm text-gray-500">Tone of Voice</p>
                      <p className="text-gray-900 font-medium capitalize">
                        {kb.preferred_tone}
                      </p>
                    </div>
                  )}
                  {kb.preferred_language && (
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p className="text-gray-900 font-medium uppercase">
                        {kb.preferred_language}
                      </p>
                    </div>
                  )}
                  {!kb.preferred_platforms && !kb.preferred_tone && !kb.preferred_language && (
                    <p className="text-sm text-gray-500">No preferences set yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Target Audience - Full Width */}
            {kb.target_audience && (
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Target Audience
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {kb.target_audience.demographics && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Demographics
                      </p>
                      <p className="text-gray-900 text-sm">
                        {kb.target_audience.demographics}
                      </p>
                    </div>
                  )}
                  {kb.target_audience.interests && kb.target_audience.interests.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Interests
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {kb.target_audience.interests.map((interest: string) => (
                          <span
                            key={interest}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {kb.target_audience.pain_points && kb.target_audience.pain_points.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Pain Points
                      </p>
                      <ul className="space-y-1">
                        {kb.target_audience.pain_points.map((point: string, index: number) => (
                          <li
                            key={index}
                            className="text-gray-900 text-sm flex items-start gap-2"
                          >
                            <span className="text-red-500 mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ad Account Info */}
            {kb.ad_account_id && (
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Advertising Account
                  </h2>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ad Account ID</p>
                  <p className="text-gray-900 font-mono text-sm mt-1">
                    {kb.ad_account_id}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
