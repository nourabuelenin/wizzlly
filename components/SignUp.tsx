import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthLayout from "@/components/AuthLayout";
import Stepper from "@/components/onboarding/Stepper";
import { ONBOARDING_STEPS } from "@/constants/onboarding-steps";
import FormInput from "@/components/FormInput";
import { type Locale } from "@/lib/i18n/config";
import { getFacebookAuthUrl, createGuestSession } from "@/lib/api/stg2-auth";

interface SignUpProps {
  onToggleSignIn: () => void;
  onSuccess?: () => void;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
  compact?: boolean;
}

export default function SignUp({
  onToggleSignIn,
  onSuccess,
  dict,
  lang,
  compact = false,
}: SignUpProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Store company info locally for use during onboarding
      localStorage.setItem("pendingCompany", JSON.stringify(formData));

      // Redirect to Facebook OAuth to create account
      const redirectUri = `${window.location.origin}/${lang}/auth/callback`;
      const result = await getFacebookAuthUrl(redirectUri);

      if (result.success && result.auth_url) {
        window.location.href = result.auth_url;
      } else {
        toast.error(result.error || "Failed to connect to Facebook");
        setIsLoading(false);
      }
    } catch {
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const result = await createGuestSession(formData.companyName || undefined);

      if (result.success && result.auth_token) {
        toast.success("Continuing as a guest...");
        router.push(`/${lang}/dashboard`);
      } else {
        // Fallback: if backend is unavailable, use legacy localStorage-only guest
        localStorage.setItem("guestMode", "true");
        toast.success("Continuing as a guest...");
        router.push(`/${lang}/dashboard`);
      }
    } catch {
      // Fallback to legacy guest mode
      localStorage.setItem("guestMode", "true");
      toast.success("Continuing as a guest...");
      router.push(`/${lang}/dashboard`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formContent = (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Sign up</h1>
      <p className="text-gray-500 mb-8">{dict.auth.signUp.title || "Welcome to NABLR! Please enter your details."}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <FormInput
            id="companyName"
            name="companyName"
            label="Company Name"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name..."
            required
          />
          <p className="text-[13px] text-gray-400 mt-1.5 font-medium ml-1">Use your official brand or company name.</p>
        </div>

        <div>
          <FormInput
            id="companyDescription"
            name="companyDescription"
            label="Company Description"
            type="text"
            value={formData.companyDescription}
            onChange={handleChange}
            placeholder="Describe your business, products, or services..."
            required
          />
          <p className="text-[13px] text-gray-400 mt-1.5 font-medium ml-1">In one sentence, what does your brand do?</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onToggleSignIn}
            className="px-8 py-3.5 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-3.5 px-6 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Next Step: Connect Meta"}
          </button>
        </div>
      </form>

      <div className="mt-10 text-center text-sm font-medium text-gray-600">
        Want to tour the AI tool?{" "}
        <button
          onClick={handleGuestLogin}
          className="text-primary font-semibold hover:underline"
        >
          Continue as a guest
        </button>
      </div>
    </div>
  );

  if (compact) {
    return <div className="px-6 py-8">{formContent}</div>;
  }

  return (
    <AuthLayout rightPanel={<Stepper steps={ONBOARDING_STEPS} currentStep={0} />}>
      {formContent}
    </AuthLayout>
  );
}
