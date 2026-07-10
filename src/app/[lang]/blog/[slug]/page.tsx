import { getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPosts(lang).find((p) => p.slug === slug);
  if (!post) return {};
  
  return {
    title: `${post.title} - Remove Background AI`,
    description: post.desc,
    openGraph: {
      title: post.title,
      description: post.desc,
      images: [post.image],
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const isEn = lang === "en";
  const post = getBlogPosts(lang).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.desc,
    "author": {
      "@type": "Organization",
      "name": "Remove Background AI",
      "url": `https://removebackgroundai.example.com/${lang}`
    }
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href={`/${lang}`} className="hover:text-primary">
          {isEn ? "Home" : "الرئيسية"}
        </Link>
        {isEn ? <ChevronRight className="w-4 h-4 mx-2" /> : <ChevronLeft className="w-4 h-4 mx-2" />}
        <Link href={`/${lang}/blog`} className="hover:text-primary">
          {isEn ? "Blog" : "المدونة"}
        </Link>
        {isEn ? <ChevronRight className="w-4 h-4 mx-2" /> : <ChevronLeft className="w-4 h-4 mx-2" />}
        <span className="text-foreground line-clamp-1">{post.title}</span>
      </nav>

      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{post.category}</span>
        </div>
      </header>

      <AdUnit slot="article_top" format="fluid" className="mb-10" />

      <div className="rounded-2xl overflow-hidden mb-10 w-full aspect-video bg-muted relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead text-xl text-muted-foreground mb-8">{post.desc}</p>
        
        <h2>{isEn ? "Introduction" : "مقدمة"}</h2>
        <p>{post.content}</p>

        <AdUnit slot="article_middle" format="fluid" className="my-8" />

        <h3>{isEn ? "How to use our tool" : "كيفية استخدام أداتنا"}</h3>
        <p>{isEn ? "Our AI-powered tool makes it incredibly easy to remove backgrounds from any image. Just follow these simple steps:" : "تجعل أداتنا المدعومة بالذكاء الاصطناعي من السهل للغاية إزالة الخلفيات من أي صورة. فقط اتبع هذه الخطوات البسيطة:"}</p>
        <ul>
          <li>{isEn ? "Upload your image by dragging and dropping it into the upload area." : "ارفع صورتك عن طريق سحبها وإفلاتها في منطقة الرفع."}</li>
          <li>{isEn ? "Wait a few seconds for the AI to process the image." : "انتظر بضع ثوانٍ حتى يعالج الذكاء الاصطناعي الصورة."}</li>
          <li>{isEn ? "Download the transparent PNG or change the background color." : "قم بتحميل صورة PNG الشفافة أو قم بتغيير لون الخلفية."}</li>
        </ul>

        <h2>{isEn ? "Conclusion" : "الخلاصة"}</h2>
        <p>{isEn ? "Start using our free background remover today to enhance your photos instantly." : "ابدأ باستخدام مزيل الخلفية المجاني اليوم لتحسين صورك على الفور."}</p>
      </div>

      <AdUnit slot="article_bottom" format="auto" className="mt-12" />
    </article>
  );
}