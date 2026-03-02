import { Check } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrivacyContentSection({ dict }: any) {
  const t = dict.privacyPolicy.content;

  return (
    <section className="bg-background py-16 px-4">
      <div className="w-full px-4 lg:px-40">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Main Title & Intro */}
          <div>
            <p className="text-primary font-medium text-sm uppercase mb-3">
              {t.agency}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t.title}
            </h2>
            <p className="text-lg text-foreground-light font-medium leading-relaxed opacity-90 text-justify">
              {t.intro}
            </p>
          </div>

          {/* Data We Collect (4-Col Grid) */}
          <div className="pt-2">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t.dataCollection.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.dataCollection.items.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-foreground mb-4 text-lg">
                    {item.title}
                  </h4>
                  <p className="text-sm text-foreground-light opacity-80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How We Use the Data (2-Col List) */}
          <div className="pt-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t.dataUsage.title}
            </h3>
            <p className="text-base text-foreground font-medium mb-6">
              {t.dataUsage.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {t.dataUsage.items.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-primary stroke-[3]" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed text-base pt-0.5">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Sections (Sharing, Protection, Cookies, Retention, Rights) */}
          <div className="pt-2 flex flex-col gap-10">
            {t.sections.map((section: any, idx: number) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.paragraphs.map((p: string, pIdx: number) => (
                    <p key={pIdx} className="text-base text-foreground-light font-medium leading-relaxed opacity-90 text-justify">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
