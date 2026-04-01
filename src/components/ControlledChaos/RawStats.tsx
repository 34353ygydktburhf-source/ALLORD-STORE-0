import React, { useEffect, useRef, useState } from "react";
import { useLang } from "./LangContext";
import { Zap, CreditCard, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom Payment Icons as SVGs
const PaymentIcons = {
  Stripe: () => (
    <svg viewBox="0 0 40 18" className="h-6 w-auto fill-current">
      <path d="M37.3 6.9c-.1-.1-.3-.2-.5-.1-.2 0-.3.2-.3.4v6.5h1.1V7.1c0-.1-.1-.2-.3-.2zm-3.6 0c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3c1.3 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3zm0 3.5c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2zM15.4 6.9c-1.3 0-2.3 1-2.3 2.3 0 1.2 1 2.3 2.3 2.3 1.2 0 2.2-1 2.3-2.2v-2.4h-2.3zm0 3.5c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2h1.1v1.2c0 .7-.5 1.2-1.1 1.2zM9.4 4.5l-.1 1.1h1.1l-.1-1.1H9.4zm0 2.4l-.1 4.6h1.1l-.1-4.6H9.4zM5.5 8.1c-.8 0-1.2.4-1.2.9 0 1.2 2.3.8 2.3 2.3 0 .8-.7 1.3-1.6 1.3-1 0-1.7-.4-2-.8l.6-.8c.3.3.8.6 1.4.6.6 0 .8-.2.8-.5 0-1.1-2.3-.7-2.3-2.3 0-.8.7-1.3 1.5-1.3.8 0 1.4.3 1.7.6l-.6.9c-.2-.3-.6-.5-1.2-.5z" />
    </svg>
  ),
  PayPal: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-auto fill-current">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.328a.915.915 0 0 1 .906-.755h9.47c3.27 0 5.617 1.44 5.922 5.093.284 2.87-1.18 4.97-4.11 5.98-.396.136-.826.242-1.28.32a.606.606 0 0 0-.51.583l-.067.433-.67 4.237a.64.64 0 0 1-.633.538h-3.96a.64.64 0 0 1-.633-.74L10.36 14a.64.64 0 0 0-.633-.54H6.9a.64.64 0 0 0-.633.74l1.442 7.137z" />
    </svg>
  ),
  MasterCard: () => (
    <svg viewBox="0 0 24 15" className="h-6 w-auto">
      <circle cx="7" cy="7.5" r="7" fill="#EB001B" />
      <circle cx="17" cy="7.5" r="7" fill="#F79E1B" opacity="0.8" />
    </svg>
  ),
  Visa: () => (
    <svg viewBox="0 0 24 8" className="h-4 w-auto fill-current">
      <path d="M4.62 8l-1.07-5.32L2.52 7.15c-.17.85-.75.85-1.42.85H0l.02-.15C1.1 7.6 2.05 7.12 2.65 6.1L4.05 0h1.75L8.45 8H6.55l-.42-2.1H4.15L3.82 8H4.62zm10.65 0l-.82-4.1c-.1-.5-.25-1-.7-1h-1.4c-.45 0-.7.3-.7.7 0 .8 1.4 1 1.4 2.1 0 1.2-1.1 1.4-1.8 1.4-.8 0-1.5-.3-1.8-.7l.4-.9c.3.3.8.5 1.3.5.4 0 .6-.2.6-.5 0-.8-1.4-1.1-1.4-2.1 0-1.1 1-1.5 2-1.5 1 0 1.6.3 2 .7l-.4 1c-.3-.3-.7-.5-1.1-.5-.4 0-.6.2-.6.5s.3.4.6.4l.7.3c.7.3.9.7.9 1.3 0 1.4-1.2 1.6-2.1 1.6-.9 0-1.7-.3-2-.8l.4-1c.4.4.9.7 1.6.7s.9-.3.9-.7-.3-.4-.6-.4l-.8-.3c-.6-.3-.9-.7-.9-1.3 0-1.3 1.1-1.6 2.1-1.6 1 0 1.8.3 2.1.8l-.4 1c-.3-.3-.9-.6-1.5-.6s-.9.3-.9.7l2.85 6.45h-1.7L15.27 8h1.65l1.53-8h1.75l-1.42 8h-1.85z" />
    </svg>
  ),
  ApplePay: () => (
    <svg viewBox="0 0 32 16" className="h-6 w-auto fill-current">
      <path d="M11.63 10.93c.12 0 .22-.1.22-.22V8.34h1.9c1.62 0 2.53-.78 2.53-2.14 0-1.37-.87-2.13-2.39-2.13H10.1v6.64c0 .12.1.22.22.22h1.31zm.22-4.54h1.7c.66 0 1.05.28 1.05.86s-.39.87-1.05.87h-1.7V6.39zm8.56 4.54c1.19 0 2.05-.59 2.45-1.4h.05v1.18c0 .12.1.22.22.22h1.2c.12 0 .22-.1.22-.22V7.12c0-1.57-1.07-2.45-2.73-2.45-1.34 0-2.46.67-2.75 1.55-.02.05.01.11.06.13l.97.4c.05.02.1.01.13-.04.22-.51.77-.84 1.43-.84.82 0 1.33.39 1.33 1.06v.38c-.46-.07-1.06-.11-1.68-.11-1.46 0-2.58.62-2.58 1.83 0 .99.8 1.5 1.7 1.5zm.36-1.12c-.59 0-.96-.28-.96-.71 0-.46.45-.76 1.17-.76.46 0 .91.03 1.25.09v.45c0-.01-.73.93-1.46.93zM5.56 16l3.52-9.63c.03-.09-.03-.19-.13-.19H7.54c-.08 0-.15.05-.18.12L5.27 12.5 3.1 6.3c-.03-.07-.1-.12-.18-.12H1.47c-.1 0-.17.1-.13.19l3.99 10.87c.05.12.16.2.29.2h1.61c.1 0 .17-.1.13-.19-1.04-2.85-1.81-4.82-1.81-4.82zM4.17 4.14c1.3 0 2.1-1.12 2.1-2.48s-.86-2.43-2.1-2.43H1.22c-.12 0-.22.1-.22.22v6.64c0 .12.1.22.22.22h1.31c.12 0 .22-.1.22-.22V2.85h1.22c.62 0 .86.41.86 1 0 .59-.24 1-.86 1h-1.22c-.12 0-.22.1-.22.22v1.07c0 .12.1.22.22.22h1.15zM27.28 6.3c-1.38 0-2.42 1.02-2.42 2.37s1.04 2.37 2.42 2.37 2.41-1.01 2.41-2.37 c0-1.35-1.03-2.37-2.41-2.37zm0 3.59c-.66 0-1.16-.54-1.16-1.22s.5-1.22 1.16-1.22 1.15.54 1.15 1.22-.49 1.22-1.15 1.22zM3.47 5.1c-.88 0-1.43.43-1.43.9s.51.87 1.43.87 1.44-.4 1.44-.87-.56-.9-1.44-.9z" />
    </svg>
  ),
  GooglePay: () => (
    <svg viewBox="0 0 40 16" className="h-4 w-auto">
      <path fill="#4285F4" d="M5.38 7.3V9.4h3.69c-.15 1.05-1.14 2.54-3.69 2.54-2.2 0-3.99-1.82-3.99-4.07S3.18 3.8 5.38 3.8c1.25 0 2.09.52 2.57 1l1.76-1.7c-1.13-1.06-2.6-1.7-4.33-1.7C2.41 1.4 0 3.81 0 6.77s2.41 5.37 5.38 5.37c3.1 0 5.16-2.18 5.16-5.25 0-.35-.04-.62-.09-.89H5.38z" />
      <path fill="#4285F4" d="M21.57 6.77c0 1.63-1.31 2.96-2.92 2.96s-2.92-1.33-2.92-2.96 1.31-2.96 2.92-2.96 2.92 1.33 2.92 2.96zm-1.27 0c0-.98-.75-1.73-1.65-1.73s-1.65.75-1.65 1.73.75 1.73 1.65 1.73 1.65-.75 1.65-1.73z" />
      <path fill="#4285F4" d="M14.93 6.77c0 1.63-1.31 2.96-2.92 2.96s-2.92-1.33-2.92-2.96 1.31-2.96 2.92-2.96 2.92 1.33 2.92 2.96zm-1.27 0c0-.98-.75-1.73-1.65-1.73s-1.65.75-1.65 1.73.75 1.73 1.65 1.73 1.65-.75 1.65-1.73z" />
      <path fill="#4285F4" d="M22.37 4.02v8.68h1.27V4.02h-1.27z" />
      <path fill="#4285F4" d="M28.01 6.32V4.02h-1.27v5.33l-.04.07c-.45.69-1.2 1.25-2.22 1.25-1.5 0-2.67-1.25-2.67-2.9 0-1.63 1.16-2.9 2.67-2.9 1.02 0 1.77.56 2.22 1.25l.04.07V4.02h-1.27v5.33l-.04.07c-.45.69-1.2 1.25-2.22 1.25-1.5 0-2.67-1.25-2.67-2.9 0-1.63 1.16-2.9 2.67-2.9 1.02 0 1.77.56 2.22 1.25l.04.07V4.02z" />
      <path fill="#5F6368" d="M35.1 4.02h-1.89v1.89h1.89v2.24l.01.01c.21.01.42 0 .61-.06.74-.23 1.28-.91 1.28-1.7V4.02H35.1z" />
      <text x="31" y="9.5" fill="#5F6368" font-family="Arial" font-weight="bold" font-size="6">Pay</text>
    </svg>
  ),
  VodafoneCash: () => (
    <div className="flex items-center gap-1 font-black text-[9px] uppercase border px-2 py-1 rounded-sm border-white/20">
      <span className="text-[#E60000]">Vodafone</span>
      <span className="bg-[#E60000] text-white px-1">Cash</span>
    </div>
  ),
  InstaPay: () => (
    <div className="flex items-center gap-1 font-black text-[9px] uppercase border px-2 py-1 rounded-sm border-white/20">
      <span className="text-[#6A2B8D]">Insta</span>
      <span className="text-[#9B308D]">Pay</span>
    </div>
  )
};

