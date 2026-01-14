import { IconCardProps } from "@/models/Workstats";

export const IconCard = ({
  icon: Icon,
  variant = "secondary",
}: IconCardProps) => {
  const bgClass = variant === "primary" ? "bg-primary" : "bg-white";
  const iconClass = variant === "primary" ? "text-white" : "text-primary";

  return (
    <div className={`${bgClass} p-3 rounded-xl`}>
      <Icon className={`w-8 h-8 ${iconClass}`} />
    </div>
  );
};
