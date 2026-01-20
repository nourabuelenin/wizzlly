import { StatCardProps } from "@/models/Workstats";

export const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
  <div className="flex items-center gap-4 md:gap-6 bg-white rounded-2xl p-4 md:p-6">
    <div className="bg-primary/10 p-2 md:p-3 rounded-xl flex-shrink-0">
      <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary" />
    </div>
    <div className="flex items-center gap-3 md:gap-8">
      <span className="text-3xl md:text-4xl lg:text-6xl font-bold">
        {value}
      </span>
      <span className="text-base lg:text-2xl font-medium">{label}</span>
    </div>
  </div>
);
