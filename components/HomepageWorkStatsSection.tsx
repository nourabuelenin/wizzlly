import Image from "next/image";
import DevelopImage from "@/public/images/workstats.webp";
import { Clock10, Code2, Globe, PhoneCall, Cloud } from "lucide-react";
import { StatCard } from "./StatCard";
import { WorkStatsServiceCard } from "./WorkStatsServiceCard";
import { ProjectsCard } from "./ProjectsCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageWorkStats({ dict }: any) {
  // Configuration
  const STATS_CONFIG = {
    experience: {
      icon: Clock10,
      value: "15+",
      label: dict.homepage.workStats.experience,
    },
    codingHours: {
      icon: Code2,
      value: "1M+",
      label: dict.homepage.workStats.codingHours,
    },
  };

  const SERVICE_CONFIG = {
    title: dict.homepage.workStats.serviceTitle,
    description: dict.homepage.workStats.serviceDescription,
    icons: [
      { icon: Globe, variant: "primary" as const },
      { icon: PhoneCall, variant: "secondary" as const },
      { icon: Cloud, variant: "secondary" as const },
    ],
  };

  const PROJECTS_CONFIG = {
    count: "500+",
    label: dict.homepage.workStats.projectsLabel,
    status: dict.homepage.workStats.projectsStatus,
  };
  return (
    <section className="bg-surface-muted -mt-5 py-20 rounded-t-4xl">
      <div className="grid grid-cols-[auto_1fr] gap-2 w-full px-4 lg:px-40">
        {/* Left Side - Image */}
        <div className="w-full flex justify-center xl:justify-start">
          <Image
            src={DevelopImage}
            width={570}
            height={570}
            alt="design-develop-image"
            className="w-full md:w-full md:h-[300px] xl:h-auto   h-auto"
          />
        </div>

        {/* Right Side - Bento Grid */}
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
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
