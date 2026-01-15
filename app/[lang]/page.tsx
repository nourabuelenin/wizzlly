import HomepageHeroSection from "@/components/HomepageHeroSection";
import { getDictionary } from "@/dictionaries";
import { Locale, locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import HomepageWorkStats from "@/components/HomepageWorkStatsSection";
import HomepageHowWeWork from "@/components/HomepageHowWeWork";
import HomepageWhyChooseUs from "@/components/HomepageWhyChooseUs";
import HomepageWhatWeDo from "@/components/HomepageWhatWeDoSection";
import HomepageCTASection from "@/components/HomepageCTASection";
import HomepageCaseStudies from "@/components/HomepageCaseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <Navbar lang={lang as Locale} dict={dict} />
      <main>
        <HomepageHeroSection dict={dict} />
        <HomepageWorkStats dict={dict} />
        <HomepageWhatWeDo dict={dict} />
        <HomepageHowWeWork dict={dict} />
        <HomepageWhyChooseUs dict={dict} />
        <HomepageCaseStudies dict={dict} />
        <HomepageCTASection dict={dict} lang={lang} />
        <Footer dict={dict} />
      </main>
    </>
  );
}
