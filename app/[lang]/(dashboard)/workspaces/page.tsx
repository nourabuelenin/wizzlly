import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import WorkspacesPageClient from "./WorkspacesPageClient";

interface WorkspacesPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Workspaces({ params }: WorkspacesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <WorkspacesPageClient dict={dict} lang={lang} />;
}
