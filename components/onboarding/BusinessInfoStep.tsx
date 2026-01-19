"use client";

import { Dictionary } from "@/types/dictionary";
import { ChevronDown } from "lucide-react";

interface BusinessInfoStepProps {
  formData: {
    businessName: string;
    industry: string;
    websiteUrl: string;
  };
  onUpdate: (field: string, value: string) => void;
  onNext: () => void;
  dict: Dictionary | null;
}

export function BusinessInfoStep({
  formData,
  onUpdate,
  onNext,
  dict,
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
          {dict?.onboarding?.businessInfo?.heading ||
            "Tell us about your business"}
        </h2>
        <p className="text-gray-600">
          {dict?.onboarding?.businessInfo?.subheading ||
            "Basic information to personalize your content"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {dict?.onboarding?.businessInfo?.businessName || "Business Name"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => onUpdate("businessName", e.target.value)}
            placeholder={
              dict?.onboarding?.businessInfo?.businessNamePlaceholder ||
              "Tasty Bites"
            }
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="industry"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {dict?.onboarding?.businessInfo?.industry || "Industry"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => onUpdate("industry", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-white cursor-pointer pr-10 ltr:pr-10 rtl:pl-10"
            >
              <option value="">
                {dict?.onboarding?.businessInfo?.industryPlaceholder ||
                  "Select an industry"}
              </option>
              <option value="Food & Beverage">
                {dict?.onboarding?.businessInfo?.industries?.foodBeverage ||
                  "Food & Beverage"}
              </option>
              <option value="Technology">
                {dict?.onboarding?.businessInfo?.industries?.technology ||
                  "Technology"}
              </option>
              <option value="Healthcare">
                {dict?.onboarding?.businessInfo?.industries?.healthcare ||
                  "Healthcare"}
              </option>
              <option value="Retail">
                {dict?.onboarding?.businessInfo?.industries?.retail || "Retail"}
              </option>
              <option value="Finance">
                {dict?.onboarding?.businessInfo?.industries?.finance ||
                  "Finance"}
              </option>
              <option value="Education">
                {dict?.onboarding?.businessInfo?.industries?.education ||
                  "Education"}
              </option>
              <option value="Real Estate">
                {dict?.onboarding?.businessInfo?.industries?.realEstate ||
                  "Real Estate"}
              </option>
              <option value="Entertainment">
                {dict?.onboarding?.businessInfo?.industries?.entertainment ||
                  "Entertainment"}
              </option>
              <option value="Professional Services">
                {dict?.onboarding?.businessInfo?.industries
                  ?.professionalServices || "Professional Services"}
              </option>
              <option value="Other">
                {dict?.onboarding?.businessInfo?.industries?.other || "Other"}
              </option>
            </select>
            <ChevronDown className="absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label
            htmlFor="websiteUrl"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {dict?.onboarding?.businessInfo?.website || "Website URL"}{" "}
            <span className="text-gray-400 font-normal">
              {dict?.onboarding?.businessInfo?.optional || "(optional)"}
            </span>
          </label>
          <input
            type="text"
            id="websiteUrl"
            value={formData.websiteUrl}
            onChange={(e) => onUpdate("websiteUrl", e.target.value)}
            placeholder={
              dict?.onboarding?.businessInfo?.websitePlaceholder ||
              "example.com or https://example.com"
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!formData.businessName || !formData.industry}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {dict?.onboarding?.businessInfo?.continue || "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
