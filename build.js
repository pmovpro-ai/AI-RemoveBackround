const fs = require('fs');
const path = require('path');

// Target domains for SEO schema and canonical tags
const BASE_URL = 'https://removebackgroundai.com';

// Define language codes and directions
const LANGUAGES = {
  en: { dir: 'ltr', name: 'English', root: '' },
  ar: { dir: 'rtl', name: 'العربية', root: '/ar' }
};

// Main Translation Dictionary for Page Layouts
const TRANSLATIONS = {
  en: {
    siteName: 'Remove Background AI',
    tagline: 'Remove Background AI in Seconds',
    subtitle: 'Remove image backgrounds instantly using AI for free. No signup required. Fast, secure and professional.',
    uploadTitle: 'Upload an image to remove background',
    uploadSubtitle: 'Drag and drop your image here, or click to browse',
    formatsText: 'Supports JPG, JPEG, PNG, WEBP',
    processing: 'Processing image...',
    processingSubtitle: 'Our AI is carving out the subject. First run may download model files (approx. 30MB).',
    recentTitle: 'Recent Images',
    clearRecent: 'Clear History',
    presetsLabel: 'Preset Colors:',
    pickerLabel: 'Custom Color:',
    downloadBtn: 'Download Image',
    copyBtn: 'Copy to Clipboard',
    shareBtn: 'Share Result',
    newUploadBtn: 'Upload New Image',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about our free AI background remover.',
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Get a transparent background in three simple steps.',
    step1Title: 'Upload Image',
    step1Desc: 'Drag & drop or select your photo in JPG, PNG, or WEBP format.',
    step2Title: 'AI Removes Background',
    step2Desc: 'Our client-side neural network detects and isolates the subject in seconds.',
    step3Title: 'Download PNG',
    step3Desc: 'Change the background color or download your transparent PNG instantly.',
    featuresTitle: 'Why Choose Remove Background AI?',
    featuresSubtitle: 'The ultimate professional tool for online background removal.',
    feat1Title: 'AI-Powered Precision',
    feat1Desc: 'Advanced machine learning models identify and cut out edges with pixel-perfect accuracy.',
    feat2Title: 'Ultra-Fast Processing',
    feat2Desc: 'No queues. The image is processed directly in your browser using WebAssembly.',
    feat3Title: 'High-Quality Transparent PNG',
    feat3Desc: 'Save clean, transparent PNG files in their original resolution without watermark.',
    feat4Title: 'Change Background Online',
    feat4Desc: 'Instantly add solid background colors (white, black, blue, red, etc.) or pick a custom tone.',
    feat5Title: '100% Free & Unlimited',
    feat5Desc: 'No registrations, subscriptions, or hidden limits. Process as many photos as you want.',
    feat6Title: 'Absolute Privacy & Security',
    feat6Desc: 'Your images are never sent to a server. All operations run locally inside your browser.',
    navHome: 'Home',
    navBlog: 'Blog',
    navAbout: 'About Us',
    navContact: 'Contact',
    footerQuickLinks: 'Quick Links',
    footerLegal: 'Legal Information',
    footerDesc: 'Free, instant, client-side AI image background removal. Professional results in one click.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    dmcaPolicy: 'DMCA Policy',
    disclaimer: 'Disclaimer',
    cookiePolicy: 'Cookie Policy',
    copyright: '© 2026 Remove Background AI. All rights reserved.',
    adPlaceholder: 'Advertisement',
    aboutTitle: 'About Us',
    aboutText: 'Welcome to Remove Background AI, your number one source for instant, client-side AI-powered image background removal. We are dedicated to providing you the very best background removal tool, with an emphasis on speed, ease of use, and complete privacy.',
    aboutDetails: 'Founded in 2026, Remove Background AI utilizes state-of-the-art WebAssembly and ONNX runtime to run machine learning models directly in your browser. This means your images are never sent to any server, offering 100% privacy and security.',
    contactTitle: 'Contact Us',
    contactText: 'Have questions, feedback, or need assistance? Reach out to us using the form below. We will get back to you as soon as possible.',
    contactName: 'Name',
    contactEmail: 'Email Address',
    contactMessage: 'Message',
    contactSend: 'Send Message',
    contactSuccess: 'Your message has been sent successfully. Thank you!',
    recentImagesEmpty: 'No processed images in history.',
    blogTitle: 'Blog & Image Guides',
    blogSubtitle: 'Tips, tricks, and tutorials on background removal, photo editing, and design.',
    readMore: 'Read Article'
  },
  ar: {
    siteName: 'إزالة خلفية الصورة AI',
    tagline: 'إزالة خلفية الصورة بالذكاء الاصطناعي في ثوانٍ',
    subtitle: 'قم بإزالة خلفيات الصور فوراً باستخدام الذكاء الاصطناعي مجاناً. لا يتطلب التسجيل. سريع وآمن واحترافي.',
    uploadTitle: 'ارفع صورة لإزالة الخلفية',
    uploadSubtitle: 'اسحب وأسقط صورتك هنا، أو اضغط للتصفح',
    formatsText: 'يدعم صيغ JPG, JPEG, PNG, WEBP',
    processing: 'جاري معالجة الصورة...',
    processingSubtitle: 'يقوم الذكاء الاصطناعي بقص العنصر الأساسي. المرة الأولى قد تستغرق دقيقة لتحميل النموذج (30 ميجابايت تقريباً).',
    recentTitle: 'الصور الأخيرة',
    clearRecent: 'مسح التاريخ',
    presetsLabel: 'الألوان الجاهزة:',
    pickerLabel: 'لون مخصص:',
    downloadBtn: 'تحميل الصورة',
    copyBtn: 'نسخ إلى الحافظة',
    shareBtn: 'مشاركة النتيجة',
    newUploadBtn: 'رفع صورة جديدة',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'كل ما تحتاج لمعرفته حول أداة إزالة الخلفية المجانية بالذكاء الاصطناعي.',
    howItWorksTitle: 'كيف تعمل الأداة',
    howItWorksSubtitle: 'احصل على خلفية شفافة في ثلاث خطوات بسيطة.',
    step1Title: 'رفع الصورة',
    step1Desc: 'اسحب وأسقط صورتك أو اخترها بصيغة JPG أو PNG أو WEBP.',
    step2Title: 'إزالة الخلفية بالذكاء الاصطناعي',
    step2Desc: 'تقوم شبكتنا العصبية المحلية بتحديد وعزل العنصر في ثوانٍ معدودة.',
    step3Title: 'تحميل ملف PNG',
    step3Desc: 'قم بتغيير لون الخلفية أو تحميل صورتك الشفافة بصيغة PNG فوراً.',
    featuresTitle: 'لماذا تختار إزالة خلفية الصورة AI؟',
    featuresSubtitle: 'الأداة الاحترافية المطلقة لإزالة الخلفيات عبر الإنترنت.',
    feat1Title: 'دقة مدعومة بالذكاء الاصطناعي',
    feat1Desc: 'تحدد نماذج التعلم الآلي المتقدمة الحواف وتقصها بدقة متناهية وبدون أخطاء.',
    feat2Title: 'معالجة فائقة السرعة',
    feat2Desc: 'لا توجد طوابير انتظار. تتم معالجة الصورة مباشرة في متصفحك باستخدام WebAssembly.',
    feat3Title: 'ملفات PNG شفافة بجودة عالية',
    feat3Desc: 'احفظ ملفات PNG نظيفة وشفافة بالدقة الأصلية ودون أي علامات مائية.',
    feat4Title: 'تغيير الخلفية اون لاين',
    feat4Desc: 'أضف ألوان خلفية ثابتة فوراً (أبيض، أسود، أزرق، أحمر) أو اختر درجة لون مخصصة.',
    feat5Title: 'مجاني 100% وغير محدود',
    feat5Desc: 'بدون تسجيل، بدون اشتراك، وبدون حدود مخفية. معالجة عدد غير محدود من الصور.',
    feat6Title: 'خصوصية وأمان تام',
    feat6Desc: 'لا يتم إرسال صورك إلى أي خادم أبداً. جميع العمليات تتم محلياً داخل جهازك.',
    navHome: 'الرئيسية',
    navBlog: 'المدونة',
    navAbout: 'من نحن',
    navContact: 'اتصل بنا',
    footerQuickLinks: 'روابط سريعة',
    footerLegal: 'معلومات قانونية',
    footerDesc: 'إزالة خلفية الصور بالذكاء الاصطناعي مجاناً وفوراً محلياً بالكامل. نتائج احترافية بنقرة واحدة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    dmcaPolicy: 'قانون الألفية الجديدة (DMCA)',
    disclaimer: 'إخلاء المسؤولية',
    cookiePolicy: 'سياسة ملفات الارتباط (Cookies)',
    copyright: '© 2026 إزالة خلفية الصورة AI. جميع الحقوق محفوظة.',
    adPlaceholder: 'إعلان',
    aboutTitle: 'من نحن',
    aboutText: 'مرحباً بك في موقع إزالة خلفية الصورة AI، وجهتك الأولى لإزالة خلفيات الصور فوراً وبأعلى دقة باستخدام الذكاء الاصطناعي محلياً بالكامل في متصفحك. نحن ملتزمون بتوفير أفضل أداة مجانية مع التركيز على السرعة، سهولة الاستخدام، والخصوصية التامة.',
    aboutDetails: 'تأسس موقعنا في عام 2026، ونعتمد على تقنيات WebAssembly و ONNX Runtime المتطورة لتشغيل نماذج الذكاء الاصطناعي مباشرة في جهاز المستخدم. هذا يضمن عدم إرسال صورك لأي خادم وحمايتها بنسبة 100%.',
    contactTitle: 'اتصل بنا',
    contactText: 'هل لديك أي استفسار أو تعليق أو تحتاج إلى مساعدة؟ يمكنك التواصل معنا مباشرة من خلال ملء النموذج أدناه.',
    contactName: 'الاسم',
    contactEmail: 'البريد الإلكتروني',
    contactMessage: 'الرسالة',
    contactSend: 'إرسال الرسالة',
    contactSuccess: 'تم إرسال رسالتك بنجاح. شكراً لك!',
    recentImagesEmpty: 'لا توجد صور معالجة في السجل.',
    blogTitle: 'المدونة ودليل الصور',
    blogSubtitle: 'نصائح، حيل، وشروحات حول إزالة الخلفيات، تعديل الصور والتصميم.',
    readMore: 'اقرأ المقال'
  }
};

