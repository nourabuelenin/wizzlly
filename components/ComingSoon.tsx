import Link from "next/link";

type ComingSoonProps = {
  title: string;
  subtitle: string;
  backText: string;
  backHref: string;
  comingSoonLabel: string;
};

export default function ComingSoon({
  title,
  subtitle,
  backText,
  backHref,
  comingSoonLabel,
}: ComingSoonProps) {
  return (
    <section className="bg-gradient-to-br from-secondary/20 to-primary/20 text-foreground min-h-screen flex items-center justify-center pt-32 pb-20 px-4">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl pt-10">
        <p className="text-primary font-medium text-sm lg:text-base uppercase tracking-wider mb-4">
          {comingSoonLabel}
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-foreground">
          {title}
        </h1>
        <p className="text-lg lg:text-xl text-foreground-light opacity-80 leading-relaxed max-w-2xl font-medium mb-12">
          {subtitle}
        </p>
        <Link
          href={backHref}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-105"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {backText}
        </Link>
      </div>
    </section>
  );
}
