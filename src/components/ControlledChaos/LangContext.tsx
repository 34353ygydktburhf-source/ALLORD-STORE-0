import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ar";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, ar: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));
  const t = (en: string, ar: string) => (lang === "en" ? en : ar);

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