// 20 SEO Optimized FAQs (10 English, 10 Arabic - mapped logically)
const FAQS = {
  en: [
    { q: "How to remove background from image online?", a: "To remove the background from an image online, simply drag & drop your image into our upload zone. Our AI will automatically process it within seconds, allowing you to download a clean, transparent PNG or apply solid colors instantly." },
    { q: "Is this AI background remover tool free?", a: "Yes, Remove Background AI is 100% free to use. There are no subscriptions, credits, registrations, or hidden watermarks. You can process an unlimited number of images." },
    { q: "Can I download my image as a transparent PNG?", a: "Absolutely! The processed image has a transparent background by default. Clicking the download button yields a high-quality, transparent PNG." },
    { q: "How accurate is the AI background removal?", a: "Our AI background remover utilizes advanced neural networks trained to detect foreground subjects (humans, products, animals, cars) and separate them with clean, pixel-perfect edges, rivaling manual Photoshop clipping paths." },
    { q: "What image formats are supported?", a: "We support standard image formats including JPG, JPEG, PNG, and WEBP. The output image is compiled as a transparent PNG." },
    { q: "Are my uploaded photos safe and secure?", a: "Yes. Unlike other tools that upload your files to external servers, our tool runs 100% client-side inside your browser. Your images never leave your local computer, ensuring complete privacy." },
    { q: "Can I change the background color after removing it?", a: "Yes, you can edit your image instantly. We offer preset background colors (White, Black, Blue, Red, Green, Yellow) and a custom hex color picker to paint any custom background color you want." },
    { q: "Why is the first upload taking longer to process?", a: "On the very first upload, the browser downloads the background removal AI model (~30MB) to run locally. Once downloaded, the browser caches the model, making all subsequent image removals near-instantaneous." },
    { q: "Can I use this tool on my mobile phone?", a: "Yes, our website is fully responsive and optimized for mobile devices, tablets, and desktop computers. You can capture a photo or select one from your gallery." },
    { q: "How does client-side AI background removal work?", a: "We leverage WebAssembly (WASM) and ONNX Runtime Web. This enables your browser to execute neural network compute directly using your local GPU/CPU resources, avoiding network transfer latency." }
  ],
  ar: [
    { q: "كيف يمكنني إزالة خلفية الصورة أون لاين؟", a: "لإزالة خلفية الصورة أون لاين، ببساطة قم بسحب وإسقاط الصورة داخل منطقة الرفع في موقعنا. سيقوم الذكاء الاصطناعي بمعالجتها تلقائياً خلال ثوانٍ، مما يتيح لك تحميل صورة PNG شفافة أو تطبيق ألوان أخرى فوراً." },
    { q: "هل أداة إزالة الخلفية بالذكاء الاصطناعي مجانية تماماً؟", a: "نعم، موقع إزالة خلفية الصورة AI مجاني بنسبة 100%. لا توجد اشتراكات، ولا نقاط، ولا يتطلب أي تسجيل، ولا نضع علامات مائية. يمكنك معالجة عدد غير محدود من الصور." },
    { q: "هل يمكنني تحميل الصورة كملف PNG شفاف؟", a: "بالتأكيد! الصورة المعالجة تكون بخلفية شفافة افتراضياً، وبمجرد الضغط على زر التحميل، ستحصل على ملف PNG شفاف عالي الجودة." },
    { q: "ما مدى دقة إزالة الخلفية بالذكاء الاصطناعي؟", a: "تعتمد أداتنا على شبكات عصبية متطورة للغاية مدربة على التعرف على العناصر الأمامية (أشخاص، منتجات، حيوانات، سيارات) وعزلها بحواف ناعمة ودقيقة تضاهي القص اليدوي في برنامج فوتوشوب." },
    { q: "ما هي صيغ الصور المدعومة في الموقع؟", a: "نحن ندعم جميع صيغ الصور القياسية بما في ذلك JPG و JPEG و PNG و WEBP. ويتم استخراج الصورة المعالجة دائماً بصيغة PNG شفافة." },
    { q: "هل صوري المرفوعة آمنة ومحمية؟", a: "نعم، صوري آمنة تماماً. على عكس الأدوات الأخرى التي ترفع صورك لخوادم خارجية، تعمل أداتنا محلياً بنسبة 100% داخل متصفحك. لا تغادر صورك جهازك أبداً، مما يضمن خصوصية مطلقة." },
    { q: "هل يمكنني تغيير لون الخلفية بعد إزالتها؟", a: "نعم، يمكنك تعديل الصورة فوراً. نوفر لك خيارات ألوان جاهزة (أبيض، أسود، أزرق، أحمر، أخضر، أصفر) بالإضافة إلى منتقي ألوان مخصص لاختيار أي درجة لون تريدها." },
    { q: "لماذا يستغرق رفع الصورة الأولى وقتاً أطول في المعالجة؟", a: "عند رفع أول صورة، يقوم المتصفح بتحميل نموذج الذكاء الاصطناعي (حوالي 30 ميجابايت) لكي يعمل محلياً في جهازك. بمجرد تحميله، يتم تخزينه مؤقتاً في متصفحك، لتصبح المعالجات التالية فورية وخلال ثانية." },
    { q: "هل يمكنني استخدام هذه الأداة على هاتفي المحمول؟", a: "نعم، موقعنا متوافق تماماً ومحسن للعمل على الهواتف المحمولة، الأجهزة اللوحية، وأجهزة الكمبيوتر المكتبية على حد سواء. يمكنك التقاط صورة بكاميرا الهاتف أو اختيارها من معرض الصور." },
    { q: "كيف تعمل عملية إزالة الخلفية محلياً بالذكاء الاصطناعي؟", a: "نحن نستخدم تقنيات WebAssembly (WASM) ومحرك التشغيل ONNX Runtime Web، مما يتيح لمتصفحك معالجة الشبكات العصبية المعقدة مباشرة باستخدام موارد المعالج والغرافيكس لجهازك دون الحاجة لرفع الملفات للإنترنت." }
  ]
};

