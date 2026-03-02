"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Dictionary } from "@/types/dictionary";
import { updateProfile } from "@/lib/api/auth";

interface FinishStepProps {
  formData: {
    businessName: string;
    industry: string;
    websiteUrl: string;
    targetDemographics: string;
    interests: string;
    painPoints: string;
    businessGoals: string[];
    toneOfVoice: string;
    brandKeywords: string[];
  };
  onBack: () => void;
  dict: Dictionary | null;
}

export function FinishStep({ formData, onBack, dict }: FinishStepProps) {
  const router = useRouter();
  const params = useParams();
  const currentLang = (params.lang as string) || "en";
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async () => {
    setIsLoading(true);

    try {
      // Transform form data to match API structure
      const knowledge_base = {
        brand: {
          name: formData.businessName,
          industry: formData.industry,
          description: `${formData.businessName} - ${formData.industry}`,
        },
        account: {
          // Optional account fields - can be added later
        },
        preferences: {
          tone: formData.toneOfVoice.toLowerCase(),
          language: currentLang,
        },
      };

      // Add optional fields if provided
      if (formData.interests || formData.painPoints || formData.targetDemographics) {
        (knowledge_base as any).target_audience = {
          demographics: formData.targetDemographics,
          interests: formData.interests ? formData.interests.split(",").map(i => i.trim()) : [],
          pain_points: formData.painPoints ? formData.painPoints.split(",").map(p => p.trim()) : [],
        };
      }

      if (formData.businessGoals.length > 0) {
        (knowledge_base as any).business_goals = formData.businessGoals;
      }

      if (formData.brandKeywords.length > 0) {
        (knowledge_base as any).brand_keywords = formData.brandKeywords;
      }

      // Update profile with knowledge_base
      const result = await updateProfile({ knowledge_base });

      if (result.success) {
        toast.success("Profile updated successfully!");
        
        // Redirect to dashboard
        router.push(`/${currentLang}/dashboard`);
      } else {
        toast.error(result.error || "Failed to save profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {dict?.onboarding?.finish?.heading || "You're all set!"}
        </h2>
        <p className="text-gray-600">
          {dict?.onboarding?.finish?.subheading ||
            "Review your business profile and start creating content"}
        </p>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Left Column */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-5">
          {/* Business Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {dict?.onboarding?.finish?.labels?.business || "Business"}:
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {formData.businessName}
            </p>
          </div>

          {/* Industry */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {dict?.onboarding?.finish?.labels?.industry || "Industry"}:
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {formData.industry}
            </p>
          </div>

          {/* Website (if provided) */}
          {formData.websiteUrl && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {dict?.onboarding?.finish?.labels?.website || "Website"}:
              </h3>
              <a
                href={formData.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-primary hover:text-primary/90"
              >
                {formData.websiteUrl}
              </a>
            </div>
          )}

          {/* Target Audience */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {dict?.onboarding?.finish?.labels?.targetAudience ||
                "Target Audience"}
              :
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {formData.targetDemographics}
            </p>
          </div>

          {/* Tone */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {dict?.onboarding?.finish?.labels?.tone || "Tone"}:
            </h3>
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {formData.toneOfVoice.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-5">
          {/* Goals */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {dict?.onboarding?.finish?.labels?.goals || "Goals"}:
            </h3>
            <ul className="space-y-1">
              {formData.businessGoals.map((goal, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-900"
                >
                  <svg
                    className="w-5 h-5 text-primary shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interests (if provided) */}
          {formData.interests && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {dict?.onboarding?.finish?.labels?.interests ||
                  "Audience Interests"}
                :
              </h3>
              <p className="text-gray-900">{formData.interests}</p>
            </div>
          )}

          {/* Pain Points (if provided) */}
          {formData.painPoints && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {dict?.onboarding?.finish?.labels?.painPoints ||
                  "Audience Pain Points"}
                :
              </h3>
              <p className="text-gray-900">{formData.painPoints}</p>
            </div>
          )}

          {/* Brand Keywords (if provided) */}
          {formData.brandKeywords.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {dict?.onboarding?.finish?.labels?.keywords || "Brand Keywords"}
                :
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.brandKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="text-sm text-primary text-center">
          {dict?.onboarding?.finish?.message ||
            "💡 You can always update these settings later from your dashboard."}
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 border border-gray-300 text-foreground font-semibold rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
        >
          {dict?.onboarding?.finish?.back || "Back"}
        </button>
        <button
          type="button"
          onClick={handleFinish}
          disabled={isLoading}
          className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isLoading ? "Saving..." : (dict?.onboarding?.finish?.getStarted || "Get Started")}
        </button>
      </div>
    </div>
  );
}
