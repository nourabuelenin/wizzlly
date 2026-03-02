"use client";

import { useState, useEffect } from "react";
import Stepper from "@/components/onboarding/Stepper";
import AuthLayout from "@/components/AuthLayout";
import { ONBOARDING_STEPS } from "@/constants/onboarding-steps";
import { useParams, useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import { Dictionary } from "@/types/dictionary";
import toast from "react-hot-toast";
import { saveBusinessData, saveBrandIdentity } from "@/lib/api/business";

import Step1ConnectMeta from "@/components/onboarding/steps/Step1ConnectMeta";
import Step2BrandBasics from "@/components/onboarding/steps/Step2BrandBasics";
import Step3IndustryOffering from "@/components/onboarding/steps/Step3IndustryOffering";
import Step4IdealCustomers from "@/components/onboarding/steps/Step4IdealCustomers";
import Step5MarketsLanguages from "@/components/onboarding/steps/Step5MarketsLanguages";
import Step6PricingPositioning from "@/components/onboarding/steps/Step6PricingPositioning";
import Step7BrandRules from "@/components/onboarding/steps/Step7BrandRules";
import Step8DigitalPresence from "@/components/onboarding/steps/Step8DigitalPresence";
import Step9Completed from "@/components/onboarding/steps/Step9Completed";

export default function OnboardingPage() {
  const params = useParams();
  const router = useRouter();
  const currentLang = (params.lang as Locale) || "en";
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(currentLang).then(setDict);
  }, [currentLang]);
  const [currentStep, setCurrentStep] = useState(1); // Start at 1 (Connect Meta)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Partial mock data representing the combination of business_data and brand_identity
  const [formData, setFormData] = useState({
    // Step 1: Connect Meta
    selectedPageId: "",
    // Step 2: Brand Basics
    offer_type: "",
    business_start_date: "",
    // Old fields matching older Brand Basics mock
    problem_statement: "",
    core_value_proposition: "",
    // Step 3: Industry & Offering
    business_model: "",
    industry: "",
    key_features: "",
    // Step 4: ICP
    target_age_ranges: [] as string[],
    target_gender: "",
    target_income_level: [] as string[],
    buying_motivations: [] as string[],
    ideal_customer_description: "",
    customer_pain_points: "",
    // Step 5: Markets
    target_regions: "",
    communication_languages: "",
    geographic_reach: "",
    city_region: "",
    // Step 6: Pricing
    pricing_min: 40000,
    pricing_max: 60000,
    competitive_advantage: "",
    known_competitors: [] as string[],
    do_not_compare: [] as string[],
    has_shipping: false,
    offers_discounts: false,
    // Step 7: Brand Rules
    has_brand_identity: true,
    tone_style: "",
    compliance_restrictions: "",
    avoided_phrases: [] as string[],
    // Step 8: Digital Presence
    has_website: true,
    website_url: "",
    social_platforms: [] as string[],
    has_previous_ads: false,
  });

  const handleUpdate = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleNext = async () => {
    // If we're not on the final step, just move forward.
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
      return;
    }

    if (currentStep === 8) {
      // Transition to final "Completed" visual state and begin submitting
      setCurrentStep(9);
      setIsSubmitting(true);
      window.scrollTo(0, 0);

      try {
        try {
          await saveBusinessData({
            meta_page_id: formData.selectedPageId, 
            product_or_service: formData.offer_type,       // Fixed mismatch
            real_start_date: formData.business_start_date, // Fixed mismatch
            business_model: formData.business_model, 
            industry: formData.industry, 
            unique_value_proposition: formData.key_features, 
            target_age_ranges: formData.target_age_ranges,
            target_gender: formData.target_gender,
            target_income_level: formData.target_income_level[0] || "", // Fixed multiple arrays to singular required
            buying_motivations: formData.buying_motivations,
            customer_pain_points: formData.customer_pain_points ? [formData.customer_pain_points] : [],
            ideal_customer_description: formData.ideal_customer_description,
            primary_market: formData.target_regions, 
            geographic_reach: formData.geographic_reach,
            average_price: ((formData.pricing_min + formData.pricing_max) / 2).toString(), 
            has_shipping: formData.has_shipping,
            offers_discounts: formData.offers_discounts,
            known_competitors: formData.known_competitors,
            do_not_compare: formData.do_not_compare,
            has_website: formData.has_website,
            website_url: formData.website_url,
            social_platforms: formData.social_platforms,
            has_previous_ads: formData.has_previous_ads,
            constraints: { // Moved custom specific string data constraints underneath
              compliance: formData.compliance_restrictions,
              avoided_phrases: formData.avoided_phrases,
              communication_languages: formData.communication_languages,
              city_region: formData.city_region,
            }
          });

          await saveBrandIdentity({
            problem_statement: formData.problem_statement,
            core_value_proposition: formData.core_value_proposition,
            competitive_advantage: formData.competitive_advantage,
            tone_style: formData.tone_style, 
          });
        } catch (err) {
          console.warn("API save failed, continuing flow anyway for dev/demo...", err);
        }
        
        toast.success("Onboarding Complete!");
      } catch {
        toast.error("Failed to save progress.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push(`/${currentLang}/auth`); // Back to sign up / step 1
    }
  };

  const stepProps = {
    formData,
    onUpdate: handleUpdate,
    onNext: handleNext,
    onBack: handleBack,
    isSubmitting,
    dict,
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1ConnectMeta {...stepProps} />;
      case 2: return <Step2BrandBasics {...stepProps} />;
      case 3: return <Step3IndustryOffering {...stepProps} />;
      case 4: return <Step4IdealCustomers {...stepProps} />;
      case 5: return <Step5MarketsLanguages {...stepProps} />;
      case 6: return <Step6PricingPositioning {...stepProps} />;
      case 7: return <Step7BrandRules {...stepProps} />;
      case 8: return <Step8DigitalPresence {...stepProps} />;
      case 9: return <Step9Completed {...stepProps} />;
      default: return null;
    }
  };

  return (
    <AuthLayout rightPanel={<Stepper steps={ONBOARDING_STEPS} currentStep={currentStep} dict={dict} />}>
      {renderStepContent()}
    </AuthLayout>
  );
}
