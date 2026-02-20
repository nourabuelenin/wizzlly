import { getDictionary } from "@/dictionaries";
import { Locale, locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";

export default async function Products({
  params,
}: {
  params: { lang: string } | Promise<{ lang: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang } = resolvedParams;

  if (!locales.includes(lang as Locale)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <ComingSoon
      title={dict.comingSoon.title}
      subtitle={dict.comingSoon.subtitle}
      backText={dict.comingSoon.backText}
      backHref={`/${lang}`}
      comingSoonLabel={dict.comingSoon.label}
    />
  );
}
