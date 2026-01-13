import type { Metadata } from "next";
import { locales, localeDirections, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";
import localFont from "next/font/local";
import { Alexandria } from "next/font/google";
import { getDictionary } from "@/dictionaries";
import Navbar from "@/components/Navbar";
import React from "react";

export const metadata: Metadata = {
  title: "Willzy",
  description: "Your Analysis Companion",
};

const roundsNeue = localFont({
  src: [
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-rounds-neue",
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
          isArabic ? alexandria.className : roundsNeue.className
        } antialiased`}
      >
        <Navbar lang={lang as Locale} dict={dict} />
        {children}
      </body>
    </html>
  );
}
