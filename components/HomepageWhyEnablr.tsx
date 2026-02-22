import { Users, BarChart2, Lightbulb, ListChecks, UserCheck, LineChart } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageWhyEnablr({ dict }: any) {
  const t = dict.homepage.whyEnablr;

  return (
    <section className="bg-background py-20 px-4">
      <div className="w-full px-4 lg:px-40">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider mb-4 block text-sm">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight whitespace-pre-line">
            {t.title}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.cards.map((card: any, index: number) => {
            const Icon = [Users, BarChart2, Lightbulb, ListChecks, UserCheck, LineChart][index];
            return (
              <div 
                key={index}
                className="bg-white p-8 lg:p-10 rounded-[30px] shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow h-full"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                    {card.title}
                </h3>
                <p className="text-foreground-light opacity-80 leading-relaxed text-[15px] flex-grow">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
