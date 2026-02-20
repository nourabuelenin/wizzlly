import Image from "next/image";
import WhoWeAreImg from "@/public/images/who_we_are.png";
import { Target, Rocket, Star } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageAboutUs({ dict }: any) {
  const t = dict.homepage.aboutUs;

  return (
    <section className="bg-surface py-20">
      <div className="w-full px-4 lg:px-40">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 items-start">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider mb-4 block">
              {t.badge}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {t.title}
            </h2>
          </div>
          <div>
            <p className="text-lg text-foreground-light leading-relaxed whitespace-pre-line opacity-80">
              {t.description}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Col 1: Who We Are Image */}
          <div className="relative h-[400px] lg:h-full rounded-[30px] overflow-hidden group">
            <Image
              src={WhoWeAreImg}
              alt="Who We Are"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <h3 className="absolute bottom-8 left-8 text-white text-4xl font-bold z-10">
              {t.cards.whoWeAre}
            </h3>
          </div>

          {/* Col 2: Vision & Mission */}
          <div className="flex flex-col gap-6">
            {/* Vision */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-6">
                 <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.cards.vision.title}</h3>
              <p className="text-foreground-light opacity-80 leading-relaxed">
                {t.cards.vision.description}
              </p>
            </div>
            
             {/* Mission */}
             <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-6">
                 <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.cards.mission.title}</h3>
              <p className="text-foreground-light opacity-80 leading-relaxed">
                {t.cards.mission.description}
              </p>
            </div>
          </div>

          {/* Col 3: Values */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-6">
               <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-6">{t.cards.values.title}</h3>
            <ul className="space-y-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {t.cards.values.list.map((item: any, index: number) => (
                <li key={index}>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground-light opacity-70 leading-relaxed">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
