# Internationalization (i18n) Implementation - English & Arabic

## Relevant Files

- `lib/i18n/config.ts` – i18n configuration with supported locales (en, ar) and default locale
- `lib/i18n/get-locale.ts` – Locale detection from Accept-Language header
- `proxy.ts` – Middleware for automatic locale routing
- `dictionaries/en.json` – English translations
- `dictionaries/ar.json` – Arabic translations
- `dictionaries/index.ts` – Dictionary loader with type safety
- `app/[lang]/layout.tsx` – Root layout with dynamic locale parameter and RTL support
- `app/[lang]/page.tsx` – Home page using translations
- `components/LanguageSwitcher.tsx` – Client component for language switching
- `app/[lang]/page.tsx` – Home page with locale support
- `app/[lang]/dictionaries.ts` – Dictionary loader utility
- `dictionaries/en.json` – English translations
- `dictionaries/ar.json` – Arabic translations
- `proxy.ts` – Middleware for locale detection and routing
- `lib/i18n/config.ts` – i18n configuration and supported locales
- `lib/i18n/get-locale.ts` – Locale detection helper

### Notes

- Follow Next.js 16 server component architecture (server components by default)
- Use native Next.js routing with `[lang]` dynamic segment
- Implement proper RTL support for Arabic
- All pages should be server components unless interactivity is needed
- Ensure SEO optimization with proper `lang` attribute in HTML

## Tasks

- [x] 1.0 Create i18n configuration file with supported locales (en, ar) and default locale
- [x] 2.0 Create proxy.ts middleware for automatic locale detection and redirection based on Accept-Language header
- [x] 3.0 Create dictionary files (en.json, ar.json) and getDictionary helper function with type safety
- [x] 4.0 Restructure app directory: move layout.tsx and page.tsx into app/[lang]/ folder structure
- [x] 5.0 Add RTL support with dir attribute and create optional language switcher component
