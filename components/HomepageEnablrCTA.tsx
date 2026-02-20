import Image from "next/image";
import PatternDark from "@/public/images/Pattern_dark.png";
import enablrLogo from "@/public/images/enablr_logo_sec.png";
import Button from "./Button";
import { Check, Info } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageEnablrCTA({ dict }: any) {
  const t = dict.homepage.enablrCTA;

  return (
    <section className="bg-foreground text-white relative overflow-hidden rounded-t-[24px] lg:rounded-t-[40px] mt-20 mb-20 pt-16 pb-12 z-10 shadow-2xl">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Image src={PatternDark} alt="Pattern" fill className="object-cover" />
      </div>

      <div className="w-full px-40 lg:px-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 m-16">
          {/* Left Column */}
          <div className="lg:w-2/3">
            <div className="mb-4">
              <Image 
                src={enablrLogo} 
                alt="ENABLR" 
                width={140} 
                height={40} 
                className="object-contain" // adjust based on actual logo
              />
            </div>
            <p className="text-sm tracking-wide font-medium mb-4 text-white/80">
              {t.badge}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              {t.title}
            </h2>
            <p className="text-base text-white/70 leading-relaxed text-justify">
              {t.description}
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <ul className="space-y-4">
              {t.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center gap-4">
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-base font-medium text-white/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Button
              text={t.ctaPrimary}
              showArrow={true}
              className="bg-primary text-white hover:bg-primary/90 text-sm px-6 py-3"
            />
            <Button
              text={t.ctaSecondary}
              variant="secondary"
              showArrow={false}
              className="bg-white text-primary hover:bg-white/90 text-sm px-8 py-3"
            />
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm mt-2">
            <Info className="w-4 h-4" />
            <p>{t.info}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
