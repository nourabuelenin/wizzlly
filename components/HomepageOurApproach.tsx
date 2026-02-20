import Image from "next/image";
import OurApproachImg from "@/public/images/our_approach.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageOurApproach({ dict }: any) {
  const t = dict.homepage.ourApproach;

  return (
    <section className="bg-border py-20">
      <div className="w-full px-4 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Stepper */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-[1px] bg-foreground z-0"></div>
            
            <ul className="space-y-8 relative z-10">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {t.steps.map((step: string, index: number) => (
                <li key={index} className="flex items-center gap-6 group">
                  <div className="w-[48px] h-[48px] rounded-full bg-white border border-foreground flex items-center justify-center text-foreground font-medium transition-colors group-hover:border-primary group-hover:text-primary shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-lg text-foreground font-medium group-hover:text-primary transition-colors">
                    {step}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider mb-2 block">
                {t.badge}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {t.title}
              </h2>
            </div>
            
            <div className="relative h-[300px] lg:h-[400px] w-full rounded-[30px] overflow-hidden group">
              <Image
                src={OurApproachImg}
                alt="Our Approach"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-5xl font-medium">
                      {t.imageText}
                  </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
