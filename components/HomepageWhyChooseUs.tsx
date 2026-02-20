import { Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Headline } from "./Headline";

// Configuration
const SECTION_CONFIG = {
  badge: {
    icon: Star,
    text: "Why Choose Us",
  },
  headline: ["Glowing Testiominals", "That Speak Volumes"],
};

export default function HomepageWhyChooseUs() {
  return (
    <section className="bg-surface-muted -mt-5 py-20 rounded-t-4xl">
      <div className="w-full px-4 lg:px-40 space-y-5">
        <SectionHeader {...SECTION_CONFIG.badge} />
        <Headline lines={SECTION_CONFIG.headline} />
      </div>
    </section>
  );
}
