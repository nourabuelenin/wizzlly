import { ProjectsCardProps } from "@/models/Workstats";
import { CheckCircle } from "lucide-react";

export const ProjectsCard = ({ count, label, status }: ProjectsCardProps) => (
  <div className="bg-primary flex items-center justify-center rounded-2xl p-4 md:p-6 text-white">
    <div className="flex flex-col items-center gap-2 md:gap-4">
      <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold">{count}</h3>
      <p className="text-lg md:text-2xl lg:text-3xl">{label}</p>
      <span className="flex gap-2 md:gap-3 items-center text-xs md:text-sm lg:text-xl bg-white text-primary font-semibold py-1.5 md:py-2 px-3 md:px-4 rounded-full">
        {status}
        <span className="bg-primary text-white rounded-full p-1 md:p-2">
          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </span>
      </span>
    </div>
  </div>
);
