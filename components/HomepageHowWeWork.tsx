import { Zap } from "lucide-react";

export default function HomepageHowWeWork() {
  return (
    <section className="bg-linear-to-tr from-[#032d79] to-[#0eaeef] -mt-5 py-24 rounded-t-2xl text-white">
      <div className="container mx-auto px-10 grid grid-cols-[1fr_2fr] gap-16 items-start">
        {/* Left Side */}
        <div className="flex flex-col gap-6  h-full justify-center">
          <span className="border border-white/70 w-fit rounded-full px-5 py-2 text-lg tracking-wide">
            How We Work
          </span>

          <h3 className="font-medium text-6xl leading-tight text-nowrap">
            Our Agile Process
          </h3>

          <p className="text-2xl text-white/90 max-w-xl">
            We have our unique ways of building your ideas efficiently and
            quickly.
          </p>
        </div>

        {/* Right Side */}
        <div className="grid grid-cols-3 gap-6">
          {[
            "Planning",
            "Design",
            "Development",
            "Testing",
            "Deployment",
            "Maintenance",
          ].map((title, index) => (
            <div
              key={title}
              className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 h-72 flex flex-col justify-between"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <span className="text-lg font-medium">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="bg-[#0eaeef]/50 p-2 rounded-full">
                  <Zap className="w-5 h-5 fill-white text-white" />
                </span>
              </div>

              {/* Bottom Text */}
              <p className="text-2xl font-medium">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