// 10 SEO-ready blog articles in English and Arabic
const ARTICLES = [
  {
    slug: 'remove-background-from-image-online',
    category: 'Tutorials',
    categoryAr: 'شروحات',
    title: 'Remove Background from Image Online Free: The Ultimate Guide',
    titleAr: 'إزالة خلفية الصورة اون لاين مجاناً: الدليل الشامل والخطوات',
    desc: 'Learn how to remove backgrounds from your images online in seconds. Compare client-side AI tools with traditional photo editors like Photoshop.',
    descAr: 'تعرف على كيفية إزالة خلفية الصورة اون لاين في ثوانٍ. قارن بين أدوات الذكاء الاصطناعي المحلية وبرامج تعديل الصور التقليدية مثل فوتوشوب.',
    keywords: 'remove background online, free background remover, transparent PNG, AI cutout',
    keywordsAr: 'إزالة خلفية الصورة, مزيل خلفية مجاني, صورة شفافة, قص الصور بالذكاء الاصطناعي',
    h1: 'Remove Background from Image Online Free',
    h1Ar: 'إزالة خلفية الصورة اون لاين مجاناً',
    date: '2026-07-01',
    content: `
      <p>Removing background from images has traditionally been a task reserved for professional graphic designers using complex software. Today, modern AI advancements make it possible to remove any background online in a single click, completely free.</p>
      <h2>Why Remove Image Backgrounds?</h2>
      <p>Whether you are building an e-commerce storefront, creating assets for social media, or formatting photos for official documents, having a transparent background is critical. A clean transparent image allows you to overlay subjects onto different banners, graphics, or solid background colors smoothly.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>How WebAssembly Is Revolutionizing Image Editing</h2>
      <p>Unlike older online tools that required you to upload your personal photos to a third-party server, modern tools leverage WebAssembly (WASM). This allows neural networks to execute directly in your web browser. The benefits are massive:</p>
      <ul>
        <li><strong>Speed:</strong> Instant processing without server queue times.</li>
        <li><strong>Privacy:</strong> Your photos never leave your device. They are processed locally and securely.</li>
        <li><strong>Cost:</strong> Running client-side AI avoids expensive server costs, allowing tools to remain 100% free without limitations.</li>
      </ul>
      <h3>Step-by-Step: Removing Background Online</h3>
      <p>First, open our homepage and drag & drop your JPEG, PNG, or WEBP image. Second, wait for the AI progress bar to complete. Third, preview the transparent result using the before/after slider, customize your background color, and click download to get your high-quality transparent PNG file.</p>
    `,
    contentAr: `
      <p>لطالما كانت إزالة الخلفية من الصور مهمة مقتصرة على مصممي الغرافيك المحترفين باستخدام برامج معقدة. اليوم، بفضل التطور الهائل في تقنيات الذكاء الاصطناعي، أصبح بإمكانك إزالة خلفية أي صورة اون لاين بنقرة واحدة ومجاناً تماماً.</p>
      <h2>لماذا تحتاج إلى إزالة خلفية الصورة؟</h2>
      <p>سواء كنت تؤسس متجراً إلكترونياً، أو تصمم منشورات لوسائل التواصل الاجتماعي، أو تجهز صوراً للمعاملات الرسمية، فإن الحصول على خلفية شفافة أمر بالغ الأهمية. تتيح لك الصورة الشفافة دمج العنصر داخل تصميمات أخرى أو وضع ألوان خلفية مخصصة بمنتهى السلاسة.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>كيف أحدثت تقنية WebAssembly ثورة في تعديل الصور؟</h2>
      <p>على عكس الأدوات القديمة التي كانت تتطلب رفع صورك الشخصية لخوادم خارجية، تستخدم الأدوات الحديثة تقنيات WebAssembly (WASM). تتيح هذه التكنولوجيا تشغيل نماذج الذكاء الاصطناعي مباشرة في متصفحك. وتتميز بالآتي:</p>
      <ul>
        <li><strong>السرعة الفائقة:</strong> معالجة فورية دون الحاجة للانتظار في صفوف الخوادم.</li>
        <li><strong>الخصوصية التامة:</strong> صورك لا تغادر جهازك أبداً وتتم معالجتها محلياً بشكل آمن.</li>
        <li><strong>مجانية بالكامل:</strong> التشغيل المحلي يقلل تكاليف الاستضافة، مما يجعل الخدمة مجانية دون أي قيود.</li>
      </ul>
      <h3>خطوات إزالة الخلفية اون لاين</h3>
      <p>أولاً، افتح الصفحة الرئيسية للموقع وقم بسحب وإسقاط صورتك (JPG أو PNG أو WEBP). ثانياً، انتظر شريط التقدم حتى يكتمل المعالج الذكي. ثالثاً، عاين النتيجة باستخدام شريط المقارنة التفاعلي، واختر لون الخلفية المناسب، ثم اضغط على زر التحميل للحصول على ملف PNG الشفاف بجودة عالية.</p>
    `
  },
  {
    slug: 'remove-background-from-product-photos',
    category: 'E-commerce',
    categoryAr: 'التجارة الإلكترونية',
    title: 'How to Remove Background from Product Photos for E-commerce',
    titleAr: 'كيفية إزالة خلفية صور المنتجات للمتاجر الإلكترونية بالتفصيل',
    desc: 'Boost your Amazon, Shopify, or eBay sales by using clean, white backgrounds for product listings. Save costs by using AI removal tools.',
    descAr: 'ضاعف مبيعاتك على أمازون، شوبيفاي، أو إيباي من خلال استخدام خلفيات بيضاء نظيفة لمنتجاتك. وفر التكاليف باستخدام أدوات إزالة الخلفية الذكية.',
    keywords: 'product photography background removal, white background product photos, e-commerce images',
    keywordsAr: 'إزالة خلفية المنتجات, خلفية بيضاء لصور المنتجات, صور المتاجر الإلكترونية',
    h1: 'Remove Background from Product Photos',
    h1Ar: 'إزالة خلفية صور المنتجات باحترافية',
    date: '2026-07-02',
    content: `
      <p>Clean product photography is one of the most critical factors influencing e-commerce conversion rates. High-quality listings on Amazon, Shopify, and eBay require clean, distracting-free white backgrounds to build consumer trust.</p>
      <h2>The Standard: Pure White Backgrounds</h2>
      <p>Major marketplaces mandate pure white backgrounds (RGB 255, 255, 255) for primary listing images. This creates a uniform look across search results, keeping users focused strictly on the item. Removing messy backgrounds from studio shots manually can cost hundreds of dollars in design fees.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Automating E-commerce Photography with AI</h2>
      <p>Free AI background removal tools automate this task in a fraction of a second. By isolating the product and placing it on a pure white background preset, you can generate retail-ready photos instantly. This enables small business owners and dropshippers to list new products rapidly without hiring graphic designers.</p>
    `,
    contentAr: `
      <p>تعد صور المنتجات النظيفة والواضحة أحد أهم العوامل المؤثرة في نسب التحويل والمبيعات للمتاجر الإلكترونية. تتطلب المنصات الكبرى مثل أمازون، شوبيفاي، وإيباي صوراً ذات خلفيات بيضاء تماماً خالية من أي تشتيت لكسب ثقة المتسوق.</p>
      <h2>المعيار القياسي: خلفية بيضاء نقية لمنتجك</h2>
      <p>تفرض الأسواق العالمية الكبرى استخدام خلفية بيضاء نقية (RGB 255, 255, 255) للصورة الرئيسية للمنتج. يعطي هذا مظهراً متناسقاً لنتائج البحث ويسلط الضوء على المنتج نفسه. بدلاً من إنفاق مئات الدولارات على خدمات قص الصور يدوياً، يمكنك القيام بذلك مجاناً.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>أتمتة صور المنتجات بالذكاء الاصطناعي</h2>
      <p>تقوم أدوات إزالة الخلفية بالذكاء الاصطناعي بإنجاز هذه المهمة في أجزاء من الثانية. من خلال عزل المنتج ووضعه على خلفية بيضاء نقية، يمكنك إنشاء صور جاهزة للبيع فوراً. يتيح ذلك لأصحاب المشاريع الصغيرة والدروبشيبرز إدراج منتجات جديدة بسرعة فائقة وبدون أي تكلفة.</p>
    `
  },
  {
    slug: 'ai-background-remover-free',
    category: 'Technology',
    categoryAr: 'تقنية',
    title: 'The Rise of Free AI Background Removal Tools',
    titleAr: 'تطور أدوات إزالة الخلفية بالذكاء الاصطناعي مجاناً وبدون تسجيل',
    desc: 'Discover how artificial intelligence has evolved to provide high-quality background removal without expensive software.',
    descAr: 'اكتشف كيف تطور الذكاء الاصطناعي لتقديم خدمة إزالة خلفيات الصور بجودة عالية ومجاناً دون الحاجة لبرامج مدفوعة.',
    keywords: 'AI background remover, free image cutout, neural network photo editing',
    keywordsAr: 'مزيل خلفيات بالذكاء الاصطناعي, قص الصور مجانا, تعديل الصور بالشبكات العصبية',
    h1: 'The Rise of Free AI Background Remover Tools',
    h1Ar: 'تطور أدوات إزالة الخلفية بالذكاء الاصطناعي مجاناً',
    date: '2026-07-03',
    content: `
      <p>Modern machine learning models have democratized photo editing. Deep learning models, specifically convolutional neural networks (CNNs), are trained on millions of images to instantly segment background pixels from foreground objects.</p>
      <h2>Traditional Editing vs. AI Cutouts</h2>
      <p>In the past, designers had to manually draw clipping paths using the Pen tool in Photoshop—a process that took anywhere from 5 to 20 minutes per photo. Today, client-side AI libraries run ONNX models directly inside the browser using Javascript, delivering comparable results in 2 seconds.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Free vs. Paid Services</h2>
      <p>Many online tools charge you per image download or reduce the resolution of your output file. Remove Background AI offers completely free processing in full resolution because it operates directly on your browser hardware, eliminating backend rendering costs.</p>
    `,
    contentAr: `
      <p>أحدثت نماذج التعلم الآلي الحديثة ثورة ديمقراطية في عالم تعديل الصور. يتم تدريب نماذج التعلم العميق، وخاصة الشبكات العصبية الالتفافية (CNNs)، على ملايين الصور لكي تتمكن فوراً من تقسيم وفصل بكسلات الخلفية عن العناصر الأمامية.</p>
      <h2>التعديل التقليدي مقابل القص التلقائي بالذكاء الاصطناعي</h2>
      <p>في السابق، كان على المصممين رسم مسارات القص يدوياً باستخدام أداة القلم (Pen Tool) في برنامج فوتوشوب، وهي عملية كانت تستغرق من 5 إلى 20 دقيقة لكل صورة. اليوم، تقوم مكتبات الذكاء الاصطناعي بتشغيل نماذج متطورة داخل المتصفح مباشرة، لتقدم لك نتيجة مذهلة في ثانيتين فقط.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>الخدمات المجانية مقابل الخدمات المدفوعة</h2>
      <p>تفرض معظم المواقع رسوماً مقابل تحميل الصور بالدقة الكاملة أو تقلل من جودتها. يوفر لك موقعنا معالجة مجانية بالكامل وبالدقة الأصلية لأن المعالجة تتم على جهازك أنت، مما يلغي التكاليف الباهظة للخوادم السحابية.</p>
    `
  },
  {
    slug: 'transparent-png-creator',
    category: 'Design',
    categoryAr: 'تصميم',
    title: 'Transparent PNG Creator: How to Save Images with Alpha Channel',
    titleAr: 'صانع صور PNG شفافة: كيف تحفظ الصور مع قنوات ألفا الشفافة',
    desc: 'Understand alpha channels, image transparency, and how to create clean transparent PNG graphics for web design.',
    descAr: 'افهم ماهية قنوات ألفا وشفافية الصور وكيفية إنشاء رسومات وصور PNG شفافة ونظيفة لتصميم مواقع الويب.',
    keywords: 'transparent PNG creator, alpha channel transparency, image clipping',
    keywordsAr: 'صانع صور PNG شفافة, قناة ألفا الشفافة, قص وعزل الصور',
    h1: 'Transparent PNG Creator & Alpha Channels',
    h1Ar: 'صانع صور PNG شفافة وفهم قنوات ألفا',
    date: '2026-07-04',
    content: `
      <p>Not all image formats support transparency. JPG images do not store alpha channel information, which is why they always render with a solid background color (usually white or black). PNG and WEBP formats support transparency, allowing for seamless layering.</p>
      <h2>What is an Alpha Channel?</h2>
      <p>An alpha channel is a color component that determines the transparency level of a pixel. In addition to Red, Green, and Blue (RGB) values, the Alpha (A) value determines how much of the underlying background shows through. An alpha value of 0 means fully transparent, while 255 is fully opaque.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Creating Transparent PNGs Automatically</h2>
      <p>Using a transparent PNG creator enables you to extract your logo, portrait, or product photography and save it as a 32-bit PNG. This is crucial for web designers who want to overlay graphics onto responsive color layouts without ugly rectangular white boxes.</p>
    `,
    contentAr: `
      <p>لا تدعم جميع صيغ الصور ميزة الشفافية. لا يمكن لصيغ JPG تخزين معلومات قناة ألفا (Alpha Channel)، وهذا هو السبب في أنها تظهر دائماً بخلفية صلبة (غالباً بيضاء أو سوداء). بينما تدعم صيغ PNG و WEBP الشفافية، مما يسمح بدمج الطبقات بنجاح.</p>
      <h2>ما هي قناة ألفا (Alpha Channel)؟</h2>
      <p>قناة ألفا هي جزء من بيانات البكسل يحدد مستوى شفافيته. بالإضافة إلى قيم الألوان الأساسية (أحمر، أخضر، أزرق)، تحدد قيمة ألفا مدى ظهور الخلفية من تحت البكسل. القيمة 0 تعني شفاف تماماً، والقيمة 255 تعني معتم بالكامل.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>أرصفة الصور الشفافة تلقائياً</h2>
      <p>يتيح لك صانع صور PNG شفافة عزل شعارك أو صورتك الشخصية وحفظها كملف PNG 32-بت. يعد هذا أمراً ضرورياً لمصممي الويب لدمج الرسوم والصور فوق الخلفيات الملونة دون ظهور مربعات بيضاء غير مرغوبة حول العنصر.</p>
    `
  },
  {
    slug: 'remove-white-background',
    category: 'Tutorials',
    categoryAr: 'شروحات',
    title: 'How to Remove White Background from Logos and Signatures',
    titleAr: 'طريقة إزالة الخلفية البيضاء من الشعارات والتوقيعات الإلكترونية',
    desc: 'Extract logos, signatures, and line art from white paper backgrounds using simple online tools. Clean and transparent output.',
    descAr: 'استخلص الشعارات، التواقيع والرسوم الخطية من الخلفيات الورقية البيضاء باستخدام أدوات بسيطة عبر الإنترنت.',
    keywords: 'remove white background, extract signature png, logo background removal',
    keywordsAr: 'إزالة الخلفية البيضاء, استخراج التوقيع png, إزالة خلفية الشعار',
    h1: 'Remove White Background Online',
    h1Ar: 'إزالة الخلفية البيضاء اون لاين',
    date: '2026-07-05',
    content: `
      <p>Scanned logos or photographed handwritten signatures often end up with an off-white, textured background. Placing these files onto corporate documents or websites looks unprofessional. You need to remove the white background to leave only the lines.</p>
      <h2>Methods to Isolate Signatures</h2>
      <p>You can isolate signatures by converting white pixels into transparent pixels. While programs like Photoshop allow you to do this using Color Range selections, it requires a paid license and technical know-how. Online AI engines make it simple by automatically detecting the signature stroke as the subject and isolating it instantly.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Ensuring High Contrast Output</h2>
      <p>For best results when extracting handwritten signatures, write with a dark black pen on clean white printer paper under good lighting. This provides maximum contrast for the AI algorithm to separate the signature path cleanly from the white page.</p>
    `,
    contentAr: `
      <p>غالباً ما تظهر الشعارات الممسوحة ضوئياً أو التوقيعات المكتوبة بخط اليد والمصورة بخلفية بيضاء باهتة أو مجعدة. وضع هذه الملفات فوق المستندات الرسمية للمؤسسات أو مواقع الويب يبدو غير احترافي. يجب عليك إزالة الخلفية البيضاء تماماً.</p>
      <h2>طرق عزل التواقيع الإلكترونية</h2>
      <p>يمكنك عزل التواقيع من خلال تحويل البكسلات البيضاء إلى بكسلات شفافة. بينما تسمح لك برامج مثل فوتوشوب بالقيام بذلك باستخدام أدوات تحديد الألوان، إلا أنها تتطلب ترخيصاً مدفوعاً وخبرة فنية. بينما تسهل مواقع الذكاء الاصطناعي ذلك مجاناً.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>ضمان دقة استخلاص التوقيع</h2>
      <p>للحصول على أفضل النتائج عند استخراج التواقيع المكتوبة بخط اليد، يفضل الكتابة بقلم أسود غامق على ورق طباعة أبيض نظيف وإضاءة جيدة. يوفر هذا تبايناً ممتازاً لخوارزمية الذكاء الاصطناعي لفصل التوقيع ونحته عن الورقة بنجاح.</p>
    `
  },
  {
    slug: 'remove-background-for-passport-photos',
    category: 'Photography',
    categoryAr: 'تصوير',
    title: 'Remove Background for Passport Photos: Color Requirements',
    titleAr: 'تغيير وإزالة الخلفية لصور جواز السفر: الشروط والمعايير الدولية',
    desc: 'Prepare your passport photos online by removing backgrounds and replacing them with solid light blue, white, or red colors according to government rules.',
    descAr: 'جهز صور جواز السفر وتأشيرات السفر عبر الإنترنت بإزالة الخلفية واستبدالها باللون الأزرق الفاتح أو الأبيض أو الأحمر حسب الشروط الرسمية.',
    keywords: 'passport photo background removal, blue background passport, white background passport',
    keywordsAr: 'إزالة خلفية صورة جواز السفر, خلفية زرقاء لجواز السفر, خلفية بيضاء لصور الفيزا',
    h1: 'Remove Background for Passport Photos',
    h1Ar: 'إزالة وتعديل الخلفية لصور جواز السفر',
    date: '2026-07-06',
    content: `
      <p>Official passport and visa photos must adhere to strict government guidelines regarding background colors. Most nations require a solid white, off-white, or light blue background, with zero shadows or patterns behind the subject.</p>
      <h2>Varying Rules by Country</h2>
      <p>For example, United States passport photos must have a plain white background. Other countries, like Malaysia or Indonesia, require light blue or red backgrounds. If you take a passport photo at home, you can remove the messy background and use our color presets to apply the exact color required by your consulate.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Tips for Home-Made Passport Photos</h2>
      <p>Stand about 2 feet away from the wall to avoid casting shadows, keep your facial expression neutral, and ensure your head is fully visible. Once processed, select the appropriate background preset color (White, Blue, or Red) and download the file for instant printing.</p>
    `,
    contentAr: `
      <p>يجب أن تلتزم الصور الرسمية لجوازات السفر والتأشيرات بشروط حكومية صارمة تتعلق بلون الخلفية. تتطلب معظم الدول خلفية بيضاء نقية أو زرقاء فاتحة، مع ضرورة خلوها تماماً من أي ظلال أو نقوش خلف الشخص.</p>
      <h2>تنوع شروط الخلفية حسب كل دولة</h2>
      <p>على سبيل المثال، تتطلب صور جواز السفر الأمريكي خلفية بيضاء سادة. بينما تتطلب دول أخرى مثل إندونيسيا أو ماليزيا ألواناً حمراء أو زرقاء. إذا التقطت صورة جواز السفر في منزلك، يمكنك إزالة الخلفية العشوائية وتطبيق اللون المطلوب بدقة.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>نصائح لالتقاط صورة جواز السفر بالمنزل</h2>
      <p>قف على بعد متر تقريباً من الجدار لتجنب انعكاس الظلال، حافظ على تعبيرات وجه محايدة، واجعل رأسك مستقيماً وواضحاً بالكامل. بعد معالجة الصورة، اختر اللون المناسب (أبيض، أزرق، أحمر) وحمل صورتك للطباعة الفورية.</p>
    `
  },
  {
    slug: 'best-ai-background-remover',
    category: 'Technology',
    categoryAr: 'تقنية',
    title: 'Best AI Background Remover in 2026: In-Browser vs Server API',
    titleAr: 'أفضل مزيل خلفية بالذكاء الاصطناعي في 2026: مقارنة الأداء والسرعة',
    desc: 'Evaluate the top background removers and understand why client-side in-browser AI processing is superior to remote server APIs.',
    descAr: 'قيم أفضل أدوات إزالة الخلفيات وتعرف على سبب تفوق المعالجة المحلية بالذكاء الاصطناعي على خوادم الـ API البعيدة.',
    keywords: 'best AI background remover, serverless image processing, in-browser AI model',
    keywordsAr: 'أفضل مزيل خلفية بالذكاء الاصطناعي, معالجة صور بدون خادم, نموذج ذكاء اصطناعي محلي',
    h1: 'Best AI Background Remover in 2026',
    h1Ar: 'أفضل مزيل خلفية بالذكاء الاصطناعي في 2026',
    date: '2026-07-07',
    content: `
      <p>The market is flooded with background removal utilities. When choosing the best AI background remover, the main architectural differentiator is where the computation occurs: on a remote server (via API) or locally in the user's browser.</p>
      <h2>The Drawbacks of Server APIs</h2>
      <p>Traditional services require you to upload your image to their server. This introduces slow upload times, exposes your personal pictures to potential security breaches, and restricts free downloads to low resolutions to offset high server maintenance fees.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Why In-Browser AI Wins</h2>
      <p>In-browser AI execution utilizes modern WebAssembly and local GPU acceleration to isolate subjects locally. It provides fast, unlimited, full-resolution cutouts with 100% privacy—making it the superior and most cost-effective solution for consumers.</p>
    `,
    contentAr: `
      <p>يمتلئ السوق بأدوات إزالة خلفيات الصور المتنوعة. عند اختيار أفضل أداة بالذكاء الاصطناعي، يكمن الاختلاف الهيكلي الرئيسي في مكان المعالجة: هل تتم على خادم بعيد (عبر API) أم محلياً في متصفح المستخدم نفسه؟</p>
      <h2>عيوب واجهات البرمجة (APIs) المعتمدة على الخوادم</h2>
      <p>تتطلب الخدمات التقليدية رفع صورك إلى خوادمها. يسبب هذا بطئاً في رفع الملفات، ويعرض صورك الشخصية لمخاطر أمنية محتملة، بالإضافة إلى تقليل دقة التحميل المجاني لتغطية تكاليف الخوادم الباهظة.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>لماذا ينتصر الذكاء الاصطناعي المحلي؟</h2>
      <p>تستخدم المعالجة المحلية محرك WebAssembly وتسريع الغرافيكس المحلي لجهازك لعزل العناصر. يمنحك هذا دقة كاملة، معالجة مجانية غير محدودة، وحماية تامة لخصوصيتك، مما يجعله الحل الأفضل لجميع المستخدمين.</p>
    `
  },
  {
    slug: 'remove-background-without-photoshop',
    category: 'Design',
    categoryAr: 'تصميم',
    title: 'How to Remove Background from Image Without Photoshop',
    titleAr: 'كيفية إزالة خلفية الصورة بسهولة وبدون استخدام برنامج فوتوشوب',
    desc: 'You do not need to pay for Adobe Photoshop to extract images. Learn about simple, free, web-based design alternatives.',
    descAr: 'لا تحتاج لدفع رسوم اشتراك أدوبي فوتوشوب لعزل وقص صورك. تعرف على بدائل ويب مجانية وسهلة الاستخدام.',
    keywords: 'remove background without photoshop, photoshop alternatives free, online clipping path',
    keywordsAr: 'إزالة الخلفية بدون فوتوشوب, بدائل فوتوشوب المجانية, قص الصور أونلاين',
    h1: 'Remove Background Without Photoshop',
    h1Ar: 'إزالة خلفية الصورة بدون فوتوشوب',
    date: '2026-07-08',
    content: `
      <p>Adobe Photoshop is the industry standard for photo editing, but its learning curve is steep, and its monthly subscription fee is high. For users who only want to remove a background, opening Photoshop is slow and unnecessary.</p>
      <h2>Photoshop Magic Wand vs. AI Autocut</h2>
      <p>In Photoshop, selecting backgrounds requires manual adjustments using Magic Wand, Quick Selection, or the Pen tool. An online AI background remover achieves the same results instantly in a single click, completely automated, and accessible from any device.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Free Online Design Workflows</h2>
      <p>By pairing a free background remover tool with free vector design platforms like Canva or Figma, anyone can design social media assets, logos, and promotional banners without expensive licenses or design training.</p>
    `,
    contentAr: `
      <p>يعد أدوبي فوتوشوب البرنامج القياسي في تحرير الصور، لكن منحنى تعلمه معقد واشتراكه الشهري مكلف. بالنسبة للمستخدمين الذين يحتاجون فقط إلى إزالة خلفية، فإن تشغيل فوتوشوب أمر بطيء وغير مجدٍ.</p>
      <h2>عصا فوتوشوب السحرية مقابل القص التلقائي بالذكاء الاصطناعي</h2>
      <p>في فوتوشوب، يتطلب تحديد الخلفيات ضبطاً يدوياً باستخدام العصا السحرية أو التحديد السريع. بينما تقدم أداة الويب نتائج مماثلة فوراً وبنقرة واحدة، وهي مؤتمتة بالكامل ومتاحة من أي جهاز متصل بالإنترنت.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>سير عمل مجاني للتصميم أونلاين</h2>
      <p>من خلال دمج أداة إزالة الخلفية المجانية مع منصات تصميم مجانية مثل Canva أو Figma، يمكن لأي شخص تصميم منشورات السوشيال ميديا، الشعارات، واللافتات الترويجية دون تراخيص مدفوعة أو دورات معقدة.</p>
    `
  },
  {
    slug: 'change-background-color-online',
    category: 'Tutorials',
    categoryAr: 'شروحات',
    title: 'How to Change Background Color of Image Online Instantly',
    titleAr: 'تغيير لون خلفية الصورة اون لاين فوراً وبخطوات بسيطة',
    desc: 'Change image backgrounds to solid red, blue, green, or custom colors. Perfect for ID cards, e-commerce, and portraits.',
    descAr: 'قم بتغيير خلفيات الصور إلى اللون الأحمر، الأزرق، الأخضر أو ألوان مخصصة. مثالي للهويات، المتاجر الإلكترونية، والصور الشخصية.',
    keywords: 'change background color online, edit background color of photo, solid color background creator',
    keywordsAr: 'تغيير لون الخلفية اون لاين, تعديل لون خلفية الصورة, صانع الخلفيات الملونة',
    h1: 'Change Background Color Online Instantly',
    h1Ar: 'تغيير لون خلفية الصورة اون لاين فوراً',
    date: '2026-07-09',
    content: `
      <p>Simply making a background transparent is not always the end goal. Frequently, editors need to replace the transparent pixels with a clean solid color to fit specific document requirements or match brand guidelines.</p>
      <h2>Popular Color Presets for Photos</h2>
      <p>Different use cases demand specific background tones:</p>
      <ul>
        <li><strong>White:</strong> The universal standard for product listings and passport photos.</li>
        <li><strong>Blue / Red:</strong> Frequently used for official employee badges and school ID pictures.</li>
        <li><strong>Custom Gradients:</strong> Used in corporate portraits to add a modern, professional flare.</li>
      </ul>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>Applying Colors in One Click</h2>
      <p>Our editor workspace features instant preset color switches. You can preview the changes in real-time, pick custom colors using our advanced hex color picker, and download the edited image immediately as a high-quality PNG.</p>
    `,
    contentAr: `
      <p>جعل خلفية الصورة شفافة ليس هو الغاية النهائية دائماً. في كثير من الأحيان، يحتاج المحررون إلى استبدال البكسلات الشفافة بلون صلب نظيف ليتناسب مع متطلبات مستند معين أو مع الهوية البصرية لعلامتك التجارية.</p>
      <h2>أشهر الألوان المستخدمة للخلفيات</h2>
      <p>تتطلب حالات الاستخدام المختلفة درجات ألوان محددة:</p>
      <ul>
        <li><strong>الأبيض:</strong> المعيار العالمي لصور المنتجات وصور جوازات السفر الرسمية.</li>
        <li><strong>الأزرق / الأحمر:</strong> يُسخدم بشكل متكرر لبطاقات تعريف الموظفين وصور الهوية المدرسية.</li>
        <li><strong>الألوان المخصصة:</strong> تُستخدم للبورتريهات الشخصية أو لإضافة طابع عصري متميز.</li>
      </ul>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>تطبيق ألوان الخلفية بنقرة واحدة</h2>
      <p>تتميز أداة التحرير لدينا بتبديل فوري للألوان الجاهزة. يمكنك معاينة التغييرات مباشرة، واختيار ألوان دقيقة باستخدام منتقي ألوان الويب، وتحميل صورتك المعدلة فوراً بأعلى دقة ممكنة.</p>
    `
  },
  {
    slug: 'remove-background-in-one-click',
    category: 'Technology',
    categoryAr: 'تقنية',
    title: 'Remove Background in One Click: Behind the AI Technology',
    titleAr: 'إزالة الخلفية بنقرة واحدة: كواليس التقنية والذكاء الاصطناعي',
    desc: 'Unveil the neural network structures and WASM compilers that power fast single-click background removal in modern browsers.',
    descAr: 'اكشف النقاب عن هياكل الشبكات العصبية ومترجمات WASM التي تتيح إزالة الخلفية بنقرة واحدة فائقة السرعة في المتصفح.',
    keywords: 'one click background remover, browser neural network, WebAssembly ONNX',
    keywordsAr: 'مزيل خلفية بنقرة واحدة, شبكة عصبية للمتصفح, ويب اسمبلي ONNX',
    h1: 'Remove Background in One Click',
    h1Ar: 'إزالة الخلفية بنقرة واحدة وكواليس التكنولوجيا',
    date: '2026-07-10',
    content: `
      <p>Achieving a background-free photo used to require complex selections. Today, the entire process takes one click and under 2 seconds. The underlying technology consists of browser-level AI executing highly compressed models.</p>
      <h2>How the AI Separates Subjects</h2>
      <p>The AI model performs semantic segmentation. It examines each pixel in the image and calculates the probability that it belongs to the background or foreground. A boundary mask is generated, and the background pixels are faded to 0% opacity instantly.</p>
      <div class="ad-inline-article"><h4>[AD BLOCK - Inside Article]</h4></div>
      <h2>WASM and ONNX Runtime Web</h2>
      <p>By compiling neural network engines into WebAssembly (WASM), modern browsers can run C++ execution nodes at near-native speeds. WebGL and WebGPU accelerate the tensor calculations, yielding professional cutouts without server delays.</p>
    `,
    contentAr: `
      <p>كانت إزالة خلفية الصور تتطلب قديماً مسارات تحديد معقدة للغاية. اليوم، تستغرق العملية برمتها نقرة واحدة وأقل من ثانيتين. تتكون التقنية الكامنة خلف ذلك من ذكاء اصطناعي يعمل في المتصفح مباشرة لتشغيل نماذج مضغوطة عالية الكفاءة.</p>
      <h2>كيف يفصل الذكاء الاصطناعي العناصر؟</h2>
      <p>يقوم نموذج الذكاء الاصطناعي بعملية تقسيم دلالي للبكسلات (Semantic Segmentation). يدرس كل بكسل ويحسب احتمالية انتمائه للعنصر الأساسي أو الخلفية، ثم ينشئ قناع حدودي دقيق، ويحول بكسلات الخلفية إلى شفافة فوراً.</p>
      <div class="ad-inline-article"><h4>[مربع إعلاني - داخل المقال]</h4></div>
      <h2>تقنيات WASM ومحركات تشغيل الشبكات العصبية</h2>
      <p>من خلال تجميع محركات الشبكات العصبية في صيغة WebAssembly (WASM)، تستطيع المتصفحات تشغيل كود الحوسبة بسرعات تقارب البرمجيات المثبتة. كما يساهم تسريع كرت الشاشة (WebGL/WebGPU) في إنجاز عمليات القص دون أي تأخير.</p>
    `
  }
];

