import { getDictionary } from "@/dictionaries";
import { Locale, locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHeroSection from "@/components/AboutHeroSection";
import AboutIntroSection from "@/components/AboutIntroSection";
import AboutStatsSection from "@/components/AboutStatsSection";
import AboutStrategySection from "@/components/AboutStrategySection";
import AboutEnablrToolSection from "@/components/AboutEnablrToolSection";
import AboutWhyEnablrBanner from "@/components/AboutWhyEnablrBanner";

export default async function About({
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
      <main>
        <Navbar lang={lang as Locale} dict={dict} />
        <AboutHeroSection dict={dict} />
        <AboutIntroSection dict={dict} />
        <AboutStatsSection dict={dict} />
        <AboutStrategySection dict={dict} />
        <AboutEnablrToolSection dict={dict} />
        <AboutWhyEnablrBanner dict={dict} />
      </main>
    </>
  );
}
