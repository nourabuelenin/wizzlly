
import Image from "next/image";
import { type Locale } from "@/lib/i18n/config";
import { NavbarLinks } from "./NavbarLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LocaleLink } from "./LocaleLink";
import Logo from "./Logo";
import NavbarMobileMenu from "./NavbarMobileMenu";
import enablrLogo from "@/public/images/enablr_logo.webp";

type NavbarProps = {
  lang: Locale;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  return (
    <div className="fixed top-4 lg:top-10 left-0 w-full z-50 flex justify-center items-start lg:items-center gap-2 lg:gap-4 px-4 md:px-10 lg:px-40 pointer-events-none">
      <nav className="pointer-events-auto relative rounded-[2rem] bg-background/20 w-full border border-white/10">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 w-full">
          {/* Logo */}
          <div>
            <Image src={enablrLogo} alt="Logo" height={35} />
          </div>

          {/* Nav links */}
          <NavbarLinks
            lang={lang}
            dict={{
              home: dict.navbar.home,
              // products: dict.navbar.products,
              // solutions: dict.navbar.solutions,
              // pricing: dict.navbar.pricing,
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


        // {/* Desktop nav links - hidden on mobile */}
        // <ul className="hidden md:flex items-center gap-5 text-lg font-medium">
        //   <li>{dict.navbar.whoWeAre}</li>
        //   <li>{dict.navbar.whatWeDo}</li>
        //   <li>{dict.navbar.blog}</li>
        //   <li>{dict.navbar.pages}</li>
        // </ul>

        // {/* Desktop controls - hidden on mobile */}
        // <ul className="hidden md:flex items-center gap-5">
        //   <LanguageSwitcher currentLang={lang} />
        //   <div className="bg-white text-black p-3 rounded-full">
        //     <LocaleLink href="/chat" className="text-lg font-medium">
        //       {dict.navbar.getStarted}
        //     </LocaleLink>
        //   </div>
        // </ul>

        // {/* Mobile menu component */}
        // <NavbarMobileMenu lang={lang} dict={dict} />
