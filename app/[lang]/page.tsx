import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Navbar from "@/components/Navbar";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-black">
      <Navbar params={params} />
    </main>
  );
}
