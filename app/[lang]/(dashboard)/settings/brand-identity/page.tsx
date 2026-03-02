import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import BrandIdentityPageClient from "./BrandIdentityPageClient";

interface BrandIdentityPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function BrandIdentity({ params }: BrandIdentityPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <BrandIdentityPageClient dict={dict} lang={lang} />;
}