// Helper to write files recursively
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function writeFile(filePath, content) {
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, content, 'utf8');
}

// Generate JSON-LD FAQ Schema
function getFAQSchema(lang) {
  const faqList = FAQS[lang].map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a
    }
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList
  }, null, 2);
}

// Layout Compiler Template
function buildHTML(pageContent, lang, meta = {}) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const oppositeLang = isAr ? 'en' : 'ar';
  
  // Calculate relative depth prefix dynamically based on page path
  const isBlog = meta.path && meta.path.startsWith('blog/');
  let prefix = '';
  if (lang === 'ar') {
    prefix = isBlog ? '../../' : '../';
  } else {
    prefix = isBlog ? '../' : '';
  }

  // Calculate pre-rendered relative alternate language switch link
  let alternateUrl = '';
  if (lang === 'ar') {
    alternateUrl = prefix + meta.path;
  } else {
    if (isBlog) {
      alternateUrl = '../ar/' + meta.path;
    } else {
      alternateUrl = 'ar/' + meta.path;
    }
  }

  const currentUrl = isAr ? `${BASE_URL}/ar/${meta.path}` : `${BASE_URL}/${meta.path}`;
  
  // Navigation active statuses
  const activeHome = meta.nav === 'home' ? 'active' : '';
  const activeBlog = meta.nav === 'blog' ? 'active' : '';
  const activeAbout = meta.nav === 'about' ? 'active' : '';
  const activeContact = meta.nav === 'contact' ? 'active' : '';

  // Breadcrumbs schema if article page
  let breadcrumbSchema = '';
  if (meta.nav === 'blog' && meta.isArticle) {
    breadcrumbSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "${t.navHome}",
          "item": "${BASE_URL}${lang === 'ar' ? '/ar' : ''}/index.html"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "${t.navBlog}",
          "item": "${BASE_URL}${lang === 'ar' ? '/ar' : ''}/blog.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${meta.title}",
          "item": "${currentUrl}"
        }
      ]
    }
    </script>
    `;
  }

  // Schema listings
  const orgSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "${t.siteName}",
    "url": "${BASE_URL}/",
    "logo": "${BASE_URL}/assets/img/logo.png",
    "sameAs": [
      "https://twitter.com/removebgai",
      "https://facebook.com/removebgai"
    ]
  }
  </script>
  `;

  const pageSchema = meta.schema ? `<script type="application/ld+json">${JSON.stringify(meta.schema, null, 2)}</script>` : '';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${isAr ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${meta.title} | ${t.siteName}</title>
  <meta name="description" content="${meta.description}">
  <meta name="keywords" content="${meta.keywords || 'remove background, png transparent background, remove background free'}">
  
  <!-- COI Service Worker for local WebAssembly SharedArrayBuffer execution on GitHub Pages -->
  <script src="${prefix}coi-serviceworker.js"></script>

  <!-- Canonical & Multilingual Alternate Hreflang Linkage -->
  <link rel="canonical" href="${currentUrl}">
  <link rel="alternate" hreflang="en" href="${isAr ? currentUrl.replace('/ar/', '/') : currentUrl}">
  <link rel="alternate" hreflang="ar" href="${isAr ? currentUrl : currentUrl.replace(BASE_URL, `${BASE_URL}/ar`)}">
  <link rel="alternate" hreflang="x-default" href="${isAr ? currentUrl.replace('/ar/', '/') : currentUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${currentUrl}">
  <meta property="og:title" content="${meta.title} | ${t.siteName}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${BASE_URL}/assets/img/og-image.png">

  <!-- Twitter Cards -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${currentUrl}">
  <meta property="twitter:title" content="${meta.title} | ${t.siteName}">
  <meta property="twitter:description" content="${meta.description}">
  <meta property="twitter:image" content="${BASE_URL}/assets/img/og-image.png">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="${prefix}assets/css/style.css">
  
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  
  <!-- Google Schema Integration -->
  ${orgSchema}
  ${pageSchema}
  ${breadcrumbSchema}
</head>
<body>

  <!-- Google AdSense Ready Top Banner -->
  <div class="container">
    <div class="ad-banner-top">
      <div class="ad-title">${t.adPlaceholder}</div>
      <ins class="adsbygoogle"
           style="display:inline-block;width:728px;height:90px"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  </div>

  <!-- Header Section -->
  <header>
    <div class="container header-wrapper">
      <a href="${isAr ? prefix + 'ar/index.html' : prefix + 'index.html'}" class="logo">
        <i class="fas fa-magic"></i>
        <span>${t.siteName}</span>
      </a>
      
      <nav class="nav-links">
        <a href="${isAr ? prefix + 'ar/index.html' : prefix + 'index.html'}" class="nav-link ${activeHome}">${t.navHome}</a>
        <a href="${isAr ? prefix + 'ar/blog.html' : prefix + 'blog.html'}" class="nav-link ${activeBlog}">${t.navBlog}</a>
        <a href="${isAr ? prefix + 'ar/about.html' : prefix + 'about.html'}" class="nav-link ${activeAbout}">${t.navAbout}</a>
        <a href="${isAr ? prefix + 'ar/contact.html' : prefix + 'contact.html'}" class="nav-link ${activeContact}">${t.navContact}</a>
      </nav>

      <div class="header-actions">
        <!-- Theme Toggle -->
        <button class="icon-btn theme-toggle" aria-label="Toggle Theme">
          <i class="fas fa-moon"></i>
        </button>

        <!-- Language Switch -->
        <a href="${alternateUrl}" class="btn btn-secondary lang-switch" aria-label="Change Language">
          <i class="fas fa-globe"></i>
          <span>${oppositeLang === 'ar' ? 'العربية' : 'English'}</span>
        </a>

        <!-- Mobile Menu Toggle -->
        <button class="icon-btn mobile-toggle" aria-label="Open Navigation Menu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-nav">
      <a href="${isAr ? prefix + 'ar/index.html' : prefix + 'index.html'}" class="nav-link ${activeHome}">${t.navHome}</a>
      <a href="${isAr ? prefix + 'ar/blog.html' : prefix + 'blog.html'}" class="nav-link ${activeBlog}">${t.navBlog}</a>
      <a href="${isAr ? prefix + 'ar/about.html' : prefix + 'about.html'}" class="nav-link ${activeAbout}">${t.navAbout}</a>
      <a href="${isAr ? prefix + 'ar/contact.html' : prefix + 'contact.html'}" class="nav-link ${activeContact}">${t.navContact}</a>
    </div>
  </header>

  <!-- Page Content Injector -->
  <main>
    ${pageContent}
  </main>

  <!-- Google AdSense Ready Bottom Banner -->
  <div class="container">
    <div class="ad-banner-bottom">
      <div class="ad-title">${t.adPlaceholder}</div>
      <ins class="adsbygoogle"
           style="display:inline-block;width:728px;height:90px"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="YYYYYYYYYY"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  </div>

  <!-- Footer Section -->
  <footer>
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="${isAr ? prefix + 'ar/index.html' : prefix + 'index.html'}" class="footer-logo">${t.siteName}</a>
        <p>${t.footerDesc}</p>
        <div class="footer-socials">
          <a href="#" class="footer-social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="footer-social-icon" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" class="footer-social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" class="footer-social-icon" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
      
      <div class="footer-column">
        <h3>${t.footerQuickLinks}</h3>
        <ul class="footer-links">
          <li><a href="${isAr ? prefix + 'ar/index.html' : prefix + 'index.html'}">${t.navHome}</a></li>
          <li><a href="${isAr ? prefix + 'ar/blog.html' : prefix + 'blog.html'}">${t.navBlog}</a></li>
          <li><a href="${isAr ? prefix + 'ar/about.html' : prefix + 'about.html'}">${t.navAbout}</a></li>
          <li><a href="${isAr ? prefix + 'ar/contact.html' : prefix + 'contact.html'}">${t.navContact}</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>${t.footerLegal}</h3>
        <ul class="footer-links">
          <li><a href="${isAr ? prefix + 'ar/privacy.html' : prefix + 'privacy.html'}">${t.privacyPolicy}</a></li>
          <li><a href="${isAr ? prefix + 'ar/terms.html' : prefix + 'terms.html'}">${t.termsOfService}</a></li>
          <li><a href="${isAr ? prefix + 'ar/dmca.html' : prefix + 'dmca.html'}">${t.dmcaPolicy}</a></li>
          <li><a href="${isAr ? prefix + 'ar/disclaimer.html' : prefix + 'disclaimer.html'}">${t.disclaimer}</a></li>
          <li><a href="${isAr ? prefix + 'ar/cookies.html' : prefix + 'cookies.html'}">${t.cookiePolicy}</a></li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <div class="footer-copyright">
        <span>${t.copyright}</span>
      </div>
      <div>
        <a href="${alternateUrl}" class="lang-switch nav-link">
          <i class="fas fa-globe"></i> ${oppositeLang === 'ar' ? 'الموقع باللغة العربية' : 'Switch site to English'}
        </a>
      </div>
    </div>
  </footer>

  <!-- Toast Container -->
  <div id="toastNotification" class="notification">
    <span class="notification-icon"><i class="fas fa-info-circle"></i></span>
    <span class="notification-text">Hello!</span>
  </div>

  <!-- Shared Javascript files -->
  <script src="${prefix}assets/js/common.js"></script>
  ${meta.scripts || ''}
</body>
</html>`;
}

// ----------------------------------------------------
// PAGE BUILD GENERATORS
// ----------------------------------------------------

// 1. HOMEPAGE BUILDER (index.html)
function buildHomepage(lang) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const prefix = isAr ? '../' : '';

  // Build FAQ Accordion HTML
  let faqHTML = '';
  FAQS[lang].forEach((faq, index) => {
    // Add ad banner placeholder in the middle of FAQs (after item 5)
    if (index === 5) {
      faqHTML += `
        <div class="faq-ad-break">
          <div class="ad-banner-top" style="max-width: 100%; margin: 1rem 0;">
            <div class="ad-title">${t.adPlaceholder}</div>
            <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-gw-3+1f-3d+2z" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="ZZZZZZZZZZ"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </div>
        </div>`;
    }

    faqHTML += `
      <div class="faq-item">
        <button class="faq-question">${faq.q}</button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>`;
  });

  const content = `
    <!-- Hero Section -->
    <section class="hero text-center">
      <div class="container">
        <h1 class="hero-title">${t.tagline}</h1>
        <p class="hero-subtitle">${t.subtitle}</p>
      </div>
    </section>

    <!-- Interactive AI Tool Workspace Area -->
    <section class="tool-section container">
      <div class="tool-grid">
        
        <!-- Left Sidebar Ad Slot -->
        <aside class="ad-sidebar">
          <div class="ad-title">${t.adPlaceholder}</div>
          <p>Sidebar Banner</p>
          <p>(160 x 600)</p>
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="SL00000001"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </aside>

        <!-- Main Tool Card Workspace -->
        <div class="main-tool-card">
          
          <!-- Dropzone Uploader -->
          <div class="upload-zone" id="uploadZone">
            <div class="upload-icon">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <div class="upload-text">
              <h3>${t.uploadTitle}</h3>
              <p>${t.uploadSubtitle}</p>
            </div>
            <div class="file-formats">${t.formatsText}</div>
            <input type="file" id="fileInput" accept="image/*">
          </div>

          <!-- Loading & Progress Screen -->
          <div class="loading-container" id="loadingContainer">
            <div class="spinner"></div>
            <div class="loading-status" id="loadingStatus">${t.processing}</div>
            <div class="progress-bar-outer">
              <div class="progress-bar-inner" id="progressBarInner"></div>
            </div>
            <div class="loading-details" id="loadingDetails">0%</div>
            <p class="text-center" style="max-width: 450px; font-size: 0.85rem; color: var(--text-muted);">${t.processingSubtitle}</p>
          </div>

          <!-- Active Editor Workspace -->
          <div class="editor-workspace" id="editorWorkspace">
            
            <!-- Before / After Interactive Slider -->
            <div class="preview-container" id="sliderContainer">
              <div class="preview-background transparent-pattern" id="previewBackground"></div>
              
              <!-- original preview (clippable overlay) -->
              <img id="originalPreview" class="preview-image original" src="" alt="Original background image">
              
              <!-- background-removed processed image -->
              <img id="processedPreview" class="preview-image" src="" alt="AI Transparent Background Cutout">
              
              <!-- slider vertical bar -->
              <div class="slider-bar" id="sliderBar">
                <div class="slider-handle"></div>
              </div>
            </div>

            <!-- Editor Options & Actions -->
            <div class="editor-controls">
              
              <!-- Background presets -->
              <div class="control-group">
                <span class="control-label">${t.presetsLabel}</span>
                <div class="color-options">
                  <button class="color-btn transparent-pattern active" data-color="transparent" title="Transparent"></button>
                  <button class="color-btn" style="background-color: #ffffff;" data-color="#ffffff" title="White"></button>
                  <button class="color-btn" style="background-color: #000000;" data-color="#000000" title="Black"></button>
                  <button class="color-btn" style="background-color: #3b82f6;" data-color="#3b82f6" title="Blue"></button>
                  <button class="color-btn" style="background-color: #ef4444;" data-color="#ef4444" title="Red"></button>
                  <button class="color-btn" style="background-color: #10b981;" data-color="#10b981" title="Green"></button>
                  <button class="color-btn" style="background-color: #f59e0b;" data-color="#f59e0b" title="Yellow"></button>
                  
                  <!-- Custom color picker -->
                  <div class="color-picker-wrapper">
                    <button class="color-picker-btn" id="pickerBtn" title="Custom Color Picker">
                      <i class="fas fa-palette"></i>
                    </button>
                    <input type="color" id="customColorPicker" class="color-picker-input">
                  </div>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="action-buttons">
                <button class="btn btn-primary" id="btnDownload">
                  <i class="fas fa-download"></i> ${t.downloadBtn}
                </button>
                <button class="btn btn-secondary" id="btnCopy">
                  <i class="fas fa-copy"></i> ${t.copyBtn}
                </button>
                <button class="btn btn-secondary" id="btnShare">
                  <i class="fas fa-share-alt"></i> ${t.shareBtn}
                </button>
                <button class="btn btn-secondary" id="btnUploadAnother">
                  <i class="fas fa-arrow-left"></i> ${t.newUploadBtn}
                </button>
              </div>
            </div>

            <!-- Recent Items Drawer -->
            <div class="recent-images-section" id="recentImagesSection">
              <div class="recent-header">
                <span class="recent-title">${t.recentTitle}</span>
                <button class="recent-clear-btn" id="clearRecent"><i class="fas fa-trash-alt"></i> ${t.clearRecent}</button>
              </div>
              <div class="recent-grid" id="recentGrid">
                <!-- Recent thumbnails are dynamically loaded here from IndexedDB -->
              </div>
            </div>

          </div>

        </div>

        <!-- Right Sidebar Ad Slot -->
        <aside class="ad-sidebar">
          <div class="ad-title">${t.adPlaceholder}</div>
          <p>Sidebar Banner</p>
          <p>(160 x 600)</p>
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="SL00000002"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </aside>

      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container text-center">
        <div class="section-header">
          <h2 class="section-title">${t.featuresTitle}</h2>
          <p class="section-subtitle">${t.featuresSubtitle}</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fas fa-brain"></i></div>
            <h3>${t.feat1Title}</h3>
            <p>${t.feat1Desc}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fas fa-bolt"></i></div>
            <h3>${t.feat2Title}</h3>
            <p>${t.feat2Desc}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fas fa-file-image"></i></div>
            <h3>${t.feat3Title}</h3>
            <p>${t.feat3Desc}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fas fa-palette"></i></div>
            <h3>${t.feat4Title}</h3>
            <p>${t.feat4Desc}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fas fa-dollar-sign"></i></div>
            <h3>${t.feat5Title}</h3>
            <p>${t.feat5Desc}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper"><i class="fas fa-shield-alt"></i></div>
            <h3>${t.feat6Title}</h3>
            <p>${t.feat6Desc}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container text-center">
        <h2 class="section-title">${t.howItWorksTitle}</h2>
        <p class="section-subtitle">${t.howItWorksSubtitle}</p>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>${t.step1Title}</h3>
            <p>${t.step1Desc}</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>${t.step2Title}</h3>
            <p>${t.step2Desc}</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>${t.step3Title}</h3>
            <p>${t.step3Desc}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordions -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">${t.faqTitle}</h2>
          <p class="section-subtitle">${t.faqSubtitle}</p>
        </div>
        <div class="faq-wrapper">
          ${faqHTML}
        </div>
      </div>
    </section>
  `;

  const filename = 'index.html';
  const outPath = isAr ? path.join(__dirname, 'ar', filename) : path.join(__dirname, filename);
  
  const html = buildHTML(content, lang, {
    title: t.tagline,
    description: t.subtitle,
    nav: 'home',
    path: filename,
    canonical: `${BASE_URL}${isAr ? '/ar' : ''}/${filename}`,
    schema: JSON.parse(getFAQSchema(lang)),
    scripts: `<script type="module" src="${prefix}assets/js/main.js"></script>`
  });

  writeFile(outPath, html);
}

// 2. BLOG INDEX PAGE BUILDER (blog.html)
function buildBlogIndex(lang) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const prefix = isAr ? '../' : '';

  let articlesGridHTML = '';
  ARTICLES.forEach(art => {
    const artTitle = isAr ? art.titleAr : art.title;
    const artDesc = isAr ? art.descAr : art.desc;
    const category = isAr ? art.categoryAr : art.category;
    const artUrl = `${prefix}blog/${art.slug}.html`;

    articlesGridHTML += `
      <article class="blog-card">
        <!-- Generate a placeholder pattern matching product dimensions -->
        <div style="background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--border-color) 100%); width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; color: var(--accent-color); font-size: 3rem;">
          <i class="far fa-image"></i>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-card-tag">${category}</span>
            <span><i class="far fa-calendar-alt"></i> ${art.date}</span>
          </div>
          <h3><a href="${artUrl}">${artTitle}</a></h3>
          <p>${artDesc}</p>
          <a href="${artUrl}" class="blog-card-link">${t.readMore}</a>
        </div>
      </article>`;
  });

  const content = `
    <section class="content-page">
      <div class="container">
        <div class="section-header text-center" style="margin-bottom: 2rem;">
          <h1 class="section-title">${t.blogTitle}</h1>
          <p class="section-subtitle">${t.blogSubtitle}</p>
        </div>

        <!-- Blog categories pills -->
        <div class="blog-categories">
          <span class="category-pill active">${isAr ? 'الكل' : 'All Articles'}</span>
          <span class="category-pill">${isAr ? 'شروحات' : 'Tutorials'}</span>
          <span class="category-pill">${isAr ? 'المتاجر الإلكترونية' : 'E-commerce'}</span>
          <span class="category-pill">${isAr ? 'تقنية' : 'Technology'}</span>
          <span class="category-pill">${isAr ? 'تصميم ورسوم' : 'Design & Graphics'}</span>
        </div>

        <!-- Blog grid -->
        <div class="blog-grid">
          ${articlesGridHTML}
        </div>
      </div>
    </section>
  `;

  const filename = 'blog.html';
  const outPath = isAr ? path.join(__dirname, 'ar', filename) : path.join(__dirname, filename);
  
  const html = buildHTML(content, lang, {
    title: t.blogTitle,
    description: t.blogSubtitle,
    nav: 'blog',
    path: filename,
    canonical: `${BASE_URL}${isAr ? '/ar' : ''}/${filename}`
  });

  writeFile(outPath, html);
}

// 3. BLOG INDIVIDUAL ARTICLES BUILDER (blog/*.html)
function buildBlogArticles(lang) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const prefix = isAr ? '../../' : '../';

  ARTICLES.forEach((art, index) => {
    const artTitle = isAr ? art.titleAr : art.title;
    const artDesc = isAr ? art.descAr : art.desc;
    const artH1 = isAr ? art.h1Ar : art.h1;
    const category = isAr ? art.categoryAr : art.category;
    const artContent = isAr ? art.contentAr : art.content;
    const keywords = isAr ? art.keywordsAr : art.keywords;

    // Navigation between articles
    let prevIndex = index - 1;
    let nextIndex = index + 1;
    if (prevIndex < 0) prevIndex = ARTICLES.length - 1;
    if (nextIndex >= ARTICLES.length) nextIndex = 0;

    const prevArt = ARTICLES[prevIndex];
    const nextArt = ARTICLES[nextIndex];

    const prevTitle = isAr ? prevArt.titleAr : prevArt.title;
    const nextTitle = isAr ? nextArt.titleAr : nextArt.title;

    // Breadcrumb navigation items (relative)
    const crumbsHTML = `
      <a href="${prefix}index.html">${t.navHome}</a>
      <span class="breadcrumb-separator"><i class="fas fa-chevron-${isAr ? 'left' : 'right'}"></i></span>
      <a href="${prefix}blog.html">${t.navBlog}</a>
      <span class="breadcrumb-separator"><i class="fas fa-chevron-${isAr ? 'left' : 'right'}"></i></span>
      <span>${artTitle}</span>
    `;

    // Local schema for this specific article
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": artTitle,
      "description": artDesc,
      "datePublished": art.date,
      "dateModified": art.date,
      "author": {
        "@type": "Person",
        "name": "AI Designer"
      },
      "publisher": {
        "@type": "Organization",
        "name": t.siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/assets/img/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${BASE_URL}${isAr ? '/ar' : ''}/blog/${art.slug}.html`
      }
    };

    const content = `
      <section class="content-page">
        <div class="container">
          <div class="content-wrapper">
            
            <div class="article-header">
              <!-- Breadcrumbs -->
              <div class="article-breadcrumbs">
                ${crumbsHTML}
              </div>
              
              <h1>${artH1}</h1>
              
              <div class="article-meta">
                <span><i class="far fa-folder-open"></i> ${category}</span>
                <span><i class="far fa-calendar-alt"></i> ${art.date}</span>
                <span><i class="far fa-clock"></i> 3 min read</span>
              </div>
            </div>

            <!-- Ad Block Above Article Content -->
            <div class="ad-inline-article" style="margin-top:0; margin-bottom: 1.5rem;">
              <div class="ad-title">${t.adPlaceholder}</div>
              <ins class="adsbygoogle"
                   style="display:block; text-align:center;"
                   data-ad-layout="in-article"
                   data-ad-format="fluid"
                   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                   data-ad-slot="ART0000001"></ins>
              <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>

            <div class="article-body">
              <!-- Inline article graphic placeholder -->
              <div style="background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--border-color) 100%); width: 100%; height: 350px; border-radius: 16px; margin-bottom: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--accent-color);">
                <i class="fas fa-magic" style="font-size: 5rem; margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary); font-weight:600;">${artTitle}</h3>
              </div>

              ${artContent}
            </div>

            <!-- Ad Block Bottom Article Content -->
            <div class="ad-inline-article" style="margin-top: 2rem;">
              <div class="ad-title">${t.adPlaceholder}</div>
              <ins class="adsbygoogle"
                   style="display:block; text-align:center;"
                   data-ad-layout="in-article"
                   data-ad-format="fluid"
                   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                   data-ad-slot="ART0000002"></ins>
              <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>

            <!-- Article Navigation Links -->
            <div class="article-nav">
              <div class="article-nav-link">
                <span>${isAr ? 'المقال السابق' : 'Previous Article'}</span>
                <a href="${prevArt.slug}.html">${prevTitle}</a>
              </div>
              <div class="article-nav-link" style="text-align: end;">
                <span>${isAr ? 'المقال التالي' : 'Next Article'}</span>
                <a href="${nextArt.slug}.html">${nextTitle}</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;

    const filepath = `blog/${art.slug}.html`;
    const outPath = isAr ? path.join(__dirname, 'ar', filepath) : path.join(__dirname, filepath);

    const html = buildHTML(content, lang, {
      title: artTitle,
      description: artDesc,
      keywords: keywords,
      nav: 'blog',
      isArticle: true,
      path: filepath,
      canonical: `${BASE_URL}${isAr ? '/ar' : ''}/${filepath}`,
      schema: articleSchema
    });

    writeFile(outPath, html);
  });
}

// 4. ABOUT US PAGE BUILDER (about.html)
function buildAboutPage(lang) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  
  const content = `
    <section class="content-page">
      <div class="container">
        <div class="content-wrapper">
          <h1>${t.aboutTitle}</h1>
          <p>${t.aboutText}</p>
          <p>${t.aboutDetails}</p>
          
          <h2 style="margin-top: 2rem; margin-bottom:1rem;">${isAr ? 'مهمتنا ورؤيتنا' : 'Our Mission'}</h2>
          <p>${isAr ? 
            'نهدف إلى تمكين الجميع من تحرير صورهم الخاصة بسهولة تامة، بدون برامج باهظة أو تعقيدات. نؤمن بأن الذكاء الاصطناعي يجب أن يكون في خدمة الخصوصية وحقوق المستخدمين، ولذا صممنا هذه الأداة لتعمل محلياً بالكامل.' : 
            'We aim to empower creators, developers, e-commerce stores, and everyday users to produce stunning visual graphics easily. We believe AI computation should respect client security, which is why we run models locally to keep data exactly where it belongs.'}</p>
        </div>
      </div>
    </section>
  `;

  const filename = 'about.html';
  const outPath = isAr ? path.join(__dirname, 'ar', filename) : path.join(__dirname, filename);
  
  const html = buildHTML(content, lang, {
    title: t.aboutTitle,
    description: t.aboutText,
    nav: 'about',
    path: filename,
    canonical: `${BASE_URL}${isAr ? '/ar' : ''}/${filename}`
  });

  writeFile(outPath, html);
}

// 5. CONTACT PAGE BUILDER (contact.html)
function buildContactPage(lang) {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  
  const content = `
    <section class="content-page">
      <div class="container">
        <div class="content-wrapper">
          <h1>${t.contactTitle}</h1>
          <p>${t.contactText}</p>
          
          <form class="contact-form" onsubmit="event.preventDefault(); alert('${t.contactSuccess}'); this.reset();">
            <div class="form-group">
              <label for="contactName">${t.contactName}</label>
              <input type="text" id="contactName" class="form-input" required placeholder="${isAr ? 'أدخل اسمك الكريم' : 'Enter your name'}">
            </div>
            
            <div class="form-group">
              <label for="contactEmail">${t.contactEmail}</label>
              <input type="email" id="contactEmail" class="form-input" required placeholder="name@domain.com">
            </div>
            
            <div class="form-group">
              <label for="contactMessage">${t.contactMessage}</label>
              <textarea id="contactMessage" class="form-input" required placeholder="${isAr ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}"></textarea>
            </div>
            
            <div>
              <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">
                <i class="fas fa-paper-plane"></i> ${t.contactSend}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  const filename = 'contact.html';
  const outPath = isAr ? path.join(__dirname, 'ar', filename) : path.join(__dirname, filename);
  
  const html = buildHTML(content, lang, {
    title: t.contactTitle,
    description: t.contactText,
    nav: 'contact',
    path: filename,
    canonical: `${BASE_URL}${isAr ? '/ar' : ''}/${filename}`
  });

  writeFile(outPath, html);
}

