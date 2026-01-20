import Image from "next/image";
import HeroImg from "@/public/images/hero-image.png";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageHeroSection({ dict }: any) {
  return (
    <section className="bg-black text-white pt-20 pb-10 md:pt-32 md:pb-20">
      <div className="flex flex-col md:flex-row justify-between container mx-auto px-4 md:px-10 gap-8 md:gap-0">
        {/* Left Side */}
        <aside className="w-full md:basis-1/2 flex flex-col justify-center gap-4 md:gap-5 pt-10 md:pt-0 items-center md:items-start">
          <div className="flex gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-tight tracking-wide">
            {dict.homepage.hero.title} <br />
            <span>{dict.homepage.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
            {dict.homepage.hero.subtitle}
          </p>
          <Button text={dict.homepage.hero.cta} ShowArrow={true} />
        </aside>
        {/* Right Side */}
        <aside className="w-full md:basis-1/2 flex items-end justify-center md:justify-end">
          <Image
            src={HeroImg}
            width={600}
            height={600}
            alt="Hero Image"
            className="w-full md:w-auto md:max-w-[400px] lg:max-w-[600px] 2xl:max-w-none h-auto"
          />
        </aside>
      </div>
    </section>
  );
}
