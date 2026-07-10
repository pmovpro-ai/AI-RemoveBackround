export const getFaqs = (lang: string) => {
  const isEn = lang === 'en';
  return [
    {
      q: isEn ? "How to remove background from image?" : "كيف أزيل خلفية الصورة؟",
      a: isEn ? "Simply drag and drop your image into our upload area, and our AI will automatically remove the background in seconds." : "ببساطة اسحب وأفلت صورتك في منطقة الرفع، وسيقوم الذكاء الاصطناعي الخاص بنا بإزالة الخلفية تلقائياً في ثوانٍ."
    },
    {
      q: isEn ? "Is this tool free?" : "هل هذه الأداة مجانية؟",
      a: isEn ? "Yes, our AI background removal tool is 100% free to use with no hidden charges." : "نعم، أداة إزالة الخلفية بالذكاء الاصطناعي الخاصة بنا مجانية 100% بدون أي رسوم خفية."
    },
    {
      q: isEn ? "Can I download PNG?" : "هل يمكنني تحميل بصيغة PNG؟",
      a: isEn ? "Yes, you can download your edited images as high-quality transparent PNG files." : "نعم، يمكنك تحميل صورك المعدلة كملفات PNG شفافة عالية الجودة."
    },
    {
      q: isEn ? "How accurate is the AI?" : "ما مدى دقة الذكاء الاصطناعي؟",
      a: isEn ? "Our AI model uses advanced neural networks to precisely detect edges, making it highly accurate even with complex subjects like hair." : "يستخدم نموذج الذكاء الاصطناعي الخاص بنا شبكات عصبية متقدمة لاكتشاف الحواف بدقة، مما يجعله دقيقاً للغاية حتى مع الأشياء المعقدة مثل الشعر."
    },
    {
      q: isEn ? "Do I need to register?" : "هل أحتاج إلى التسجيل؟",
      a: isEn ? "No, you can use all features without creating an account or logging in." : "لا، يمكنك استخدام جميع الميزات دون إنشاء حساب أو تسجيل الدخول."
    },
    {
      q: isEn ? "What image formats are supported?" : "ما هي صيغ الصور المدعومة؟",
      a: isEn ? "We support JPG, JPEG, PNG, and WEBP image formats." : "نحن ندعم صيغ الصور JPG و JPEG و PNG و WEBP."
    },
    {
      q: isEn ? "Is my data secure?" : "هل بياناتي آمنة؟",
      a: isEn ? "Yes, all processing is done locally in your browser. We never upload or store your images on our servers." : "نعم، تتم جميع عمليات المعالجة محلياً في متصفحك. لا نقوم أبداً برفع أو تخزين صورك على خوادمنا."
    },
    {
      q: isEn ? "Can I change the background color?" : "هل يمكنني تغيير لون الخلفية؟",
      a: isEn ? "Yes! After removing the background, you can choose from preset colors or pick a custom color." : "نعم! بعد إزالة الخلفية، يمكنك الاختيار من الألوان المحددة مسبقاً أو اختيار لون مخصص."
    },
    {
      q: isEn ? "Does it work on mobile?" : "هل تعمل على الجوال؟",
      a: isEn ? "Yes, our website is fully responsive and works perfectly on smartphones and tablets." : "نعم، موقعنا متجاوب بالكامل ويعمل بشكل مثالي على الهواتف الذكية والأجهزة اللوحية."
    },
    {
      q: isEn ? "Is there a limit on image size?" : "هل هناك حد لحجم الصورة؟",
      a: isEn ? "Since processing happens on your device, the limit depends on your browser's memory, but generally up to 10MB works smoothly." : "نظراً لأن المعالجة تتم على جهازك، فإن الحد يعتمد على ذاكرة متصفحك، ولكن بشكل عام حتى 10 ميغابايت تعمل بسلاسة."
    },
    {
      q: isEn ? "How to remove background from product photos?" : "كيف أزيل الخلفية من صور المنتجات؟",
      a: isEn ? "Upload your product photo. The AI will isolate the product. You can then add a clean white background or download it transparent." : "ارفع صورة منتجك. سيقوم الذكاء الاصطناعي بعزل المنتج. يمكنك بعد ذلك إضافة خلفية بيضاء نظيفة أو تحميلها شفافة."
    },
    {
      q: isEn ? "Can I remove background without Photoshop?" : "هل يمكنني إزالة الخلفية بدون فوتوشوب؟",
      a: isEn ? "Absolutely! Our AI tool gives you Photoshop-like results instantly without needing any software skills." : "بالتأكيد! تمنحك أداة الذكاء الاصطناعي الخاصة بنا نتائج مشابهة للفوتوشوب على الفور دون الحاجة إلى أي مهارات برمجية."
    },
    {
      q: isEn ? "Is it suitable for passport photos?" : "هل هي مناسبة لصور جواز السفر؟",
      a: isEn ? "Yes, you can remove the background and set it to plain white or blue for passport and ID photos." : "نعم، يمكنك إزالة الخلفية وتعيينها إلى اللون الأبيض السادة أو الأزرق لصور جواز السفر والهوية."
    },
    {
      q: isEn ? "Can I use the images commercially?" : "هل يمكنني استخدام الصور تجارياً؟",
      a: isEn ? "Yes, the processed images are yours to use for both personal and commercial projects." : "نعم، الصور المعالجة هي ملكك لاستخدامها في المشاريع الشخصية والتجارية."
    },
    {
      q: isEn ? "What happens if the AI fails?" : "ماذا يحدث إذا فشل الذكاء الاصطناعي؟",
      a: isEn ? "If the image is too complex, the AI might struggle. Try uploading a photo with higher contrast between the subject and background." : "إذا كانت الصورة معقدة للغاية، فقد يواجه الذكاء الاصطناعي صعوبة. حاول رفع صورة ذات تباين أعلى بين العنصر والخلفية."
    },
    {
      q: isEn ? "Do you add a watermark?" : "هل تضيفون علامة مائية؟",
      a: isEn ? "No, we never add watermarks to your downloaded images." : "لا، لا نضيف أبداً علامات مائية إلى صورك المحملة."
    },
    {
      q: isEn ? "How fast is the process?" : "ما مدى سرعة العملية؟",
      a: isEn ? "It usually takes between 3 to 10 seconds depending on your device's speed." : "يستغرق الأمر عادةً من 3 إلى 10 ثوانٍ حسب سرعة جهازك."
    },
    {
      q: isEn ? "Does it remove white backgrounds?" : "هل تزيل الخلفيات البيضاء؟",
      a: isEn ? "Yes, our AI can remove any background color, including white, black, or complex sceneries." : "نعم، يمكن لذكائنا الاصطناعي إزالة أي لون خلفية، بما في ذلك الأبيض أو الأسود أو المناظر المعقدة."
    },
    {
      q: isEn ? "Can it remove background from a logo?" : "هل يمكنها إزالة الخلفية من شعار؟",
      a: isEn ? "Yes, it works great for logos, making them transparent for your websites or presentations." : "نعم، إنها تعمل بشكل رائع مع الشعارات، مما يجعلها شفافة لمواقعك الإلكترونية أو عروضك التقديمية."
    },
    {
      q: isEn ? "Why use this tool instead of others?" : "لماذا تستخدم هذه الأداة بدلاً من غيرها؟",
      a: isEn ? "It's free, completely private, requires no account, and delivers premium quality transparent images instantly." : "إنها مجانية، خاصة تماماً، لا تتطلب حساباً، وتقدم صوراً شفافة بجودة ممتازة على الفور."
    }
  ];
};