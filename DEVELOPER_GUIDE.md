# 🎮 دليل مطوري AL LORD STORE (Developer Guide)

مرحباً بك في دليل مطوري مشروع **AL LORD STORE**. 
تم إعداد هذا الدليل لمساعدة أي مطور قادم (أو مالك المشروع) على فهم هيكلة الموقع، وكيفية التعديل عليه، وكيفية ربط الواجهات الحالية (Frontend) بنظام خلفي حقيقي (Backend) في المستقبل.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

*   **إطار العمل:** React (بواسطة Vite) مع TypeScript.
*   **التصميم (Styling):** Tailwind CSS + CSS Variables للتصميم العنيف (Brutalist UI).
*   **الحركة والانيميشن:** Framer Motion, GSAP.
*   **الأيقونات ولوازم الواجهة:** Lucide React, Embla Carousel (لسلايدر الآراء).
*   **إدارة الحالة (State Management):** Context API (`LangContext`, `LoginContext`).

---

## 📂 الهيكلة الأساسية للمشروع

توجد كل ملفات التطوير الأساسية داخل مجلد `src`:
*   `src/App.tsx`: الملف الرئيسي الذي يحتوي على نظام التوجيه (React Router) والمكونات العامة (النافذة المنبثقة لتسجيل الدخول، الفوتر، الإشعارات الحية).
*   `src/pages/`: يحتوي على الصفحات الرئيسية (`Index.tsx` للرئيسية، `GameDetailPage.tsx` لصفحة شراء اللعبة).
*   `src/components/ControlledChaos/`: يحتوي على **كافة المكونات (Components)** الخاصة بتصميم الموقع.

---

## 📝 1. كيف تضيف أو تعدل لعبة جديدة؟

إذا أردت إضافة لعبة جديدة لتظهر في الصفحة الرئيسية وصفحة الشراء، يجب عليك التعديل في مصفوفتين (حتى يتم ربط المشروع بـ Backend مركزي):

1.  **في الصفحة الرئيسية (قسم الألعاب):** 
    افتح ملف `src/components/ControlledChaos/StickyWorks.tsx`. 
    ستجد مصفوفة `GAMES_DATA`، أضف كائن (Object) اللعبة الخاص بك هناك:
    ```javascript
    {
      id: "game-id",
      name: "اسم اللعبة",
      slug: "game-slug",
      image: "رابط الصورة عالية الجودة",
      color: "bg-[#HexColor]",
      tags: [{ text: "Tag", color: "bg-color", textC: "text-color" }]
    }
    ```

2.  **في صفحة تفاصيل اللعبة (باقات الشحن):**
    افتح ملف `src/pages/GameDetailPage.tsx`.
    ستجد مصفوفة كبرى `GAMES_DATA` تحتوي على بيانات تفصيلية لكل لعبة وباقاتها. أضف نفس الـ `slug` الذي وضعته، وضع داخله مصفوفة `packages`.
    لتفعيل اللعبة، تأكد من إضافة قسم `packages` يحتوي على الباقات (الاسم، السعر الأصلي، السعر بعد الخصم، الأيقونة).

---

## 💬 2. كيف تعدل في قسم "آراء العملاء"؟

قسم آراء العملاء عبارة عن سلايدر (Carousel) تفاعلي.
*   افتح ملف: `src/components/ControlledChaos/ChaosServices.tsx`.
*   ستجد مصفوفة `reviews` في بداية المكون العالي.
*   لإضافة رأي جديد، ببساطة أضف Object جديد يحتوي على:
    `{ name: "الاسم", rating: 5, textAr: "الرأي بالعربية", textEn: "الرأي بالإنجليزية", avatar: "رابط صورة" }`.

---

## 🌐 3. كيف تربط الموقع بـ Backend؟ (مرحلة التطوير القادمة)

الموقع حالياً مبني كـ الواجهة الأمامية (Frontend) فقط بتجربة مستخدم (UX) كاملة وتفاعلية. لربط الموقع بـ Backend حقيقي (مثل Node.js/Express, Firebase, أو Django)، اتبع التالي:

### أ. الإشعارات الحية للمشتريات (Live Purchases):
*   **الملف المعني:** `src/components/ControlledChaos/LivePurchases.tsx`.
*   **طريقة الربط:** حالياً المكون يعتمد على مصفوفة وهمية `NOTIFICATIONS_AR` ونظام `setTimeout`. لاستبداله بنظام حقيقي، قم بإلغاء `setTimeout` واستخدم `WebSocket` (مثل Socket.io) أو `Server-Sent Events (SSE)`.
*   **مثال:** عندما يرسل الخادم رسالة `socket.on('new_purchase', (data) => {...})`، قم بتحديث الـ State `setCurrentIndex` بالبيانات القادمة من السيرفر.

