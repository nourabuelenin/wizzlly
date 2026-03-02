import HomepageHeroStats from "./HomepageHeroStats";
import Button from "./Button";
import TrustedBy from "./TrustedBy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageHeroSection({ dict }: any) {
  return (
    <section className="bg-gradient-to-br from-secondary/20 to-primary/20 text-white min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
      <div className="flex flex-col xl:flex-row items-center justify-between w-full px-4 lg:px-16 xl:px-32 2xl:px-40 gap-16 xl:gap-20 pt-10 xl:pt-20">
        {/* Left Side */}
        <aside className="w-full xl:w-[45%] flex flex-col justify-center gap-8">
          <h1 className="text-5xl lg:text-6xl 2xl:text-7xl text-foreground font-bold leading-tight tracking-wide">
            {dict.homepage.hero.title}
          </h1>
          <div className="flex flex-col gap-5">
            <p className="text-xl lg:text-2xl text-foreground font-medium tracking-wide leading-relaxed opacity-85">
              {dict.homepage.hero.subtitle}
            </p>
            <p className="text-xl lg:text-2xl text-foreground font-medium tracking-wide leading-relaxed opacity-85">
              {dict.homepage.hero.subtitle2}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <Button text={dict.homepage.hero.cta} showArrow={true} />
            <Button text={dict.homepage.hero.cta2} variant="secondary" showArrow={false} />
          </div>
          
          <div className="mt-4">
            <TrustedBy text={dict.homepage.hero.trustedBy} />
          </div>
        </aside>
        
        {/* Right Side */}
        <aside className="w-full xl:w-[50%] flex items-center justify-center relative">
          <HomepageHeroStats dict={dict} />
        </aside>
      </div>
    </section>
  );
}
