"use client";

import Modal from "@/components/Modal";

interface OnboardingPromptModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onCancel: () => void;
  dict: {
    title: string;
    message: string;
    continue: string;
    cancel: string;
  };
}

export default function OnboardingPromptModal({
  isOpen,
  onContinue,
  onCancel,
  dict,
}: OnboardingPromptModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="w-full max-w-md px-6 py-8 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {dict.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {dict.message}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {dict.cancel}
          </button>
          <button
            onClick={onContinue}
            className="flex-1 px-6 py-3 text-base font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {dict.continue}
          </button>
        </div>
      </div>
    </Modal>
  );
}
