import Image from "next/image";
import PatternLight from "@/public/images/Pattern _light.png";
import Button from "./Button";
import { Check } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageServices({ dict }: any) {
  const t = dict.homepage.services;

  return (
    <section className="relative bg-background py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image src={PatternLight} alt="Pattern" fill className="object-cover" />
        </div>
      <div className="w-full px-4 lg:px-40 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-3 text-lg">{t.badge}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.title}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {t.items.map((service: any, index: number) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden bg-[url('/images/Pattern%20_light.png')] bg-no-repeat bg-right bg-contain rtl:bg-left ${
                index === 0 || index === 3 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 relative z-10">
                {service.title}
              </h3>
              <ul className="space-y-4 relative z-10">
                {service.list.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className="flex items-start gap-4">
                    <span className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-primary stroke-[3]" />
                    </span>
                    <span className="text-foreground-light text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <p className="text-foreground-light text-xl">{t.footerText}</p>
          <Button text={t.cta} showArrow={true} />
        </div>
      </div>
    </section>
  );
}
