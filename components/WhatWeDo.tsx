import { SectionHeaderProps, ServiceCardProps } from "@/models/WhatWeDo";
import { Star, Zap, Wrench, Rocket, Lightbulb } from "lucide-react";

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

// Reusable Components
const SectionHeader = ({ icon: Icon, text }: SectionHeaderProps) => (
  <div className="flex items-center justify-center">
    <span className="flex gap-5 items-center bg-white p-3 rounded-full font-medium text-xl">
      {text}
      <span className="bg-primary/20 rounded-full p-2">
        <Icon className="text-primary fill-primary w-5 h-5" />
      </span>
    </span>
  </div>
);

const Headline = ({ lines }: { lines: string[] }) => (
  <div className="flex flex-col gap-2 text-7xl font-semibold items-center justify-center m-12">
    {lines.map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
);

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => (
  <div className="bg-white p-6 rounded-2xl space-y-3">
    <span className="inline-flex items-center justify-center bg-primary/20 p-4 rounded-full">
      <Icon className="w-6 h-6 text-primary fill-primary" />
    </span>
    <h3 className="font-medium text-2xl">{title}</h3>
    <p className="text-gray-500 text-lg">{description}</p>
  </div>
);

const ServicesGrid = ({ services }: { services: ServiceCardProps[] }) => (
  <div className="flex justify-between gap-10">
    {services.map((service, index) => (
      <ServiceCard key={index} {...service} />
    ))}
  </div>
);

// Main Component
export default function WhatWeDo() {
  return (
    <section className="bg-surface-muted -mt-5 py-20">
      <div className="container mx-auto px-10 space-y-5">
        <SectionHeader {...SECTION_CONFIG.badge} />
        <Headline lines={SECTION_CONFIG.headline} />
        <ServicesGrid services={SERVICES_CONFIG} />
      </div>
    </section>
  );
}
