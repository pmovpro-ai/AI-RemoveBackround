import { notFound } from "next/navigation";
import AdUnit from "@/components/AdUnit";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

const legalPages = ['about', 'contact', 'privacy', 'terms', 'dmca', 'disclaimer', 'cookie'];

export async function generateMetadata({ params }: { params: Promise<{ lang: string; legal: string }> }): Promise<Metadata> {
  const { lang, legal } = await params;
  if (!legalPages.includes(legal)) return {};
  
  const isEn = lang === "en";
  const titles: Record<string, string> = {
    about: isEn ? "About Us" : "معلومات عنا",
    contact: isEn ? "Contact Us" : "اتصل بنا",
    privacy: isEn ? "Privacy Policy" : "سياسة الخصوصية",
    terms: isEn ? "Terms of Service" : "شروط الخدمة",
    dmca: "DMCA",
    disclaimer: isEn ? "Disclaimer" : "إخلاء المسؤولية",
    cookie: isEn ? "Cookie Policy" : "سياسة ملفات تعريف الارتباط",
  };

  return {
    title: `${titles[legal]} - Remove Background AI`,
  };
}

export default async function LegalPage({ params }: { params: Promise<{ lang: string; legal: string }> }) {
  const { lang, legal } = await params;
  const isEn = lang === "en";

  if (!legalPages.includes(legal)) {
    notFound();
  }

  const titles: Record<string, string> = {
    about: isEn ? "About Us" : "معلومات عنا",
    contact: isEn ? "Contact Us" : "اتصل بنا",
    privacy: isEn ? "Privacy Policy" : "سياسة الخصوصية",
    terms: isEn ? "Terms of Service" : "شروط الخدمة",
    dmca: "DMCA",
    disclaimer: isEn ? "Disclaimer" : "إخلاء المسؤولية",
    cookie: isEn ? "Cookie Policy" : "سياسة ملفات تعريف الارتباط",
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-8">{titles[legal]}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          {isEn 
            ? `This is the ${titles[legal].toLowerCase()} page for Remove Background AI. We are dedicated to providing a free, fast, and secure AI background removal tool.` 
            : `هذه هي صفحة ${titles[legal].toLowerCase()} لأداة إزالة الخلفية. نحن ملتزمون بتقديم أداة إزالة خلفية مجانية وسريعة وآمنة بالذكاء الاصطناعي.`}
        </p>
        
        {legal === 'privacy' && (
          <>
            <h2>{isEn ? "Data Collection" : "جمع البيانات"}</h2>
            <p>{isEn ? "We do not store your images. All processing is done locally in your browser." : "نحن لا نخزن صورك. تتم جميع المعالجة محلياً في متصفحك."}</p>
          </>
        )}

        {legal === 'contact' && (
          <>
            <p>{isEn ? "Email us at support@removebackgroundai.example.com or use the form below:" : "راسلنا على support@removebackgroundai.example.com أو استخدم النموذج أدناه:"}</p>
            <ContactForm isEn={isEn} />
          </>
        )}

        <AdUnit slot="legal_content" format="fluid" className="my-8" />
        
        <p>{isEn ? "Last updated: January 2026" : "آخر تحديث: يناير 2026"}</p>
      </div>
    </div>
  );
}