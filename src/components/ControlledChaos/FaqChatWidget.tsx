import React, { useState, useEffect, useRef } from "react";
import { MessageSquareText, X, Gamepad2, ChevronUp, ChevronDown, ShieldCheck, CheckCircle, Clock, AlertCircle, Timer, Sparkles, Crown, Lock, Shield, Frown, Heart, Zap, Headset, FileText, Users, Smartphone, CreditCard, UserCircle, AlertTriangle } from "lucide-react";
import { ComplaintModal } from "./ComplaintModal";
import { useLang } from "./LangContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "./LoginContext";
import { useSettings } from "./SettingsContext";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  faqId?: string;
  withAnimation?: "clock" | "sparkles" | "shield" | "frown" | "heart" | "zap" | "headset" | "fileText" | "users" | "smartphone" | "creditCard";
  type?: "status-card" | "lord-profile" | "security-cert";
  actions?: {
    label: string;
    url?: string;
    faqId?: string;
    icon?: "whatsapp" | "telegram";
    className?: string;
  }[];
};

const FAQ_DATA = [
  {
    id: "q0",
    en: { q: "Who are we? / What is Lord Store?", a: "Lord Store is your premier and trusted destination for topping up game currencies (PUBG, Free Fire, and more) in Egypt and the Middle East. We specialize in speed, security, and multiple payment methods (Vodafone Cash, InstaPay). Our goal is to provide a seamless and safe recharge experience for every gamer." },
    ar: { q: "من نحن؟ / ما هو متجر اللورد؟", a: "متجر اللورد هو وجهتك الأولى والموثوقة لشحن عملات الألعاب (ببجي، فري فاير، وغيرها) في مصر والشرق الأوسط. نتميز بالسرعة، الأمان، وتعدد طرق الدفع (فودافون كاش، انستاباي). هدفنا هو توفير تجربة شحن سلسة وآمنة لكل لاعب." }
  },
  {
    id: "q1",
    en: { q: "How to top up? (Steps)", a: "To recharge at Lord Store, follow these steps:\n1. Select the game from the home page.\n2. Choose the package you need.\n3. Enter your account ID accurately.\n4. Click 'Top Up Now' and you will be redirected to WhatsApp.\n5. Transfer the required amount to the number shown.\n6. Send a screenshot of the transfer on WhatsApp for faster processing." },
    ar: { q: "كيف يمكنني الشحن؟ (بكل سهولة)", a: "للشحن في متجر اللورد، اتبع الخطوات التالية:\n1. اختر اللعبة من الصفحة الرئيسية.\n2. حدد الباقة اللي محتاجها.\n3. اكتب الـ ID الخاص بحسابك بدقة.\n4. اضغط 'اشحن الآن' هيتم توجيهك للواتساب.\n5. حول المبلغ المطلوب للرقم اللي هيظهرلك.\n6. ابعت صورة التحويل (سكرين شوت) في الواتساب لسرعة التنفيذ." }
  },
  {
    id: "q2",
    en: { q: "What are the payment methods?", a: "We support Vodafone Cash, InstaPay, and direct bank transfers." },
    ar: { q: "ما هي طرق الدفع؟", a: "ندعم الدفع عبر فودافون كاش، انستاباي، والتحويل البنكي." }
  },
  {
    id: "q_payment",
    en: { q: "I didn't find my payment method, what to do?", a: "Don't worry! We support most Arab world wallets. If yours isn't listed, we can process it manually for you." },
    ar: { q: "لم أجد طريقة دفع مناسبة لي، ماذا أفعل؟", a: "لا تقلق! نحن ندعم معظم محافظ الوطن العربي، إذا لم تجد طريقتك في القائمة، يمكننا توفيرها لك يدوياً عبر الوكيل." }
  },
  {
    id: "q_how_to_pay",
    en: { q: "How to pay?", a: "Payment is very easy:\n1. Contact us on WhatsApp.\n2. Complete the transfer process.\n3. The Lord will follow up with you step-by-step with pictures and confirmation until the operation is successful." },
    ar: { q: "كيف يتم الدفع؟", a: "الدفع سهل جداً:\n1. تواصل معنا عبر الواتساب.\n2. قم بإتمام عملية التحويل.\n3. اللورد هيتابع معاك خطوة بخطوة بالصور والتأكيد لحد وصول طلبك بنجاح." }
  },
  {
    id: "q3",
    en: { q: "How long does it take?", a: "Most top-ups are completed within 5 to 15 minutes after payment confirmation ✅" },
    ar: { q: "كم يستغرق الشحن؟", a: "تتم معظم عمليات الشحن خلال 5 إلى 15 دقيقة بعد تأكيد الدفع ✅" }
  },
  {
    id: "q4",
    en: { q: "Is it safe?", a: "100% safe! We mostly use official Player IDs, so no password is required for most games." },
    ar: { q: "هل الشحن آمن؟", a: "آمن 100%! نحن نستخدم معرف اللاعب (ID) الرسمي غالباً، لذا لا نحتاج لكلمة المرور لمعظم الألعاب." }
  },
  {
    id: "q5",
    en: { q: "Is there a refund?", a: "Refunds are available only if the order hasn't been processed yet. Delivered credits cannot be refunded." },
    ar: { q: "هل يوجد استرجاع؟", a: "الاسترجاع متاح فقط إذا لم يتم تنفيذ الطلب بعد. لا يمكن استرداد الرصيد الذي تم تسليمه بنجاح." }
  },
  {
    id: "q6",
    en: { q: "What are the working hours?", a: "We work 24/7 to serve you! However, human response might be slightly slower between 3 AM and 9 AM." },
    ar: { q: "ما هي مواعيد العمل؟", a: "نحن نعمل على مدار 24 ساعة يومياً لخدمتكم! ومع ذلك، قد يتأخر الرد البشري قليلاً بين الساعة 3 فجراً و 9 صباحاً." }
  },
  {
    id: "q7",
    en: { q: "I entered the wrong ID, what to do?", a: "Contact us immediately! As long as the recharge hasn't been processed, we can fix it for you." },
    ar: { q: "كتبت الـ ID غلط، ماذا أفعل؟", a: "تواصل معنا فوراً! طالما لم يتم تنفيذ عملية الشحن للـ ID الخاطئ، يمكننا تعديله لك بكل سهولة." }
  },
  {
    id: "q8",
    en: { q: "Are there rewards for regulars?", a: "Yes! 'Lord Points' give you discounts and free gifts with every purchase. The more you ship, the more you win." },
    ar: { q: "هل توجد هدايا للعملاء الدائمين؟", a: "بالتأكيد! 'نقاط اللورد' تمنحك خصومات وهدايا مجانية مع كل عملية شحن. كل ما شحنت أكتر، كسبت أكتر." }
  },
  {
    id: "q9",
    en: { q: "What games are supported?", a: "We support PUBG, Free Fire, Call of Duty, Roblox, and many more popular games." },
    ar: { q: "ما هي الألعاب المتاحة حالياً؟", a: "ندعم ببجي، فري فاير، كول أوف ديوتي، روبلوكس، والعديد من الألعاب المشهورة الأخرى." }
  },
  {
    id: "q10",
    en: { q: "Do you sell Gift Cards?", a: "Yes, we provide Google Play, iTunes, and PlayStation cards at competitive prices." },
    ar: { q: "هل تبيعون بطاقات جوجل بلاي أو آيتونز؟", a: "نعم، نوفر بطاقات جوجل بلاي، آيتونز، وبلايستيشن بأسعار منافسة جداً." }
  },
  {
    id: "q11",
    en: { q: "What if shipping takes more than 15 mins?", a: "Rarely happens, but if it does, contact us and you'll get a compensation gift with your order!" },
    ar: { q: "ماذا لو تأخر الشحن عن 15 دقيقة؟", a: "نادراً ما يحدث ذلك، لكن إذا حدث، تواصل معنا وستحصل على هدية ترضية فورية مع طلبك!" }
  },
  {
    id: "q12",
    en: { q: "How to talk to a human?", a: "Click the button below to be redirected directly to our agent's WhatsApp chat." },
    ar: { q: "أريد التحدث مع موظف خدمة عملاء مباشرة.", a: "اضغط على الزر أدناه ليتم تحويلك مباشرة لمحادثة الوكيل عبر الواتساب." }
  },
  {
    id: "q13",
    en: { q: "Will I get a payment proof?", a: "Definitely! After every transaction, we send you an official screenshot from the recharging system." },
    ar: { q: "هل أحصل على إثبات لعملية الدفع؟", a: "بالتأكيد! بعد كل عملية، نرسل لك سكرين شوت رسمية من نظام الشحن لتأكيد العملية." }
  },
  {
    id: "q14",
    en: { q: "Do you have a Telegram community?", a: "Yes! Join over 50,000 players in AL LORD official channel for the latest offers." },
    ar: { q: "هل لديكم قناة تليجرام للعروض؟", a: "نعم! انضم لأكثر من 50 ألف لاعب في قناة اللورد الرسمية لتصلك أحدث العروض والمسابقات." }
  },
  {
    id: "q_community_how",
    en: { q: "How to post in the community?", a: "To post an account or item for sale, go to the Community page and click 'Submit Post'. Fill in the details and add pictures. All posts are reviewed by admins within 30 minutes before appearing to the public." },
    ar: { q: "كيف أنشر إعلاني في المجتمع؟", a: "لبيع حسابك أو عرض خدماتك، اذهب لصفحة المجتمع واضغط على 'أضف عرضك'. املأ البيانات وأضف الصور. كل المنشورات تخضع لمراجعة الإدارة خلال 30 دقيقة قبل ظهورها للجميع لضمان الجودة." }
  },
  {
    id: "q_community_safe",
    en: { q: "Is community trading safe?", a: "Yes, provided you use our Middleman system. Never trade directly or share your phone number in descriptions. The Middleman (Admin) ensures that the account is transferred only after payment is secured." },
    ar: { q: "هل البيع والشراء في المجتمع آمن؟", a: "نعم، طالما أنك تستخدم 'نظام الوساطة' الخاص بنا. لا تتبادل البيانات الحساسة أو الأرقام في الوصف. الوسيط (الأدمن) يتدخل لضمان استلامك للمبلغ وتسليم العميل للحساب بأمان." }
  },
  {
    id: "q_community_middleman",
    en: { q: "Who is the Middleman?", a: "The Middleman is an official AL LORD admin who supervises the trade between two users. This service is provided to prevent scams and ensure both parties are satisfied." },
    ar: { q: "من هو الوسيط (Middleman)؟", a: "الوسيط هو مسؤول رسمي من متجر اللورد يقوم بالإشراف على عملية البيع بين الطرفين. هذه الخدمة تضمن عدم تعرضك للنصب، حيث يتم استلام البيانات والأموال وتوزيعها بالعدل." }
  },
  {
    id: "q_community_forbidden",
    en: { q: "What is forbidden in the community?", a: "It is strictly forbidden to post external links, phone numbers, or any content that violates game terms. Any post containing personal contact info in the description will be automatically rejected." },
    ar: { q: "ما هي الأشياء الممنوعة في المجتمع؟", a: "ممنوع تماماً وضع روابط خارجية، أرقام هواتف، أو أي محتوى مخالف لسياسات الألعاب. أي منشور يحتوي على بيانات اتصال شخصية في الوصف سيتم رفضه تلقائياً لحمايتكم من الاختراقات." }
  },
  {
    id: "q_complaint_start",
    en: { q: "Report Issue / Complaint", a: "We are sorry to hear you're having trouble. You can file a formal complaint or reach out to us on WhatsApp." },
    ar: { q: "تقديم شكوى أو بلاغ", a: "نحن آسفون لسماع أنك تواجه مشكلة. يمكنك تقديم شكوى رسمية أو التواصل معنا عبر الواتساب." }
  },
  {
    id: "complaint_info",
    en: { q: "File Formal Complaint", a: "Please use our secure form to submit your complaint with image proof if necessary." },
    ar: { q: "تقديم شكوى رسمية", a: "يرجى استخدام نموذجنا الآمن لتقديم شكواك مع إرفاق صورة إثبات إذا لزم الأمر." }
  },
  {
    id: "q_admin_posts_how",
    en: { q: "How admin announcements work?", a: "Whenever an official update is announced by AL LORD admins, it will have an 'Official' badge. These posts may feature interactive action links allowing you to easily browse the mentioned offer!" },
    ar: { q: "كيف تعمل إعلانات وعروض الإدارة؟", a: "عندما ينشر أدمن متجر اللورد عرضاً أو تنبيهاً رسمياً، سيظهر عليه شارة مميزة (إعلان مسؤول). هذه المنشورات تحتوي أحياناً على زر تفاعلي ينقلك مباشرة لتصفح العرض المذكور بضغطة واحدة!" }
  },
  {
    id: "q_community_hidden_contact",
    en: { q: "How to add my contact info safely?", a: "When adding a new post in the community to sell an account, use the 'Secret Contact (Admin Only)' field to put your WhatsApp or FB link. This ensures ONLY the Lord Team can see your private info, protecting you from scammers while allowing us to contact you." },
    ar: { q: "كيف أضيف رقم تواصلي في المجتمع بأمان؟", a: "لحمايتك من المحتالين، وفرنا حقل 'بيانات تواصل (للإدارة فقط)' عند نشر إعلانك في المجتمع. وضعك لرقمك أو رابط تواصلك في هذا الحقل يضمن أن طاقم اللورد فقط هو من يراه ويمكنه التواصل معك بشكل خاص لتأمين العملية بأعلى درجات الأمان." }
  }
];

