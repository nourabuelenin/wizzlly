import Image from "next/image";
import StrategyImg from "@/public/images/strategy.png"; 
import { Check } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutStrategySection({ dict }: any) {
  const t = dict.aboutUs.strategy;

  return (
    <section className="bg-background py-20 px-4 mt-10">
      <div className="w-full px-4 lg:px-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center">
            <p className="text-primary font-bold uppercase tracking-wider mb-4 text-sm">
              {t.badge}
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {t.title}
            </h2>
            <p className="text-lg text-foreground-light leading-relaxed mb-8 opacity-80">
              {t.description}
            </p>

            <ul className="space-y-6">
              {t.items.map((item: any, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-primary stroke-[3]" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground">{item.title}</span>{" "}
                    <span className="text-foreground-light opacity-80 leading-relaxed">
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (Image) */}
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[350px] lg:h-[450px] rounded-[30px] overflow-hidden shadow-xl">
              <Image 
                src={StrategyImg} 
                alt="Strategy" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
