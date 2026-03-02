import OnboardingFormLayout from "../OnboardingFormLayout";

interface Step4Data {
  target_age_ranges: string[];
  target_gender: string;
  target_income_level: string[];
  buying_motivations: string[];
  ideal_customer_description: string;
  customer_pain_points: string;
}

interface StepProps {
  formData: Step4Data;
  onUpdate: (data: Partial<Step4Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  dict?: any;
}

const AGE_RANGES = [
  { id: "18-24", label: "18-24", sub: "Gen Z" },
  { id: "25-34", label: "25-34", sub: "Millennials" },
  { id: "35-44", label: "35-44", sub: "Gen X" },
  { id: "45-54", label: "45-54", sub: "Mature" },
  { id: "55-64", label: "55-64", sub: "Boomers" },
  { id: "65+", label: "65+", sub: "Seniors" },
];

const GENDERS = [
  { id: "male", label: "Male", icon: "👨🏽" },
  { id: "female", label: "Female", icon: "👩🏽" },
  { id: "all", label: "All Genders", icon: "🧑🏽‍🤝‍🧑🏽" },
];

const INCOME_LEVELS = [
  { id: "budget", label: "Budget", sub: "Price-sensitive" },
  { id: "middle", label: "Middle", sub: "Value-focused" },
  { id: "upper_mid", label: "Upper-Mid", sub: "Quality-focused" },
  { id: "luxury", label: "Luxury", sub: "Premium buyers" },
];

const MOTIVATIONS = [
  { id: "price", label: "Price", icon: "🏷️" },
  { id: "quality", label: "Quality", icon: "⭐" },
  { id: "convenience", label: "Convenience", icon: "⚡" },
  { id: "service", label: "Service", icon: "🤝" },
  { id: "innovation", label: "Innovation", icon: "🚀" },
  { id: "trust", label: "Trust/Brand", icon: "🛡️" },
];

export default function Step4IdealCustomers({
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
  dict,
}: StepProps) {
  const toggleArrayItem = (field: keyof Step4Data, value: string) => {
    const currentArray = (formData[field] as string[]) || [];
    if (currentArray.includes(value)) {
      onUpdate({ [field]: currentArray.filter((item: string) => item !== value) } as Partial<Step4Data>);
    } else {
      onUpdate({ [field]: [...currentArray, value] } as Partial<Step4Data>);
    }
  };

  return (
    <OnboardingFormLayout
      title="Who are you trying to reach?"
      subtitle="The AI uses this to write content that speaks directly to your audience."
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isSubmitting}
      nextLabel={dict?.onboarding?.step4?.nextLabel || "Next Step: Markets & Languages"}
    >
      <div className="space-y-6 mt-2">
        {/* Target Age Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Target Age Range
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {AGE_RANGES.map((age) => {
              const isSelected = formData.target_age_ranges?.includes(age.id);
              return (
                <div
                  key={age.id}
                  onClick={() => toggleArrayItem("target_age_ranges", age.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? "border-transparent bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-gray-900"}`}>{age.label}</span>
                  <span className={`text-[10px] ${isSelected ? "text-primary" : "text-gray-500"}`}>{age.sub}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 ml-1">Select all that apply.</p>
        </div>

        {/* Target Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Target Gender
          </label>
          <div className="grid grid-cols-3 gap-3">
            {GENDERS.map((gender) => {
              const isSelected = formData.target_gender === gender.id;
              return (
                <div
                  key={gender.id}
                  onClick={() => onUpdate({ target_gender: gender.id })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? "border-transparent bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg">{gender.icon}</span>
                  <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-gray-900"}`}>{gender.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Target Income Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Target Income Level
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INCOME_LEVELS.map((income) => {
              const isSelected = formData.target_income_level?.includes(income.id);
              return (
                <div
                  key={income.id}
                  onClick={() => toggleArrayItem("target_income_level", income.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? "border-transparent bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-gray-900"}`}>{income.label}</span>
                  <span className={`text-[10px] ${isSelected ? "text-primary font-medium" : "text-gray-400"}`}>{income.sub}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 ml-1">Select all that apply.</p>
        </div>

        {/* What matters most to your customers? */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            What matters most to your customers?
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {MOTIVATIONS.map((motivation) => {
              const isSelected = formData.buying_motivations?.includes(motivation.id);
              return (
                <div
                  key={motivation.id}
                  onClick={() => toggleArrayItem("buying_motivations", motivation.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? "border-transparent bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl mb-1">{motivation.icon}</span>
                  <span className={`text-[10px] font-medium text-center ${isSelected ? "text-primary" : "text-gray-600"}`}>
                    {motivation.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 ml-1">Select all that apply.</p>
        </div>

        {/* Primary Customer Segment */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Primary Customer Segment
          </label>
          <textarea
            name="ideal_customer_description"
            value={formData.ideal_customer_description || ""}
            onChange={(e) => onUpdate({ ideal_customer_description: e.target.value })}
            placeholder="Small business owners aged 25-45 running online stores"
            rows={2}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
          />
          <p className="text-[11px] text-gray-400 mt-1 ml-1">
            Describe your ideal customer's demographics, interests, behaviors, etc...
          </p>
        </div>

        {/* Customer Pain Points */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Customer Pain Points
          </label>
          <textarea
            name="customer_pain_points"
            value={formData.customer_pain_points || ""}
            onChange={(e) => onUpdate({ customer_pain_points: e.target.value })}
            placeholder="Low engagement, lack of time, inconsistent branding"
            rows={2}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
          />
          <p className="text-[11px] text-gray-400 mt-1 ml-1">
            What problems does your brand solve?
          </p>
        </div>
      </div>
    </OnboardingFormLayout>
  );
}
