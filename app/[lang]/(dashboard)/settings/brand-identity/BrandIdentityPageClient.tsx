"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import { Palette } from "lucide-react";

interface BrandIdentityPageClientProps {
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
}

export default function BrandIdentityPageClient({ dict, lang }: BrandIdentityPageClientProps) {
  // profileData contains dynamic API response — cast for property access
  const { profileData: rawProfileData, isGuest } = useAuth();
  const profileData = rawProfileData as any;
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Palette className="w-5 h-5 text-gray-500" />
          {dict.dashboard?.pages?.settings?.brandIdentity?.title || "Brand Identity"}
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-4 lg:px-8 py-8">
        {profileData?.brand_identity ? (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Current Brand Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Brand Name</p>
                  <p className="font-medium text-gray-900">{profileData.brand_identity.brand_name || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tone & Style</p>
                  <p className="font-medium text-gray-900">{profileData.brand_identity.tone_style || "—"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Core Value Proposition</p>
                  <p className="font-medium text-gray-900">{profileData.brand_identity.core_value_proposition || "—"}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push(`/${lang}/onboarding`)}
              className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Edit Brand Identity
            </button>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {dict.dashboard?.pages?.settings?.brandIdentity?.title || "Brand Identity"}
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {dict.dashboard?.pages?.settings?.brandIdentity?.description || "Define and manage your brand's visual identity and guidelines."}
            </p>
            {!isGuest && (
              <button
                onClick={() => router.push(`/${lang}/onboarding`)}
                className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Set Up Brand Identity
              </button>
            )}
            {isGuest && (
              <p className="text-sm text-purple-600 mt-4 font-medium">
                🔒 Sign up to set up your brand identity
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
