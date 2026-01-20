import { ServiceCardProps } from "@/models/WhatWeDo";
import { Star, Zap, Wrench, Rocket, Lightbulb } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Headline } from "./Headline";
import { ServicesGrid } from "./ServicesGrid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageWhatWeDo({ dict }: any) {
  // Configuration
  const SECTION_CONFIG = {
    badge: {
      icon: Star,
      text: dict.homepage.whatWeDo.badge,
    },
    headline: [
      dict.homepage.whatWeDo.headline1,
      dict.homepage.whatWeDo.headline2,
    ],
  };

  const SERVICES_CONFIG: ServiceCardProps[] = [
    {
      icon: Zap,
      title: dict.homepage.whatWeDo.talentAugmentation,
      description: dict.homepage.whatWeDo.talentAugmentationDesc,
    },
    {
      icon: Wrench,
      title: dict.homepage.whatWeDo.productEngineering,
      description: dict.homepage.whatWeDo.productEngineeringDesc,
    },
    {
      icon: Rocket,
      title: dict.homepage.whatWeDo.startupService,
      description: dict.homepage.whatWeDo.startupServiceDesc,
    },
    {
      icon: Lightbulb,
      title: dict.homepage.whatWeDo.technologyConsulting,
      description: dict.homepage.whatWeDo.technologyConsultingDesc,
    },
  ];
  return (
    <section className="bg-surface-muted -mt-5 py-10 md:py-20 rounded-t-4xl">
      <div className="container mx-auto px-4 md:px-10 space-y-5">
        <SectionHeader {...SECTION_CONFIG.badge} />
        <Headline lines={SECTION_CONFIG.headline} />
        <ServicesGrid services={SERVICES_CONFIG} />
      </div>
    </section>
  );
}
