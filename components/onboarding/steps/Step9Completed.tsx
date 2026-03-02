import { useRouter, useParams } from "next/navigation";

interface StepProps {
  isSubmitting: boolean;
  dict?: any;
}

export default function Step9Completed({ isSubmitting, dict }: StepProps) {
  const router = useRouter();
  const params = useParams();
  const currentLang = (params.lang as string) || "en";

  return (
    <div className="flex flex-col h-full mt-10 w-full max-w-2xl mx-auto px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight flex items-center gap-2">
          {dict?.onboarding?.step9?.title || "You're all set 🎉"}
        </h1>
        <p className="text-gray-500 text-lg sm:text-lg max-w-[90%]">
          {dict?.onboarding?.step9?.subtitle || "Our AI is now building your marketing engine based on your brand."}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 w-full flex flex-col h-[400px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 text-[15px]">
            {dict?.onboarding?.step9?.generatingDna || "Generating your business DNA"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
          https://businessurl.com
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#F9FAFB] rounded-xl mb-6">
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
              </svg>
              <span className="font-bold text-gray-900 text-lg">
                {dict?.onboarding?.step9?.generating || "Generating"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                {dict?.onboarding?.step9?.complete || "Generation Complete"}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <span className="text-[11px] font-semibold px-4 py-1.5 rounded-full bg-white border border-gray-100 text-primary shadow-sm">Professional</span>
          <span className="text-[11px] font-semibold px-4 py-1.5 rounded-full bg-white border border-gray-100 text-primary shadow-sm">Higher quality</span>
          <span className="text-[11px] font-semibold px-4 py-1.5 rounded-full bg-white border border-gray-100 text-primary shadow-sm">Premium</span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-8 relative">
        <button
          disabled={isSubmitting}
          onClick={() => router.push(`/${currentLang}/dashboard`)}
          className={`w-[320px] py-3.5 rounded-full font-semibold text-white transition-all shadow-md ${
            isSubmitting ? "bg-primary/50 cursor-not-allowed opacity-80" : "bg-primary hover:bg-primary/80 hover:shadow-lg hover:-translate-y-0.5"
          }`}
        >
          {dict?.onboarding?.step9?.launchButton || "Launch AI Workspace 🚀"}
        </button>
        <span className="text-xs text-gray-400 mt-4 tracking-wide font-medium">
          {dict?.onboarding?.step9?.youCanEditLater || "You can edit all of this later from your dashboard."}
        </span>
      </div>
    </div>
  );
}
