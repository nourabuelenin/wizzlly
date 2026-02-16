
import Image from "next/image";
import { type Locale } from "@/lib/i18n/config";
import { NavbarLinks } from "./NavbarLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import enablrLogo from "@/public/images/enablr_logo.png";

type NavbarProps = {
  lang: Locale;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  return (
    <div className="fixed top-10 left-0 w-full z-50 flex justify-center items-center gap-4 px-20 pointer-events-none">
      <nav className="pointer-events-auto rounded-full bg-background/20 w-full">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          {/* Logo */}
          <div>
            <Image src={enablrLogo} alt="Logo" height={35} />
          </div>

          {/* Nav links */}
          <NavbarLinks
            lang={lang}
            dict={{
              home: dict.navbar.home,
              products: dict.navbar.products,
              solutions: dict.navbar.solutions,
              pricing: dict.navbar.pricing,
              aboutUs: dict.navbar.aboutUs,
              contactUs: dict.navbar.contactUs,
            }}
          />
        </div>
      </nav>

      {/* Language */}
      <div className="pointer-events-auto">
        <LanguageSwitcher currentLang={lang} />
      </div>
    </div>
  );
}
