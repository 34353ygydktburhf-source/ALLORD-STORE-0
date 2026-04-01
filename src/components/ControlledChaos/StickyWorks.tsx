import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { DrawSVG } from "./DrawSVG";
import { useLang } from "./LangContext";
import { Link } from "react-router-dom";
import { BrutalButton } from "./BrutalButton";
import { slugify } from "@/pages/GameDetailPage";

gsap.registerPlugin(ScrollTrigger);

export const GAMES_DATA = [
  {
    name: "PUBG Mobile",
    cat: "MOBILE",
    tags: ["UC", "Top-Up", "Mobile"],
    color: "bg-[#ff5e00]",
    image: "https://i.pinimg.com/1200x/bf/20/b1/bf20b1278bd054e85d1c429b87dfcc7a.jpg",
    desc: "Get UC, Royal Pass, and more for PUBG Mobile.",
    descAr: "احصل على الشدات وتصريح ببجي والمزيد.",
    category: "mobile",
  },
  {
    name: "Call of Duty Mobile",
    cat: "MOBILE",
    tags: ["CP", "Top-Up", "Mobile"],
    color: "bg-[#b084ff]",
    image: "https://i.pinimg.com/1200x/4b/4b/79/4b4b798418f401f86643cf641a08d8fa.jpg",
    desc: "COD Points and Battle Pass for COD Mobile.",
    descAr: "نقاط COD وتصريح المعركة.",
    category: "mobile",
  },
  {
    name: "Fortnite",
    cat: "PC / CONSOLE",
    tags: ["V-Bucks", "Accounts", "PC"],
    color: "bg-[#ccff00]",
    image: "https://i.pinimg.com/1200x/c9/50/16/c950169b5759a63e05bfa25e12565f11.jpg",
    desc: "V-Bucks, Battle Pass, and premium accounts.",
    descAr: "في بوكس، تصريح المعركة، وحسابات مميزة.",
    category: "pc",
  },
  {
    name: "Mobile Legends",
    cat: "Mobile",
    tags: ["RP", "Skins", "Mobile"],
    color: "bg-[#ff5e00]",
    image:"https://i.pinimg.com/1200x/7f/b7/ad/7fb7ad924a18548c812fefaa352c167c.jpg",
    desc: "Riot Points, skins, and champion bundles.",
    descAr: "نقاط رايوت، مظاهر، وباقات أبطال.",
    category: "Mobile",
  },
  {
    name: "eFootball PES Mobile",
    cat: "MOBILE",
    tags: ["Coins", "Top-Up", "Mobile", "Football"],
    color: "bg-[#002f6c]",
    image: "https://i.pinimg.com/1200x/61/ea/f4/61eaf493cba6e992c2e32e0468d9d033.jpg",
    desc: "Get eFootball Coins and seasonal passes.",
    descAr: "احصل على كوينز وتذاكر اللعبة الموسمية.",
    category: "mobile",
  },
  {
    name: "Genshin Impact",
    cat: "MOBILE / PC",
    tags: ["Genesis Crystals", "Top-Up", "RPG"],
    color: "bg-[#ccff00]",
    image: "https://i.pinimg.com/1200x/ad/b0/a0/adb0a01a7ed6f1b168aaa757b7c96a92.jpg",
    desc: "Genesis Crystals, Welkin Moon, and Battle Pass.",
    descAr: "جواهر التكوين وبطاقة الشهر والتصريح.",
    category: "mobile",
  },
  {
    name: "Free Fire",
    cat: "MOBILE",
    tags: ["Diamonds", "Top-Up", "Mobile"],
    color: "bg-[#ff5e00]",
    image: "https://i.pinimg.com/736x/73/fa/a6/73faa665f3318eb7b7b2d0a25fa31a43.jpg",
    desc: "Diamonds and membership cards for Free Fire.",
    descAr: "جواهر وبطاقات اشتراك لعبة فري فاير.",
    category: "mobile",
  },
  {
    name: "Valorant",
    cat: "PC",
    tags: ["VP", "Skins", "FPS"],
    color: "bg-[#b084ff]",
    image: "https://i.pinimg.com/1200x/4d/df/df/4ddfdf50854d7aa373dac53dfe0b97c4.jpg",
    desc: "Valorant Points and premium skin bundles.",
    descAr: "نقاط فالورانت وحزم الأسلحة المميزة.",
    category: "pc",
  },
  {
    name: "Roblox",
    cat: "ALL PLATFORMS",
    tags: ["Robux", "Top-Up", "Kids"],
    color: "bg-[#ccff00]",
    image: "https://i.pinimg.com/1200x/3c/3f/5b/3c3f5b9a226134d49386a2ed6c087d18.jpg",
    desc: "Robux and Premium subscriptions.",
    descAr: "روبوكس واشتراكات لعب مميزة.",
    category: "mobile",
  },
  {
    name: "Clash of Clans",
    cat: "MOBILE",
    tags: ["Gems", "Top-Up", "Strategy"],
    color: "bg-[#ff5e00]",
    image: "https://i.pinimg.com/1200x/54/3f/2c/543f2c6a86555b28c5e5a536bce250da.jpg",
    desc: "Gems and Gold Pass for Clash of Clans.",
    descAr: "جواهر وبطاقة السيزون الذهبية للعبة كلاش.",
    category: "mobile",
  },
  {
    name: "FIFA / EA FC",
    cat: "PC / CONSOLE",
    tags: ["FIFA Points", "Coins", "Sports"],
    color: "bg-[#b084ff]",
    image: "https://i.pinimg.com/736x/62/2d/ae/622daecf117deb935b16e142c2d6b549.jpg",
    desc: "FIFA Points and coin packages.",
    descAr: "نقاط فيفا وحزم الكوينز المتنوعة.",
    category: "pc",
  },
  {
    name: "Minecraft",
    cat: "ALL PLATFORMS",
    tags: ["Minecoins", "Accounts", "Sandbox"],
    color: "bg-[#ccff00]",
    image: "https://i.pinimg.com/736x/46/31/2b/46312bd881d791e50cc6a5577ebe2890.jpg",
    desc: "Minecoins, Realms, and premium accounts.",
    descAr: "ماين كوينز وحسابات ماينكرافت.",
    category: "pc",
  },
];

export function StickyWorks() {
  const container = useRef<HTMLElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();

  const featuredGames = GAMES_DATA.slice(0, 6);

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
            className="shrink-0 w-[75vw] md:w-[40vw] h-[52vh] md:h-[70vh] relative group block"
          >
            <div className={`absolute inset-0 ${g.color} translate-x-4 translate-y-4 border-4 border-[var(--c-ink)]`} />
            <div className={`relative h-full ${g.color} border-4 border-[var(--c-ink)] p-8 flex flex-col justify-between cursor-pointer group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 overflow-hidden`}>
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${g.image})` }}
              />
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-sm font-bold uppercase tracking-widest">({g.cat})</span>
                <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
              </div>
              <div className="relative z-10">
                <h3 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4">{g.name}</h3>
                <p className="text-lg mb-4 max-w-md">{t(g.desc, g.descAr || g.desc)}</p>
                <div className="flex gap-3 flex-wrap">
                  {g.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 border-2 border-[var(--c-ink)] text-xs font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 inline-block bg-[var(--c-ink)] text-[var(--c-bg)] px-4 py-2 text-sm font-bold uppercase">
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
