import React, { useState, useRef } from "react";
import { X, Send, AlertTriangle, ShieldCheck, Clock, Camera } from "lucide-react";
import { useLang } from "./LangContext";
import { useComplaints } from "./ComplaintContext";
import { useNotifications } from "./NotificationContext";
import { verifyContent } from "@/lib/contentFilter";

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComplaintModal({ isOpen, onClose }: ComplaintModalProps) {
  const { t, lang } = useLang();
  const { submitComplaint } = useComplaints();
  const { addNotification } = useNotifications();
  
  const [description, setDescription] = useState("");
  const [imageStr, setImageStr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        addNotification(t("File too large", "الملف كبير جداً"), t("Max size is 2MB", "الحد الأقصى هو 2 ميجابايت"), "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImageStr(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError(t("Please describe your problem", "يرجى وصف مشكلتك"));
      return;
    }

    // 1. Content Filter Check
    const filter = verifyContent(description, false); // Don't block links in complaints, they might be proof
    if (!filter.isClean && filter.type === 'profanity') {
      setError(t("Please maintain a respectful language", "يرجى الالتزام بلغة محترمة"));
      addNotification(t("Restricted Content", "محتوى مرفوض"), t("Profanity is not allowed", "لا يسمح باستخدام الألفاظ النابية"), "error");
      return;
    }

    if (!filter.isClean && filter.type === 'religion') {
      setError(t("Please avoid religious sensitivities", "يرجى تجنب الإساءة للأديان"));
      addNotification(t("Restricted Content", "محتوى مرفوض"), t("Religious insults are not allowed", "الإساءة للأديان ممنوعة تماماً"), "error");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate network delay
    setTimeout(() => {
      submitComplaint(description, imageStr || undefined);
      setIsSubmitting(false);
      addNotification(
        t("Complaint Submitted", "تم إرسال الشكوى"),
        t("Thank you. AL LORD will review it soon.", "شكراً لك. سيقوم اللورد بمراجعتها قريباً."),
        "success"
      );
      onClose();
      setDescription("");
      setImageStr("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-[calc(100%-16px)] md:max-w-lg bg-[#fffbf0] border-[6px] md:border-8 border-black shadow-[8px_8px_0px_#000] md:shadow-[16px_16px_0px_#000] overflow-hidden animate-in zoom-in-95 duration-200"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="bg-black text-[#fffbf0] p-4 md:p-6 flex items-center justify-between border-b-[6px] md:border-b-8 border-black relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
          <div className="flex items-center gap-3 md:gap-4 relative z-10">
            <div className="p-1.5 md:p-2 bg-[#ff5e00] border-2 border-white rotate-3">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-none mb-1">
                {t("Formal Complaint", "شكوى رسمية")}
              </h3>
              <p className="text-[9px] md:text-[10px] font-bold text-[#ccff00] uppercase tracking-widest">{t("Secure Reporting System", "نظام بلاغات آمن")}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-4 border-white hover:bg-[#ff5e00] hover:text-black hover:border-black transition-all rotate-45 group shrink-0"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:scale-125" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-4 md:space-y-6 max-h-[65vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar bg-white/50">
          
          <div className="bg-[#ccff00]/10 border-2 md:border-4 border-dashed border-[#ccff00] p-3 md:p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
            <p className="text-[11px] md:text-xs font-bold leading-relaxed">
              {t("All complaints are strictly confidential and reviewed only by official AL LORD administrators.", "جميع الشكاوى سرية للغاية وتتم مراجعتها فقط من قبل مسؤولي متجر اللورد الرسميين.")}
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <label className="block text-xs md:text-sm font-black uppercase tracking-widest border-l-8 border-[#ff5e00] pl-3">
              {t("Describe the issue", "وصف المشكلة بالتفصيل")}
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError(null);
              }}
              placeholder={t("What happened? Include order ID if relevant...", "ماذا حدث؟ اذكر رقم الطلب إذا كان له علاقة...")}
              className="w-full h-32 md:h-40 border-4 border-black p-3 md:p-4 text-sm md:text-base font-bold focus:outline-none focus:bg-[#fffdf0] focus:border-[#ff5e00] transition-colors resize-none placeholder:opacity-30"
            />
            <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black uppercase opacity-60">
              <span>{t("Max 500 characters", "بحد أقصى 500 حرف")}</span>
              <span className={description.length > 450 ? "text-red-500" : ""}>{description.length}/500</span>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
             <label className="block text-xs md:text-sm font-black uppercase tracking-widest border-l-8 border-[#b084ff] pl-3">
                {t("Attach Screenshot (Optional)", "إرفاق صورة إثبات (اختياري)")}
             </label>
             
             {imageStr ? (
               <div className="relative inline-block group">
                  <img src={imageStr} alt="Preview" className="h-32 md:h-40 w-full object-cover border-4 border-black shadow-[4px_4px_0px_#000]" />
                  <button 
                    onClick={() => setImageStr("")}
                    className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 bg-red-600 text-white border-4 border-black flex items-center justify-center hover:bg-black transition-all"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
               </div>
             ) : (
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="h-24 md:h-32 border-4 border-dashed border-black/20 bg-black/5 flex flex-col items-center justify-center gap-2 md:gap-3 cursor-pointer hover:bg-black/10 hover:border-black/50 transition-all"
               >
                 <div className="p-2 md:p-3 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_#000]">
                    <Camera className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <span className="text-[10px] md:text-xs font-black uppercase opacity-60">{t("Click to upload proof", "اضغط لرفع الإثبات")}</span>
                 <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  accept="image/*"
                  onChange={handleImageUpload}
                 />
               </div>
             )}
          </div>

          {error && (
            <div className="bg-red-500 text-white p-2 md:p-3 border-4 border-black font-black text-[10px] md:text-xs uppercase flex items-center gap-2 animate-shake">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t-[6px] md:border-t-8 border-black bg-white flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <button 
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full md:flex-1 bg-black text-[#fffbf0] py-4 md:py-5 text-base md:text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_#ff5e00] md:shadow-[6px_6px_0px_#ff5e00] hover:bg-[#ff5e00] hover:text-black hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Clock className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
            ) : (
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            )}
            {isSubmitting ? t("Sending...", "جاري الإرسال...") : t("Send Complaint", "إرسال البلاغ")}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full md:w-auto px-6 md:px-8 py-3 md:py-5 border-4 border-black font-black uppercase text-xs md:text-sm hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.1)] md:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none"
          >
            {t("Cancel", "إلغاء")}
          </button>
        </div>
      </div>
    </div>
  );
}
