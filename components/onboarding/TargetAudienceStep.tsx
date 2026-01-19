"use client";

interface TargetAudienceStepProps {
  formData: {
    targetDemographics: string;
    interests: string;
    painPoints: string;
  };
  onUpdate: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TargetAudienceStep({
  formData,
  onUpdate,
  onNext,
  onBack,
}: TargetAudienceStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.targetDemographics) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Who's your target audience?
        </h2>
        <p className="text-gray-600">
          Help us understand who you're trying to reach
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="targetDemographics"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Target Demographics <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="targetDemographics"
            value={formData.targetDemographics}
            onChange={(e) => onUpdate("targetDemographics", e.target.value)}
            placeholder="e.g., Business owners, Young professionals, Parents"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="interests"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Their Interests{" "}
            <span className="text-gray-400 font-normal">(comma-separated)</span>
          </label>
          <textarea
            id="interests"
            value={formData.interests}
            onChange={(e) => onUpdate("interests", e.target.value)}
            placeholder="e.g., Healthy eating, Sustainability, Local food"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate multiple interests with commas
          </p>
        </div>

        <div>
          <label
            htmlFor="painPoints"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Their Pain Points{" "}
            <span className="text-gray-400 font-normal">(comma-separated)</span>
          </label>
          <textarea
            id="painPoints"
            value={formData.painPoints}
            onChange={(e) => onUpdate("painPoints", e.target.value)}
            placeholder="e.g., Limited time, Budget constraints, Finding quality options"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate multiple pain points with commas
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!formData.targetDemographics}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
