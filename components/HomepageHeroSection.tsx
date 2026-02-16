import HomepageHeroStats from "./HomepageHeroStats";
import Button from "./Button";
import TrustedBy from "./TrustedBy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageHeroSection({ dict }: any) {
  return (
    <section className="bg-gradient-to-br from-secondary/20 to-primary/20 text-white min-h-screen flex items-center pt-20 pb-20">
      <div className="flex flex-col lg:flex-row justify-between w-full px-4 lg:px-20 gap-10">
        {/* Left Side */}
        <aside className="lg:basis-1/2 flex flex-col justify-center gap-8">
          <h1 className="text-6xl lg:text-7xl text-foreground font-medium leading-tight tracking-wide">
            {dict.homepage.hero.title} <br />
          </h1>
          <div className="flex flex-col gap-6">
            <p className="text-2xl lg:text-3xl text-foreground font-medium tracking-wide leading-relaxed opacity-80">
              {dict.homepage.hero.subtitle}
            </p>
            <p className="text-2xl lg:text-3xl text-foreground font-medium tracking-wide leading-relaxed opacity-80">
              {dict.homepage.hero.subtitle2}
            </p>
          </div>
          <div className="flex gap-5 mt-4">
            <Button text={dict.homepage.hero.cta} showArrow={true} />
            <Button text={dict.homepage.hero.cta2} variant="secondary" showArrow={false} />
          </div>
          
          <TrustedBy text={dict.homepage.hero.trustedBy} />
        </aside>
        {/* Right Side */}
        <aside className="lg:basis-1/2 flex items-center justify-center">
          <HomepageHeroStats dict={dict} />
        </aside>
      </div>
    </section>
  );
}
