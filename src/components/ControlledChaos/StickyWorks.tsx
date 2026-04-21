import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Flame, Star, Trophy, Sparkles } from "lucide-react";
import { DrawSVG } from "./DrawSVG";
import { useLang } from "./LangContext";
import { Link } from "react-router-dom";
import { BrutalButton } from "./BrutalButton";
import { slugify } from "@/pages/GameDetailPage";

gsap.registerPlugin(ScrollTrigger);

import { useGames } from "./GamesContext";

export function StickyWorks() {
  const container = useRef<HTMLElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();
  const { games } = useGames();

  const featuredGames = games.slice(0, 6);

  useLayoutEffect(() => {
    if (!container.current || !wrapper.current) return;
    const wrapperEl = wrapper.current;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => wrapperEl.scrollWidth - window.innerWidth;

      gsap.to(wrapperEl, {
        x: () => lang === "ar" ? getScrollDistance() + 20 : -getScrollDistance() - 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={container} id="games" className="relative overflow-hidden" style={{ backgroundColor: "var(--c-bg)" }}>
      <div ref={wrapper} className="flex items-center h-screen gap-8 px-12" style={{ width: "fit-content" }}>
        {/* Title Block */}
        <div className={`shrink-0 w-[60vw] md:w-[40vw] flex flex-col justify-center ${lang === 'ar' ? 'pl-4 md:pl-12' : 'pr-4 md:pr-12'}`}>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
            <span className="font-marker text-[var(--c-orange)]">ALL </span>
            <br />
            GAMES
          </h2>
          <DrawSVG path="M10,50 Q60,10 110,50 T210,50" className="w-48 h-12 text-[var(--c-purple)] mt-4" />
          <Link to="/games" className="mt-8 inline-block">
            <BrutalButton color="bg-[#b084ff]">{t("View All Games →", "عرض كل الألعاب →")}</BrutalButton>
          </Link>
        </div>

        {/* Game Cards */}
        {featuredGames.map((g, i) => (
          <Link
            key={i}
            to={`/game/${slugify(g.name)}`}
            className="shrink-0 w-[85vw] sm:w-[75vw] md:w-[40vw] h-[52vh] md:h-[70vh] relative group block"
          >
            <div className={`absolute inset-0 ${g.color} translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 border-4 border-[var(--c-ink)]`} />
            <div className={`relative h-full ${g.color} border-4 border-[var(--c-ink)] p-5 sm:p-6 md:p-8 flex flex-col justify-between cursor-pointer group-hover:translate-x-1 group-hover:translate-y-1 md:group-hover:translate-x-2 md:group-hover:translate-y-2 transition-transform duration-300`}>
              <div
                className="absolute inset-0 opacity-10 grayscale mix-blend-luminosity bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${g.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--c-bg)]/5 to-[var(--c-bg)]/20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-[var(--c-bg)] text-[var(--c-ink)] px-2 py-0.5 border border-[var(--c-ink)]">({g.cat})</span>
                {g.discount > 0 && (
                  <div className="absolute top-0 left-0 z-20 pointer-events-none -translate-x-3 -translate-y-3">
                    <div className="bg-red-600 text-white flex flex-col items-center justify-center px-4 py-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] relative min-w-[70px]">
                      <span className="text-[10px] font-black tracking-tighter leading-none mb-1 opacity-80">{t("SALE", "خصم")}</span>
                      <span className="text-2xl font-black leading-none">-{g.discount}%</span>
                    </div>
                  </div>
                )}
                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-45 transition-transform" />
              </div>
              <div className="relative z-10 w-full overflow-hidden">
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-none mb-2 md:mb-4 drop-shadow-[2px_2px_0px_#000] text-white overflow-wrap break-word hyphens-auto line-clamp-2" dir="ltr">{g.name}</h3>
                <p className="text-sm md:text-lg mb-3 md:mb-4 max-w-md font-bold text-[var(--c-ink)] bg-white/50 backdrop-blur-sm p-2 border-l-4 border-[var(--c-ink)] line-clamp-2">{t(g.desc, g.descAr || g.desc)}</p>
                <div className="flex gap-1.5 sm:gap-2 md:gap-3 flex-wrap mb-2 md:mb-0">
                  {g.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 md:px-3 md:py-1 border-2 border-[var(--c-ink)] bg-white text-[var(--c-ink)] text-[10px] md:text-xs font-bold uppercase whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 md:mt-4 inline-block bg-[var(--c-ink)] text-[var(--c-bg)] px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-black uppercase shadow-[2px_2px_0px_#fff]">
                  {t("Top Up Now 🎮", "اشحن الآن 🎮")}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
