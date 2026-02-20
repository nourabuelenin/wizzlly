import Image from "next/image";
import processBg from "@/public/images/process_bg.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageProcess({ dict }: any) {
  const t = dict.homepage.process;

  return (
    <section className="bg-background py-20 px-4">
      <div className="w-full px-4 lg:px-40">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-wider mb-3 text-sm">
            {t.badge}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            {t.title}
          </h2>
        </div>

        {/* Process Banner */}
        <div className="relative rounded-[12px] lg:rounded-[24px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src={processBg} 
              alt="Process Background" 
              fill 
              className="object-cover" 
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
          </div>

          {/* Steps Content */}
          <div className="relative z-10 p-4 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-0 lg:divide-x divide-white/20">
            
            {/* Mobile View: Vertical list */}
            <div className="block lg:hidden space-y-4">
              {t.steps.map((step: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-md">
                      {step.number}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed pl-14">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop View: Horizontal layout */}
            <div className="hidden lg:flex flex-row w-full divide-x divide-white/20">
              {t.steps.map((step: any, index: number) => (
                <div 
                  key={index} 
                  className="flex-1 flex flex-col justify-start px-8 first:pl-0 last:pr-0"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                      {step.number}
                    </span>
                    <h3 className="text-white font-bold text-xl leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed pl-[4rem]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
