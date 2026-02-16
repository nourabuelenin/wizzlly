"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import Button from "./Button";

type NavbarLinksProps = {
  lang: Locale;
  dict: {
    home: string;
    products: string;
    solutions: string;
    pricing: string;
    aboutUs: string;
    contactUs: string;
  };
};

export function NavbarLinks({ lang, dict }: NavbarLinksProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: dict.home, key: "home" },
    { href: `/${lang}/products`, label: dict.products, key: "products" },
    { href: `/${lang}/solutions`, label: dict.solutions, key: "solutions" },
    { href: `/${lang}/pricing`, label: dict.pricing, key: "pricing" },
    { href: `/${lang}/about`, label: dict.aboutUs, key: "aboutUs" },
    { href: `/${lang}/contact`, label: dict.contactUs, key: "contactUs" },
  ];

  return (
    <ul className="flex items-center gap-2 text-lg font-medium">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.key === "home" && pathname === "/");

        if (link.key === "contactUs") {
          return (
            // <li key={link.key}>
            //   <Link
            //     href={link.href}
            //     className="inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium bg-white text-primary transition-colors hover:bg-surface-muted ml-4"
            //   >
            //     {link.label}
            //   </Link>
            // </li>
            <Button text={link.label} showArrow={true} />
          );
        }

        return (
          <li key={link.key}>
            <Link
              href={link.href}
              className={`px-4 py-2 rounded-full transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
