"use client";

import { useState } from "react";
import { Stepper } from "@/components/onboarding/Stepper";
import { BusinessInfoStep } from "@/components/onboarding/BusinessInfoStep";
import { TargetAudienceStep } from "@/components/onboarding/TargetAudienceStep";
import { GoalsAndToneStep } from "@/components/onboarding/GoalsAndToneStep";
import { FinishStep } from "@/components/onboarding/FinishStep";

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
  const [currentStep, setCurrentStep] = useState(1);
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

  const steps = [
    { number: 1, title: "Business Info", completed: currentStep > 1 },
    { number: 2, title: "Target Audience", completed: currentStep > 2 },
    { number: 3, title: "Goals & Tone", completed: currentStep > 3 },
    { number: 4, title: "Finish", completed: currentStep > 4 },
  ];

  const handleUpdate = (field: string, value: any) => {
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
      {/* Left side - Stepper */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Right side - Content */}
      <div className="flex-1 p-12">
        {currentStep === 1 && (
          <BusinessInfoStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <TargetAudienceStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <GoalsAndToneStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <FinishStep formData={formData} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
