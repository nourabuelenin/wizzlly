import { getDictionary } from "@/dictionaries";
import { Locale, locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: { lang: string } | Promise<{ lang: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang } = resolvedParams;

  if (!locales.includes(lang as Locale)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <main className=" bg-black">
      <section className="text-white p-10">
        <h1>{dict.common.welcome}</h1>
        <p>Your hero section content goes here.</p>
      </section>
    </main>
  );
}
