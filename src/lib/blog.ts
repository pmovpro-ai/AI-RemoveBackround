export const getBlogPosts = (lang: string) => {
  const isEn = lang === 'en';
  return [
    {
      slug: "remove-background-from-image-online",
      title: isEn ? "Remove Background from Image Online" : "إزالة الخلفية من الصورة عبر الإنترنت",
      desc: isEn ? "Learn how to easily remove backgrounds from your images online for free." : "تعلم كيف تزيل الخلفيات من صورك عبر الإنترنت مجاناً بسهولة.",
      content: isEn ? "Removing backgrounds used to be hard. Now it's easy with AI..." : "كانت إزالة الخلفيات صعبة. الآن أصبحت سهلة مع الذكاء الاصطناعي...",
      date: "2026-01-10",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      category: "Tutorials"
    },
    {
      slug: "remove-background-from-product-photos",
      title: isEn ? "Remove Background from Product Photos" : "إزالة الخلفية من صور المنتجات",
      desc: isEn ? "Boost your e-commerce sales by creating perfect product photos with white backgrounds." : "عزز مبيعات متجرك الإلكتروني بإنشاء صور منتجات مثالية بخلفيات بيضاء.",
      content: isEn ? "Product photography is essential for online sales..." : "تصوير المنتجات ضروري للمبيعات عبر الإنترنت...",
      date: "2026-01-12",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
      category: "E-commerce"
    },
    {
      slug: "ai-background-remover-free",
      title: isEn ? "AI Background Remover Free" : "مزيل الخلفية بالذكاء الاصطناعي مجاناً",
      desc: isEn ? "Discover the best free AI background removal tool that requires no registration." : "اكتشف أفضل أداة مجانية لإزالة الخلفية بالذكاء الاصطناعي لا تتطلب تسجيلاً.",
      content: isEn ? "In 2026, you don't need to pay for background removal..." : "في عام 2026، لست مضطراً للدفع مقابل إزالة الخلفية...",
      date: "2026-01-15",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
      category: "Tools"
    },
    {
      slug: "change-background-color-online",
      title: isEn ? "Change Background Color Online" : "تغيير لون الخلفية عبر الإنترنت",
      desc: isEn ? "How to replace your image background with solid colors like white, black, or blue." : "كيفية استبدال خلفية صورتك بألوان ثابتة مثل الأبيض أو الأسود أو الأزرق.",
      content: isEn ? "Sometimes transparent isn't enough, you need a solid color..." : "أحياناً الشفافية لا تكفي، تحتاج إلى لون ثابت...",
      date: "2026-01-18",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
      category: "Design"
    }
  ];
};