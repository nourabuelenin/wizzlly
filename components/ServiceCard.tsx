import { ServiceCardProps } from "@/models/Workstats";
import { IconCard } from "./IconCard";

export const ServiceCard = ({
  title,
  description,
  icons,
}: ServiceCardProps) => (
  <div className="bg-white rounded-2xl p-6 flex flex-col justify-between">
    <div>
      <h3 className="font-bold text-2xl mb-3">{title}</h3>
      <p className="text-gray-500 text-lg">{description}</p>
    </div>
    <div className="flex gap-3 mt-4 p-4 items-center justify-between bg-[#f7f2fc] rounded-xl">
      {icons.map((iconConfig, index) => (
        <IconCard
          key={index}
          icon={iconConfig.icon}
          variant={iconConfig.variant}
        />
      ))}
    </div>
  </div>
);
