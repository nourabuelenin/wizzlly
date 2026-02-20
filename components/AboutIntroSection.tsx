import Image from "next/image";
import AboutUsImg from "@/public/images/about_enablr.png";
import GoalsImg from "@/public/images/goals.png"; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutIntroSection({ dict }: any) {
  const t = dict.aboutUs.intro;
  return (
    <section className="bg-background py-20 px-4">
      <div className="w-full px-4 lg:px-40 flex flex-col gap-20">
        {/* Row 1: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[300px] lg:h-[400px] rounded-[30px] overflow-hidden shadow-lg">
              <Image src={AboutUsImg} alt="ENABLR work" fill className="object-cover" />
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <p className="text-lg lg:text-xl text-foreground font-medium leading-relaxed">
              {t.text1}
            </p>
          </div>
        </div>
        
        {/* Row 2: Text Left, Image Right */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full">
            <p className="text-lg lg:text-xl text-foreground font-medium leading-relaxed">
              {t.text2}
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative h-[300px] lg:h-[400px] rounded-[30px] overflow-hidden shadow-lg">
              <Image src={GoalsImg} alt="ENABLR growth" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
