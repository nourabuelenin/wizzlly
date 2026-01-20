import { ServiceCardProps } from "@/models/WhatWeDo";

export const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) => (
  <div className="bg-white p-4 md:p-6 rounded-2xl space-y-2 md:space-y-3">
    <span className="inline-flex items-center justify-center bg-primary/20 p-2 md:p-4 rounded-full">
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary fill-primary" />
    </span>
    <h3 className="font-medium text-lg md:text-xl lg:text-2xl">{title}</h3>
    <p className="text-gray-500 text-sm md:text-base lg:text-lg">
      {description}
    </p>
  </div>
);
