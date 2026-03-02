import { useState } from "react";
import OnboardingFormLayout from "../OnboardingFormLayout";

interface Step6Data {
  pricing_min: number;
  pricing_max: number;
  has_shipping: boolean;
  offers_discounts: boolean;
  known_competitors: string[];
  do_not_compare: string[];
  competitive_advantage: string;
}

interface StepProps {
  formData: Step6Data;
  onUpdate: (data: Partial<Step6Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any;
}

export default function Step6PricingPositioning({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: StepProps) {
  const [competitorInput, setCompetitorInput] = useState("");
  const [doNotCompareInput, setDoNotCompareInput] = useState("");

  // Simplified formatting for 40k, 100k+ etc.
  const formatPrice = (val: number) => {
    if (val >= 100000) return "100K+";
    if (val >= 1000) return `${val / 1000}K`;
    return val.toString();
  };

  const MIN_RANGE = 0;
  const MAX_RANGE = 100000;
  const STEP = 5000;

  const minVal = formData.pricing_min ?? 40000;
  const maxVal = formData.pricing_max ?? 60000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - STEP);
    onUpdate({ pricing_min: value });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + STEP);
    onUpdate({ pricing_max: value });
  };

  // Tag Adders
  const addCompetitor = () => {
    if (competitorInput.trim()) {
      onUpdate({ known_competitors: [...(formData.known_competitors || []), competitorInput.trim()] });
      setCompetitorInput("");
    }
  };

  const addDoNotCompare = () => {
    if (doNotCompareInput.trim()) {
      onUpdate({ do_not_compare: [...(formData.do_not_compare || []), doNotCompareInput.trim()] });
      setDoNotCompareInput("");
    }
  };

  return (
    <OnboardingFormLayout
      title={dict?.onboarding?.step6?.title || "How do you compete?"}
      subtitle={dict?.onboarding?.step6?.subtitle || "This shapes your tone, offers, and campaign angles."}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting}
      nextLabel={dict?.onboarding?.step6?.nextLabel || "Next Step: Brand Rules"}
    >
      <style dangerouslySetInnerHTML={{__html: `
        /* Hide slider thumb track */
        .dual-slider-input::-webkit-slider-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          -webkit-appearance: none;
          appearance: none;
          background-color: white;
          border: 2px solid #4B5563; /* gray-600 */
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          z-index: 20;
        }
        .dual-slider-input::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          background-color: white;
          border: 2px solid #4B5563;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          z-index: 20;
        }
      `}} />

      <div className="space-y-6 mt-4">
        {/* Pricing Tier */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-semibold text-gray-900">Pricing Tier</label>
            <span className="text-sm font-medium text-gray-500">
              {formatPrice(minVal)} - {formatPrice(maxVal)}
            </span>
          </div>
          
          <div className="relative w-full h-8 flex items-center">
            {/* Visual Track */}
            <div className="absolute w-full h-1.5 bg-gray-200 rounded-full z-0 overflow-hidden">
              <div 
                className="absolute h-full bg-gray-700 pointer-events-none"
                style={{ 
                  left: `${(minVal / MAX_RANGE) * 100}%`,
                  right: `${100 - (maxVal / MAX_RANGE) * 100}%` 
                }}
              />
            </div>
            
            {/* Inputs */}
            <input
              type="range"
              min={MIN_RANGE}
              max={MAX_RANGE}
              step={STEP}
              value={minVal}
              onChange={handleMinChange}
              className="dual-slider-input absolute w-full appearance-none bg-transparent pointer-events-none z-10"
            />
            <input
              type="range"
              min={MIN_RANGE}
              max={MAX_RANGE}
              step={STEP}
              value={maxVal}
              onChange={handleMaxChange}
              className="dual-slider-input absolute w-full appearance-none bg-transparent pointer-events-none z-10"
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-2 ml-1">This helps align messaging with customer expectations.</p>
        </div>

        {/* Competitive Differentiators */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Competitive Differentiators
          </label>
          <textarea
            name="competitive_advantage"
            value={formData.competitive_advantage || ""}
            onChange={(e) => onUpdate({ competitive_advantage: e.target.value })}
            placeholder="Higher quality, faster delivery, better support"
            rows={2}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
          />
          <p className="text-[11px] text-gray-400 mt-1 ml-1">Why should customers choose you over others?</p>
        </div>

        {/* Known Competitors */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Known Competitors
          </label>
          <div className="flex relative">
            <input
              type="text"
              value={competitorInput}
              onChange={(e) => setCompetitorInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCompetitor())}
              placeholder="Enter your known competitors..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none pr-12"
            />
            <button
              onClick={addCompetitor}
              type="button"
              className="absolute right-2 top-2 bottom-2 w-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-transparent rounded-lg text-gray-500 font-semibold"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.known_competitors?.map((comp: string, idx: number) => (
              <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                {comp}
                <button onClick={() => onUpdate({ known_competitors: formData.known_competitors.filter((_: any, i: number) => i !== idx) })} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-1">Optional — helps the AI understand the market landscape.</p>
        </div>

        {/* Do Not Compare With */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Do Not Compare With
          </label>
          <div className="flex relative">
            <input
              type="text"
              value={doNotCompareInput}
              onChange={(e) => setDoNotCompareInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDoNotCompare())}
              placeholder="Enter brands you don't want to compare with..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none pr-12"
            />
            <button
              onClick={addDoNotCompare}
              type="button"
              className="absolute right-2 top-2 bottom-2 w-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-transparent rounded-lg text-gray-500 font-semibold"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.do_not_compare?.map((comp: string, idx: number) => (
              <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                {comp}
                <button onClick={() => onUpdate({ do_not_compare: formData.do_not_compare.filter((_: any, i: number) => i !== idx) })} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-1">Brands you don't want to be mentioned or compared to.</p>
        </div>

        {/* Checkbox fields */}
        <div className="space-y-4 pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.has_shipping || false}
              onChange={(e) => onUpdate({ has_shipping: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800 focus:ring-offset-0 cursor-pointer"
            />
            <div>
              <span className="block text-sm font-semibold text-gray-900 select-none">I offer shipping & delivery</span>
              <span className="block text-[11px] text-gray-400 mt-0.5 select-none">Check only if you ship products or deliver services.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.offers_discounts || false}
              onChange={(e) => onUpdate({ offers_discounts: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800 focus:ring-offset-0 cursor-pointer"
            />
            <div>
              <span className="block text-sm font-semibold text-gray-900 select-none">I offer discounts</span>
              <span className="block text-[11px] text-gray-400 mt-0.5 select-none">Check only if you provide promotions or discounts.</span>
            </div>
          </label>
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
