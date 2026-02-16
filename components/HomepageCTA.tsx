import Image from "next/image";
import PatternDark from "@/public/images/Pattern_dark.png";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageCTA({ dict }: any) {
  const t = dict.homepage.cta;

  return (
    <section className="bg-foreground text-white relative overflow-hidden rounded-t-[50px] lg:rounded-tl-[24px] lg:rounded-tr-[24px] -mt-10 pt-20 pb-20 z-10">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image src={PatternDark} alt="Pattern" fill className="object-cover" />
      </div>

      <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
          {t.title}
        </h2>
        <p className="text-lg lg:text-xl opacity-90 mb-2 leading-relaxed">
          {t.subtitle}
        </p>
         <p className="text-sm opacity-70 mb-10 leading-relaxed">
          {t.note}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            text={t.ctaPrimary}
            className="bg-primary text-white hover:bg-primary/90"
            showArrow={true}
          />
           <Button
            text={t.ctaSecondary}
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            showArrow={false}
          />
        </div>
      </div>
    </section>
  );
}
