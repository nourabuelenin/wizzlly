import { type Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavbarProps = {
  lang: Locale;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  return (
    <nav className="sticky top-10 mx-auto max-w-4xl rounded-full bg-foreground backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 text-surface-muted">
        {/* Logo */}
        <div className="font-semibold text-background text-3xl">W</div>

        {/* Nav links */}
        <ul className="flex items-center gap-5 text-lg font-medium">
          <li>Who We Are</li>
          <li>What we do</li>
          <li>Blog</li>
          <li>Pages</li>
        </ul>

        {/* Language */}
        <ul>
          <LanguageSwitcher currentLang={lang} />
        </ul>
      </div>
    </nav>
  );
}
