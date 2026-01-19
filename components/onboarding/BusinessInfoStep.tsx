"use client";

import { ChangeEvent } from "react";

interface BusinessInfoStepProps {
  formData: {
    businessName: string;
    industry: string;
    websiteUrl: string;
  };
  onUpdate: (field: string, value: string) => void;
  onNext: () => void;
}

export function BusinessInfoStep({
  formData,
  onUpdate,
  onNext,
}: BusinessInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.businessName && formData.industry) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Tell us about your business
        </h2>
        <p className="text-gray-600">
          Basic information to personalize your content
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => onUpdate("businessName", e.target.value)}
            placeholder="Tasty Bites"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="industry"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => onUpdate("industry", e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">Select an industry</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Retail">Retail</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="websiteUrl"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Website URL{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="websiteUrl"
            value={formData.websiteUrl}
            onChange={(e) => onUpdate("websiteUrl", e.target.value)}
            placeholder="example.com or https://example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!formData.businessName || !formData.industry}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