export function FaqChatWidget() {
  const { lang, t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userData } = useLogin();
  const { settings } = useSettings();

  const isWidgetHidden = location.pathname === '/profile';
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFaqTooltip, setShowFaqTooltip] = useState(false);
  const [showCommunityTooltip, setShowCommunityTooltip] = useState(false);
  const [isTrackingMode, setIsTrackingMode] = useState(false);
  const [orderNumberInput, setOrderNumberInput] = useState("");
  
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const questionsScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New States for Upload
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentOrderTracking, setCurrentOrderTracking] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Listen for open-faq events from other components
  useEffect(() => {
    const handleOpenFaq = (e: any) => {
      const topic = e.detail?.topic;
      setIsOpen(true);
      if (topic === "payment") {
        setTimeout(() => handleQuestionSelect("q_payment"), 500);
      }
    };

    window.addEventListener("open-faq", handleOpenFaq);
    return () => window.removeEventListener("open-faq", handleOpenFaq);
  }, [lang]);

  // Tooltip cycle for FAQ Assistant
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFaqTooltip(true);
      setTimeout(() => setShowFaqTooltip(false), 4000); // hide after 4s
    }, 12000); // trigger every 12s
    
    // Initial pop
    setTimeout(() => setShowFaqTooltip(true), 1500);
    setTimeout(() => setShowFaqTooltip(false), 5500);
    
    return () => clearInterval(interval);
  }, []);

  // Tooltip cycle for Community Button
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCommunityTooltip(true);
      setTimeout(() => setShowCommunityTooltip(false), 4000); // hide after 4s
    }, 16000); // trigger every 16s

    // Initial pop (staggered from FAQ so they don't overlap as heavily)
    setTimeout(() => setShowCommunityTooltip(true), 7000);
    setTimeout(() => setShowCommunityTooltip(false), 11000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessages([
      {
        id: "m_welcome",
        sender: "bot",
        text: t("Hello 👋 How can I help you?", "أهلاً بك 👋 كيف يمكنني مساعدتك؟"),
        actions: [
          ...(isLoggedIn ? [{
            label: lang === "en" ? "View My Profile 👤" : "عرض ملفي الشخصي 👤",
            faqId: "go_profile",
            className: "pulse-gold"
          }] : []),
          {
            label: lang === "en" ? "Report Issue / Complaint 🚫" : "تقديم شكوى أو بلاغ 🚫",
            faqId: "q_complaint_start"
          }
        ]
      }
    ]);
  }, [lang, t, isLoggedIn]); 

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleQuestionSelect = (faqId: string) => {
    if (faqId === "track") {
      setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "Order not received / Refund" : "استفسار: لم يصلني الطلب" }]);
      setIsKeyboardOpen(false);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: `m_b_${Date.now()}`, sender: "bot", text: lang === "en" ? "Please enter your Order Number below to check the status:" : "يرجى كتابة رقم الطلب أدناه للتحقق من الحالة:" }]);
        setIsTrackingMode(true);
      }, 1200);
      return;
    }

    if (faqId === "history") {
      setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "Show my history" : "اعرضلي السجل" }]);
      setIsKeyboardOpen(false);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const historyText = lang === "en" 
          ? "Here are your last 2 orders:\n\n1. [ORD-928102] 660 UC (PUBG) - Completed ✅\n2. [ORD-102931] 100 Diamond (Free Fire) - Completed ✅"
          : "إليك آخر طلبين قمت بهما:\n\n1. [ORD-928102] 660 UC (ببجي) - مكتمل ✅\n2. [ORD-102931] 100 جوهرة (فري فاير) - مكتمل ✅";
        setMessages(prev => [...prev, { id: `m_b_${Date.now()}`, sender: "bot", text: historyText }]);
      }, 1200);
      return;
    }

    const faq = FAQ_DATA.find(f => f.id === faqId);
    if (!faq) return;

    const questionText = lang === "en" ? faq.en.q : faq.ar.q;
    const answerText = lang === "en" ? faq.en.a : faq.ar.a;

    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: questionText }]);
    setIsKeyboardOpen(false); // Close keyboard after selection
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let actions: Message["actions"] = undefined;

      if (faqId === "q_payment") {
        actions = [{
          label: lang === "en" ? "Contact Support on WhatsApp 🟢" : "تواصل مع الوكيل لتوفير طريقتك 🟢",
          url: `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(lang === "en" ? "I didn't find my payment method, what to do?" : "لم أجد طريقة دفع مناسبة لي، أريد شحن عبر طريقة أخرى")}`,
          icon: "whatsapp"
        }];
      } else if (faqId === "q_how_to_pay") {
        actions = [{
          label: lang === "en" ? "Start Paying Now 🟢" : "ابدأ الدفع الآن 🟢",
          url: `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("مرحباً، أريد البدء في عملية الدفع وتأكيد طلبي")}`,
          icon: "whatsapp"
        }];
      } else if (faqId === "q9") {
        actions = [{
          label: lang === "en" ? "Browse All Games 🎮" : "عرض كل الألعاب 🎮",
          url: "/games",
          className: "pulse-gold"
        }];
      } else if (faqId === "q0") {
        actions = [{
          label: lang === "en" ? "Learn More about Lord 👑" : "تعرف على اللورد عن قرب 👑",
          faqId: "lord_profile"
        }];
      } else if (faqId === "community_rules") {
        actions = [{
          label: lang === "en" ? "Go to Community 🚀" : "انتقل لصفحة المجتمع 🚀",
          url: "/community"
        }];
      } else if (faqId === "q5") {
        actions = [
          {
            label: lang === "en" ? "Shipment Received ✅" : "الشحنة وصلتني بالفعل ✅",
            faqId: "refund_received"
          },
          {
            label: lang === "en" ? "Shipment NOT Received 📦" : "الشحنة لم تصلني بعد 📦",
            faqId: "refund_not_received"
          }
        ];
      } else if (faqId === "q3") {
        actions = [{
          label: lang === "en" ? "Track Recent Shipments 📦" : "تفقد شحناتي الأخيرة 📦",
          faqId: "history_detailed"
        }];
      } else if (faqId === "q4") {
        actions = [{
          label: lang === "en" ? "Check Security Level 🛡️" : "كم نسبة أمانكم؟ 🛡️",
          faqId: "show_security_cert"
        }];
      } else if (faqId === "q7") {
        actions = [{
          label: lang === "en" ? "Fix My ID Now 🟢" : "تعديل الـ ID الآن 🟢",
          url: `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("أخطأت في كتابة الـ ID الخاص بطلبي، أريد تعديله")}`,
          icon: "whatsapp"
        }];
      } else if (faqId === "q12") {
        actions = [{
          label: lang === "en" ? "Chat with Agent 🎧" : "تحدث مع الوكيل الآن 🎧",
          url: `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("مرحباً، أريد التحدث مع خدمة العملاء بخصوص استفسار خاص")}`,
          icon: "whatsapp"
        }];
      } else if (faqId === "q14") {
        actions = [{
          label: lang === "en" ? "Join Telegram Channel 📢" : "انضم لقناة التليجرام 📢",
          url: "https://t.me/AL_LORD_STORE",
          icon: "telegram"
        }];
      } else if (faqId === "q_community_how") {
        actions = [{
          label: lang === "en" ? "Go to Community 🚀" : "انتقل لصفحة المجتمع 🚀",
          url: "/community",
          className: "pulse-gold"
        }];
      } else if (faqId === "q_community_safe") {
        actions = [{
          label: lang === "en" ? "Read Safety Rules 🛡️" : "اقرأ ميثاق الأمان 🛡️",
          faqId: "community_rules"
        }];
      } else if (faqId === "q_community_middleman") {
        actions = [{
          label: lang === "en" ? "Request Middleman Now 🟢" : "اطلب وسيط الآن 🟢",
          url: `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("مرحباً، أريد طلب خدمة الوسيط لإتمام عملية بيع/شراء حساب")}`,
          icon: "whatsapp"
        }];
      } else if (faqId === "q_community_forbidden") {
        actions = [{
          label: lang === "en" ? "Community Rules 📜" : "قواعد المجتمع 📜",
          faqId: "community_rules"
        }];
      } else if (faqId === "q_complaint_start") {
        actions = [
          {
            label: lang === "en" ? "File Formal Complaint 📄" : "تقديم شكوى رسمية 📄",
            faqId: "complaint_info"
          },
          {
            label: lang === "en" ? "Report Problem on WhatsApp 🟢" : "إبلاغ عن مشكلة واتساب 🟢",
            url: `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("أريد تقديم شكوى بخصوص معاملة أو مشكلة فنية")}`,
            icon: "whatsapp"
          }
        ];
      } else if (faqId === "q_admin_posts_how") {
         actions = [{
           label: lang === "en" ? "Explore Community 🚀" : "استكشف إعلانات الإدارة 🚀",
           url: "/community",
           className: "pulse-gold"
         }];
      } else if (faqId === "q_community_hidden_contact") {
         actions = [{
           label: lang === "en" ? "Read Safety Rules 🛡️" : "اقرأ ميثاق الأمان 🛡️",
           faqId: "community_rules"
         }];
      }

      setMessages(prev => [...prev, { 
        id: `m_b_${Date.now()}`, 
        sender: "bot", 
        text: answerText, 
        faqId: faq.id,
        actions,
        withAnimation: 
          faqId === "q3" || faqId === "q6" ? "clock" : 
          faqId === "q0" || faqId === "q8" ? "sparkles" : 
          faqId === "q4" || faqId === "q_community_safe" || faqId === "q_community_hidden_contact" ? "shield" : 
          faqId === "q7" || faqId === "q11" ? "zap" :
          faqId === "q12" ? "headset" :
          faqId === "q13" || faqId === "q_admin_posts_how" ? "fileText" :
          faqId === "q14" ? "users" :
          faqId === "q15" ? "smartphone" :
          faqId === "q10" ? "creditCard" :
          undefined
      }]);
    }, 1200);
  };

  const handleSecurityCert = () => {
    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "Security Verification" : "توثيق الأمان" }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: `m_b_${Date.now()}`, 
        sender: "bot", 
        text: lang === "en" 
          ? "Our store follows global security standards. 100% Secure & Verified." 
          : "متجرنا يتبع معايير الأمان العالمية. نظام مشفر وموثق بنسبة 100%.",
        type: "security-cert"
      }]);
    }, 1200);
  };

  const handleRefundReceived = () => {
    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "I received it, can I refund?" : "وصلتني الشحنة، هل يمكنني الاسترجاع؟" }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: `m_b_${Date.now()}`, 
        sender: "bot", 
        text: lang === "en" 
          ? "We apologize.. according to store policy, orders cannot be reversed after the credits have reached your account." 
          : "نأسف جداً.. حسب سياسة المتجر، لا يمكن التراجع عن الطلب بعد وصول الرصيد لحسابك بالفعل.",
        withAnimation: "frown"
      }]);
    }, 1200);
  };

  const handleRefundNotReceived = () => {
    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "I didn't receive it yet" : "لم تصلني الشحنة بعد" }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: `m_b_${Date.now()}`, 
        sender: "bot", 
        text: lang === "en" 
          ? "Don't worry at all! As long as the order hasn't been executed, your right is reserved. Contact us now and we will refund you immediately." 
          : "لا تقلق أبداً! طالما لم يتم تنفيذ الطلب، حقك محفوظ. تواصل معنا الآن وسنقوم بحل المشكلة أو استرجاع المبلغ فوراً.",
        withAnimation: "heart",
        actions: [{
          label: lang === "en" ? "Contact Support Now 🟢" : "تواصل مع الدعم الفني الآن 🟢",
          url: `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("أريد استرجاع مبلغ طلبي لأن الشحنة لم تصل بعد")}`,
          icon: "whatsapp"
        }]
      }]);
    }, 1200);
  };

  const handleLordProfile = () => {
    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "Who is AL LORD?" : "من هو اللورد؟" }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: `m_b_${Date.now()}`, 
        sender: "bot", 
        text: lang === "en" 
          ? "The Lord is a brand built on trust, speed, and a passion for gaming. Our mission is to provide the best service for every player in the Middle East." 
          : "اللورد ليس مجرد متجر، بل هو علامة تجارية بنيت على الثقة، السرعة، وشغف الألعاب. مهمتنا هي تقديم أفضل خدمة لكل لاعب في الشرق الأوسط.",
        type: "lord-profile"
      }]);
    }, 1200);
  };

  const handleCommunityRules = () => {
    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "What are the rules?" : "ما هي القواعد؟" }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: `m_b_${Date.now()}`, 
        sender: "bot", 
        text: lang === "en" 
          ? "Community Rules:\n1. No links or phone numbers.\n2. Use Middleman for safety.\n3. Be respectful.\nFailure to follow leads to a permanent ban! 🛡️" 
          : "قواعد المجتمع:\n1. يمنع منعا باتا وضع روابط أو أرقام هواتف.\n2. استخدم نظام الوساطة لضمان حقك.\n3. الاحترام المتبادل شرط أساسي.\nمخالفة القوانين تعرضك للحظر النهائي! 🛡️",
        withAnimation: "shield"
      }]);
    }, 1000);
  };

  const handleDetailedHistory = () => {
    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: lang === "en" ? "Track my shipments" : "تفقد شحناتي" }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: `m_b_${Date.now()}`, 
        sender: "bot", 
        text: lang === "en" ? "Here is the status of your last 3 shipments:" : "إليك حالة آخر 3 شحنات قمت بها:",
        type: "status-card"
      }]);
    }, 1200);
  };

  const handleTrackSubmit = () => {
    if (!orderNumberInput.trim()) return;
    const submittedOrder = orderNumberInput.trim().toUpperCase();
    setMessages(prev => [...prev, { id: `m_u_${Date.now()}`, sender: "user", text: submittedOrder }]);
    setCurrentOrderTracking(submittedOrder);
    setOrderNumberInput("");
    setIsTrackingMode(false);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: `m_b_${Date.now()}`, sender: "bot", text: lang === "en" ? "To verify your request, please upload a screenshot of the transfer/payment proof." : "لتأكيد طلبك، يرجى رفع صورة (سكرين شوت) لإثبات عملية التحويل/الدفع." }]);
      
      // Delay opening modal for better UX
      setTimeout(() => setIsUploadModalOpen(true), 800);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    
    // Simulating upload time
    setTimeout(() => {
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setIsTyping(true);
      
      // Bot's refined response
      setTimeout(() => {
        setIsTyping(false);
        const finalMsg = lang === "en"
          ? "Screenshot received! AL LORD will manually verify your request. If the order has not arrived, your money will be returned to the same number within 24 hours (usually 4-5 hours maximum)."
          : "تم استلام الصورة بنجاح! سيقوم (اللورد) بالتأكد من الطلب يدوياً. في حالة التأكد من عدم وصول الطلب، سيتم إرجاع المبلغ لنفس الرقم الذي تم الاستلام عليه خلال 24 ساعة (غالباً خلال 4-5 ساعات كحد أقصى).";
        
        setMessages(prev => [...prev, { id: `m_b_${Date.now()}`, sender: "bot", text: finalMsg }]);
        setSelectedFile(null);
      }, 1500);
    }, 2000);
  };

  const scrollChat = (offset: number) => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  const scrollQs = (offset: number) => {
    if (questionsScrollRef.current) {
      questionsScrollRef.current.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Community Tooltip Bubble */}
      {location.pathname === '/' && !isWidgetHidden && (
        <div 
          className={`fixed bottom-[5.5rem] md:bottom-[6.5rem] ${lang === "ar" ? "left-[4.5rem] md:left-[5.5rem] origin-bottom-left" : "right-[4.5rem] md:right-[5.5rem] origin-bottom-right"} z-[89] transition-all duration-500 flex items-center justify-center bg-black border-4 border-[var(--c-ink)] text-xs font-black px-3 py-2 uppercase shadow-[4px_4px_0px_var(--c-lime)] text-[var(--c-lime)] ${showCommunityTooltip ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2 pointer-events-none'}`}
        >
          {t("New Post / Status! 🔥", "حالة أو منشور جديد! 🔥")}
          <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-[var(--c-ink)] rotate-45 ${lang === "ar" ? "-left-[8px] border-b-4 border-l-4" : "-right-[8px] border-t-4 border-r-4"}`} />
        </div>
      )}

      {/* Community Floating Button */}
      {location.pathname === '/' && !isWidgetHidden && (
        <button
          onClick={() => navigate("/community")}
          className={`fixed bottom-[5rem] md:bottom-[6rem] ${lang === "ar" ? "left-5 md:left-7" : "right-5 md:right-7"} z-[89] w-10 h-10 md:w-12 md:h-12 bg-white text-[var(--c-ink)] rounded-full flex items-center justify-center border-4 border-[var(--c-ink)] hover:scale-110 hover:-translate-y-2 hover:bg-black hover:text-[var(--c-lime)] transition-all shadow-[4px_4px_0px_#000] cursor-pointer ${isOpen ? 'translate-y-8 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
        >
          <Users className="w-4 h-4 md:w-5 md:h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-black animate-bounce shadow-[2px_2px_0px_#000]" />
        </button>
      )}

      {/* FAQ Tooltip Bubble */}
      {!isOpen && !isWidgetHidden && location.pathname === '/' && (
        <div 
          className={`fixed bottom-[2rem] ${lang === "ar" ? "left-[5rem] origin-bottom-left" : "right-[5rem] origin-bottom-right"} z-[90] transition-all duration-500 flex items-center justify-center bg-white border-4 border-[var(--c-ink)] text-xs font-black px-3 py-2 uppercase shadow-[4px_4px_0px_var(--c-purple)] text-[var(--c-ink)] ${showFaqTooltip ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2 pointer-events-none'}`}
        >
          {t("FAQs & Help", "الأسئلة الشائعة")}
          <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-[var(--c-ink)] rotate-45 ${lang === "ar" ? "-left-[8px] border-b-4 border-l-4" : "-right-[8px] border-t-4 border-r-4"}`} />
        </div>
      )}

      {/* FAQ Floating Button */}
      {!isWidgetHidden && location.pathname === '/' && (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 md:bottom-6 ${lang === "ar" ? "left-4 md:left-6" : "right-4 md:right-6"} z-[90] w-12 h-12 md:w-14 md:h-14 bg-[var(--c-orange)] text-[var(--c-ink)] rounded-full flex items-center justify-center border-4 border-[var(--c-ink)] hover:scale-110 hover:-translate-y-2 hover:bg-[var(--c-lime)] transition-all shadow-[4px_4px_0px_#000] cursor-pointer ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageSquareText className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      )}

      {/* Chat Box Modal */}
      {isOpen && (
        <div 
          className={`fixed bottom-0 left-0 right-0 z-[100] w-full h-[75vh] md:w-[350px] md:h-[550px] md:bottom-6 ${lang === "ar" ? "md:left-6 md:right-auto" : "md:right-6 md:left-auto"} flex flex-col bg-[var(--c-bg)] border-t-4 md:border-4 border-[var(--c-ink)] md:shadow-[8px_8px_0px_var(--c-ink)] shadow-[0px_-4px_0px_var(--c-ink)] md:shadow-none animate-in slide-in-from-bottom-5`}
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between p-4 border-b-4 border-[var(--c-ink)] bg-[var(--c-lime)] relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--c-ink)] rounded-full flex items-center justify-center text-[var(--c-bg)] overflow-hidden border-2 border-[var(--c-ink)]">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black uppercase leading-tight text-sm">AL LORD SUPPORT</h4>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase opacity-80">{t("Online", "متصل")}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-[var(--c-ink)] hover:text-[var(--c-lime)] transition-colors border-2 border-transparent hover:border-[var(--c-ink)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area Container */}
          <div className="relative flex-1 bg-black/5 overflow-hidden" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
            <div ref={chatScrollRef} className="absolute inset-0 overflow-y-auto p-4 space-y-4 pb-16 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                   <div 
                    className={`max-w-[85%] p-3 text-sm font-bold border-2 border-[var(--c-ink)] ${
                      msg.sender === "user" 
                        ? "bg-[var(--c-ink)] text-[var(--c-bg)]" 
                        : "bg-white text-[var(--c-ink)] shadow-[3px_3px_0px_rgba(0,0,0,0.2)]"
                    }`}
                    style={{ borderRadius: msg.sender === "user" ? (lang === "ar" ? "12px 0 12px 12px" : "12px 12px 0 12px") : (lang === "ar" ? "0 12px 12px 12px" : "12px 12px 12px 0") }}
                  >
                    <div className="whitespace-pre-wrap flex items-start gap-2">
                      {msg.withAnimation === "clock" && <Clock className="w-4 h-4 mt-0.5 animate-spin-slow shrink-0 text-[var(--c-purple)]" />}
                      {msg.withAnimation === "sparkles" && <Sparkles className="w-4 h-4 mt-0.5 animate-pulse-gold shrink-0 text-yellow-500" />}
                      {msg.withAnimation === "shield" && <ShieldCheck className="w-4 h-4 mt-0.5 animate-pulse shrink-0 text-[var(--c-lime)]" />}
                      {msg.withAnimation === "frown" && <Frown className="w-4 h-4 mt-0.5 animate-shake shrink-0 text-red-500" />}
                      {msg.withAnimation === "heart" && <Heart className="w-4 h-4 mt-0.5 animate-pulse shrink-0 text-pink-500 fill-pink-500/20" />}
                      {msg.withAnimation === "zap" && <Zap className="w-4 h-4 mt-0.5 animate-bounce-short shrink-0 text-yellow-400" />}
                      {msg.withAnimation === "headset" && <Headset className="w-4 h-4 mt-0.5 animate-pulse shrink-0 text-[var(--c-purple)]" />}
                      {msg.withAnimation === "fileText" && <FileText className="w-4 h-4 mt-0.5 animate-pulse shrink-0 text-blue-400" />}
                      {msg.withAnimation === "users" && <Users className="w-4 h-4 mt-0.5 animate-pulse shrink-0 text-cyan-400" />}
                      {msg.withAnimation === "smartphone" && <Smartphone className="w-4 h-4 mt-0.5 animate-bounce-short shrink-0 text-green-400" />}
                      {msg.withAnimation === "creditCard" && <CreditCard className="w-4 h-4 mt-0.5 animate-pulse shrink-0 text-orange-400" />}
                      {msg.text}
                    </div>

                    {msg.faqId === "complaint_info" && (
                       <div className="mt-4 p-4 border-4 border-black bg-[#ff5e00] text-black shadow-[4px_4px_0px_#000]">
                          <h5 className="font-black uppercase text-xs mb-2">{t("Formal Complaint System", "نظام الشكاوى الرسمي")}</h5>
                          <p className="text-[10px] font-bold leading-relaxed mb-4">
                            {t("To file a formal complaint regarding an order or a user, please click the button below to open the secure form.", "تقديم شكوى رسمية بخصوص طلب أو مستخدم، يرجى الضغط على الزر أدناه لفتح النموذج الآمن.")}
                          </p>
                          <button 
                            onClick={() => setIsComplaintModalOpen(true)}
                            className="w-full bg-black text-white py-2 text-[10px] font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all shadow-[2px_2px_0px_#ccff00]"
                          >
                            {t("Open Form 📄", "فتح النموذج 📄")}
                          </button>
                       </div>
                    )}

                    {msg.type === "security-cert" && (
                       <div className="mt-4 p-4 border-4 border-[var(--c-ink)] bg-white shadow-[6px_6px_0px_var(--c-lime)] relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-1 bg-[var(--c-lime)] text-[var(--c-ink)]">
                            <Lock className="w-3 h-3" />
                         </div>
                         <div className="text-center mb-4">
                            <div className="inline-flex p-2 bg-[var(--c-lime)]/10 rounded-full mb-2">
                               <Shield className="w-8 h-8 text-[var(--c-lime)]" />
                            </div>
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">{t("SECURITY CERTIFICATE", "شهادة أمان معتمدة")}</h5>
                         </div>
                         <div className="space-y-2 border-y-2 border-[var(--c-ink)]/10 py-3 mb-3">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase">
                               <span className="opacity-40">{t("Status", "الحالة")}</span>
                               <span className="text-[var(--c-lime)]">{t("100% SECURE", "آمن 100%")}</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase">
                               <span className="opacity-40">{t("Verified By", "موثق بواسطة")}</span>
                               <span>AL LORD OFFICIAL</span>
                            </div>
                         </div>
                         <div className="flex justify-center">
                            <div className="w-12 h-12 border-4 border-[var(--c-ink)] rounded-full flex items-center justify-center -rotate-12 bg-white">
                               <Crown className="w-6 h-6 text-yellow-500" />
                            </div>
                         </div>
                         <p className="text-[8px] font-bold text-center mt-3 opacity-40 uppercase tracking-widest">{t("Trusted Provider Since 2021", "مزود موثوق منذ 2021")}</p>
                       </div>
                    )}

                    {msg.type === "lord-profile" && (
                       <div className="mt-4 p-4 border-4 border-double border-yellow-500 bg-gradient-to-br from-white to-yellow-50/50 shadow-[4px_4px_0px_var(--c-ink)]">
                         <div className="flex items-center gap-3 mb-3 border-b-2 border-yellow-500/20 pb-2">
                            <div className="w-10 h-10 bg-[var(--c-ink)] rounded-full flex items-center justify-center text-yellow-500 shadow-[2px_2px_0px_#000]">
                               <Crown className="w-6 h-6" />
                            </div>
                            <div>
                               <h5 className="text-xs font-black uppercase tracking-tighter">AL LORD OFFICIAL</h5>
                               <p className="text-[10px] font-bold opacity-60 uppercase">{t("Verified Brand", "علامة موثقة")}</p>
                            </div>
                         </div>
                         <p className="text-[11px] font-black leading-relaxed italic text-[var(--c-ink)]">
                            "{lang === "en" ? "Speed is our game, and trust is our treasure. Join our community of elite gamers." : "السرعة هي لعبتنا، والثقة هي كنزنا. انضم لمجتمعنا من نخبة اللاعبين."}"
                         </p>
                         <div className="mt-3 flex justify-end">
                            <span className="text-[8px] font-black uppercase bg-yellow-500 text-black px-2 py-0.5">{t("SINCE 2021", "منذ 2021")}</span>
                         </div>
                       </div>
                    )}

                    {msg.type === "status-card" && (
                      <div className="mt-4 space-y-3">
                        {[
                          { id: "ORD-928102", title: "660 UC", status: "completed", time: "7m", date: "Today" },
                          { id: "ORD-102931", title: "100 Diamond", status: "pending", est: "5-10m", date: "Today" },
                          { id: "ORD-882712", title: "1000 Gold", status: "issue", msg: lang === "en" ? "ID incorrect" : "الـ ID غير صحيح", date: "Yesterday" }
                        ].map((item) => (
                          <div key={item.id} className="bg-black/5 border-2 border-[var(--c-ink)] p-2 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-[9px] font-black opacity-40">{item.id}</span>
                              <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 border border-[var(--c-ink)] ${
                                item.status === "completed" ? "bg-[var(--c-lime)]" : 
                                item.status === "pending" ? "bg-[var(--c-orange)] animate-pulse" : "bg-red-400"
                              }`}>
                                {item.status === "completed" ? t("Completed", "مكتمل") : 
                                 item.status === "pending" ? t("Pending", "جاري الشحن") : t("Issue", "مشكلة")}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black">{item.title}</span>
                              <div className="flex items-center gap-1 opacity-60">
                                {item.status === "completed" ? <Timer className="w-3 h-3" /> : item.status === "pending" ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                <span className="text-[9px] font-bold">{item.time || item.est || item.msg}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.actions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.actions.map((act, i) => (
                          act.url ? (
                            <a 
                              key={i}
                              href={act.url}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 text-white p-2.5 border-2 border-[var(--c-ink)] shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] transition-all text-[10px] font-black uppercase ${
                                act.icon === "telegram" ? "bg-[#0088cc]" : act.icon === "whatsapp" ? "bg-[#25D366]" : "bg-[var(--c-orange)] text-[var(--c-ink)]"
                              } ${act.className || ""}`}
                            >
                               {act.icon === "whatsapp" && (
                                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                 </svg>
                               )}
                               {act.icon === "telegram" && (
                                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.41-1.42-.87.03-.24.38-.49 1.03-.73 4.03-1.75 6.71-2.91 8.05-3.47 3.82-1.58 4.61-1.85 5.13-1.86.11 0 .37.03.54.17.14.12.18.28.19.39.01.06.02.25.01.43z"/>
                                 </svg>
                               )}
                               {act.label}
                            </a>
                          ) : (
                            <button
                              key={i}
                              onClick={() => {
                                if (act.faqId === "history_detailed") {
                                  handleDetailedHistory();
                                } else if (act.faqId === "go_profile") {
                                  setIsOpen(false);
                                  navigate("/profile");
                                } else if (act.faqId === "lord_profile") {
                                  handleLordProfile();
                                } else if (act.faqId === "show_security_cert") {
                                  handleSecurityCert();
                                } else if (act.faqId === "refund_received") {
                                  handleRefundReceived();
                                } else if (act.faqId === "refund_not_received") {
                                  handleRefundNotReceived();
                                } else if (act.faqId === "community_rules") {
                                  handleCommunityRules();
                                } else {
                                  handleQuestionSelect(act.faqId!);
                                }
                              }}
                              className={`flex-1 min-w-[120px] flex items-center justify-center p-2.5 border-2 border-[var(--c-ink)] bg-[var(--c-orange)] text-[var(--c-ink)] shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] transition-all text-[10px] font-black uppercase cursor-pointer ${act.className || ""}`}
                            >
                              {act.label}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="max-w-[85%] p-3 border-2 border-[var(--c-ink)] bg-white text-[var(--c-ink)] shadow-[3px_3px_0px_rgba(0,0,0,0.2)]" style={{ borderRadius: lang === "ar" ? "0 12px 12px 12px" : "12px 12px 12px 0" }}>
                     <div className="flex gap-1 items-center h-4">
                       <span className="w-1.5 h-1.5 bg-[var(--c-ink)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                       <span className="w-1.5 h-1.5 bg-[var(--c-ink)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                       <span className="w-1.5 h-1.5 bg-[var(--c-ink)] rounded-full animate-bounce" />
                     </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Custom Chat Scroll Arrows */}
            <div className={`absolute bottom-4 ${lang === "ar" ? "left-2" : "right-2"} flex flex-col gap-1 z-10 opacity-70 hover:opacity-100 transition-opacity`}>
              <button 
                onClick={() => scrollChat(-100)} 
                className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
              >
                <ChevronUp className="w-6 h-6" />
              </button>
              <div className="flex-1 border-x-4 border-[var(--c-ink)]/20 mx-auto w-1 my-1"></div>
              <button 
                onClick={() => scrollChat(100)} 
                className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Keyboard / Options Area */}
          <div className="shrink-0 bg-white border-t-4 border-[var(--c-ink)] flex flex-col relative z-20" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
            
            {/* Action Bar */}
            <div className="p-3 flex items-center gap-2 border-b-2 border-transparent bg-white">
               
               {/* Real Chat (WhatsApp) Button */}
               <a 
                 href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("مرحباً اللورد، أحتاج مساعدة")}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="shrink-0 flex items-center justify-center bg-[#25D366] text-[var(--c-ink)] h-12 px-3 focus:outline-none border-2 border-[var(--c-ink)] shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0px_#000] transition-all font-black text-xs uppercase"
               >
                 {t("Chat Lord", "راسل اللورد")}
               </a>

               {/* Input / Questions toggle */}
               {isTrackingMode ? (
                 <div className="flex-1 flex items-center gap-2">
                   <input
                     type="text"
                     value={orderNumberInput}
                     onChange={(e) => setOrderNumberInput(e.target.value)}
                     placeholder={t("ORD-XXXXXX", "ORD-XXXXXX")}
                     className="flex-1 px-3 h-12 border-2 border-[var(--c-ink)] text-sm font-bold bg-[#eee] focus:outline-none focus:border-[var(--c-orange)] focus:bg-white transition-colors uppercase w-full"
                     autoFocus
                     onKeyDown={(e) => {
                       if (e.key === 'Enter') handleTrackSubmit();
                     }}
                   />
                   <button
                     onClick={handleTrackSubmit}
                     disabled={!orderNumberInput.trim() || isTyping}
                     className="h-12 px-4 shrink-0 bg-[var(--c-ink)] text-white hover:bg-[var(--c-orange)] hover:text-[var(--c-ink)] font-black uppercase text-xs transition-colors border-2 border-[var(--c-ink)] disabled:opacity-50"
                   >
                     {t("Send", "إرسال")}
                   </button>
                 </div>
               ) : (
                 <div 
                   className="flex-1 flex items-center gap-2 cursor-pointer group"
                   onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
                 >
                   <div className="flex-1 px-3 h-12 border-2 border-[var(--c-ink)] text-sm font-bold bg-[var(--c-bg)] group-hover:bg-[var(--c-lime)]/20 flex items-center shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden transition-colors">
                     <span className="opacity-60 whitespace-nowrap animate-pulse text-xs">
                       {isKeyboardOpen ? t("Choose a question...", "اختر سؤالاً للاستمرار...") : t("Tap to start typing...", "المس للكتابة...")}
                     </span>
                     {!isKeyboardOpen && <span className="ml-1 w-1.5 h-4 bg-[var(--c-ink)] animate-pulse inline-block" />}
                   </div>
                   <button 
                     className={`w-12 h-12 shrink-0 flex items-center justify-center border-2 border-[var(--c-ink)] bg-[var(--c-ink)] text-white group-hover:bg-[var(--c-orange)] group-hover:text-black transition-all duration-300 shadow-[2px_2px_0px_#000]`}
                   >
                      <ChevronUp className={`w-5 h-5 transition-transform duration-300 ${isKeyboardOpen ? "rotate-180" : ""}`} />
                   </button>
                 </div>
               )}
            </div>

            {/* Expandable Keyboard Panel */}
            <div 
               className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[var(--c-ink)] ${isKeyboardOpen ? "h-[220px]" : "h-0"}`}
            >
              <div className="relative h-full p-3 pt-4">
                 <div ref={questionsScrollRef} className={`absolute top-4 bottom-4 left-3 right-14 overflow-y-auto space-y-2 scroll-smooth px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${lang === "ar" ? "right-3 left-14" : ""}`}>
                      {isLoggedIn && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            navigate("/profile");
                          }}
                          className="w-full text-right bg-[var(--c-lime)] border-2 border-[var(--c-ink)] p-3 text-xs font-black uppercase transition-all hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000]"
                        >
                          <div className="flex items-center gap-2">
                            <UserCircle className="w-4 h-4" />
                            {lang === "en" ? "MY PROFILE (DASHBOARD)" : "ملفي الشخصي (لوحة التحكم)"}
                          </div>
                        </button>
                      )}
                      <button
                        onClick={() => handleQuestionSelect("track")}
                        disabled={isTyping}
                        className="w-full text-left bg-[var(--c-orange)]/10 border-2 border-[var(--c-orange)] text-[var(--c-orange)] p-3 text-xs font-black uppercase transition-all hover:-translate-y-1 hover:shadow-[3px_3px_0px_var(--c-orange)] hover:bg-[var(--c-orange)] hover:text-[var(--c-ink)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        style={{ textAlign: lang === "ar" ? "right" : "left" }}
                      >
                        {lang === "en" ? "Order not received / Refund 📦" : "استفسار: لم يصلني الطلب 📦"}
                      </button>
                      <button
                        onClick={() => handleQuestionSelect("history")}
                        disabled={isTyping}
                        className="w-full text-left bg-[var(--c-purple)]/10 border-2 border-[var(--c-purple)] text-[var(--c-purple)] p-3 text-xs font-black uppercase transition-all hover:-translate-y-1 hover:shadow-[3px_3px_0px_var(--c-purple)] hover:bg-[var(--c-purple)] hover:text-[var(--c-bg)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        style={{ textAlign: lang === "ar" ? "right" : "left" }}
                      >
                        {lang === "en" ? "Show my history 🕒" : "اعرضلي السجل 🕒"}
                      </button>
                   {FAQ_DATA.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => handleQuestionSelect(faq.id)}
                        disabled={isTyping}
                        className="w-full text-left bg-white border-2 border-[var(--c-ink)] p-3 text-xs font-black uppercase transition-all hover:-translate-y-1 hover:shadow-[3px_3px_0px_var(--c-orange)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        style={{ textAlign: lang === "ar" ? "right" : "left" }}
                      >
                        {lang === "en" ? faq.en.q : faq.ar.q}
                      </button>
                   ))}
                 </div>
                 
                 {/* Questions Panel Scroll Arrows */}
                 <div className={`absolute top-4 bottom-4 ${lang === "ar" ? "left-3" : "right-3"} w-10 flex flex-col justify-between`}>
                    <button 
                      onClick={() => scrollQs(-100)} 
                      className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
                    >
                      <ChevronUp className="w-6 h-6" />
                    </button>
                    <div className="flex-1 border-x-4 border-[var(--c-ink)]/20 mx-auto w-1 my-2"></div>
                    <button 
                      onClick={() => scrollQs(100)} 
                      className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
                    >
                      <ChevronDown className="w-6 h-6" />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Upload Screenshot Modal (Separate Window) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-[var(--c-bg)] border-4 border-[var(--c-ink)] shadow-[12px_12px_0px_var(--c-ink)] w-full max-w-md p-8 relative flex flex-col gap-6 scale-in-center">
              
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute -top-6 -right-6 w-12 h-12 bg-[var(--c-orange)] border-4 border-[var(--c-ink)] flex items-center justify-center shadow-[4px_4px_0px_#000] hover:scale-110 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[var(--c-ink)]">
                  {t("Upload Verification", "رفع إثبات التحويل")}
                </h3>
                <p className="text-sm font-bold opacity-70">
                  {t(`Order: ${currentOrderTracking}`, `رقم الطلب: ${currentOrderTracking}`)}
                </p>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-4 border-dashed border-[var(--c-ink)]/30 p-10 flex flex-col items-center justify-center gap-4 bg-black/5 hover:bg-[var(--c-lime)]/10 cursor-pointer transition-colors group relative overflow-hidden`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {selectedFile ? (
                   <div className="text-center">
                     <div className="w-16 h-16 bg-[var(--c-lime)] border-2 border-[var(--c-ink)] flex items-center justify-center mx-auto mb-2 shadow-[2px_2px_0px_#000]">
                       <ShieldCheck className="w-8 h-8" />
                     </div>
                     <p className="text-xs font-black uppercase truncate max-w-[200px]">{selectedFile.name}</p>
                     <button 
                       onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                       className="text-[10px] font-black uppercase text-red-500 mt-2 hover:underline"
                     >
                       {t("Remove", "حذف الملف")}
                     </button>
                   </div>
                ) : (
                  <>
                    <ChevronUp className="w-10 h-10 opacity-20 group-hover:opacity-100 group-hover:-translate-y-2 transition-all" />
                    <p className="text-center font-black uppercase text-xs tracking-widest leading-relaxed">
                      {t("Click to select screenshot", "اضغط هنا لاختيار صورة التحويل")}
                      <br/>
                      <span className="opacity-40 text-[10px]">{t("(JPG, PNG, WEBP)", "(صور فقط)")}</span>
                    </p>
                  </>
                )}

                {isUploading && (
                  <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-[var(--c-ink)] border-t-[var(--c-orange)] rounded-full animate-spin" />
                    <p className="font-black uppercase text-sm animate-pulse">{t("Uploading...", "جاري الرفع...")}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleUploadSubmit}
                disabled={!selectedFile || isUploading}
                className="w-full h-16 bg-[var(--c-ink)] text-[var(--c-bg)] font-black uppercase text-lg tracking-widest border-4 border-[var(--c-ink)] shadow-[6px_6px_0px_var(--c-orange)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center gap-3">
                  {t("SUBMIT FOR VERIFICATION", "إرسال للمراجعة")}
                  <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </span>
              </button>

              <p className="text-[10px] font-bold text-center opacity-40 uppercase">
                {t("Manual verification ensures your security.", "المراجعة اليدوية تضمن أمان عملية التحويل.")}
              </p>
           </div>
        </div>
      )}

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-bounce-short {
          animation: bounce-short 1s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-pulse-gold {
          animation: pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 0px #eab308); }
          50% { opacity: .8; transform: scale(1.1); filter: drop-shadow(0 0 8px #eab308); }
        }
        .scale-in-center {
          animation: scale-in-center 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
        }
        @keyframes scale-in-center {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <ComplaintModal 
        isOpen={isComplaintModalOpen} 
        onClose={() => setIsComplaintModalOpen(false)} 
      />
    </>
  );
}
