import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import AuthClient from "@/components/AuthClient";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface AuthPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Auth({ params }: AuthPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <section className="container mx-auto min-h-screen flex justify-center items-center relative">
      <div className="absolute top-10 right-10">
        <LanguageSwitcher currentLang={lang} textColor="text-gray-800" />
      </div>
      <AuthClient dict={dict} />
    </section>
  );
}
