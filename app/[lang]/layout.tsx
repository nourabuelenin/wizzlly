import type { Metadata } from "next";
import { locales, localeDirections, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";
import { Alexandria, Poppins } from "next/font/google";
import { getDictionary } from "@/dictionaries";

export const metadata: Metadata = {
  title: "enablr",
  description: "Your Analysis Companion",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
const alexandria = Alexandria({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string } | Promise<{ lang: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { lang } = resolvedParams;

  if (!locales.includes(lang as Locale)) notFound();

  const isArabic = lang === "ar";
  const direction = localeDirections[lang as Locale];
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} dir={direction}>
      <body
        className={`${
          isArabic ? alexandria.className : poppins.className
        } antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
