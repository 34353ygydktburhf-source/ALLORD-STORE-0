import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Gamepad2, Zap, ArrowUpRight } from "lucide-react";
import { BrutalButton } from "./BrutalButton";
import { DrawSVG } from "./DrawSVG";
import { useLang } from "./LangContext";
import { BrutalFlag } from "./BrutalFlag";
import { Link } from "react-router-dom";

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".parallax-layer", { x: x * 50, y: y * 50, duration: 1 });
        gsap.to(".parallax-layer-rev", { x: x * -40, y: y * -40, duration: 1 });
      };
      window.addEventListener("mousemove", handleMouseMove);

      const tl = gsap.timeline();
      tl.from(".hero-char", {
        y: 200, rotate: 10, opacity: 0, stagger: 0.05, duration: 1, ease: "back.out(1.7)",
      }).from(".hero-tag", {
        scale: 0, rotation: -180, duration: 0.6, ease: "elastic.out(1, 0.5)",
      }, "-=0.5");
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "var(--c-bg)" }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 49px, var(--c-ink) 49px, var(--c-ink) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, var(--c-ink) 49px, var(--c-ink) 50px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="noise" />

      <div className="parallax-layer absolute top-20 left-10">
        <div className="w-24 h-24 bg-[var(--c-lime)] rounded-full flex items-center justify-center rotate-12 border-4 border-[var(--c-ink)]">
          <Gamepad2 className="w-12 h-12" />
        </div>
      </div>

      <div className="parallax-layer-rev absolute bottom-20 right-10">
        <div className="w-32 h-32 border-4 border-[var(--c-ink)] rounded-full flex items-center justify-center">
          <Zap className="w-12 h-12 fill-[var(--c-orange)] text-[var(--c-orange)]" />
        </div>
      </div>

      <div className={`parallax-layer absolute top-[5%] md:top-auto md:bottom-24 inset-inline-end-[2%] md:left-24 md:inset-inline-start-auto opacity-30 lg:opacity-100 z-50`}>
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
          {/* Circular Text */}
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
            <defs>
              <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-[8.5px] font-black uppercase fill-[var(--c-ink)] tracking-[0.2em]">
              <textPath href="#circlePath">
                {t("FREE PALESTINE • فلسطين حرة • ", "فلسطين حرة • FREE PALESTINE • ")}
                {t("FREE PALESTINE • فلسطين حرة • ", "فلسطين حرة • FREE PALESTINE • ")}
              </textPath>
            </text>
          </svg>
          {/* Central Flag */}
          <div className="absolute inset-0 flex items-center justify-center">
            <BrutalFlag code="ps" size="w-12 h-12 md:w-20 md:h-20" className="border-4 shadow-[4px_4px_0px_var(--c-red)]" />
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 md:px-10">
        <div className="hero-tag inline-block bg-[var(--c-ink)] text-[var(--c-bg)] px-4 py-2 text-[10px] md:text-sm uppercase tracking-widest mb-8 rotate-[-2deg]">
          {t("Fast & Secure Game Top-Ups for Mobile and PC Games", "شحن ألعاب سريع وآمن للموبايل والكمبيوتر")}
        </div>

        <h1 className="text-[14vw] md:text-[12vw] font-black uppercase leading-[0.85]" dir="ltr">
          <div className="overflow-hidden">
            {"AL LORD".split("").map((c, i) => (
              <span key={i} className="hero-char inline-block">{c === " " ? "\u00A0" : c}</span>
            ))}
          </div>
          <div className="overflow-hidden relative">
            <span className="text-outline">STORE</span>
            <div className="absolute inset-0 flex justify-center items-center">
              {"STORE".split("").map((c, i) => (
                <span key={i} className="hero-char inline-block">{c}</span>
              ))}
            </div>
            <DrawSVG
              path="M20,100 Q60,20 100,100 T180,100"
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-auto text-[var(--c-orange)]"
            />
          </div>
        </h1>

        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
          <span className="hero-tag bg-[var(--c-purple)] text-[var(--c-ink)] px-3 py-1 text-xs font-bold uppercase rotate-3 border-2 border-[var(--c-ink)]">🎮 Gaming Store</span>
          <p className="max-w-md text-lg">
            {t(
              "We provide instant game credits, accounts, and in-game purchases with trusted payment methods.",
              "نوفر رصيد ألعاب فوري، حسابات، ومشتريات داخل اللعبة بطرق دفع موثوقة."
            )}
          </p>
          <span className="font-marker text-sm rotate-[-3deg]">{t("Level up your game.", "ارتقِ بلعبتك.")}</span>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
          <a href="#games"><BrutalButton>{t("View Games", "تصفح الألعاب")}</BrutalButton></a>
          <a href="https://wa.me/201063006506" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-lg font-bold uppercase underline underline-offset-4 decoration-[var(--c-orange)] decoration-2">
            {t("Order Now", "اطلب الآن")} <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
