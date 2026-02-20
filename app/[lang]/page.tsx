import HomepageHeroSection from "@/components/HomepageHeroSection";
import HomepageServices from "@/components/HomepageServices";
import HomepageEnablrCTA from "@/components/HomepageEnablrCTA";
import HomepageWhyEnablr from "@/components/HomepageWhyEnablr";
import HomepageProcess from "@/components/HomepageProcess";
import HomepageFAQ from "@/components/HomepageFAQ";
import HomepageTestimonials from "@/components/HomepageTestimonials";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/dictionaries";
import { Locale, locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import HomepageWorkStats from "@/components/HomepageWorkStatsSection";
import HomepageHowWeWork from "@/components/HomepageHowWeWork";
import HomepageWhyChooseUs from "@/components/HomepageWhyChooseUs";
import HomepageWhatWeOffer from "@/components/HomepageWhatWeOffer";
import HomepageAboutUs from "@/components/HomepageAboutUs";
import HomepageOurApproach from "@/components/HomepageOurApproach";
import HomepageCTA from "@/components/HomepageCTA";

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
      <main>
        <Navbar lang={lang as Locale} dict={dict} />
        <HomepageHeroSection dict={dict} />
        <HomepageWhatWeOffer dict={dict} />
        <HomepageAboutUs dict={dict} />
        <HomepageOurApproach dict={dict} />
        <HomepageServices dict={dict} />
        <HomepageEnablrCTA dict={dict} />
        <HomepageWhyEnablr dict={dict} />
        <HomepageProcess dict={dict} />
        <HomepageFAQ dict={dict} />
        <HomepageTestimonials dict={dict} />
        <HomepageCTA dict={dict} />
      </main>
    </>
  );
}
