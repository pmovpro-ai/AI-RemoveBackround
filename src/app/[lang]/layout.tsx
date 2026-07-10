import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoKufi = Noto_Kufi_Arabic({ subsets: ["arabic"], variable: "--font-noto-kufi" });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Remove Background AI - Free Online Image Background Remover" : "أداة إزالة الخلفية بالذكاء الاصطناعي - مزيل خلفية الصور على الإنترنت مجاناً",
    description: isEn ? "Remove image backgrounds instantly using AI for free. No signup required. Fast, secure and professional." : "قم بإزالة خلفيات الصور فوراً باستخدام الذكاء الاصطناعي مجاناً. لا يتطلب التسجيل. سريع وآمن واحترافي.",
    alternates: {
      canonical: `https://removebackgroundai.example.com/${lang}`,
      languages: {
        en: "https://removebackgroundai.example.com/en",
        ar: "https://removebackgroundai.example.com/ar",
      },
    },
    openGraph: {
      title: isEn ? "Remove Background AI - Free Online Image Background Remover" : "أداة إزالة الخلفية بالذكاء الاصطناعي - مزيل خلفية الصور على الإنترنت مجاناً",
      description: isEn ? "Remove image backgrounds instantly using AI for free. No signup required." : "قم بإزالة خلفيات الصور فوراً باستخدام الذكاء الاصطناعي مجاناً. لا يتطلب التسجيل.",
      url: `https://removebackgroundai.example.com/${lang}`,
      siteName: "Remove Background AI",
      images: [
        {
          url: "https://removebackgroundai.example.com/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: isEn ? "en_US" : "ar_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Remove Background AI" : "أداة إزالة الخلفية",
      description: isEn ? "Remove image backgrounds instantly using AI for free." : "قم بإزالة خلفيات الصور فوراً باستخدام الذكاء الاصطناعي مجاناً.",
      images: ["https://removebackgroundai.example.com/og-image.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const fontClass = lang === "ar" ? notoKufi.variable : inter.variable;

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className={`${fontClass} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar lang={lang} />
          <main className="flex-1">
            {children}
          </main>
          <Footer lang={lang} />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Remove Background AI",
              "url": "https://removebackgroundai.example.com",
              "logo": "https://removebackgroundai.example.com/logo.png",
              "sameAs": [
                "https://twitter.com/removebackgroundai",
                "https://facebook.com/removebackgroundai"
              ]
            })
          }}
        />
        {/* AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
