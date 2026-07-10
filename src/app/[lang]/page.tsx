import { getDictionary } from "@/lib/dictionaries";
import BackgroundRemover from "@/components/BackgroundRemover";
import AdUnit from "@/components/AdUnit";
import { Zap, Shield, Image as ImageIcon, PaintBucket, DollarSign, Lock, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getFaqs } from "@/lib/faq";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const features = [
    { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: dict.features.aiPowered.title, desc: dict.features.aiPowered.desc },
    { icon: <Zap className="w-6 h-6 text-blue-500" />, title: dict.features.fast.title, desc: dict.features.fast.desc },
    { icon: <ImageIcon className="w-6 h-6 text-green-500" />, title: dict.features.transparent.title, desc: dict.features.transparent.desc },
    { icon: <PaintBucket className="w-6 h-6 text-purple-500" />, title: dict.features.changeBg.title, desc: dict.features.changeBg.desc },
    { icon: <DollarSign className="w-6 h-6 text-green-600" />, title: dict.features.free.title, desc: dict.features.free.desc },
    { icon: <Lock className="w-6 h-6 text-red-500" />, title: dict.features.secure.title, desc: dict.features.secure.desc },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Top Banner Ad */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-4">
        <AdUnit slot="1234567890" format="auto" />
      </div>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-background to-background dark:from-blue-900/20 dark:via-background dark:to-background"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl gradient-text leading-tight pb-2">
          {dict.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
          {dict.hero.subtitle}
        </p>
        
        <BackgroundRemover dict={dict} />
      </section>

      {/* Between Sections Ad */}
      <div className="w-full max-w-7xl mx-auto px-4 my-12">
        <AdUnit slot="0987654321" format="fluid" />
      </div>

      {/* Features Section */}
      <section className="w-full py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{dict.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-card p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-16 container px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{dict.howItWorks.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-border -z-10"></div>
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 shadow-lg ring-4 ring-background">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{(dict.howItWorks as any)[`step${step}`].title}</h3>
              <p className="text-muted-foreground">{(dict.howItWorks as any)[`step${step}`].desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 container px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{dict.faq.title}</h2>
        <div className="space-y-4">
          {getFaqs(lang).map((faq, idx) => (
            <details key={idx} className="group border rounded-lg bg-card overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between p-4 font-medium hover:bg-muted/50 transition-colors">
                {faq.q}
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="p-4 pt-0 text-muted-foreground border-t bg-muted/20">
                <p className="mt-4">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": getFaqs(lang).map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      {/* Bottom Ad */}
      <div className="w-full max-w-7xl mx-auto px-4 my-8">
        <AdUnit slot="1122334455" format="auto" />
      </div>
    </div>
  );
}