// 6. POLICY PAGES (privacy, terms, cookies, disclaimer, dmca)
const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    titleAr: 'سياسة الخصوصية',
    desc: 'Our Privacy Policy details how we handle user data. We do not store or collect images since background removal is performed on the user device.',
    descAr: 'توضح سياسة الخصوصية طريقة تعاملنا مع بياناتك. نحن لا نخزن أو نجمع صورك لأن المعالجة تتم بالكامل محلياً على جهاز المستخدم.',
    filename: 'privacy.html',
    body: `
      <p class="meta-date">Last Updated: July 4, 2026</p>
      <h2>Data Collection and Images</h2>
      <p>Your privacy is our utmost priority. Unlike conventional online tools, Remove Background AI does not upload your image files to any external server. All AI-powered background removal and image editing calculations are performed locally inside your web browser via WebAssembly.</p>
      <p>We do not store, copy, or collect any personal image data. Once you upload an image, it is cached temporarily in browser memory (blob URLs) and disappears as soon as you close or refresh the website.</p>
      <h2>Cookies and Advertising</h2>
      <p>We serve advertisements through Google AdSense. Google AdSense uses cookies to serve ads based on your previous visits to our website or other websites on the Internet. You can choose to opt-out of personalized advertising by visiting Google's Ads Settings.</p>
    `,
    bodyAr: `
      <p class="meta-date">آخر تحديث: 4 يوليو 2026</p>
      <h2>جمع البيانات والصور</h2>
      <p>خصوصيتك هي أولويتنا القصوى. على عكس أدوات تحرير الصور التقليدية على الإنترنت، لا يقوم موقعنا برفع صورك لخوادم خارجية أبداً. تتم جميع عمليات المعالجة وإزالة الخلفية والقص محلياً بالكامل داخل متصفحك عبر تقنيات WebAssembly المتطورة.</p>
      <p>نحن لا نحتفظ بصورك، ولا نقوم بنسخها أو جمعها بأي شكل. بمجرد إدراجك للصورة، يتم حفظها مؤقتاً في ذاكرة المتصفح النشطة وتختفي فور إغلاق الصفحة أو تحديثها.</p>
      <h2>ملفات تعريف الارتباط والإعلانات</h2>
      <p>نعرض إعلانات من خلال شبكة Google AdSense. تستخدم جوجل ملفات تعريف الارتباط لعرض إعلانات للمستخدمين بناءً على زيارتهم لموقعنا أو مواقع أخرى. يمكنك تعطيل الإعلانات المخصصة من خلال زيارة إعدادات إعلانات جوجل.</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    titleAr: 'شروط الخدمة',
    desc: 'Terms of service and user agreements for Remove Background AI.',
    descAr: 'شروط الاستخدام واتفاقية المستخدم لموقع إزالة خلفية الصورة AI.',
    filename: 'terms.html',
    body: `
      <p class="meta-date">Last Updated: July 4, 2026</p>
      <h2>Acceptance of Terms</h2>
      <p>By accessing or using Remove Background AI, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our service.</p>
      <h2>Permitted Use</h2>
      <p>Our service is provided to you free of charge for personal and commercial usage. You may process an unlimited number of images. Since the processing runs on your local browser resources, you agree not to attempt to scrape or automate high-frequency queries that could degrade your own device stability.</p>
      <h2>Disclaimer of Warranties</h2>
      <p>The service is provided "as is" and "as available". We do not guarantee that the AI output will be 100% accurate under all circumstances.</p>
    `,
    bodyAr: `
      <p class="meta-date">آخر تحديث: 4 يوليو 2026</p>
      <h2>الموافقة على الشروط</h2>
      <p>بدخولك أو استخدامك لموقع إزالة خلفية الصورة AI، فإنك توافق على الالتزام بشروط الخدمة هذه بالكامل. إذا كنت لا توافق، فيرجى التوقف عن استخدام الخدمة.</p>
      <h2>الاستخدام المسموح</h2>
      <p>نقدم لك هذه الخدمة مجاناً تماماً للاستخدام الشخصي والتجاري. يمكنك معالجة عدد غير محدود من الصور. نظراً لأن المعالجة تتم محلياً على جهازك، فإنك توافق على عدم إساءة استخدام الأداة أو إجهاد خوادم الويب بالطلبات المؤتمتة الضارة.</p>
      <h2>إخلاء المسؤولية عن الضمانات</h2>
      <p>تُقدم الخدمة "كما هي" وبدون أي ضمانات بخصوص دقة عزل الخلفية بالذكاء الاصطناعي بنسبة 100% في جميع الصور المعقدة.</p>
    `
  },
  cookies: {
    title: 'Cookie Policy',
    titleAr: 'سياسة ملفات تعريف الارتباط (Cookies)',
    desc: 'Learn how our website utilizes cookies for tracking analytics and Google AdSense optimization.',
    descAr: 'تعرف على كيفية استخدام موقعنا لملفات تعريف الارتباط لتتبع الإحصاءات وتحسين إعلانات جوجل أدسنس.',
    filename: 'cookies.html',
    body: `
      <p class="meta-date">Last Updated: July 4, 2026</p>
      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your computer by your web browser. They are widely used to make websites work more efficiently and provide analytical details to owners.</p>
      <h2>Our Use of Cookies</h2>
      <p>We use cookies primarily for:</p>
      <ul>
        <li><strong>Preferences:</strong> To save your dark theme preference and language selections.</li>
        <li><strong>Advertising:</strong> Google AdSense uses cookies to deliver relevant ads to users.</li>
        <li><strong>Analytics:</strong> Storing anonymous performance metrics.</li>
      </ul>
    `,
    bodyAr: `
      <p class="meta-date">آخر تحديث: 4 يوليو 2026</p>
      <h2>ما هي الكوكيز؟</h2>
      <p>ملفات تعريف الارتباط هي ملفات نصية صغيرة يخزنها المتصفح على جهاز الكمبيوتر الخاص بك. وهي تُستخدم لجعل مواقع الويب تعمل بشكل أفضل وتقديم تحليلات لأصحاب المواقع.</p>
      <h2>استخدامنا للملفات</h2>
      <p>نستخدم ملفات تعريف الارتباط بشكل أساسي في:</p>
      <ul>
        <li><strong>التفضيلات:</strong> لحفظ إعدادات المظهر المظلم واختيار اللغة المفضلة لديك.</li>
        <li><strong>الإعلانات:</strong> تستخدم شبكة Google AdSense ملفات تعريف الارتباط لعرض إعلانات تناسب اهتماماتك.</li>
        <li><strong>الإحصاءات:</strong> تتبع أداء الموقع بشكل مجهول الهوية.</li>
      </ul>
    `
  },
  disclaimer: {
    title: 'Disclaimer',
    titleAr: 'إخلاء المسؤولية',
    desc: 'Official disclaimer statement for Remove Background AI regarding output quality and liability.',
    descAr: 'بيان إخلاء المسؤولية الرسمي لموقع إزالة خلفية الصورة AI بخصوص جودة النتائج والمسؤولية القانونية.',
    filename: 'disclaimer.html',
    body: `
      <p class="meta-date">Last Updated: July 4, 2026</p>
      <p>The information and output images generated by Remove Background AI are provided for general informational and utility purposes only.</p>
      <h2>No Warranties</h2>
      <p>While our neural network model strives for extreme pixel accuracy, the quality of background removal depends heavily on contrast, lighting, and clarity of the input image. We make no warranty that the output images will meet your exact requirements or be free from minor clipping artifacts.</p>
    `,
    bodyAr: `
      <p class="meta-date">آخر تحديث: 4 يوليو 2026</p>
      <p>يتم توفير المعلومات والصور الناتجة عن أداة إزالة خلفية الصورة AI لأغراض تسهيل وتعديل الصور العامة فقط.</p>
      <h2>لا توجد ضمانات</h2>
      <p>رغم دقة الشبكات العصبية لدينا، تعتمد جودة عزل وقص الخلفية بشكل كبير على التباين والإضاءة ووضوح الصورة المرفوعة. لا نقدم أي ضمانات بأن النتائج ستلبي تطلعاتك بدقة 100% دون الحاجة لروتوش إضافية.</p>
    `
  },
  dmca: {
    title: 'DMCA Policy',
    titleAr: 'قانون الألفية الجديدة لحقوق طبع ونشر المواد الرقمية (DMCA)',
    desc: 'Digital Millennium Copyright Act compliance guidelines. Since we do not host user photos, copyright violations are minimized.',
    descAr: 'اتفاقية حقوق الملكية الفكرية الرقمية. بما أننا لا نستضيف صور المستخدمين، فإن انتهاكات حقوق الطبع تكون شبه منعدمة.',
    filename: 'dmca.html',
    body: `
      <p class="meta-date">Last Updated: July 4, 2026</p>
      <h2>Hosting Disclosures</h2>
      <p>Remove Background AI operates 100% client-side. We do not host, store, or cache user images on our web servers. Therefore, we do not store copyrighted photographs on our backend infrastructure.</p>
      <h2>Filing a Copyright Notice</h2>
      <p>If you believe that any text, article, or resource on our website violates your copyright, you may submit a formal DMCA notification to our support email, providing full ownership details and URLs.</p>
    `,
    bodyAr: `
      <p class="meta-date">آخر تحديث: 4 يوليو 2026</p>
      <h2>إفصاحات الاستضافة</h2>
      <p>يعمل موقع إزالة خلفية الصورة AI محلياً بنسبة 100% على متصفح المستخدم. نحن لا نستضيف أو نخزن صور المستخدمين على خوادمنا أبداً، وبالتالي لا توجد صور محمية بحقوق طبع ونشر في قواعد بياناتنا.</p>
      <h2>تقديم بلاغات الملكية الفكرية</h2>
      <p>إذا كنت تعتقد أن أي نص أو مقال في موقعنا ينتهك حقوق الطبع والنشر الخاصة بك، فيمكنك تقديم بلاغ رسمي لبريدنا الإلكتروني مع تفاصيل إثبات الملكية والرابط المتضرر.</p>
    `
  }
};

function buildPolicies(lang) {
  const isAr = lang === 'ar';
  
  Object.keys(POLICIES).forEach(key => {
    const policy = POLICIES[key];
    const title = isAr ? policy.titleAr : policy.title;
    const desc = isAr ? policy.descAr : policy.desc;
    const body = isAr ? policy.bodyAr : policy.body;
    
    const content = `
      <section class="content-page">
        <div class="container">
          <div class="content-wrapper">
            <h1>${title}</h1>
            ${body}
          </div>
        </div>
      </section>
    `;

    const outPath = isAr ? path.join(__dirname, 'ar', policy.filename) : path.join(__dirname, policy.filename);
    
    const html = buildHTML(content, lang, {
      title: title,
      description: desc,
      nav: 'legal',
      path: policy.filename,
      canonical: `${BASE_URL}${isAr ? '/ar' : ''}/${policy.filename}`
    });

    writeFile(outPath, html);
  });
}

// ----------------------------------------------------
// MULTILINGUAL SITEMAP & ROBOTS GENERATOR
// ----------------------------------------------------

function buildSEOConfigurations() {
  // Generate sitemap.xml
  let urlsXml = '';
  
  // List of all base filenames
  const corePages = [
    'index.html',
    'blog.html',
    'about.html',
    'contact.html',
    'privacy.html',
    'terms.html',
    'dmca.html',
    'disclaimer.html',
    'cookies.html'
  ];

  // 1. Add core pages (both EN and AR alternate tags)
  corePages.forEach(p => {
    urlsXml += `
  <url>
    <loc>${BASE_URL}/${p}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/${p}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/${p}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${p}" />
    <changefreq>weekly</changefreq>
    <priority>${p === 'index.html' ? '1.0' : '0.7'}</priority>
  </url>
  <url>
    <loc>${BASE_URL}/ar/${p}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/${p}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/${p}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${p}" />
    <changefreq>weekly</changefreq>
    <priority>${p === 'index.html' ? '1.0' : '0.7'}</priority>
  </url>`;
  });

  // 2. Add blog article pages
  ARTICLES.forEach(art => {
    const slugPath = `blog/${art.slug}.html`;
    urlsXml += `
  <url>
    <loc>${BASE_URL}/${slugPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/${slugPath}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/${slugPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${slugPath}" />
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/ar/${slugPath}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/${slugPath}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/${slugPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${slugPath}" />
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urlsXml}
</urlset>`;

  writeFile(path.join(__dirname, 'sitemap.xml'), sitemapXml);

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  writeFile(path.join(__dirname, 'robots.txt'), robotsTxt);
}

// ----------------------------------------------------
// BUILD MAIN EXECUTION ENTRY
// ----------------------------------------------------
function runBuild() {
  console.log('Starting static pages compiler...');
  
  // Create folders
  fs.mkdirSync(path.join(__dirname, 'assets', 'css'), { recursive: true });
  fs.mkdirSync(path.join(__dirname, 'assets', 'js'), { recursive: true });
  fs.mkdirSync(path.join(__dirname, 'ar', 'blog'), { recursive: true });
  fs.mkdirSync(path.join(__dirname, 'blog'), { recursive: true });

  // Compile layouts for English & Arabic
  ['en', 'ar'].forEach(lang => {
    console.log(`Compiling pages for: [${lang.toUpperCase()}]`);
    buildHomepage(lang);
    buildBlogIndex(lang);
    buildBlogArticles(lang);
    buildAboutPage(lang);
    buildContactPage(lang);
    buildPolicies(lang);
  });

  // Build sitemap and robots
  console.log('Generating sitemap.xml and robots.txt...');
  buildSEOConfigurations();

  console.log('Build completed successfully!');
}

runBuild();
