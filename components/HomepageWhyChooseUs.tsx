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
      <div className="w-full px-4 lg:px-40 space-y-5">
        <SectionHeader {...SECTION_CONFIG.badge} />
        <Headline lines={SECTION_CONFIG.headline} />
      </div>
    </section>
  );
}
