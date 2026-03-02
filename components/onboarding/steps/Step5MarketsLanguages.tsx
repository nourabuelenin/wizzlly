import OnboardingFormLayout from "../OnboardingFormLayout";

interface Step5Data {
  target_regions: string;
  geographic_reach: string;
  city_region: string;
  communication_languages: string;
}

interface StepProps {
  formData: Step5Data;
  onUpdate: (data: Partial<Step5Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any;
}

const REACH_TYPES = [
  { id: "local", label: "Local", sub: "City/Region" },
  { id: "national", label: "National", sub: "Countrywide" },
  { id: "regional", label: "Regional", sub: "Multi-country" },
  { id: "global", label: "Global", sub: "Worldwide" },
];

export default function Step5MarketsLanguages({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: StepProps) {
  return (
    <OnboardingFormLayout
      title={dict?.onboarding?.step5?.title || "Where do you operate?"}
      subtitle={dict?.onboarding?.step5?.subtitle || "This helps localize content and campaigns correctly."}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting || !formData.target_regions || !formData.communication_languages}
      nextLabel={dict?.onboarding?.step5?.nextLabel || "Next Step: Pricing & Positioning"}
    >
      <div className="space-y-6 mt-2">
        {/* Target Regions / Countries */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Target Regions
          </label>
          <div className="relative">
            <select
              title="Target Regions"
              value={formData.target_regions || ""}
              onChange={(e) => onUpdate({ target_regions: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none"
            >
              <option value="" disabled className="text-gray-400">
                Select target regions
              </option>
              <option value="United States">United States</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Egypt">Egypt</option>
              <option value="Europe">Europe</option>
              <option value="Global">Global</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-1">Select the countries or regions you target.</p>
        </div>

        {/* Communication Languages */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Communication Languages
          </label>
          <div className="relative">
            <select
              title="Communication Languages"
              value={formData.communication_languages || ""}
              onChange={(e) => onUpdate({ communication_languages: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none"
            >
              <option value="" disabled className="text-gray-400">
                Select communication languages
              </option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
              <option value="Bilingual (Eng/Ara)">Bilingual (Eng/Ara)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-1">The AI will generate content in these languages.</p>
        </div>

        {/* Geographic Reach */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Geographic Reach
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {REACH_TYPES.map((reach) => {
              const isSelected = formData.geographic_reach === reach.id;
              return (
                <div
                  key={reach.id}
                  onClick={() => onUpdate({ geographic_reach: reach.id })}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                    {reach.label}
                  </span>
                  <span className={`text-[10px] ${isSelected ? "text-gray-600" : "text-gray-400"}`}>
                    {reach.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic City/Region Selector (mocked as text input or dropdown) */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            City/Region
          </label>
          <div className="relative">
            <input
              type="text"
              name="city_region"
              value={formData.city_region || ""}
              onChange={(e) => onUpdate({ city_region: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="Select city/region"
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-1">Select the city/region you target.</p>
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
