# Remove Background AI | إزالة خلفية الصورة بالذكاء الاصطناعي

A premium, modern, multilingual (Arabic and English) static web application that performs fast AI-powered background removal directly in the user's web browser using WebAssembly. Designed for SEO optimization, fast load speed, and Google AdSense integration.

موقع احترافي حديث ثنائي اللغة (العربية والإنجليزية) لإزالة خلفية الصور فوراً ودقة متناهية محلياً بالكامل في متصفح المستخدم بالاعتماد على الذكاء الاصطناعي وتقنيات WebAssembly. مصمم لتهيئة محركات البحث (SEO) وسرعة تحميل فائقة وجاهز لربط إعلانات جوجل أدسنس.

---

## Key Features | المميزات الرئيسية

* **100% Client-Side AI (Privacy First):** Background removal runs locally. Images are never uploaded to any server.
  * **معالجة محلية بالكامل:** تتم المعالجة في جهاز المستخدم دون الحاجة لرفع صوره إلى خوادم خارجية، مما يضمن خصوصية 100%.
* **Multilingual Structure (SEO-friendly):** Separate folders for English (root) and Arabic (`/ar/`) linked with canonical alternate hreflang tags for double search index exposure.
  * **بنية ثنائية اللغة لـ SEO:** تقسيم منظم للصفحات الإنجليزية (في الرئيسي) والصفحات العربية (تحت مجلد `/ar/`) مع ربطها بروابط لغة بديلة (hreflang) لتعزيز الأرشفة المزدوجة.
* **Before / After interactive slider:** Cultural directions (clipping left-to-right for LTR, right-to-left for RTL).
  * **شريط مقارنة تفاعلي:** يدعم الاتجاهات الثقافية (من اليسار لليمين للإنجليزية، ومن اليمين لليسار للعربية).
* **Color Customizations:** Preset templates (White, Black, Blue, Red, Green, Yellow) and custom hex color picker.
  * **تغيير ألوان الخلفية:** قوالب جاهزة (أبيض، أسود، أزرق، أحمر) ومنتقي ألوان مخصص لاختيار أي درجة لون.
* **IndexedDB Local History:** Stores recent images cached inside the browser.
  * **سجل محلي للصور:** حفظ وتخزين آخر 5 صور معالجة في المتصفح تلقائياً (IndexedDB).
* **Google AdSense Ready:** Clean spaces reserved for ads (Sidebars, banners, inside blog articles) without breaking user uploader flows.
  * **جاهز لـ Google AdSense:** مساحات مخصصة ونظيفة للإعلانات لا تتعارض مع عملية رفع ومعالجة الصور.
* **10 Detailed Blog Articles:** SEO articles in both languages to avoid thin-content Google rejection.
  * **10 مقالات تفصيلية:** مقالات غنية ومنسقة بالكامل باللغتين لتجنب رفض أدسنس بسبب المحتوى الضعيف.

---

## File Structure | الهيكل المالي للملفات

* `index.html` / `ar/index.html` - Homepage and editor workspace (English / Arabic)
* `blog.html` / `ar/blog.html` - Blog archives
* `blog/` / `ar/blog/` - 10 detailed articles in both languages
* `about.html`, `contact.html`, `privacy.html`, `terms.html`, `cookies.html`, `dmca.html`, `disclaimer.html` - Legal & info pages (English and Arabic sub-versions)
* `assets/css/style.css` - Theme variables and logical property rules
* `assets/js/common.js` - Dynamic theme persistence & mobile nav controls
* `assets/js/main.js` - AI image processing and IndexedDB triggers
* `coi-serviceworker.js` - Client-side Cross-Origin Isolation header injector (required for high-performance WASM)
* `build.js` - Static site compilation generator
* `server.js` - Performance-focused local development Node.js server
* `sitemap.xml` / `robots.txt` - SEO configurations

---

## Local Development | التشغيل المحلي للقرائة والتجربة

Run the custom Node server to view files locally with active `SharedArrayBuffer` support headers:

قم بتشغيل خادم Node المحلي لمعاينة الموقع وتفعيل تسريع المعالجة:

```bash
node server.js
```

Then open your browser at:  
افتح المتصفح على الرابط التالي:  
`http://localhost:8080/`

---

## How to Deploy to GitHub Pages | كيفية النشر على GitHub Pages

Since the site is fully static, you can deploy it directly to GitHub Pages without any hosting costs!

بما أن الموقع استاتيكي (Static) بالكامل، يمكنك نشره مباشرة على GitHub Pages مجاناً وبخطوات بسيطة:

1. **Create a GitHub Repository:** Create a new repository on your GitHub account (e.g. `remove-background-ai`).
   * **إنشاء مستودع:** قم بإنشاء مستودع جديد على حسابك في GitHub.
2. **Push the Files:** Initialize git and push the files (except the ones in `.gitignore`):
   * **رفع الملفات للمستودع:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Remove Background AI"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   * Go to your repository on GitHub.
   * Navigate to **Settings** > **Pages** (in the left sidebar).
   * Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   * Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
4. **WASM Optimization Note (Cross-Origin Isolation):**
   * High-performance background removal requires `SharedArrayBuffer`, which usually demands server headers (`COOP` and `COEP`).
   * GitHub Pages does not support custom server headers.
   * **Solution Included:** We have integrated `coi-serviceworker.js` in all pages. This service worker automatically intercepts and injects the headers client-side in the browser on load. **It works out-of-the-box on GitHub Pages with maximum speed!**
   * **ملاحظة حول تسريع الذكاء الاصطناعي:** تحتاج المكتبة لتفعيل ميزات المعالجة المتعددة. نظراً لأن GitHub Pages لا يدعم تفعيل خيارات العناوين (Headers) من الخادم، قمنا بدمج الخدمة الذكية `coi-serviceworker.js` لتقوم بتمرير هذه الخيارات محلياً وتلقائياً على المتصفح عند التحميل. **الموقع سيعمل بأعلى سرعة معالجة ممكنة تلقائياً!**
