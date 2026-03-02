export interface StepConfig {
  id: number;
  /** Dictionary key used to look up translated title/description under `onboarding.steps.<key>` */
  key: string;
  /** English fallback title */
  title: string;
  /** English fallback description */
  description: string;
}

export const ONBOARDING_STEPS: StepConfig[] = [
  {
    id: 1,
    key: "connectMeta",
    title: "Connect Meta",
    description: "Link Meta Business.",
  },
  {
    id: 2,
    key: "brandBasics",
    title: "Brand Basics",
    description: "Tell us about your brand.",
  },
  {
    id: 3,
    key: "industryOffering",
    title: "Industry & Offering",
    description: "What do you offer?",
  },
  {
    id: 4,
    key: "idealCustomers",
    title: "Ideal Customers (ICP)",
    description: "Who are you trying to reach?",
  },
  {
    id: 5,
    key: "marketsLanguages",
    title: "Markets & Languages",
    description: "Where do you operate?",
  },
  {
    id: 6,
    key: "pricingPositioning",
    title: "Pricing & Positioning",
    description: "How do you compete?",
  },
  {
    id: 7,
    key: "brandRules",
    title: "Brand Rules",
    description: "Brand voice & boundaries.",
  },
  {
    id: 8,
    key: "digitalPresence",
    title: "Digital Presence",
    description: "Brand online presence and experience.",
  },
];
