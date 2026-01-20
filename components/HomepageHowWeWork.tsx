import { Zap } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageHowWeWork({ dict }: any) {
  return (
    <section className="bg-linear-to-tr from-[#032d79] to-[#0eaeef] -mt-5 py-10 md:py-24 rounded-t-2xl text-white">
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8 md:gap-8 lg:gap-10 xl:gap-16 items-start">
        {/* Left Side */}
        <div className="flex flex-col gap-4 md:gap-6 h-full justify-center items-center xl:items-start text-center xl:text-start">
          <span className="border border-white/70 w-fit rounded-full px-4 md:px-5 py-1.5 md:py-2 text-sm md:text-lg tracking-wide">
            {dict.homepage.howWeWork.badge}
          </span>

          <h3 className="font-medium text-4xl md:text-5xl lg:text-6xl xl:text-6xl leading-tight">
            {dict.homepage.howWeWork.headline}
          </h3>

          <p className="text-lg md:text-2xl lg:text-2xl text-white/90 max-w-xl">
            {dict.homepage.howWeWork.description}
          </p>
        </div>

        {/* Right Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
          {dict.homepage.howWeWork.steps.map((title: string, index: number) => (
            <div
              key={title}
              className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 md:p-6 h-56 sm:h-64 md:h-72 flex flex-col justify-between"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <span className="text-base md:text-lg font-medium">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="bg-[#0eaeef]/50 p-1.5 md:p-2 rounded-full">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 fill-white text-white" />
                </span>
              </div>

              {/* Bottom Text */}
              <p className="text-lg md:text-xl lg:text-2xl font-medium">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
