import OnboardingFormLayout from "../OnboardingFormLayout";
import { Check } from "lucide-react";

interface Step1Data {
  selectedPageId: string;
}

interface Step1Props {
  formData: Step1Data;
  onUpdate: (data: Partial<Step1Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any; // the dictionary object passed from parent
}

const MOCK_PAGES = [
  { id: "1", name: "Luma Fashion", followers: "42K followers" },
  { id: "2", name: "Luma Beauty", followers: "20K+ followers" },
];

export default function Step1ConnectMeta({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: Step1Props) {
  return (
    <OnboardingFormLayout
      title={dict?.onboarding?.step1?.title || "Connect Meta Business"}
      subtitle={dict?.onboarding?.step1?.subtitle || "Link your facebook pages, instagram accounts, and ad campaigns to unlock powerful insights."}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting || !formData.selectedPageId}
      nextLabel={dict?.onboarding?.step1?.nextLabel || "Next Step: Brand Basics"}
    >
      <div className="border border-gray-200 rounded-xl p-5 mt-2 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">
            {dict?.onboarding?.step1?.connectedPages || "Connected Facebook Pages (2)"}
          </h3>
        </div>

        <div className="space-y-3">
          {MOCK_PAGES.map((page) => {
            const isSelected = formData.selectedPageId === page.id;
            return (
              <div
                key={page.id}
                onClick={() => onUpdate({ selectedPageId: page.id })}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-primary bg-white" : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {page.name}
                    </p>
                    <p className="text-xs text-gray-500">{page.followers}</p>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-primary" />}
              </div>
            );
          })}
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
