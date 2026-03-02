import { LifeBuoy, Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Connect Meta", description: "Link Meta Business." },
  { id: 2, title: "Brand Basics", description: "Tell us about your brand." },
  { id: 3, title: "Industry & Offering", description: "What do you offer?" },
  { id: 4, title: "Ideal Customers (ICP)", description: "Who are you trying to reach?" },
  { id: 5, title: "Markets & Languages", description: "Where do you operate?" },
  { id: 6, title: "Pricing & Positioning", description: "How do you compete?" },
  { id: 7, title: "Brand Rules", description: "Brand voice & boundaries." },
  { id: 8, title: "Digital Presence", description: "Brand online presence and experience." },
];

interface VerticalStepperProps {
  currentStep?: number;
}

export default function VerticalStepper({ currentStep = 1 }: VerticalStepperProps) {
  return (
    <div className="w-full max-w-md p-8 font-sans">
      <div className="relative">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > 0 && step.id < currentStep;
          const isActive = currentStep > 0 && step.id === currentStep;

          return (
            <div key={step.id} className="flex relative z-10">
              {/* Step indicator */}
              <div className="flex flex-col items-center mr-6 shrink-0">
                <div
                  className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isActive
                      ? "bg-white text-primary shadow-sm border border-gray-100"
                      : isCompleted
                      ? "bg-primary text-white"
                      : "bg-white text-gray-400 border border-transparent"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-[2px] grow transition-colors my-1 ${
                      step.id < currentStep ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              {/* Step content */}
              <div className="pt-2 pb-6">
                <h3
                  className={`font-semibold text-base ${
                    isActive || isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm mt-0.5 ${
                    isActive || isCompleted ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 pt-8 border-t border-gray-300/40">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-600">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Having Trouble?</h4>
            <p className="text-sm text-gray-600">Need help? Our team is always here to guide you.</p>
          </div>
        </div>
        <button className="mt-4 px-5 py-2.5 bg-white text-primary font-semibold text-sm rounded-full shadow-sm hover:bg-gray-50 transition-colors">
          Contact support
        </button>
      </div>
    </div>
  );
}
