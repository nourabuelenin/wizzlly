import { SectionHeaderProps } from "@/models/WhatWeDo";

export const SectionHeader = ({ icon: Icon, text }: SectionHeaderProps) => (
  <div className="flex items-center justify-center">
    <span className="flex gap-2 md:gap-5 items-center bg-white p-2 md:p-3 rounded-full font-medium text-sm md:text-lg lg:text-xl">
      {text}
      <span className="bg-primary/20 rounded-full p-1 md:p-2">
        <Icon className="text-primary fill-primary w-4 h-4 md:w-5 md:h-5" />
      </span>
    </span>
  </div>
);
