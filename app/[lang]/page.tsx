import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="p-20">
      <header className="w-full flex mb-10">
        <LanguageSwitcher currentLang={lang} />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">{dict.common.welcome}</h1>
      </main>
    </div>
  );
}
