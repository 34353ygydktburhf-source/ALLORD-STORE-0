import React, { useState, useRef } from "react";
import { useLang } from "./LangContext";
import { useSettings } from "./SettingsContext";
import { Gamepad2, ShieldCheck, FileText, X, ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { BrutalFlag } from "./BrutalFlag";

const termsAr = [
  "1. يحق للموقع تعديل الأسعار والخدمات في أي وقت.",
  "2. يلتزم المستخدم بتقديم بيانات صحيحة (ID الحساب، اسم المستخدم).",
  "3. المتجر غير مسؤول عن أي أخطاء ناتجة عن إدخال بيانات خاطئة من قبل العميل.",
  "4. يتم تسليم الطلبات في الإطار الزمني الموضح لكل لعبة.",
  "5. حقوق العميل: يحق للعميل استرداد المبلغ في حال عدم تنفيذ الطلب خلال 24 ساعة."
];

const privacyAr = [
  "الخصوصية (Privacy Policy):",
  "1. يتم تشفير كافة البيانات ولا يتم مشاركتها مع أي طرف ثالث.",
  "2. تُستخدم بيانات الاتصال (مثل رقم الهاتف أو البريد الإلكتروني) للتواصل فقط بخصوص طلبك.",
  "3. يضمن الموقع سرية المعلومات المعطاة أثناء إتمام الدفع أو التواصل."
];

const termsEn = [
  "1. The site reserves the right to modify prices and services at any time.",
  "2. The user is committed to providing correct data (Account ID, Username).",
  "3. The store is not responsible for any errors from incorrect data input.",
  "4. Orders are delivered within the specified time frame.",
  "5. Return Policy: The customer has the right to a refund if not fulfilled within 24h."
];

const privacyEn = [
  "Privacy Policy:",
  "1. All data is encrypted and never shared with third parties.",
  "2. Contact data (Phone/Email) is only used for fulfilling your active order.",
  "3. The store guarantees the confidentiality of all payment and support information."
];

const LegalModal = ({ isOpen, onClose, title, content, rtl }: { isOpen: boolean, onClose: () => void, title: string, content: string[], rtl: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const scrollMap = (offset: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ top: offset, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-300">
        <div className="absolute inset-0 bg-[var(--c-orange)] translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]" />

        <div className="relative border-4 border-[var(--c-ink)] p-6 pr-14" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-ink)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 border-2 border-[var(--c-ink)] flex items-center justify-center hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)] transition-colors z-30">
            <X className="w-4 h-4" />
          </button>

          <div className="absolute top-16 bottom-4 right-2 w-10 flex flex-col gap-2 z-20">
            <button onClick={() => scrollMap(-100)} className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]">
              <ChevronUp className="w-6 h-6" />
            </button>
            <div className="flex-1 border-x-4 border-[var(--c-ink)]/20 mx-auto w-1 my-1" />
            <button onClick={() => scrollMap(100)} className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]">
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          <h3 className="text-2xl font-black uppercase mb-6 pr-8 border-b-4 border-[var(--c-ink)] pb-4 text-left" dir={rtl ? 'rtl' : 'ltr'}>{title}</h3>

          <div ref={scrollRef} className="max-h-[50vh] overflow-y-auto scroll-smooth touch-pan-y pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className={`space-y-4 ${rtl ? 'text-right' : 'text-left'}`} dir={rtl ? 'rtl' : 'ltr'}>
              {content.map((paragraph, idx) => (
                <p key={idx} className="font-bold text-sm leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Footer() {
  const { t, lang } = useLang();
  const { settings } = useSettings();

  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const isRtl = lang === "ar";

  return (
    <>
      <footer id="contact" className="relative pt-16 pb-8 px-6 md:px-12 bg-[var(--c-ink)] text-[var(--c-bg)] overflow-hidden border-t-8 border-[var(--c-orange)]">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 md:gap-8 justify-between">

          {/* Brand & CTA */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[var(--c-lime)] rounded-full flex items-center justify-center text-[var(--c-ink)] overflow-hidden border-2 border-[var(--c-bg)]">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-widest text-[var(--c-lime)] leading-none">
                AL LORD<br /><span className="text-[var(--c-bg)]">STORE</span>
              </h2>
            </div>
            <p className="text-sm opacity-80 mb-6 leading-relaxed max-w-sm font-bold">
              {t(
                "Your ultimate destination for secure, fast, and reliable game top-ups in Egypt and the Middle East.",
                "وجهتك الأولى لشراء جواهر وشدات وعملات الألعاب بأمان وسرعة وموثوقية في مصر والشرق الأوسط."
              )}
            </p>
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[var(--c-orange)] text-[var(--c-ink)] px-6 py-3 font-black uppercase text-sm border-2 border-[var(--c-bg)] hover:-translate-y-1 hover:bg-[var(--c-lime)] hover:shadow-[4px_4px_0px_var(--c-bg)] transition-all">
              {t("Contact Support", "تواصل مع الدعم")}
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:w-2/3 grid grid-cols-2 md:flex md:flex-wrap gap-8 md:gap-12 md:justify-end" dir={isRtl ? "rtl" : "ltr"}>
            <div className="md:w-auto">
              <h3 className="text-xl font-black uppercase mb-6 text-[var(--c-purple)]">{t("TOP GAMES", "أشهر الألعاب")}</h3>
              <ul className="space-y-3 text-sm font-bold opacity-80">
                <li><Link to="/game/pubg-mobile" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">PUBG Mobile</Link></li>
                <li><Link to="/game/free-fire" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">Free Fire</Link></li>
                <li><Link to="/game/roblox" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">Roblox</Link></li>
                <li><Link to="/game/efootball-pes-mobile" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">eFootball PES</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-auto">
              <h3 className="text-xl font-black uppercase mb-6 text-[var(--c-purple)]">{t("SUPPORT", "الدعم والمساعدة")}</h3>
              <ul className="space-y-3 text-sm font-bold opacity-80">
                <li><a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">WhatsApp</a></li>
                {settings.facebookLink && <li><a href={settings.facebookLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">Facebook Page</a></li>}
                {settings.instagramLink && <li><a href={settings.instagramLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">Instagram</a></li>}
                {settings.telegramLink && <li><a href={settings.telegramLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 block">Telegram</a></li>}
                <li><button onClick={() => setModalType("privacy")} className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 inline-flex items-center gap-2 mt-2 cursor-pointer"><ShieldCheck className="w-4 h-4" /> {t("Privacy Policy", "سياسة الخصوصية")}</button></li>
                <li><button onClick={() => setModalType("terms")} className="hover:text-[var(--c-lime)] transition-colors hover:translate-x-1 inline-flex items-center gap-2 cursor-pointer"><FileText className="w-4 h-4" /> {t("Terms", "الشروط والأحكام")}</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-6xl mx-auto relative z-10 mt-16 pt-12 border-t-2 border-[var(--c-bg)]/20 flex flex-col items-center">


          {/* Developer Credit Badge */}
          <div
            dir={isRtl ? "rtl" : "ltr"}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-[var(--c-bg)] text-[var(--c-ink)] py-5 px-6 border-4 border-[var(--c-ink)] shadow-[6px_6px_0px_var(--c-lime)] -mt-20 mb-10 w-full max-w-3xl relative z-20"
          >
            <div className="w-16 h-16 rounded-full border-4 border-[var(--c-ink)] flex items-center justify-center bg-white shrink-0 overflow-hidden shadow-[2px_2px_0px_var(--c-ink)] transition-transform hover:rotate-6">
              <img src="https://i.pinimg.com/736x/e6/5a/66/e65a669a75d9911df9a10f59d2a3aafb.jpg" alt="Abdullah Mustafa" className="w-full h-full object-cover" />
            </div>

            <div className={`text-center ${isRtl ? 'md:text-right' : 'md:text-left'} flex-1`}>
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">{t("Built withnpm  by", "صُنع بواسطة")}</p>
              <p className="text-xl font-black uppercase leading-none tracking-tight">Abdullah Mustafa</p>
            </div>

            <div className="hidden md:block w-1 h-12 border-l-4 border-dashed border-[var(--c-ink)]/20 mx-2" />

            <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
              {/* Profile Button */}
              <a
                href="https://34353ygydktburhf-source.github.io/Abdullah-Mustafa01/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center bg-white text-[var(--c-ink)] px-5 py-3 font-black uppercase text-xs border-2 border-[var(--c-ink)] shadow-[4px_4px_0px_var(--c-ink)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_var(--c-ink)] transition-all whitespace-nowrap"
              >
                {t("Dev Profile", "بروفايل المطور")}
              </a>

              {/* Contact Button */}
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=مرحباً، أريد التحدث مع مطور المتجر`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center bg-[#25D366] text-[var(--c-ink)] px-5 py-3 font-black uppercase text-xs border-2 border-[var(--c-ink)] shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_#000] transition-all whitespace-nowrap"
              >
                {t("Contact Dev", "تواصل مع المطور")}
              </a>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mt-4 mb-8 px-4 relative z-10">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-relaxed opacity-60">
              {t(
                "All rights reserved for Lord Store. This is an official website from Lord Store, licensed, and follows privacy policies.",
                "جميع الحقوق محفوظة لدى موقع Lord Store هذا الموقع رسمي من Lord Store ومرخص ويتبع سياسات الخصوصية"
              )}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-48 h-48 border-4 border-[var(--c-purple)] rounded-full opacity-10 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[var(--c-orange)] rotate-45 opacity-10 pointer-events-none" />
      </footer>

      {/* Modals outside footer layout context to prevent z-index issues */}
      <LegalModal
        isOpen={modalType === "privacy"}
        onClose={() => setModalType(null)}
        title={t("Privacy Policy", "سياسة الخصوصية")}
        content={isRtl ? privacyAr : privacyEn}
        rtl={isRtl}
      />

      <LegalModal
        isOpen={modalType === "terms"}
        onClose={() => setModalType(null)}
        title={t("Terms and Conditions", "الشروط والأحكام")}
        content={isRtl ? termsAr : termsEn}
        rtl={isRtl}
      />
    </>
  );
}
