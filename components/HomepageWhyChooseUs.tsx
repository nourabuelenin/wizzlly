import { Star, Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Headline } from "./Headline";
import Image from "next/image";
import SaudiFlag from "@/public/images/flag-saudi.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageWhyChooseUs({ dict }: any) {
  const SECTION_CONFIG = {
    badge: {
      icon: Star,
      text: dict.homepage.whyChooseUs.badge,
    },
    headline: [
      dict.homepage.whyChooseUs.headline1,
      dict.homepage.whyChooseUs.headline2,
    ],
  };

  const TESTIMONIALS = dict.homepage.whyChooseUs.testimonials;
  return (
    <section className="bg-surface-muted -mt-5 py-20 rounded-t-4xl">
      <div className="container mx-auto px-10 space-y-12">
        <div className="space-y-5">
          <SectionHeader {...SECTION_CONFIG.badge} />
          <Headline lines={SECTION_CONFIG.headline} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item: any, index: any) => (
            <div
              key={item.name + index}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
            >
              {/* Top Content */}
              <div className="space-y-4">
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white fill-white" />
                </div>

                {/* Title */}
                <h4 className="font-medium text-3xl">{item.title}</h4>

                {/* Text */}
                <p className="text-gray-500 text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>

              {/* Identity — always at bottom */}
              <div className="flex items-center gap-3 pt-6 mt-auto">
                <Image
                  src={SaudiFlag}
                  alt={`${item.name} country`}
                  width={40}
                  height={40}
                  className="rounded-sm"
                />

                <div className="text-base">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-500">
                    {item.role} @ {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