### ب. عدادات الإحصائيات الحقيقية (Raw Stats):
*   **الملف المعني:** `src/components/ControlledChaos/RawStats.tsx`.
*   **طريقة الربط:** عوضاً عن الأرقام الثابتة مثل `850` و `1200`، استخدم `useEffect` مع دالة `fetch()` للحصول على الأرقام من API الـ Backend (مثلاً: `/api/v1/stats`). 
*   **ملاحظة:** مكون المونتاج `AnimatedCounter` سيقوم تلقائياً بعمل تأثير العد التحريكي عند وصول الرقم من السيرفر.

### ج. إتمام الطلبات (Checkout / إرسال للواتساب):
*   **الملف المعني:** `src/pages/GameDetailPage.tsx` (ابحث عن `const confirmOrder`).
*   **الوضع الحالي:** عند النقر لتأكيد الطلب، يقوم الموقع بتوليد رابط `wa.me` آلياً ويحول المستخدم للواتساب.
*   **طريقة الربط:** في قسم `confirmOrder`، بدلاً من التحويل المباشر للواتساب، قم بإرسال `axios.post('/api/orders', orderData)`. بعد نجاح العملية في الخادم، يمكنك حينها تحويل العميل لصفحة نجاح الطلب (Success Page) أو للواتساب إذا أردت استمرار هذا الأسلوب.

### د. تسجيل الدخول (Authentication):
*   **الملفات المعنية:** `LoginModal.tsx` و `LoginContext.tsx`.
*   **الوضع الحالي:** المكون يستخدم `setTimeout` لمحاكاة نجاح الدخول ويخزن بيانات تجريبية في `localStorage`.
*   **التعديلات المطلوبة للربط الحقيقي:**
    1.  **Firebase Auth:** قم بتثبيت `firebase` واستخدم `signInWithPopup(auth, googleProvider)`. عند النجاح، أحصل على الـ `user` وقم بتحديث الـ Context.
    2.  **Supabase:** استخدم `supabase.auth.signInWithOAuth({ provider: 'google' })`.
    3.  **Backend مخصص:** عند نجاح `handleGoogleLogin` (مثلاً عبر Google SDK)، أرسل الـ `idToken` لخادمك (`axios.post('/auth/google', { token })`) ليقوم السيرفر بالتحقق منه وإصدار `JWT`.
*   **ملاحظة برمجية:** تم تعديل منطق النافذة بحيث **لا تغلق تلقائياً** عند النجاح؛ يجب على المطور التأكد من بقاء حالة `success` حتى يقوم العميل بنسخ الكود أو إغلاق النافذة يدوياً لضمان رؤية "هدية الترحيب".
*   **كود مقترح للربط:**
    ```typescript
    const handleGoogleLogin = async () => {
      setStatus("loading");
      try {
        const result = await yourAuthFunction(); // Example: signInWithPopup
        localStorage.setItem("token", result.token);
        setStatus("success");
        // ملاحظة: لا تستخدم closeLogin() هنا تلقائياً، اتركها للمستخدم
      } catch (error) {
        setStatus("idle");
        // handle error
      }
    };
    ```

### هـ. نظام أكواد الخصم (Promo Codes):
*   **الملف المعني:** `src/pages/GameDetailPage.tsx`.
*   **طريقة التعديل:** ستجد دالة `handleApplyPromo` مسؤولة عن التحقق من الكود المدخل. حالياً تدعم أكواد ثابتة مثل `LORD15` و `WELCOME` وتعطي خصم 15%.
*   **لربطها بـ Backend:** استبدل التحقق الشرطي بطلب API (`axios.post('/api/validate-promo', { code: promoCode })`). السيرفر سيعيد لك نسبة الخصم `discountPercentage` لتقوم بتحديث الشاشة واحتساب السعر الجديد للمستخدم قبل إرساله للواتساب.
*   **ملاحظة هامة:** في نظام الـ Backend، يجب برمجة كود `WELCOME` ليكون متاحاً **مرة واحدة فقط لكل حساب** أو جهاز، وذلك عن طريق ربط الكود بـ `userId` في قاعدة البيانات ومنع تكراره لنفس المستخدم. حالياً في الـ Frontend، يظهر الكود للعميل فور تسجيل الدخول بنجاح مع زر للنسخ.

---

## 🎨 4. التعديل على تصميم الهوية (Brutalist UI)

يعتمد الموقع على ألوان متغيرات CSS مخصصة تعطي طابع الـ **Brutalism**:
*   `--c-orange`: برتقالي فاقع (#FF4D00)
*   `--c-lime`: أخضر فاقع (#CCFF00)
*   `--c-purple`: بنفسجي غامق (#B084FF)
*   `--c-ink`: أسود حبري (#050505)
*   `--c-bg`: أبيض/كريمي (#F4F4F0)

لتغيير البالتة اللونية بالكامل، اذهب إلى `src/index.css` وعدل هذه الألوان في الـ `:root`.
دائماً نعتمد على الحدود السميكة `border-4 border-[var(--c-ink)]` وظلال الصناديق `shadow-[4px_4px_0px_var(--c-ink)]` لكي نحافظ على شكل الموقع العنيف.

---
**تم كتابة هذا الملف ليكون المرجع الأول والأساسي كخريطة طريق لأي مبرمج يعمل على تطوير هذا المشروع.**
