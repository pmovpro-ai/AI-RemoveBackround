import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import AdUnit from "@/components/AdUnit";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Blog - Remove Background AI" : "المدونة - أداة إزالة الخلفية",
    description: isEn ? "Read the latest tutorials and articles about background removal and photo editing." : "اقرأ أحدث الدروس والمقالات حول إزالة الخلفية وتعديل الصور.",
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = getBlogPosts(lang);
  const isEn = lang === "en";

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{isEn ? "Our Blog" : "مدونتنا"}</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        {isEn ? "Discover tips, tutorials, and guides on how to use AI to improve your images, remove backgrounds, and optimize photos for e-commerce." : "اكتشف النصائح والدروس والأدلة حول كيفية استخدام الذكاء الاصطناعي لتحسين صورك وإزالة الخلفيات."}
      </p>

      <AdUnit slot="blog_top" format="fluid" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/${lang}/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-card rounded-2xl overflow-hidden border hover:shadow-lg transition-all">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              {/* Using standard img to avoid Next.js Image external host config issues for now */}
              <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-md">{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground text-sm flex-1">{post.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <AdUnit slot="blog_bottom" format="auto" className="mt-16" />
    </div>
  );
}