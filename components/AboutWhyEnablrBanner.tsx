import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutWhyEnablrBanner({ dict }: any) {
  const t = dict.aboutUs.whyEnablrBanner;

  return (
    <section className="bg-white py-10 px-4">
      <div className="w-full px-4 lg:px-40">
        <div className="bg-surface-muted rounded-[30px] p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-bold text-primary mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-foreground leading-relaxed font-medium opacity-80 text-justify">
              {t.description}
            </p>
          </div>
          <div className="lg:w-1/3 flex flex-col gap-4">
            <Button
              text={t.ctaPrimary}
              showArrow={true}
              className="bg-primary text-white hover:bg-primary/90 text-sm px-6 py-3 w-full justify-between"
            />
            <Button
              text={t.ctaSecondary}
              variant="secondary"
              showArrow={false}
              className="bg-transparent border border-primary text-primary hover:bg-primary/5 text-sm px-6 py-3 w-full justify-center"
            />
          </div>
        </div>
        <div className="text-center mt-6">
           <p className="text-foreground-light italic font-medium">
             {t.footerText}
           </p>
        </div>
      </div>
    </section>
  );
}
