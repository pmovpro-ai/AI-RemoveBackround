import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";

export default async function Footer({ lang }: { lang: string }) {
  const dict = await getDictionary(lang);

  return (
    <footer className="border-t bg-muted/40 py-12 mt-16">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold gradient-text">RemoveBG AI</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm mb-6">
            {dict.hero.subtitle}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">{dict.footer.quickLinks}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">{dict.nav.home}</Link></li>
            <li><Link href={`/${lang}/blog`} className="hover:text-primary transition-colors">{dict.nav.blog}</Link></li>
            <li><Link href={`/${lang}/about`} className="hover:text-primary transition-colors">{dict.nav.about}</Link></li>
            <li><Link href={`/${lang}/contact`} className="hover:text-primary transition-colors">{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">{dict.footer.legal}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href={`/${lang}/privacy`} className="hover:text-primary transition-colors">{dict.footer.privacy}</Link></li>
            <li><Link href={`/${lang}/terms`} className="hover:text-primary transition-colors">{dict.footer.terms}</Link></li>
            <li><Link href={`/${lang}/dmca`} className="hover:text-primary transition-colors">{dict.footer.dmca}</Link></li>
            <li><Link href={`/${lang}/disclaimer`} className="hover:text-primary transition-colors">{dict.footer.disclaimer}</Link></li>
            <li><Link href={`/${lang}/cookie`} className="hover:text-primary transition-colors">{dict.footer.cookie}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        {dict.footer.copyright}
      </div>
    </footer>
  );
}