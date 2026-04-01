import React, { useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Plus, User } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { DrawSVG } from "./DrawSVG";
import { useLang } from "./LangContext";
import { BrutalButton } from "./BrutalButton";

const REVIEW_LINK = "https://www.facebook.com/share/p/Lq6B2VLD9VrqaRqU/?mibextid=oFDknk";

export function ChaosServices() {
  const { lang, t } = useLang();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    direction: lang === "ar" ? "rtl" : "ltr",
    align: "start"
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Pagination dots
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const reviews = [
    {
      name: "محمد ربيع ابو خميس",
      avatar: "🌟",
      review: "احسن ناس اتعملت معهم وفعلا ناس ضمان الضمان",
      rating: 5,
      color: "bg-[#ccff00]",
      enName: "Mohamed Rabea",
      enReview: "The best people to deal with. Truly guaranteed safety.",
    },
    {
      name: "سيد اسامه",
      avatar: "🔥",
      review: "وربي احسن تعامل وناس محترمه ومضمون 100000% احسن واحد فل مجال اتعامل ونتا مغمض عنيك",
      rating: 5,
      color: "bg-[#b084ff]",
      enName: "Sayed Osama",
      enReview: "I swear, best treatment, respectful and 100000% secured. Deal with them blindfolded.",
    },
    {
      name: "ميدو محمد سيف",
      avatar: "🎮",
      review: "اخويا اللورد يعنى ابو الضمان كله عن تجربه اضمن وسيط.اللورد",
      rating: 5,
      color: "bg-[#ff5e00]",
      enName: "Mido Mohamed",
      enReview: "My brother The Lord! The father of all safety, tested and most trusted middleman.",
    },
    {
      name: "احمد زيكا",
      avatar: "⚡",
      review: "شكرا يالورد علي الشحن ثقه ثقه والله",
      rating: 5,
      color: "bg-[#ccff00]",
      enName: "Ahmed Zika",
      enReview: "Thank you Lord for the top-up. Trust, pure trust I swear.",
    },
    {
      name: "عمر غندور",
      avatar: "🎯",
      review: "والله احلي واحد اتعاملت معاه وشخص بيراعي الضمير",
      rating: 5,
      color: "bg-[#b084ff]",
      enName: "Omar Ghandour",
      enReview: "Honestly the nicest person I've dealt with. He truly has conscience.",
    },
    {
      name: "ادهم يوسف",
      avatar: "🛡️",
      review: "انا من ضم الناس اللي جربت الستور بامانه اضمن ستور اول معامله ما بينا بس مش اخر معامله لان ستور كويس وسعره حلو",
      rating: 5,
      color: "bg-[#ff5e00]",
      enName: "Adham Youssef",
      enReview: "I'm one of those who tried the store. Truly the most secure store. First deal but definitely not the last. Great prices.",
    },
  ];

  return (
    <section id="reviews" className="pt-16 pb-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "var(--c-bg)" }}>
      <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="flex items-end gap-4">
          <h2 className="text-6xl md:text-8xl font-black uppercase text-[var(--c-ink)]">{t("REVIEWS.", "آراء العملاء.")}</h2>
          <DrawSVG path="M10,90 Q50,10 90,50 T170,30" className="w-24 h-24 text-[var(--c-lime)] hidden md:block" />
        </div>
        
        <div className="flex items-center gap-4">
          <a href={REVIEW_LINK} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <BrutalButton color="bg-[var(--c-lime)]">
              <span className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {t("Add Your Review", "أضف رأيك")}
              </span>
            </BrutalButton>
          </a>

          <div className="hidden md:flex gap-2" dir="ltr">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 flex items-center justify-center border-4 border-[var(--c-ink)] bg-[var(--c-bg)] text-[var(--c-ink)] hover:bg-[var(--c-orange)] hover:-translate-y-1 hover:-translate-x-1 transition-all shadow-[4px_4px_0px_var(--c-ink)]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 flex items-center justify-center border-4 border-[var(--c-ink)] bg-[var(--c-bg)] text-[var(--c-ink)] hover:bg-[var(--c-orange)] hover:-translate-y-1 hover:-translate-x-1 transition-all shadow-[4px_4px_0px_var(--c-ink)]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative cursor-grab active:cursor-grabbing">
        <div className="overflow-hidden" ref={emblaRef} dir={lang === "ar" ? "rtl" : "ltr"}>
          <div className="flex gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div
                  className="group h-full border-4 border-[var(--c-ink)] p-8 hover:translate-x-1 hover:translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col bg-white shadow-[8px_8px_0px_var(--c-ink)] hover:shadow-none"
                >
                  <div className={`absolute top-0 ${lang === 'ar' ? 'left-0 border-r-4' : 'right-0 border-l-4'} w-16 h-16 ${r.color} border-b-4 border-[var(--c-ink)] flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <Quote className="w-6 h-6 text-[var(--c-ink)]" />
                  </div>

                  <div className="w-14 h-14 rounded-full border-4 border-[var(--c-ink)] flex items-center justify-center bg-[var(--c-bg)] shadow-[2px_2px_0px_var(--c-ink)] mb-6">
                    <User className="w-6 h-6 text-[var(--c-ink)]" />
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-[var(--c-orange)] fill-[var(--c-orange)]" />
                    ))}
                  </div>

                  <div className="mb-8 flex-grow">
                    <p className="text-xl font-bold leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                      "{t(r.enReview, r.review)}"
                    </p>
                  </div>

                  <div className="mt-auto border-t-4 border-[var(--c-ink)] pt-4">
                    <h3 className="text-xl font-black uppercase text-[var(--c-ink)]">{t(r.enName, r.name)}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-[var(--c-purple)] mt-1">{t("Verified Buyer", "مشتري موثق")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-12" dir="ltr">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-4 h-4 rounded-full border-2 border-[var(--c-ink)] transition-all ${
                index === selectedIndex ? "bg-[var(--c-orange)] scale-125" : "bg-transparent"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
