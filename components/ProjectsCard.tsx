import { ProjectsCardProps } from "@/models/Workstats";
import { CheckCircle } from "lucide-react";

export const ProjectsCard = ({ count, label, status }: ProjectsCardProps) => (
  <div className="bg-primary flex items-center justify-center rounded-2xl p-6 text-white">
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-7xl font-bold">{count}</h3>
      <p className="text-3xl">{label}</p>
      <span className="flex gap-3 items-center text-xl bg-white text-primary font-semibold py-2 px-4 rounded-full">
        {status}
        <span className="bg-primary text-white rounded-full p-2">
          <CheckCircle className="w-5 h-5" />
        </span>
      </span>
    </div>
  </div>
);
