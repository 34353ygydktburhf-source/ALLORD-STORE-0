import React, { useState, useRef } from "react";
import { X, Mail, Phone, Loader2, CheckCircle, LogIn, Plus, Minus, Info, ChevronUp, ChevronDown, Copy, Check, User } from "lucide-react";
import { useLogin } from "./LoginContext";
import { useLang } from "./LangContext";

export function LoginModal() {
  const { isLoginOpen, closeLogin, login } = useLogin();
  const { t, lang } = useLang();
  
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);
  const termsScrollRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  if (!isLoginOpen) return null;

  const scrollModal = (offset: number) => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  const scrollTerms = (offset: number) => {
    if (termsScrollRef.current) {
      termsScrollRef.current.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || !username || !agreedToTerms) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // Data is moved to login() call in the success screen or right here
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      const googleData = {
        name: "Google User",
        contact: "google_account@gmail.com",
        method: "google" as const,
        date: new Date().toLocaleDateString()
      };
      login("user", googleData);
      setStatus("idle");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => status !== "loading" && closeLogin()}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-auto animate-in fade-in zoom-in duration-300">
        {/* Shadow */}
        <div className="absolute inset-0 bg-[var(--c-orange)] translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]" />

        <div className="relative border-4 border-[var(--c-ink)] p-4 pr-14" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-ink)" }}>
          {/* Close */}
          {status !== "loading" && status !== "success" && (
            <button
              onClick={closeLogin}
              className="absolute top-4 right-4 w-8 h-8 border-2 border-[var(--c-ink)] flex items-center justify-center hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)] transition-colors z-30"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Custom Modal Scroll Arrows */}
          <div className="absolute top-16 bottom-4 right-2 w-10 flex flex-col gap-2 z-20">
            <button 
              onClick={() => scrollModal(-100)} 
              className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <div className="flex-1 border-x-4 border-[var(--c-ink)]/20 mx-auto w-1 my-1"></div>
            <button 
              onClick={() => scrollModal(100)} 
              className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          <div 
            ref={modalScrollRef}
            className="max-h-[85vh] py-8 overflow-y-auto scroll-smooth touch-pan-y [-webkit-overflow-scrolling:touch] pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-2"
          >

          {status === "success" ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-16 h-16 text-[var(--c-lime)] mb-4" />
              <h3 className="text-3xl font-black uppercase mb-2">
                {t("Welcome Back!", "مرحباً بك مجدداً!")}
              </h3>
              <div className="my-6 bg-[var(--c-lime)] text-[var(--c-ink)] p-4 border-4 border-[var(--c-ink)] shadow-[4px_4px_0px_#000] rotate-2 w-full max-w-xs mx-auto">
                <p className="font-black text-sm uppercase mb-1">{t("Your Welcome Gift", "هدية الترحيب الخاصة بك")}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 text-2xl font-black tracking-widest bg-white px-4 py-2 border-4 border-[var(--c-ink)] shadow-[2px_2px_0px_var(--c-ink)] -rotate-1">WELCOME</div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("WELCOME");
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                        login("user"); // Changed from closeLogin() to login("user")
                        setStatus("idle");
                        // Reset form
                        setInputValue("");
                        setUsername("");
                        setAgreedToTerms(false);
                        setShowTerms(false);
                      }, 1200);
                    }}
                    className={`w-12 h-12 flex items-center justify-center border-4 border-[var(--c-ink)] transition-all ${copied ? 'bg-green-500 text-white' : 'bg-[var(--c-orange)] text-[var(--c-ink)] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000]'}`}
                  >
                    {copied ? <Check className="w-6 h-6" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs font-bold mt-4">{t("Use this code at checkout for 15% off!", "استخدم هذا الكود عند الدفع لخصم 15%!")}</p>
              </div>
              <p className="text-sm font-bold opacity-70 mt-4">
                {t("Login successful. Redirecting...", "تم تسجيل الدخول بنجاح. جاري التوجيه...")}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 pr-8">
                <h3 className="text-4xl font-black uppercase mb-2 leading-none">
                  <span className="font-marker text-[var(--c-purple)]">{t("LOG IN", "تسجيل")}</span><br />
                  {t("TO YOUR ACCOUNT", "الدخول")}
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest opacity-50">
                  {t("Access your orders and favorites", "الوصول لطلباتك ومفضلتك")}
                </p>
              </div>

              <div className="space-y-6">
                {/* Social Login */}
                <button 
                  onClick={handleGoogleLogin}
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-3 border-4 border-[var(--c-ink)] px-4 py-3 text-sm font-black uppercase hover:bg-black/5 transition-colors"
                >
                  {status === "loading" ? (
                     <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                      {t("Continue with Google", "المتابعة باستخدام جوجل")}
                    </>
                  )}
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-[var(--c-ink)] opacity-20"></div>
                  </div>
                  <span className="relative px-4 text-xs font-black uppercase tracking-widest" style={{ backgroundColor: "var(--c-bg)" }}>
                    {t("OR", "أو")}
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Tabs */}
                  <div className="flex border-4 border-[var(--c-ink)] p-1 bg-[var(--c-ink)]/5">
                    <button
                      type="button"
                      onClick={() => setLoginMethod("email")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-black uppercase transition-colors ${loginMethod === "email" ? "bg-[var(--c-ink)] text-[var(--c-bg)]" : "hover:bg-[var(--c-ink)]/10"}`}
                    >
                      <Mail className="w-4 h-4" /> {t("Email", "بريد إلكتروني")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("phone")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-black uppercase transition-colors ${loginMethod === "phone" ? "bg-[var(--c-ink)] text-[var(--c-bg)]" : "hover:bg-[var(--c-ink)]/10"}`}
                    >
                      <Phone className="w-4 h-4" /> {t("Phone", "رقم الهاتف")}
                    </button>
                  </div>

                  {/* Username Input */}
                  <div>
                    <label className="block text-sm font-black uppercase mb-1">
                      {t("Username", "اسم المستخدم")} *
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t("Enter your username", "أدخل اسم المستخدم")}
                      className={`w-full border-4 border-[var(--c-ink)] px-4 py-3 text-lg font-bold bg-transparent focus:outline-none focus:border-[var(--c-orange)] transition-colors ${lang === "ar" ? "text-right" : "text-left"}`}
                      disabled={status === "loading"}
                      required
                    />
                  </div>

                  {/* Input */}
                  <div>
                    <label className="block text-sm font-black uppercase mb-1">
                      {loginMethod === "email" ? t("Email Address", "البريد الإلكتروني") : t("Phone Number", "رقم الهاتف")} *
                    </label>
                    <input
                      type={loginMethod === "email" ? "email" : "tel"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={loginMethod === "email" ? t("Enter your email", "أدخل بريدك الإلكتروني") : t("Enter your phone", "أدخل رقم الهاتف")}
                      className={`w-full border-4 border-[var(--c-ink)] px-4 py-3 text-lg font-bold bg-transparent focus:outline-none focus:border-[var(--c-orange)] transition-colors ${lang === "ar" ? "text-right" : "text-left"}`}
                      disabled={status === "loading"}
                      required
                    />
                  </div>

                  {/* Terms & Conditions (Collapsible) */}
                  <div className="space-y-3">
                    <div className="border-4 border-[var(--c-ink)] p-4 bg-[var(--c-purple)]/10">
                      <div 
                        className="flex justify-between items-center cursor-pointer select-none"
                        onClick={() => setShowTerms(!showTerms)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--c-purple)] animate-pulse">
                            <Info className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-xs font-black uppercase">{t("Terms & Conditions", "الشروط والأحكام")}</span>
                        </div>
                        <div className="text-[var(--c-ink)]">
                          {showTerms ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </div>
                      </div>

                      {showTerms && (
                        <div className="mt-4 pt-4 border-t-4 border-[var(--c-ink)] relative transition-all duration-300">
                          {/* Custom Scroll Arrows */}
                          <div className={`absolute top-4 bottom-0 ${lang === "ar" ? "left-0" : "right-0"} w-8 flex flex-col gap-1 z-20`}>
                            <button 
                              type="button"
                              onClick={() => scrollTerms(-50)} 
                              className="w-8 h-10 flex items-center justify-center bg-[var(--c-orange)] border-2 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
                            >
                              <ChevronUp className="w-5 h-5" />
                            </button>
                            <div className="flex-1 border-x-2 border-[var(--c-ink)]/20 mx-auto w-1 my-1"></div>
                            <button 
                              type="button"
                              onClick={() => scrollTerms(50)} 
                              className="w-8 h-10 flex items-center justify-center bg-[var(--c-orange)] border-2 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]"
                            >
                              <ChevronDown className="w-5 h-5" />
                            </button>
                          </div>

                          <div 
                            ref={termsScrollRef}
                            className={`h-40 overflow-y-auto text-[10px] font-bold leading-relaxed scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${lang === "ar" ? "pl-10" : "pr-10"}`}
                          >
                            {lang === "ar" ? (
                              <div className="text-right space-y-2">
                                <p className="font-black text-xs underline">سياسة الخدمة وحقوق المستخدم</p>
                                <p>1. يحق للموقع تعديل الأسعار والخدمات في أي وقت.</p>
                                <p>2. يلتزم المستخدم بتقديم بيانات صحيحة (ID الحساب، اسم المستخدم).</p>
                                <p>3. المتجر غير مسؤول عن أي أخطاء ناتجة عن إدخال بيانات خاطئة من قبل العميل.</p>
                                <p>4. يتم تسليم الطلبات في الإطار الزمني الموضح لكل لعبة.</p>
                                <p>5. الخصوصية: يتم تشفير كافة البيانات ولا يتم مشاركتها مع أي طرف ثالث.</p>
                                <p>6. حقوق العميل: يحق للعميل استرداد المبلغ في حال عدم تنفيذ الطلب خلال 24 ساعة.</p>
                              </div>
                            ) : (
                              <div className="text-left space-y-2">
                                <p className="font-black text-xs underline">Service Policy & User Rights</p>
                                <p>1. The site reserves the right to modify prices and services at any time.</p>
                                <p>2. The user is committed to providing correct data (Account ID, Username).</p>
                                <p>3. The store is not responsible for any errors resulting from incorrect data input by the customer.</p>
                                <p>4. Orders are delivered within the time frame specified for each game.</p>
                                <p>5. Privacy: All data is encrypted and not shared with any third party.</p>
                                <p>6. User Rights: The customer has the right to a refund if the order is not fulfilled within 24 hours.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => setAgreedToTerms(!agreedToTerms)}
                      className={`w-full flex items-center gap-3 p-4 border-4 transition-all ${agreedToTerms ? 'bg-[var(--c-lime)] border-[var(--c-ink)]' : 'bg-white border-[var(--c-ink)] shadow-[4px_4px_0px_var(--c-ink)]'}`}
                    >
                      <div className={`w-6 h-6 border-4 border-[var(--c-ink)] flex items-center justify-center ${agreedToTerms ? 'bg-[var(--c-ink)]' : 'bg-white'}`}>
                        {agreedToTerms && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="text-[11px] font-black uppercase text-left">
                        {t("I read and agree to all terms", "لقد قرأت وأوافق على كافة الشروط")}
                      </span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading" || !inputValue || !username || !agreedToTerms}
                    className={`w-full bg-[var(--c-ink)] text-[var(--c-bg)] px-6 py-4 text-lg font-black uppercase flex items-center justify-center gap-2 transition-all ${
                      status === "loading" || !inputValue || !username || !agreedToTerms 
                        ? "opacity-40 cursor-not-allowed" 
                        : "hover:opacity-90 hover:shadow-[4px_4px_0px_var(--c-orange)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    }`}
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" /> {t("Log In", "تسجيل الدخول")}
                      </>
                    )}
                  </button>

                  {/* Guest Login */}
                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-[var(--c-ink)] opacity-10"></div>
                    </div>
                    <span className="relative px-4 text-[10px] font-black uppercase tracking-widest opacity-40" style={{ backgroundColor: "var(--c-bg)" }}>
                      {t("OR JUST BROWSE", "أو تصفح فقط")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => login("guest")}
                    disabled={status === "loading"}
                    className="w-full border-4 border-[var(--c-ink)] border-dashed px-6 py-3 text-sm font-black uppercase flex items-center justify-center gap-2 hover:bg-[var(--c-lime)] hover:border-solid transition-all"
                  >
                    <User className="w-4 h-4" /> {t("Continue as Guest", "المتابعة كضيف")}
                  </button>
                </form>
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
