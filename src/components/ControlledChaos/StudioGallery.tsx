import React from "react";
import { useLang } from "./LangContext";

export function StudioGallery() {
  const { t } = useLang();

  const imgs = [
    { src: "https://i.pinimg.com/736x/ce/44/fa/ce44fa88c64df49d6c66cbdf291e1f09.jpg", label: "AL LORD STORE" },
    { src: "https://i.pinimg.com/736x/c8/c1/e0/c8c1e011a2c9a80e1921ad246a162df0.jpg", label: "GAME TOP-UP" },
    { src: "https://i.pinimg.com/736x/b4/28/eb/b428eb8bb9c8b5a6b4c55c703daab365.jpg", label: "ALLORD.STORE" },
  ];

  return (
    <section className="py-32 px-6 md:px-12" style={{ backgroundColor: "var(--c-bg)" }}>
      <h2 className="text-6xl md:text-8xl font-black uppercase mb-16 max-w-6xl mx-auto">
        {t("PROJECT SHOTS_", "لقطات المشاريع_")}
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {imgs.map((img, i) => (
          <div key={i} className="relative group overflow-hidden border-4 border-[var(--c-ink)]">
            <img src={img.src} alt={img.label} className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute bottom-4 left-4 bg-[var(--c-ink)] text-[var(--c-bg)] px-3 py-1 text-xs font-bold uppercase">
              {img.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
