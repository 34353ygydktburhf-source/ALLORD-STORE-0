import React from "react";
import { Star, Shield, Clock, CreditCard, Headphones, Truck } from "lucide-react";
import { DrawSVG } from "./DrawSVG";
import { useLang } from "./LangContext";

const DEV_IMG = "https://i.pinimg.com/736x/e6/5a/66/e65a669a75d9911df9a10f59d2a3aafb.jpg";

export function Manifesto() {
  const { t, lang } = useLang();

  const features = [
    { icon: <Star className="w-5 h-5" />, en: "Instant Game Top-Ups", ar: "شحن ألعاب فوري" },
    { icon: <Shield className="w-5 h-5" />, en: "Verified Accounts", ar: "حسابات موثقة" },
    { icon: <Clock className="w-5 h-5" />, en: "24/7 Fast Delivery", ar: "تسليم سريع 24/7" },
    { icon: <CreditCard className="w-5 h-5" />, en: "Secure Local Payments", ar: "دفع محلي آمن" },
  ];

  return (
    <section id="about" className="pt-16 pb-24 px-6 md:px-12 overflow-hidden bg-[var(--c-bg)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Store Brand Identity */}
        <div className="order-2 md:order-1">
          <div className="inline-block bg-[var(--c-lime)] border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-tighter mb-6 -rotate-2">
            {t("Since 2024", "منذ 2024")}
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-8 tracking-tighter">
            {t("WE FUEL", "نحن نشحن")}<br />
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--c-orange)]">{t("YOUR GAME", "حماسك")}</span>
              <DrawSVG
                path="M5,35 Q50,5 95,35"
                className="absolute -bottom-2 inset-x-0 w-full h-8 text-[var(--c-ink)]"
              />
            </span>
          </h2>

          <p className="text-xl md:text-2xl font-bold leading-tight mb-8 max-w-lg">
            {t(
              "Your ultimate hub for credits, accounts, and elite gaming services. Fast. Secure. Professional.",
              "وجهتك الأولى لشحن الألعاب، الحسابات المميزة، وخدمات النخبة. سرعة. أمان. احترافية."
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border-2 border-black bg-white shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] transition-transform">
                <span className="text-[var(--c-purple)]">{item.icon}</span>
                <span className="text-xs font-black uppercase">{t(item.en, item.ar)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Section - Overhauled Visuals */}
        <div className="order-1 md:order-2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative mb-10 group">
            {/* Decorative Boxes */}
            <div className="absolute inset-0 bg-[var(--c-purple)] border-4 border-black translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            <div className="absolute inset-x-0 -bottom-4 bg-[var(--c-lime)] border-4 border-black h-8 -rotate-1" />
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-black grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden bg-white">
              <img src={DEV_IMG} alt="Abdullah" className="w-full h-full object-cover" />
              
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-black text-[10px] tracking-widest uppercase">
                {t("FOUNDER", "المؤسس")}
              </div>
            </div>

            {/* Signature Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-[var(--c-orange)] text-white px-6 py-3 border-4 border-black rotate-6 shadow-[5px_5px_0px_#000]">
               <span className="font-marker text-xl md:text-2xl">{t("Abdullah", "عبدالله")}</span>
            </div>
          </div>

          <div className="max-w-md pt-4">
            <h3 className="text-2xl font-black uppercase mb-3 text-[var(--c-ink)]">
              {t("Gamer First. Developer Second.", "لاعب أولا مطور دائماً.")}
            </h3>
            <p className="text-sm font-bold leading-relaxed opacity-80 mb-6">
              {t(
                "I built AL LORD STORE with one mission: to create a seamless, reliable platform where every gamer gets what they need, instantly.",
                "قمت بتمكين متجر AL LORD بمهمة واحدة: خلق منصة موثوقة وسهلة يحصل فيها كل لاعب على ما يحتاجه فوراً."
              )}
            </p>
            
            <div className={`flex flex-wrap gap-2 ${lang === 'ar' ? 'justify-end md:justify-start' : 'justify-start'}`}>
              {["Frontend DEV", "Entrepreneur", "Hardcore Gamer"].map((label, idx) => (
                <span key={idx} className="bg-black text-[var(--c-bg)] px-3 py-1 text-[10px] font-black uppercase">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
