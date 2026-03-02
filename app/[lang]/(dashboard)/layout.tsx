import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/dictionaries";
import { locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import DashboardLayoutClient from "./DashboardLayoutClient";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang } = resolvedParams;

  if (!locales.includes(lang as Locale)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <DashboardLayoutClient dict={dict} lang={lang as Locale}>
      {children}
    </DashboardLayoutClient>
  );
}
