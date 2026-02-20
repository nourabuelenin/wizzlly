// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TermsContentSection({ dict }: any) {
  const t = dict.termsAndConditions.content;

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

          {/* Dynamic Sections (Definitions, Accounts, ... ) */}
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
