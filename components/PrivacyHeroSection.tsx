// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrivacyHeroSection({ dict }: any) {
  const t = dict.privacyPolicy.hero;
  
  return (
    <section className="bg-gradient-to-br from-secondary/20 to-primary/20 text-foreground min-h-[400px] flex items-center justify-center pt-32 pb-20 px-4">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl pt-10">
        <p className="text-primary font-medium text-sm lg:text-base mb-4">
          {t.badge}
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-foreground">
          {t.title}
        </h1>
        <p className="text-lg lg:text-xl text-foreground-light opacity-80 leading-relaxed max-w-2xl font-medium">
          {t.subtitle}
        </p>
      </div>
    </section>
  );
}
