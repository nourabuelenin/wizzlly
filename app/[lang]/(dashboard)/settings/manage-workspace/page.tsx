import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import ManageWorkspacePageClient from "./ManageWorkspacePageClient";

interface ManageWorkspacePageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ManageWorkspace({ params }: ManageWorkspacePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ManageWorkspacePageClient dict={dict} lang={lang} />;
}
