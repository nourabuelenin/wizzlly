import { ServiceCardProps } from "@/models/WhatWeDo";

export const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) => (
  <div className="bg-white p-6 rounded-2xl space-y-3">
    <span className="inline-flex items-center justify-center bg-primary/20 p-4 rounded-full">
      <Icon className="w-6 h-6 text-primary fill-primary" />
    </span>
    <h3 className="font-medium text-2xl">{title}</h3>
    <p className="text-gray-500 text-lg">{description}</p>
  </div>
);
