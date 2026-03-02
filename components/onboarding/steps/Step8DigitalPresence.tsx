import OnboardingFormLayout from "../OnboardingFormLayout";

interface Step8Data {
  has_website: boolean;
  website_url: string;
  social_platforms: string[];
  has_previous_ads: boolean;
}

interface StepProps {
  formData: Step8Data;
  onUpdate: (data: Partial<Step8Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any;
}

const SOCIAL_PLATFORMS = [
  { id: "Facebook", label: "Facebook", icon: "📘" },
  { id: "Instagram", label: "Instagram", icon: "📸" },
  { id: "Tiktok", label: "Tiktok", icon: "🎵" },
  { id: "Twitter/X", label: "Twitter/X", icon: "𝕏" },
  { id: "Linkedin", label: "Linkedin", icon: "💼" },
  { id: "Youtube", label: "Youtube", icon: "▶️" },
  { id: "Snapchat", label: "Snapchat", icon: "👻" },
];

export default function Step8DigitalPresence({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: StepProps) {
  const togglePlatform = (platformId: string) => {
    const currentPlatforms = formData.social_platforms || [];
    if (currentPlatforms.includes(platformId)) {
      onUpdate({ social_platforms: currentPlatforms.filter((id: string) => id !== platformId) });
    } else {
      onUpdate({ social_platforms: [...currentPlatforms, platformId] });
    }
  };

  return (
    <OnboardingFormLayout
      title={dict?.onboarding?.step8?.title || "Digital Presence"}
      subtitle={dict?.onboarding?.step8?.subtitle || "Tell us about your online presence and experience."}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting || (formData.has_website && !formData.website_url)}
      nextLabel={isSubmitting ? (dict?.onboarding?.step8?.submitting || "Submitting...") : (dict?.onboarding?.step8?.nextLabel || "Let's Start")}
    >
      <div className="space-y-6 mt-4">
        {/* Do you have a website? */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Do you have a website?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => onUpdate({ has_website: true })}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.has_website === true
                  ? "border-transparent bg-primary/5 text-primary font-medium"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-700 font-medium"
              }`}
            >
              <span className="text-sm">Yes, I have one.</span>
            </div>

            <div
              onClick={() => onUpdate({ has_website: false, website_url: "" })}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.has_website === false
                  ? "border-transparent bg-primary/5 text-primary font-medium"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-500 font-medium"
              }`}
            >
              <span className="text-sm">No, not yet.</span>
            </div>
          </div>
        </div>

        {/* Website URL Input */}
        {formData.has_website && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Website
            </label>
            <input
              type="url"
              value={formData.website_url || ""}
              onChange={(e) => onUpdate({ website_url: e.target.value })}
              placeholder="Enter your website url..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
            <p className="text-[11px] text-gray-400 mt-1 ml-1">If you have a website, we'll analyze it to better understand your brand.</p>
          </div>
        )}

        {/* Which social platforms do you use? */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Which social platforms do you use?
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {SOCIAL_PLATFORMS.map((platform) => {
              const isSelected = formData.social_platforms?.includes(platform.id);
              return (
                <div
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? "border-transparent bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl mb-1">{platform.icon}</span>
                  <span className={`text-[10px] font-medium text-center ${isSelected ? "text-primary" : "text-gray-600"}`}>
                    {platform.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 ml-1">Select all that apply.</p>
        </div>

        {/* Have you run paid ads before? */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Have you run paid ads before?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => onUpdate({ has_previous_ads: true })}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.has_previous_ads === true
                  ? "border-transparent bg-primary/5 text-primary font-medium"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-700 font-medium"
              }`}
            >
              <span className="text-sm">Yes, I have advertising experience.</span>
            </div>

            <div
              onClick={() => onUpdate({ has_previous_ads: false })}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.has_previous_ads === false
                  ? "border-transparent bg-primary/5 text-primary font-medium"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-500 font-medium"
              }`}
            >
              <span className="text-sm">No, I'm new to advertising.</span>
            </div>
          </div>
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
