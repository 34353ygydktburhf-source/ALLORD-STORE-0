import React from "react";
import { useLang } from "./LangContext";
import { Shield, Zap, CreditCard, Headphones } from "lucide-react";

export function TeamScribbles() {
  const { t } = useLang();

  const services = [
    {
      name: t("FAST DELIVERY", "توصيل سريع"),
      role: t("UNDER 5 MINUTES", "أقل من 5 دقائق"),
      icon: <Zap className="w-12 h-12" />,
    },
    {
      name: t("SECURE PAYMENTS", "دفع آمن"),
      role: t("VODAFONE CASH & MORE", "فودافون كاش والمزيد"),
      icon: <CreditCard className="w-12 h-12" />,
    },
    {
      name: t("24/7 SUPPORT", "دعم 24/7"),
      role: t("ALWAYS ONLINE", "دائماً متاح"),
      icon: <Headphones className="w-12 h-12" />,
    },
    {
      name: t("100% TRUSTED", "موثوق 100%"),
      role: t("VERIFIED STORE", "متجر موثق"),
      icon: <Shield className="w-12 h-12" />,
    },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[var(--c-ink)] text-[var(--c-bg)] relative overflow-hidden">
      <div className="noise" />

      <div className="absolute top-10 right-10 w-40 h-40 border-4 border-[var(--c-lime)] rounded-full opacity-20" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-[var(--c-purple)] rotate-45 opacity-20" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black uppercase mb-16 font-marker text-[var(--c-lime)]">
          {t("WHY CHOOSE US", "ليه تختارنا")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group text-center">
              <div className="relative mb-4 border-4 border-[var(--c-bg)] aspect-square flex items-center justify-center bg-[var(--c-ink)] group-hover:bg-[var(--c-lime)] group-hover:text-[var(--c-ink)] transition-all duration-500">
                {s.icon}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 text-[var(--c-orange)]" fill="none" stroke="currentColor" strokeWidth="3">
                    <circle cx="50" cy="50" r="40" strokeDasharray="5 5" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-black uppercase">{s.name}</h3>
              <p className="text-xs uppercase tracking-widest text-[var(--c-purple)]">{s.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
