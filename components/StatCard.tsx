import { StatCardProps } from "@/models/Workstats";

export const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
  <div className="flex items-center gap-6 bg-white rounded-2xl p-6">
    <div className="bg-primary/10 p-3 rounded-xl">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <span className="text-6xl font-bold">{value}</span>
    <span className="text-2xl font-medium">{label}</span>
  </div>
);
