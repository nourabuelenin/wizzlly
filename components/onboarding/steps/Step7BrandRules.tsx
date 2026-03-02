import { useState } from "react";
import OnboardingFormLayout from "../OnboardingFormLayout";

interface Step7Data {
  has_brand_identity: boolean;
  tone_style: string;
  compliance_restrictions: string;
  avoided_phrases: string[];
}

interface StepProps {
  formData: Step7Data;
  onUpdate: (data: Partial<Step7Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any;
}

export default function Step7BrandRules({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: StepProps) {
  const [avoidedInput, setAvoidedInput] = useState("");

  const addAvoidedPhrase = () => {
    if (avoidedInput.trim()) {
      onUpdate({ avoided_phrases: [...(formData.avoided_phrases || []), avoidedInput.trim()] });
      setAvoidedInput("");
    }
  };

  return (
    <OnboardingFormLayout
      title={dict?.onboarding?.step7?.title || "Brand voice & boundaries"}
      subtitle={dict?.onboarding?.step7?.subtitle || "These rules ensure all AI-generated content stays on brand."}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting}
      nextLabel={dict?.onboarding?.step7?.nextLabel || "Next Step: Digital Presence"}
    >
      <div className="space-y-6 mt-4">
        {/* Do you have a brand identity for your business? */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Do you have a brand identity for your business?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => onUpdate({ has_brand_identity: true })}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.has_brand_identity === true
                  ? "border-transparent bg-primary/5 text-primary font-medium"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-700 font-medium"
              }`}
            >
              <span className="text-sm">Yes, I do.</span>
            </div>

            <div
              onClick={() => onUpdate({ has_brand_identity: false })}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                formData.has_brand_identity === false
                  ? "border-transparent bg-primary/5 text-primary font-medium"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-500 font-medium"
              }`}
            >
              <span className="text-sm">No, I don't.</span>
            </div>
          </div>
        </div>

        {/* Brand Voice & Tone */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Brand Voice & Tone
          </label>
          <div className="relative">
            <select
              title="Brand Voice and Tone"
              value={formData.tone_style || ""}
              onChange={(e) => onUpdate({ tone_style: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-500 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none"
            >
              <option value="" disabled>Select brand voice & tone</option>
              <option value="Professional">Professional</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Friendly">Friendly</option>
              <option value="Conversational">Conversational</option>
              <option value="Bold">Bold</option>
              <option value="Empowering">Empowering</option>
              <option value="Playful">Playful</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-1">How should your brand sound?</p>
        </div>

        {/* Compliance & Restrictions */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Compliance & Restrictions
          </label>
          <textarea
            name="compliance_restrictions"
            value={formData.compliance_restrictions || ""}
            onChange={(e) => onUpdate({ compliance_restrictions: e.target.value })}
            placeholder="No medical claims, no financial guarantees"
            rows={3}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
          />
          <p className="text-[11px] text-gray-400 mt-1 ml-1">Legal, cultural, or platform rules we must follow.</p>
        </div>

        {/* Avoided Phrases / Words */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Avoided Phrases / Words
          </label>
          <div className="flex relative">
            <input
              type="text"
              value={avoidedInput}
              onChange={(e) => setAvoidedInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAvoidedPhrase())}
              placeholder="Enter avoided phrases & words..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none pr-12"
            />
            <button
              onClick={addAvoidedPhrase}
              type="button"
              className="absolute right-2 top-2 bottom-2 w-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-transparent rounded-lg text-gray-500 font-semibold"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.avoided_phrases?.map((phrase: string, idx: number) => (
              <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                {phrase}
                <button onClick={() => onUpdate({ avoided_phrases: formData.avoided_phrases.filter((_: any, i: number) => i !== idx) })} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-1">Words or phrases your brand never uses.</p>
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
