"use client";

import { useRouter } from "next/navigation";

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
}

export function FinishStep({ formData, onBack }: FinishStepProps) {
  const router = useRouter();

  const handleFinish = () => {
    // TODO: Save data to backend/database
    console.log("Onboarding complete:", formData);

    // Redirect to dashboard or chat
    router.push("/en/chat");
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-600"
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
          You're all set!
        </h2>
        <p className="text-gray-600">
          Review your business profile and start creating content
        </p>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Left Column */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-5">
          {/* Business Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Business:
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {formData.businessName}
            </p>
          </div>

          {/* Industry */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Industry:
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {formData.industry}
            </p>
          </div>

          {/* Website (if provided) */}
          {formData.websiteUrl && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Website:
              </h3>
              <a
                href={formData.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700"
              >
                {formData.websiteUrl}
              </a>
            </div>
          )}

          {/* Target Audience */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Target Audience:
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {formData.targetDemographics}
            </p>
          </div>

          {/* Tone */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Tone:
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
              Goals:
            </h3>
            <ul className="space-y-1">
              {formData.businessGoals.map((goal, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-900"
                >
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0"
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
                Audience Interests:
              </h3>
              <p className="text-gray-900">{formData.interests}</p>
            </div>
          )}

          {/* Pain Points (if provided) */}
          {formData.painPoints && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Audience Pain Points:
              </h3>
              <p className="text-gray-900">{formData.painPoints}</p>
            </div>
          )}

          {/* Brand Keywords (if provided) */}
          {formData.brandKeywords.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Brand Keywords:
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
          💡 You can always update these settings later from your dashboard.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 border border-gray-300 text-foreground font-semibold rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleFinish}
          className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
