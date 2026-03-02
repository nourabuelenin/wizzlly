"use client";

import { LifeBuoy, Check } from "lucide-react";
import type { StepConfig } from "@/constants/onboarding-steps";
import type { Dictionary } from "@/types/dictionary";
import Button from "@/components/Button";

interface StepperProps {
  /** Array of step configurations to render */
  steps: StepConfig[];
  /** Currently active step number (1-indexed). Pass 0 for no active step. */
  currentStep: number;
  /** Optional dictionary for i18n (EN/AR). Looks up `dict.onboarding.steps.<step.key>` */
  dict?: Dictionary | null;
  /** Whether to show the "Having Trouble?" support footer. Defaults to true. */
  showSupport?: boolean;
}

export default function Stepper({
  steps,
  currentStep,
  dict = null,
  showSupport = true,
}: StepperProps) {
  /**
   * Resolves a step's translated title.
   * Looks up `dict.onboarding.steps.<step.key>.title`, falls back to step.title (English).
   */
  const getTitle = (step: StepConfig): string =>
    dict?.onboarding?.steps?.[step.key]?.title || step.title;

  /**
   * Resolves a step's translated description.
   * Looks up `dict.onboarding.steps.<step.key>.description`, falls back to step.description (English).
   */
  const getDescription = (step: StepConfig): string =>
    dict?.onboarding?.steps?.[step.key]?.description || step.description;

  return (
    <div className="w-full max-w-md p-8 font-sans">
      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = currentStep > 0 && step.id < currentStep;
          const isActive = currentStep > 0 && step.id === currentStep;

          return (
            <div key={step.id} className="flex relative z-10">
              {/* Step indicator circle */}
              <div className="flex flex-col items-center mr-6 shrink-0">
                <div
                  className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isActive ? "bg-white text-primary shadow-sm border border-gray-100":
                    isCompleted ? "bg-white text-primary":
                    "bg-white text-gray-400 border border-transparent"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {/* Connector line — purple if completed, gray otherwise */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-[1px] grow transition-colors ${
                      step.id < currentStep ? "bg-primary" : "bg-white"
                    }`}
                  />
                )}
              </div>

              {/* Step content (title + description) */}
              <div className="pt-2 pb-6">
                <h3
                  className={`font-semibold text-base ${
                    isActive ? "text-primary" : 
                    isCompleted ? "text-gray-900" : 
                    "text-gray-400"
                  }`}
                >
                  {getTitle(step)}
                </h3>
                <p
                  className={`text-sm mt-0.5 ${
                    isActive ? "text-primary" : 
                    isCompleted ? "text-gray-900" : 
                    "text-gray-400"
                  }`}
                >
                  {getDescription(step)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {showSupport && (
        <div className="mt-16 pt-8 border-t border-gray-300/40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-600">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                {dict?.onboarding?.stepper?.supportTitle || "Having Trouble?"}
              </h4>
              <p className="text-sm text-gray-600">
                {dict?.onboarding?.stepper?.supportDescription ||
                  "Need help? Our team is always here to guide you."}
              </p>
            </div>
          </div>
          <Button
            text={dict?.onboarding?.stepper?.contactSupport || "Contact support"}
            variant="secondary"
            className="mt-4 !p-0 !px-5 !py-2 !text-sm font-semibold !rounded-full shadow-sm border border-gray-100"
          />
        </div>
      )}
    </div>
  );
}
