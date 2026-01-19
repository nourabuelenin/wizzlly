"use client";

import { useState, useEffect } from "react";
import { Stepper } from "@/components/onboarding/Stepper";
import { BusinessInfoStep } from "@/components/onboarding/BusinessInfoStep";
import { TargetAudienceStep } from "@/components/onboarding/TargetAudienceStep";
import { GoalsAndToneStep } from "@/components/onboarding/GoalsAndToneStep";
import { FinishStep } from "@/components/onboarding/FinishStep";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import { Dictionary } from "@/types/dictionary";

interface OnboardingData {
  businessName: string;
  industry: string;
  websiteUrl: string;
  targetDemographics: string;
  interests: string;
  painPoints: string;
  businessGoals: string[];
  toneOfVoice: string;
  brandKeywords: string[];
}

export default function OnboardingPage() {
  const params = useParams();
  const currentLang = (params.lang as string) || "en";

  const [currentStep, setCurrentStep] = useState(1);
  const [dict, setDict] = useState<Dictionary | null>(null);
  const [formData, setFormData] = useState<OnboardingData>({
    businessName: "",
    industry: "",
    websiteUrl: "",
    targetDemographics: "",
    interests: "",
    painPoints: "",
    businessGoals: [],
    toneOfVoice: "",
    brandKeywords: [],
  });

  useEffect(() => {
    getDictionary(currentLang as Locale).then((dictionary) => {
      setDict(dictionary);
    });
  }, [currentLang]);

  const steps = dict
    ? [
        {
          number: 1,
          title: dict?.onboarding?.steps?.businessInfo || "Business Info",
          completed: currentStep > 1,
        },
        {
          number: 2,
          title: dict?.onboarding?.steps?.targetAudience || "Target Audience",
          completed: currentStep > 2,
        },
        {
          number: 3,
          title: dict?.onboarding?.steps?.goalsAndTone || "Goals & Tone",
          completed: currentStep > 3,
        },
        {
          number: 4,
          title: dict?.onboarding?.steps?.finish || "Finish",
          completed: currentStep > 4,
        },
      ]
    : [
        { number: 1, title: "Business Info", completed: currentStep > 1 },
        { number: 2, title: "Target Audience", completed: currentStep > 2 },
        { number: 3, title: "Goals & Tone", completed: currentStep > 3 },
        { number: 4, title: "Finish", completed: currentStep > 4 },
      ];

  const handleUpdate = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Stepper (full height) */}
      <Stepper steps={steps} currentStep={currentStep} dict={dict} />

      {/* Right side - Header and Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <OnboardingHeader currentLang={currentLang as Locale} />

        {/* Content */}
        <div className="flex-1 p-12 overflow-y-auto">
          {currentStep === 1 && (
            <BusinessInfoStep
              formData={formData}
              onUpdate={handleUpdate}
              onNext={handleNext}
              dict={dict}
            />
          )}

          {currentStep === 2 && (
            <TargetAudienceStep
              formData={formData}
              onUpdate={handleUpdate}
              onNext={handleNext}
              onBack={handleBack}
              dict={dict}
            />
          )}

          {currentStep === 3 && (
            <GoalsAndToneStep
              formData={formData}
              onUpdate={handleUpdate}
              onNext={handleNext}
              onBack={handleBack}
              dict={dict}
            />
          )}

          {currentStep === 4 && (
            <FinishStep formData={formData} onBack={handleBack} dict={dict} />
          )}
        </div>
      </div>
    </div>
  );
}
