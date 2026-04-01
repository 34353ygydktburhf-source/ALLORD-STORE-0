import React from "react";
import { Zap } from "lucide-react";
import { useLang } from "./LangContext";
import { BrutalFlag } from "./BrutalFlag";

export function Marquee() {
  const { t } = useLang();

  return (
    <div className="py-6 bg-[var(--c-ink)] text-[var(--c-bg)] overflow-hidden border-y-4 border-[var(--c-lime)]">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 15s linear infinite" }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 mx-8 text-4xl font-black uppercase shrink-0">
            <span className="font-marker text-[var(--c-lime)]">AL LORD</span>
            <span>•</span>
            <div className="flex items-center gap-3">
              <span className="text-red-600 drop-shadow-[2px_2px_0px_white]">{t("FREE PALESTINE", "فلسطين حرة")}</span>
              <BrutalFlag code="ps" size="w-9 h-9" />
            </div>
            <span className="text-[var(--c-purple)]">•</span>
            <span>{t("GAME STORE", "متجر ألعاب")}</span>
            <Zap className="w-8 h-8 text-[var(--c-orange)] fill-[var(--c-orange)]" />
            <span>{t("TOP-UP", "شحن")}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
