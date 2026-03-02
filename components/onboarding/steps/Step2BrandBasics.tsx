import OnboardingFormLayout from "../OnboardingFormLayout";
import FormInput from "@/components/FormInput";
import { Package, Wrench } from "lucide-react";

interface Step2Data {
  offer_type: string;
  business_start_date: string;
}

interface Step2Props {
  formData: Step2Data;
  onUpdate: (data: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any;
}

export default function Step2BrandBasics({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: Step2Props) {
  return (
    <OnboardingFormLayout
      title={dict?.onboarding?.step2?.title || "Tell us about your brand"}
      subtitle={dict?.onboarding?.step2?.subtitle || "This helps the AI understand who you are and how to represent your business."}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting || !formData.offer_type || !formData.business_start_date}
      nextLabel={dict?.onboarding?.step2?.nextLabel || "Next Step: Industry & Offering"}
    >
      <div className="space-y-6 mt-2">
        {/* Offer Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            What do you offer?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onUpdate({ offer_type: "Products" })}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                formData.offer_type === "Products"
                  ? "border-transparent bg-primary/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex-shrink-0">
                <span className="text-2xl">📦</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-900">Products</span>
                <span className="text-[11px] text-gray-500">Physical or Digital Products</span>
              </div>
            </div>

            <div
              onClick={() => onUpdate({ offer_type: "Services" })}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                formData.offer_type === "Services"
                  ? "border-transparent bg-primary/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex-shrink-0">
                <span className="text-2xl">🔧</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-900">Services</span>
                <span className="text-[11px] text-gray-500">Professional Services</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 ml-1">
            This affects how campaigns and creatives are generated.
          </p>
        </div>

        {/* Start Date Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            When did you start your business?
          </label>
          <input
            type="date"
            name="business_start_date"
            value={formData.business_start_date || ""}
            onChange={(e) => onUpdate({ business_start_date: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
