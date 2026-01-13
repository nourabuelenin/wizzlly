import type { Metadata } from "next";
import { locales, localeDirections, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";
import localFont from "next/font/local";

import { Alexandria } from "next/font/google";

export const metadata: Metadata = {
  title: "Willzy",
  description: "Your Analysis Companion",
};

const roundsNeue = localFont({
  src: [
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Thin Italic.woff2",
      weight: "100",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraLight Italic.woff2",
      weight: "200",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Light Italic.woff2",
      weight: "300",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Italic.woff2",
      weight: "400",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Medium Italic.woff2",
      weight: "500",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial DemiBold Italic.woff2",
      weight: "600",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Bold Italic.woff2",
      weight: "700",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraBold Italic.woff2",
      weight: "800",
      style: "italic",
    },

    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Black Italic.woff2",
      weight: "900",
      style: "italic",
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
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const isArabic = lang === "ar";

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const direction = localeDirections[lang as Locale];

  return (
    <html lang={lang} dir={direction}>
      <body
        className={`${
          isArabic ? alexandria.className : roundsNeue.className
        } antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
