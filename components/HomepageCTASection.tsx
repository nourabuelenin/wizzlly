import Button from "./Button";
import Globe from "./lightswind/globe";
import { Locale } from "@/lib/i18n/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageCTASection({ dict, lang }: any) {
  const isArabic = lang === "ar";

  return (
    <section className="bg-background py-36 relative overflow-hidden">
      <div
        className={`container mx-auto px-10 flex ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            {dict.homepage.cta.headline}
          </h2>
          <p className="text-black font-medium text-xl leading-relaxed">
            {dict.homepage.cta.description}
          </p>
          <Button
            text={dict.homepage.cta.buttonText}
            ShowArrow={true}
            variant="secondary"
          />
        </div>
        <Globe markerColor="#7a49f5" />
      </div>
    </section>
  );
}
