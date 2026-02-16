import Image from "next/image";
import PatternDark from "@/public/images/Pattern_dark.png";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageWhatWeOffer({ dict }: any) {
  const t = dict.homepage.whatWeOffer;

  return (
    <section className="bg-foreground text-white relative overflow-hidden rounded-b-[50px] lg:rounded-bl-[24px] lg:rounded-br-[24px] -mt-10 pt-20 pb-20 z-10">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image src={PatternDark} alt="Pattern" fill className="object-cover" />
      </div>

      <div className="container mx-auto px-4 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-medium uppercase tracking-wider mb-4">
            {t.badge}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Step 1 */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E0D4FC] flex items-center justify-center text-foreground font-bold text-2xl">
                  {t.steps[0].number}
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight">{t.steps[0].title}</h3>
            </div>
            <p className="text-lg opacity-80 mb-8 leading-relaxed pl-[88px]">
              {t.steps[0].description}
            </p>
            <div className="pl-[88px]">
              <Button
                text={t.steps[0].cta}
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                showArrow={false}
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-6 mb-4">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E0D4FC] flex items-center justify-center text-foreground font-bold text-2xl">
                  {t.steps[1].number}
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight">{t.steps[1].title}</h3>
            </div>
            <p className="text-lg opacity-80 mb-8 leading-relaxed pl-[88px]">
              {t.steps[1].description}
            </p>
            <div className="pl-[88px]">
              <Button
                text={t.steps[1].cta}
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                showArrow={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
