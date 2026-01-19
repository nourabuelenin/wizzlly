"use client";

import { useState } from "react";
import { Dictionary } from "@/types/dictionary";

interface GoalsAndToneStepProps {
  formData: {
    businessGoals: string[];
    toneOfVoice: string;
    brandKeywords: string[];
  };
  onUpdate: (field: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  dict: Dictionary | null;
}

const BUSINESS_GOALS = [
  { value: "Increase Brand Awareness", label: "Increase Brand Awareness" },
  { value: "Generate Leads", label: "Generate Leads" },
  { value: "Drive Sales", label: "Drive Sales" },
  { value: "Build Community", label: "Build Community" },
  {
    value: "Improve Customer Engagement",
    label: "Improve Customer Engagement",
  },
  { value: "Launch New Product", label: "Launch New Product" },
  { value: "Expand to New Markets", label: "Expand to New Markets" },
  {
    value: "Establish Thought Leadership",
    label: "Establish Thought Leadership",
  },
];

const TONE_OPTIONS = [
  {
    value: "Professional",
    label: "Professional",
    description: "Formal, trustworthy, expert",
  },
  {
    value: "Friendly",
    label: "Friendly",
    description: "Warm, approachable, casual",
  },
  { value: "Bold", label: "Bold", description: "Confident, daring, impactful" },
  { value: "Playful", label: "Playful", description: "Fun, witty, energetic" },
  {
    value: "Inspirational",
    label: "Inspirational",
    description: "Motivating, uplifting, empowering",
  },
  {
    value: "Educational",
    label: "Educational",
    description: "Informative, helpful, clear",
  },
];

export function GoalsAndToneStep({
  formData,
  onUpdate,
  onNext,
  onBack,
  dict,
}: GoalsAndToneStepProps) {
  const [keywordInput, setKeywordInput] = useState("");

  const handleGoalToggle = (goal: string) => {
    const currentGoals = formData.businessGoals || [];
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter((g) => g !== goal)
      : [...currentGoals, goal];
    onUpdate("businessGoals", newGoals);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const currentKeywords = formData.brandKeywords || [];
      onUpdate("brandKeywords", [...currentKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = formData.brandKeywords.filter((_, i) => i !== index);
    onUpdate("brandKeywords", newKeywords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.businessGoals.length > 0 && formData.toneOfVoice) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {dict?.onboarding?.goalsAndTone?.heading || "Goals & Brand Voice"}
        </h2>
        <p className="text-gray-600">
          {dict?.onboarding?.goalsAndTone?.subheading ||
            "Define your objectives and how you want to sound"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Business Goals */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            {dict?.onboarding?.goalsAndTone?.businessGoalsLabel ||
              "Business Goals"}{" "}
            <span className="text-red-500">*</span>
            <span className="text-gray-400 font-normal ml-1">
              (
              {dict?.onboarding?.goalsAndTone?.selectAllThatApply ||
                "select all that apply"}
              )
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {BUSINESS_GOALS.map((goal) => (
              <button
                key={goal.value}
                type="button"
                onClick={() => handleGoalToggle(goal.value)}
                className={`px-4 py-3 text-left border rounded-full transition-all cursor-pointer
                  ${
                    formData.businessGoals.includes(goal.value)
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-gray-300 bg-white text-foreground hover:border-gray-400"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal.label}</span>
                  {formData.businessGoals.includes(goal.value) && (
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tone of Voice */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            {dict?.onboarding?.goalsAndTone?.toneLabel || "Tone of Voice"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TONE_OPTIONS.map((tone) => (
              <button
                key={tone.value}
                type="button"
                onClick={() => onUpdate("toneOfVoice", tone.value)}
                className={`px-4 py-3 border rounded-full transition-all cursor-pointer
                  ${
                    formData.toneOfVoice === tone.value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-gray-300 bg-white text-foreground hover:border-gray-400"
                  }
                `}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm mb-1">{tone.label}</div>
                  <div className="text-xs text-gray-600">
                    {tone.description}
                  </div>
                  {formData.toneOfVoice === tone.value && (
                    <svg
                      className="w-5 h-5 text-primary mt-2 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Brand Keywords */}
        <div>
          <label
            htmlFor="keywords"
            className="block text-sm font-semibold text-gray-900 mb-3"
          >
            {dict?.onboarding?.goalsAndTone?.keywordsLabel || "Brand Keywords"}{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="keywords"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
              placeholder={
                dict?.onboarding?.goalsAndTone?.keywordsPlaceholder ||
                "Add a keyword..."
              }
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="px-6 py-3 bg-gray-100 text-foreground font-semibold rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {dict?.onboarding?.goalsAndTone?.addKeyword || "Add"}
            </button>
          </div>
          {formData.brandKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.brandKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(index)}
                    className="hover:text-primary/80 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 border border-gray-300 text-foreground font-semibold rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {dict?.onboarding?.goalsAndTone?.back || "Back"}
          </button>
          <button
            type="submit"
            disabled={
              formData.businessGoals.length === 0 || !formData.toneOfVoice
            }
            className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {dict?.onboarding?.goalsAndTone?.continue || "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
