import Image from "next/image";
import DevelopImage from "@/public/images/workstats.png";
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
    <section className="bg-surface-muted -mt-5 py-10 md:py-20 rounded-t-4xl">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-2 container mx-auto px-4 md:px-10">
        {/* Left Side - Image */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <Image
            src={DevelopImage}
            width={570}
            height={570}
            alt="design-develop-image"
            className="w-full md:w-auto md:max-w-[400px] lg:max-w-[570px] h-auto"
          />
        </div>

        {/* Right Side - Bento Grid */}
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
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
