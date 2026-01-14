import { ServiceCardProps } from "@/models/WhatWeDo";
import { ServiceCard } from "./WhatWeDoServiceCard";

export const ServicesGrid = ({
  services,
}: {
  services: ServiceCardProps[];
}) => (
  <div className="flex justify-between gap-10">
    {services.map((service, index) => (
      <ServiceCard key={index} {...service} />
    ))}
  </div>
);
