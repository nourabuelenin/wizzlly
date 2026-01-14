import { LucideIcon } from "lucide-react";

// Types
export interface IconCardProps {
  icon: LucideIcon;
  variant?: "primary" | "secondary";
}

export interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface ServiceIcon {
  icon: LucideIcon;
  variant?: "primary" | "secondary";
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icons: ServiceIcon[];
}

export interface ProjectsCardProps {
  count: string;
  label: string;
  status: string;
}
