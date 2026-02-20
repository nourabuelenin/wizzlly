import Image from "next/image";
import WorkStatsImg from "@/public/images/workstats.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutStatsSection({ dict }: any) {
  const t = dict.aboutUs.stats;
  
  return (
    <section className="bg-surface-muted py-20 px-4">
      <div className="w-full px-4 lg:px-40">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column - Image */}
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[400px] lg:h-[500px] rounded-[40px] overflow-hidden shadow-xl">
              <Image 
                src={WorkStatsImg} 
                alt="Getting started" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Right Column - Stats */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center">
            <p className="text-primary font-bold uppercase tracking-wider mb-4 text-sm">
              {t.badge}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-12">
              {t.title}
            </h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              {t.items.map((stat: any, index: number) => (
                <div key={index}>
                  <h3 className="text-5xl lg:text-6xl font-bold text-primary mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-foreground-light tracking-wide opacity-80">
                    {stat.label}
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
