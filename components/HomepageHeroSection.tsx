import Image from "next/image";
import HeroImg from "@/public/images/hero-image.png";
import Button from "./Button";

export default function HomepageHeroSection({ dict }: any) {
  return (
    <section className="text-white p-10 flex justify-between container mx-auto">
      {/* Left Side */}
      <aside className=" basis-1/2 flex flex-col justify-center gap-5 ">
        <div className="flex gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        </div>
        <h1 className="text-7xl font-medium leading-tight tracking-wide">
          {dict.homepage.hero.title} <br />
          <span>{dict.homepage.hero.titleHighlight}</span>
        </h1>
        <p className="text-2xl font-medium tracking-wide">
          {dict.homepage.hero.subtitle}
        </p>
        <Button text={dict.homepage.hero.cta} ShowArrow={true} />
      </aside>
      {/* Right Side */}
      <aside className=" basis-1/2 flex items-end justify-end">
        <Image src={HeroImg} width={600} height={600} alt="Hero Image" />
      </aside>
    </section>
  );
}
