import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default async function Navbar({ lang }: { lang: string }) {
  const dict = await getDictionary(lang);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">RemoveBG AI</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href={`/${lang}`} className="text-sm font-medium hover:text-primary transition-colors">{dict.nav.home}</Link>
          <Link href={`/${lang}/blog`} className="text-sm font-medium hover:text-primary transition-colors">{dict.nav.blog}</Link>
          <Link href={`/${lang}/about`} className="text-sm font-medium hover:text-primary transition-colors">{dict.nav.about}</Link>
          <Link href={`/${lang}/contact`} className="text-sm font-medium hover:text-primary transition-colors">{dict.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher currentLang={lang} />
          <Link
            href={`/${lang}#upload`}
            className="hidden md:inline-flex bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {dict.nav.upload}
          </Link>
        </div>
      </div>
    </header>
  );
}