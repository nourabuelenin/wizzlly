import OnboardingFormLayout from "../OnboardingFormLayout";

interface Step3Data {
  business_model: string;
  industry: string;
  key_features: string;
}

interface StepProps {
  formData: Step3Data;
  onUpdate: (data: Partial<Step3Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any;
}

const INDUSTRIES = ["E-commerce", "SaaS", "Beauty", "Education", "Real Estate"];

export default function Step3IndustryOffering({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: StepProps) {
  return (
    <OnboardingFormLayout
      title="What do you offer?"
      subtitle="This allows the AI to tailor messaging, visuals, and campaign structure."
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting || !formData.business_model}
      nextLabel={dict?.onboarding?.step3?.nextLabel || "Next Step: Ideal Customers (ICP)"}
    >
      <div className="space-y-8 mt-2">
        {/* How do you operate? */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            How do you operate?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {/* Online */}
            <div
              onClick={() => onUpdate({ business_model: "online" })}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                formData.business_model === "online"
                  ? "border-transparent bg-primary/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🖥️</span>
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-gray-900">Online</span>
                <span className="text-[10px] text-gray-500">E-Commerce</span>
              </div>
            </div>

            {/* Offline */}
            <div
              onClick={() => onUpdate({ business_model: "offline" })}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                formData.business_model === "offline"
                  ? "border-transparent bg-primary/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🏬</span>
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-gray-900">Offline</span>
                <span className="text-[10px] text-gray-500">Physical Stores</span>
              </div>
            </div>

            {/* Hybrid */}
            <div
              onClick={() => onUpdate({ business_model: "hybrid" })}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                formData.business_model === "hybrid"
                  ? "border-transparent bg-primary/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🏪</span>
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-gray-900">Hybrid</span>
                <span className="text-[10px] text-gray-500">Online & Offline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry / Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Industry / Category
          </label>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => onUpdate({ industry: ind })}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  formData.industry === ind
                    ? "bg-primary/5 border-transparent text-primary"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {ind}
              </button>
            ))}
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-50 text-gray-400 border border-transparent hover:bg-gray-100">
              +
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Choose the industry that best fits your business.
          </p>
        </div>

        {/* Key Features */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Key Features
          </label>
          <textarea
            name="key_features"
            value={formData.key_features || ""}
            onChange={(e) => onUpdate({ key_features: e.target.value })}
            placeholder="Fast delivery, eco-friendly materials, 24/7 support"
            rows={3}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            What makes your product or service stand out?
          </p>
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
