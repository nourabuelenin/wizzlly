import { ServiceCardProps } from "@/models/WhatWeDo";
import { Star, Zap, Wrench, Rocket, Lightbulb } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Headline } from "./Headline";
import { ServicesGrid } from "./ServicesGrid";

// Configuration
const SECTION_CONFIG = {
  badge: {
    icon: Star,
    text: "What We Do",
  },
  headline: [
    "With Willzy, You Perform Better.",
    "Always! It is our guarantee.",
  ],
};

const SERVICES_CONFIG: ServiceCardProps[] = [
  {
    icon: Zap,
    title: "Talent Augmentation",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi velit ipsum, voluptatem beatae delectus doloremque quis unde voluptatibus ea",
  },
  {
    icon: Wrench,
    title: "Product Engineering",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi velit ipsum, voluptatem beatae delectus doloremque quis unde voluptatibus ea",
  },
  {
    icon: Rocket,
    title: "Startup Service",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi velit ipsum, voluptatem beatae delectus doloremque quis unde voluptatibus ea",
  },
  {
    icon: Lightbulb,
    title: "Technology Consulting",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi velit ipsum, voluptatem beatae delectus doloremque quis unde voluptatibus ea",
  },
];

// Main Component
export default function HomepageWhatWeDo() {
  return (
    <section className="bg-surface-muted -mt-5 py-20 rounded-t-4xl">
      <div className="container mx-auto px-10 space-y-5">
        <SectionHeader {...SECTION_CONFIG.badge} />
        <Headline lines={SECTION_CONFIG.headline} />
        <ServicesGrid services={SERVICES_CONFIG} />
      </div>
    </section>
  );
}
