"use client";

interface Step {
  number: number;
  title: string;
  completed: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-80 bg-gray-50 p-8 min-h-screen border-r border-gray-200">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Set Up Your Business Profile
        </h1>
        <p className="text-gray-600 text-sm">
          Help our AI understand your business to create perfect content
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = step.completed;
          const isPast = currentStep > step.number;

          return (
            <div key={step.number} className="flex items-start gap-4">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors
                    ${isActive ? "bg-blue-600 text-white" : ""}
                    ${isCompleted || isPast ? "bg-green-600 text-white" : ""}
                    ${!isActive && !isCompleted && !isPast ? "bg-gray-200 text-gray-500" : ""}
                  `}
                >
                  {isCompleted || isPast ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-2 transition-colors
                      ${isPast || isCompleted ? "bg-green-600" : "bg-gray-200"}
                    `}
                  />
                )}
              </div>

              {/* Step title */}
              <div className="flex-1 pt-2">
                <p
                  className={`font-medium text-sm transition-colors
                    ${isActive ? "text-blue-600" : ""}
                    ${isCompleted || isPast ? "text-gray-900" : ""}
                    ${!isActive && !isCompleted && !isPast ? "text-gray-400" : ""}
                  `}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
