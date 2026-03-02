import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import AuthClient from "@/components/AuthClient";

interface AuthPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Auth({ params }: AuthPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen w-full relative">
      <AuthClient dict={dict} />
    </main>
  );
}
