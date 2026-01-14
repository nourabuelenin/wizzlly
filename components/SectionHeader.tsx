import { SectionHeaderProps } from "@/models/WhatWeDo";

export const SectionHeader = ({ icon: Icon, text }: SectionHeaderProps) => (
  <div className="flex items-center justify-center">
    <span className="flex gap-5 items-center bg-white p-3 rounded-full font-medium text-xl">
      {text}
      <span className="bg-primary/20 rounded-full p-2">
        <Icon className="text-primary fill-primary w-5 h-5" />
      </span>
    </span>
  </div>
);
