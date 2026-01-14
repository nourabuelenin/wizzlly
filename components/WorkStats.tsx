import Image from "next/image";
import DevelopImage from "@/public/images/workstats.png";
import {
  CheckCircle,
  Clock10,
  Cloud,
  Code2,
  Globe,
  PhoneCall,
} from "lucide-react";
import {
  IconCardProps,
  ProjectsCardProps,
  ServiceCardProps,
  StatCardProps,
} from "@/models/Workstats";

// Configuration
const STATS_CONFIG = {
  experience: {
    icon: Clock10,
    value: "15+",
    label: "Years of Experience",
  },
  codingHours: {
    icon: Code2,
    value: "1M+",
    label: "Coding Hours",
  },
};

const SERVICE_CONFIG = {
  title: "Web",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis nisi laboriosam esse quibusdam quas porro explicabo error doloribus perspiciatis animi.",
  icons: [
    { icon: Globe, variant: "primary" as const },
    { icon: PhoneCall, variant: "secondary" as const },
    { icon: Cloud, variant: "secondary" as const },
  ],
};

const PROJECTS_CONFIG = {
  count: "500+",
  label: "Projects",
  status: "Delivered",
};

// Reusable Components
const IconCard = ({ icon: Icon, variant = "secondary" }: IconCardProps) => {
  const bgClass = variant === "primary" ? "bg-primary" : "bg-white";
  const iconClass = variant === "primary" ? "text-white" : "text-primary";

  return (
    <div className={`${bgClass} p-3 rounded-xl`}>
      <Icon className={`w-8 h-8 ${iconClass}`} />
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
  <div className="flex items-center gap-6 bg-white rounded-2xl p-6">
    <div className="bg-primary/10 p-3 rounded-xl">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <span className="text-6xl font-bold">{value}</span>
    <span className="text-2xl font-medium">{label}</span>
  </div>
);

const ServiceCard = ({ title, description, icons }: ServiceCardProps) => (
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

const ProjectsCard = ({ count, label, status }: ProjectsCardProps) => (
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

// Main Component
export default function WorkStats() {
  return (
    <section className="bg-surface-muted -mt-5 py-20 rounded-2xl">
      <div className="grid grid-cols-[auto_1fr] gap-2 container mx-auto px-10">
        {/* Left Side - Image */}
        <div>
          <Image
            src={DevelopImage}
            width={570}
            height={570}
            alt="design-develop-image"
          />
        </div>

        {/* Right Side - Bento Grid */}
        <div className="flex flex-col gap-4">
          {/* Top Row */}
          <div className="grid grid-cols-2 gap-4">
            <ServiceCard {...SERVICE_CONFIG} />
            <ProjectsCard {...PROJECTS_CONFIG} />
          </div>

          {/* Stats */}
          <StatCard {...STATS_CONFIG.experience} />
          <StatCard {...STATS_CONFIG.codingHours} />
        </div>
      </div>
    </section>
  );
}
