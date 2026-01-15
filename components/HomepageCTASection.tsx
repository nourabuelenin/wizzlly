import { ArrowRight } from "lucide-react";
import Button from "./Button";

const SECTION_CONFIG = {
  headline: "Connect with us",
  description:
    "Having helped many clients globally with MVP development, prototyping, and full-cycle application development to go to market quickly, efficiently and cost effectively, We would like to do the same for you.",
  buttonText: "Let's Connect",
};

export default function HomepageCTASection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-10">
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            {SECTION_CONFIG.headline}
          </h2>
          <p className="text-black font-medium text-xl leading-relaxed">
            {SECTION_CONFIG.description}
          </p>
          {/* <Button text={SECTION_CONFIG.buttonText} ShowArrow={true} /> */}
          <Button
            text={SECTION_CONFIG.buttonText}
            ShowArrow={true}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}
