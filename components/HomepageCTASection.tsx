import Button from "./Button";
import Globe from "./lightswind/globe";
import { Locale } from "@/lib/i18n/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageCTASection({ dict, lang }: any) {
  const isArabic = lang === "ar";

  return (
    <section className="bg-background py-12 md:py-24 lg:py-36 relative overflow-hidden">
      <div
        className={`container mx-auto px-4 md:px-10 flex flex-col md:flex-row ${
          isArabic ? "md:flex-row-reverse" : ""
        } gap-8 md:gap-0 items-center`}
      >
        <div className="w-full md:max-w-xl space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            {dict.homepage.cta.headline}
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-black font-medium leading-relaxed">
            {dict.homepage.cta.description}
          </p>
          <Button
            text={dict.homepage.cta.buttonText}
            showArrow={true}
            variant="secondary"
          />
        </div>
        <div className="w-full md:flex-1 flex justify-center md:justify-end">
          <Globe markerColor="#7a49f5" />
        </div>
      </div>
    </section>
  );
}
