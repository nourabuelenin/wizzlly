import { getDictionary } from "@/dictionaries";
import { Locale, locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyHeroSection from "@/components/PrivacyHeroSection";
import PrivacyContentSection from "@/components/PrivacyContentSection";

export default async function PrivacyPolicy({
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
        <PrivacyHeroSection dict={dict} />
        <PrivacyContentSection dict={dict} />
      </main>
    </>
  );
}
