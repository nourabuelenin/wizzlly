"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import Button from "./Button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: dict.home, key: "home" },
    { href: `/${lang}/products`, label: dict.products, key: "products" },
    { href: `/${lang}/solutions`, label: dict.solutions, key: "solutions" },
    { href: `/${lang}/pricing`, label: dict.pricing, key: "pricing" },
    { href: `/${lang}/about`, label: dict.aboutUs, key: "aboutUs" },
    { href: `/${lang}/contact`, label: dict.contactUs, key: "contactUs" },
  ];

  return (
    <>
      <div className="lg:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center gap-2 text-lg font-medium">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.key === "home" && pathname === "/");

          if (link.key === "contactUs") {
            return (
              <li key={link.key}>
                <Button text={link.label} showArrow={true} />
              </li>
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-background/95 backdrop-blur-xl shadow-lg rounded-2xl flex flex-col p-6 gap-4 lg:hidden border border-white/20 z-50">
          <ul className="flex flex-col items-start gap-4 text-lg font-medium w-full">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.key === "home" && pathname === "/");

              if (link.key === "contactUs") {
                return (
                  <li key={link.key} className="w-full mt-4" onClick={() => setIsOpen(false)}>
                    <Button text={link.label} showArrow={true} className="w-full justify-center" />
                  </li>
                );
              }

              return (
                <li key={link.key} className="w-full" onClick={() => setIsOpen(false)}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl transition-colors w-full ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
