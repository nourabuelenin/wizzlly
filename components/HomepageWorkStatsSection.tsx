import Image from "next/image";
import DevelopImage from "@/public/images/workstats.png";
import { Clock10, Code2, Globe, PhoneCall, Cloud } from "lucide-react";
import { StatCard } from "./StatCard";
import { WorkStatsServiceCard } from "./WorkStatsServiceCard";
import { ProjectsCard } from "./ProjectsCard";

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

// Main Component
export default function WorkStats() {
  return (
    <section className="bg-surface-muted -mt-5 py-20 rounded-t-2xl">
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
            <WorkStatsServiceCard {...SERVICE_CONFIG} />
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
