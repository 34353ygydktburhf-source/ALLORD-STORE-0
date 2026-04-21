import React, { useState, useEffect } from "react";
import { ArabMapInteractive } from "./ArabMapInteractive";
import { ARAB_COUNTRIES, CountryData } from "./ArabHubData";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gamepad2, CreditCard, Tag, Globe, MousePointerClick, X } from "lucide-react";
import { useLang } from "./LangContext";

export function ArabGamingHub() {
  const { lang, t } = useLang();
  
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile for interaction logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeData: CountryData | null = ARAB_COUNTRIES[activeCountryId || hoveredCountryId || ""] || null;

  const handleCountryHover = (id: string | null) => {
    if (!isMobile) {
      setHoveredCountryId(id);
    }
  };

  const handleCountryClick = (id: string) => {
    setActiveCountryId(id);
  };

  // Country Info Panel (Rendered inside desktop card or mobile drawer)
  const CountryInfoPanel = ({ data }: { data: CountryData }) => (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4 border-b-4 border-black pb-4">
        <img src={data.flagUrl} alt={data.nameEn} className="w-16 h-12 object-cover border-4 border-black shadow-[4px_4px_0px_#000]" />
        <div>
          <h3 className="text-2xl font-black uppercase text-black leading-none">{lang === 'ar' ? data.nameAr : data.nameEn}</h3>
          <p className="text-[10px] font-bold text-[var(--c-purple)] uppercase tracking-widest mt-1">
            {t("Verified Region", "منطقة معتمدة")}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[var(--c-lime)] border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="w-5 h-5 text-black" />
            <span className="text-xs font-black uppercase text-black">{t("Popular Games", "الألعاب الشائعة")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(lang === 'ar' ? data.gamesAr : data.gamesEn).map((g, idx) => (
              <span key={idx} className="text-[10px] bg-black text-white px-2 py-1 font-bold uppercase">{g}</span>
            ))}
          </div>
        </div>

        <div className="bg-[var(--c-orange)] border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-black" />
            <span className="text-xs font-black uppercase text-black">{t("Local Payments", "طرق الدفع المحلية")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(lang === 'ar' ? data.paymentsAr : data.paymentsEn).map((p, idx) => (
              <span key={idx} className="text-[10px] bg-white text-black border-2 border-black px-2 py-1 font-bold uppercase">{p}</span>
            ))}
          </div>
        </div>

        <div className="bg-[#b084ff] border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-5 h-5 text-black" />
            <span className="text-xs font-black uppercase text-black">{t("Special Offers", "عروض خاصة")}</span>
          </div>
          <p className="text-sm font-black text-black leading-tight border-l-4 border-black pl-2 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-2">
            {lang === 'ar' ? data.offersAr : data.offersEn}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-24 bg-[var(--c-ink)] relative overflow-hidden" id="arab-map">
      {/* Background grids */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Header Region */}
        <div className="text-center mb-8 md:mb-12 w-full max-w-3xl flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-4">
             <Globe className="w-10 h-10 text-[var(--c-lime)] animate-spin-slow" />
             <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
                {t("Arab Gaming Hub", "المركز العربي للألعاب")}
             </h2>
          </div>
          <p className="text-sm md:text-base font-bold text-white/70 max-w-xl mx-auto mb-8">
            {t("Explore localized payment methods, special offers, and popular games in your region.", "اكتشف طرق الدفع المحلية، العروض الخاصة، والألعاب الأكثر شهرة في منطقتك.")}
          </p>

          {/* Smart Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/5 p-4 border-4 border-white/10 rounded-xl max-w-md w-full">
            <span className="text-xs font-black uppercase text-[var(--c-lime)] shrink-0">
               {t("Select Region:", "اختر المنطقة:")}
            </span>
            <div className="w-full">
              <Select value={activeCountryId || ""} onValueChange={setActiveCountryId}>
                <SelectTrigger className="w-full h-12 border-4 border-black bg-white rounded-none font-black uppercase text-black focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder={t("Choose Country...", "اختر الدولة...")} />
                </SelectTrigger>
                <SelectContent className="border-4 border-black rounded-none shadow-[8px_8px_0px_#000]">
                  {Object.values(ARAB_COUNTRIES).map((c) => (
                    <SelectItem key={c.id} value={c.id} className="font-bold cursor-pointer hover:bg-[var(--c-lime)] transition-colors">
                      <div className="flex items-center gap-2">
                        <img src={c.flagUrl} alt={c.id} className="w-6 h-4 border border-black/20" />
                        <span>{lang === "ar" ? c.nameAr : c.nameEn}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Auto Detect Button (UX Simulation) */}
            <button 
              onClick={() => setActiveCountryId("Egypt")}
              className="w-full sm:w-auto px-4 h-12 bg-[#ff5e00] text-black font-black uppercase text-[10px] border-4 border-black hover:bg-white transition-colors flex items-center justify-center gap-1 shrink-0 whitespace-nowrap"
            >
              <MousePointerClick className="w-4 h-4" />
              {t("Auto Detect", "تحديد تلقائي")}
            </button>
          </div>
        </div>

        {/* Map & Desktop Overlay Container */}
        <div className="relative w-full max-w-5xl aspect-square md:aspect-video border-4 md:border-8 border-[var(--c-purple)] bg-[#1a1a1a] shadow-[0_0_50px_rgba(176,132,255,0.2)]">
           <ArabMapInteractive 
             onCountryHover={handleCountryHover} 
             onCountryClick={handleCountryClick} 
             activeCountryId={activeCountryId || hoveredCountryId} 
           />

           {/* Initial Hint Overlay */}
           {!activeCountryId && !hoveredCountryId && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none bg-black/80 px-4 py-2 border-2 border-[var(--c-lime)] text-[var(--c-lime)] font-black text-xs uppercase animate-pulse shadow-[0_0_15px_var(--c-lime)] whitespace-nowrap z-20">
                {isMobile ? t("Tap a country to explore", "اضغط على أي دولة للبدء") : t("Hover over a country to explore", "مرر الماوس فوق أي دولة للبدء")}
              </div>
           )}

           {/* Desktop Floating Overlay (Only visible on MD+ screens when hovering or selected) */}
           {!isMobile && activeData && (
             <div className="hidden md:block absolute top-8 right-8 z-30 w-80 bg-white border-8 border-black shadow-[16px_16px_0px_#000] p-6 animate-in slide-in-from-right fade-in duration-300">
               {/* Quick exit if it's "selected" via click but user wants to close on desktop */}
               {activeCountryId && (
                  <button 
                    onClick={() => setActiveCountryId(null)}
                    className="absolute -top-6 -right-6 w-10 h-10 bg-red-600 text-white flex items-center justify-center border-4 border-black hover:scale-110 transition-transform shadow-[4px_4px_0px_#000]"
                  >
                    <X className="w-5 h-5" />
                  </button>
               )}
               <CountryInfoPanel data={activeData} />
             </div>
           )}
        </div>

      </div>

      {/* Mobile Bottom Sheet (Vaul) */}
      <Drawer open={isMobile && !!activeCountryId} onOpenChange={(open) => !open && setActiveCountryId(null)}>
        <DrawerContent className="bg-white border-t-8 border-black rounded-t-3xl overflow-hidden h-[80vh] font-sans" dir={lang === 'ar' ? 'rtl': 'ltr'}>
          <div className="w-12 h-2 bg-black/20 mx-auto mt-4 rounded-full" />
          <DrawerHeader className="text-left mt-2 hidden">
             <DrawerTitle>Country Details</DrawerTitle>
             <DrawerDescription>Localized payment and games</DrawerDescription>
          </DrawerHeader>
          <div className="p-6 md:p-8 overflow-y-auto">
             {activeData && <CountryInfoPanel data={activeData} />}
          </div>
          <DrawerFooter className="pt-2 px-6 pb-8">
            <DrawerClose className="w-full">
              <button className="w-full bg-black text-white font-black uppercase py-4 border-4 border-black hover:bg-[var(--c-orange)] hover:text-black transition-colors">
                {t("Close", "إغلاق")}
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
