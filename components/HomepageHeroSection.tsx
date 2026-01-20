import Image from "next/image";
import HeroImg from "@/public/images/hero-image.png";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageHeroSection({ dict }: any) {
  return (
    <section className="bg-black text-white pt-20 pb-10 md:pt-40 md:pb-20">
      <div className="flex flex-col xl:flex-row justify-between container mx-auto px-4 md:px-10 gap-8 xl:gap-0">
        {/* Left Side */}
        <aside className="w-full xl:basis-1/2 flex flex-col justify-center gap-4 md:gap-5 pt-10 xl:pt-0 items-center md:items-center xl:items-start">
          <div className="flex gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-wide">
            {dict.homepage.hero.title} <br />
            <span>{dict.homepage.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-3xl font-medium tracking-wide text-center md:text-left">
            {dict.homepage.hero.subtitle}
          </p>
          <Button
            text={dict.homepage.hero.cta}
            ShowArrow={true}
            className="md:mt-5"
          />
        </aside>
        {/* Right Side */}
        <aside className="w-full xl:basis-1/2 flex items-center justify-center xl:items-end xl:justify-end">
          <Image
            src={HeroImg}
            width={600}
            height={600}
            alt="Hero Image"
            className="w-full md:w-150  h-auto"
          />
        </aside>
      </div>
    </section>
  );
}
