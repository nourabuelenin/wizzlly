import HomepageHeroSection from "@/components/HomepageHeroSection";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/dictionaries";
import { Locale, locales } from "@/lib/i18n/config";
import { ArrowRight } from "lucide-react";
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
    <>
      <main className="bg-black space-y-20">
        <Navbar lang={lang as Locale} dict={dict} />
        <HomepageHeroSection dict={dict} />
      </main>
    </>
  );
}
