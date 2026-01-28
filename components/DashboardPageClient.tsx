"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import { type Locale } from "@/lib/i18n/config";
import { getProfile } from "@/lib/api/auth";
import {
  MessageSquare,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Plus,
} from "lucide-react";

interface DashboardPageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

export default function DashboardPageClient({
  dict,
  lang,
}: DashboardPageClientProps) {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const result = await getProfile();

        if (result.success && result.user) {
          setProfileData(result.user);
        } else {
          // If not authenticated, redirect to auth
          if (result.error === "Not authenticated") {
            router.push(`/${lang}/auth`);
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [lang, router]);

  const brandName =
    profileData?.knowledge_base?.brand_name ||
    `${profileData?.first_name} ${profileData?.last_name}` ||
    "User";

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar dict={dict} />
        <div className="flex flex-col flex-1">
          <ChatHeader dict={dict} lang={lang} />
          <div className="flex-1 flex items-center justify-center">
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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar dict={dict} />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <ChatHeader dict={dict} lang={lang} />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Welcome Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {profileData?.first_name || brandName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your marketing campaigns
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Campaigns Stat */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Campaigns</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                    <p className="text-xs text-gray-500 mt-1">No campaigns yet</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Posts Stat */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Posts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                    <p className="text-xs text-gray-500 mt-1">No posts yet</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Reach Stat */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reach</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                    <p className="text-xs text-gray-500 mt-1">People reached</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Scheduled Stat */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Scheduled</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                    <p className="text-xs text-gray-500 mt-1">Posts scheduled</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push(`/${lang}/chat`)}
                  className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Start New Chat</p>
                    <p className="text-sm text-gray-500">
                      Create campaign with AI
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => router.push(`/${lang}/profile`)}
                  className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">View Profile</p>
                    <p className="text-sm text-gray-500">
                      Update business info
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => router.push(`/${lang}/onboarding`)}
                  className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Update Settings</p>
                    <p className="text-sm text-gray-500">
                      Edit business profile
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Getting Started Section */}
            {(!profileData?.knowledge_base?.brand_name) && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Complete Your Profile
                    </h3>
                    <p className="text-gray-600 mb-4">
                      To get the most out of Wizlly, complete your business profile
                      to help our AI create better campaigns for you.
                    </p>
                    <button
                      onClick={() => router.push(`/${lang}/onboarding`)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Complete Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity - Empty State */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No activity yet</p>
                <p className="text-sm text-gray-500 mb-6">
                  Start by creating your first campaign with our AI assistant
                </p>
                <button
                  onClick={() => router.push(`/${lang}/chat`)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Start Your First Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