function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      onUpdate: () => setCount(Math.floor(obj.val)),
    });
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function RawStats() {
  const { t } = useLang();

  const stats = [
    { val: 850, label: t("ORDERS", "طلب"), note: t("AND COUNTING", "والعدد يزيد"), color: "bg-[var(--c-lime)]/20" },
    { val: 1200, label: t("TRANSACTIONS", "معاملة"), note: t("COMPLETED", "مكتملة"), color: "bg-[var(--c-orange)]/20" },
    { val: 99, label: t("SATISFACTION %", "رضا %"), note: t("ALWAYS", "دائماً"), suffix: "%", color: "bg-[var(--c-purple)]/20" },
  ];

  const payments = [
    { name: "Vodafone Cash", icon: <PaymentIcons.VodafoneCash /> },
    { name: "MasterCard", icon: <PaymentIcons.MasterCard /> },
    { name: "InstaPay", icon: <PaymentIcons.InstaPay /> },
  ];

  return (
    <section className="bg-[var(--c-ink)] text-[var(--c-bg)] border-y-4 border-[var(--c-lime)] overflow-hidden py-8">
      {/* Row 1: Achievement Stats */}
      <div className="pt-6 pb-10 border-b-2 border-white/10 px-6">
        <div className="max-w-4xl mx-auto flex flex-row justify-center items-center gap-8 md:gap-20">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center group flex-1">
              <span className="text-4xl md:text-6xl font-black text-[var(--c-lime)] group-hover:scale-110 transition-transform">
                <AnimatedCounter target={s.val} suffix={s.suffix || "+"} />
              </span>
              <span className="text-[10px] md:text-sm font-black uppercase tracking-widest mt-1 opacity-60 text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Payment Methods */}
      <div className="py-8 group cursor-default bg-black/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase mb-4 opacity-40">
            <ShieldCheck className="w-4 h-4 text-[var(--c-lime)]" />
            {t("Secure Payments", "طرق دفع آمنة")}
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>
          
          <div className="flex flex-row justify-center items-center gap-10 md:gap-24 px-4 overflow-visible">
            {payments.map((p, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity flex-1"
              >
                <div className="h-10 md:h-12 flex items-center justify-center">
                  {p.icon}
                </div>
                <span className="text-[7px] md:text-[10px] font-black uppercase tracking-tighter text-center whitespace-nowrap">{p.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-white border-4 border-[var(--c-ink)] shadow-[4px_4px_0px_var(--c-purple)] rounded-sm relative">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[var(--c-lime)] border-2 border-[var(--c-ink)] flex items-center justify-center -rotate-12">
                <Zap className="w-3.5 h-3.5 text-[var(--c-ink)] animate-pulse" />
              </div>
              <p className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-[var(--c-ink)]">
                {t("All payment methods in the Arab world are available", "جميع طرق الدفع في الوطن العربي متاحة")}
              </p>
            </div>
            
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-faq', { detail: { topic: 'payment' } }))}
              className="bg-[var(--c-orange)] text-[var(--c-ink)] px-4 py-2 border-4 border-[var(--c-ink)] shadow-[4px_4px_0px_#000] text-[10px] font-black uppercase hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              {t("I didn't find my method", "لم أجد محفظتي")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
