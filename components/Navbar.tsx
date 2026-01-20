import { type Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LocaleLink } from "./LocaleLink";
import Logo from "./Logo";
import NavbarMobileMenu from "./NavbarMobileMenu";

type NavbarProps = {
  lang: Locale;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full md:top-10 md:max-w-4xl md:rounded-full md:px-4 bg-foreground backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-surface-muted">
        {/* Logo */}
        <Logo className="w-16 h-16" lightMode={true} />

        {/* Desktop nav links - hidden on mobile */}
        <ul className="hidden md:flex items-center gap-5 text-lg font-medium">
          <li>{dict.navbar.whoWeAre}</li>
          <li>{dict.navbar.whatWeDo}</li>
          <li>{dict.navbar.blog}</li>
          <li>{dict.navbar.pages}</li>
        </ul>

        {/* Desktop controls - hidden on mobile */}
        <ul className="hidden md:flex items-center gap-5">
          <LanguageSwitcher currentLang={lang} />
          <div className="bg-white text-black p-3 rounded-full">
            <LocaleLink href="/chat" className="text-lg font-medium">
              {dict.navbar.getStarted}
            </LocaleLink>
          </div>
        </ul>

        {/* Mobile menu component */}
        <NavbarMobileMenu lang={lang} dict={dict} />
      </div>
    </nav>
  );
}
