import { ServiceCardProps } from "@/models/WhatWeDo";
import { ServiceCard } from "./WhatWeDoServiceCard";

export const ServicesGrid = ({
  services,
}: {
  services: ServiceCardProps[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
    {services.map((service, index) => (
      <ServiceCard key={index} {...service} />
    ))}
  </div>
);
