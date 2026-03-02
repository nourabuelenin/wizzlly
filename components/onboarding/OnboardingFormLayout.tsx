import { ReactNode } from "react";

interface OnboardingFormLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
}

export default function OnboardingFormLayout({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = "Next Step",
  isNextDisabled = false,
}: OnboardingFormLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between max-w-lg mx-auto py-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{title}</h2>
        <p className="text-gray-500 mb-8">{subtitle}</p>
        <div className="space-y-6">
          {children}
        </div>
      </div>
      
      <div className="flex gap-4 pt-10 mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3.5 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="flex-1 py-3.5 px-6 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors disabled:opacity-50"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
