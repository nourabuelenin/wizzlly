import Image from "next/image";
import PatternDark from "@/public/images/Pattern_dark.png";
import enablrLogo from "@/public/images/enablr_logo_sec.png";
import { Check } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutEnablrToolSection({ dict }: any) {
  const t = dict.aboutUs.enablrTool;

  return (
    <section className="bg-foreground text-white relative overflow-hidden rounded-t-[24px] lg:rounded-t-[40px] mt-20 pt-16 pb-16 z-10 shadow-2xl">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Image src={PatternDark} alt="Pattern" fill className="object-cover" />
      </div>

      <div className="w-full px-4 lg:px-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <Image 
                src={enablrLogo} 
                alt="ENABLR" 
                width={140} 
                height={40} 
                className="object-contain" 
              />
            </div>
            <p className="text-sm tracking-wide font-medium mb-4 text-white/80">
              {t.badge}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight whitespace-pre-line">
              {t.title}
            </h2>
            <p className="text-base text-white/70 leading-relaxed text-left text-justify">
              {t.description}
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <ul className="space-y-6">
              {t.features.map((feature: any, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-base font-bold text-white mb-1 block">
                      {feature.title}
                    </span>
                    <span className="text-base font-medium text-white/70 block">
                      {feature.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
