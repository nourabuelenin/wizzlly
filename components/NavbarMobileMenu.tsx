"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LocaleLink } from "./LocaleLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { type Locale } from "@/lib/i18n/config";

type NavbarMobileMenuProps = {
  lang: Locale;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
};

export default function NavbarMobileMenu({
  lang,
  dict,
}: NavbarMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="flex md:hidden items-center gap-3">
      {/* Mobile hamburger menu button */}
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-surface-muted/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile language switcher */}
      <LanguageSwitcher currentLang={lang} />

      {/* Mobile menu - slides from top */}
      <div
        className={`absolute inset-x-0 top-full z-20 w-full px-4 py-4 transition-all duration-300 ease-in-out bg-foreground border-b border-surface-muted/10 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-4 text-base font-medium mb-4">
          <li className="hover:text-white transition-colors cursor-pointer">
            {dict.navbar.whoWeAre}
          </li>
          <li className="hover:text-white transition-colors cursor-pointer">
            {dict.navbar.whatWeDo}
          </li>
          <li className="hover:text-white transition-colors cursor-pointer">
            {dict.navbar.blog}
          </li>
          <li className="hover:text-white transition-colors cursor-pointer">
            {dict.navbar.pages}
          </li>
        </ul>
        <div className="border-t border-surface-muted/10 pt-4">
          <LocaleLink
            href="/chat"
            className="block w-full bg-white text-black p-3 rounded-full text-center font-medium hover:bg-surface-muted/90 transition-colors"
          >
            {dict.navbar.getStarted}
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
