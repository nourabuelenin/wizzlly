import Image from "next/image";
import HeroStatsImg from "@/public/images/hero_stats.png";
import HeroTrialImg from "@/public/images/hero_trial.png";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageHeroStats({ dict }: any) {
  const t = dict.homepage.hero.stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
      {/* Card 1: Average Client Results */}
      <div className="bg-[#2D9CDB] text-white p-8 rounded-[30px] flex flex-col justify-between h-[350px] relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm font-medium uppercase tracking-wider mb-2">
            {t.clientResults.title}
          </p>
          <h2 className="text-7xl font-bold mb-2">{t.clientResults.value}</h2>
          <p className="text-base font-medium">{t.clientResults.subtitle}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 relative z-10 mt-auto">
          <div>
            <p className="text-xl font-bold">4.8X</p>
            <p className="text-[10px] uppercase opacity-80">{t.clientResults.roi}</p>
          </div>
          <div>
            <p className="text-xl font-bold">$18M+</p>
            <p className="text-[10px] uppercase opacity-80">{t.clientResults.revenue}</p>
          </div>
          <div>
            <p className="text-xl font-bold">92%</p>
            <p className="text-[10px] uppercase opacity-80">{t.clientResults.renewed}</p>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Card 2: 230+ Big Companies */}
      <div className="relative bg-gray-900 text-white rounded-[30px] h-[350px] w-full overflow-hidden group">
        <Image
          src={HeroStatsImg}
          alt="Team working"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <h2 className="text-6xl font-bold mb-4">{t.companies.value}</h2>
            <p className="text-lg leading-relaxed">
              {t.companies.text}
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: Ready to Scale */}
      <div className="relative bg-gray-900 text-white rounded-[30px] h-[350px] w-full overflow-hidden group">
        <Image
          src={HeroTrialImg}
          alt="Business scaling"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <h3 className="text-xl font-bold mb-3 uppercase">
              {t.scale.title}
            </h3>
            <p className="text-sm opacity-90 mb-4">
              {t.scale.subtitle}
            </p>
          </div>
          <div className="pointer-events-auto">
            <Button text={t.scale.cta} showArrow={false} className="w-full" />
          </div>
        </div>
      </div>

      {/* Card 4: Drive More Traffic */}
      <div className="bg-[#8B5CF6] text-white p-8 rounded-[30px] h-[350px] flex flex-col relative overflow-hidden">
        <p className="text-sm font-medium uppercase tracking-wider mb-6 text-center">
          {t.traffic.title}
        </p>

        <div className="flex items-end justify-center gap-4 h-full flex-1 px-4 pb-12">
          {/* Bar 1 */}
          <div className="w-12 bg-white rounded-t-sm h-[60%] opacity-90 animate-pulse" style={{ animationDelay: '0ms' }}></div>
          {/* Bar 2 */}
          <div className="w-12 bg-white rounded-t-sm h-[40%] opacity-90 animate-pulse" style={{ animationDelay: '100ms' }}></div>
          {/* Bar 3 */}
          <div className="w-12 bg-white rounded-t-sm h-[80%] opacity-90 animate-pulse" style={{ animationDelay: '200ms' }}></div>
          {/* Bar 4 */}
          <div className="w-12 bg-white rounded-t-sm h-[25%] opacity-90 animate-pulse" style={{ animationDelay: '300ms' }}></div>
          {/* Bar 5 */}
          <div className="w-12 bg-white rounded-t-sm h-[35%] opacity-90 animate-pulse" style={{ animationDelay: '400ms' }}></div>
          {/* Bar 6 */}
          <div className="w-12 bg-white rounded-t-sm h-[55%] opacity-90 animate-pulse" style={{ animationDelay: '500ms' }}></div>

        </div>

        <div className="bg-white text-gray-900 absolute bottom-4 left-4 right-4 p-3 rounded-xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
            <span className="font-bold">{t.traffic.visitors}</span>
          </div>
          <span className="font-bold">50K+</span>
        </div>
      </div>
    </div>
  );
}
