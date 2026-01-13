import { ArrowRight } from "lucide-react";
import Image from "next/image";
import HeroImg from "@/public/images/hero-image.png";

export default function HomepageHeroSection() {
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
          Crafting Future <br />
          <span>Software Today!</span>
        </h1>
        <p className="text-2xl font-medium tracking-wide">
          Transforming Ideas Into Software Success Stories
        </p>
        <button className="inline-flex gap-5 bg-white text-black p-3 rounded-full text-xl items-center w-fit ">
          Let&apos;s Connect
          <span className="bg-primary text-white rounded-full p-3">
            <ArrowRight />
          </span>
        </button>
      </aside>
      {/* Right Side */}
      <aside className=" basis-1/2 flex items-end justify-end">
        <Image src={HeroImg} width={600} height={600} alt="Hero Image" />
      </aside>
    </section>
  );
}
