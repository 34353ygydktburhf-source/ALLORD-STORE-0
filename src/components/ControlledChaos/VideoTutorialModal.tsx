import React from "react";
import { X, Play, HelpCircle, ShieldCheck } from "lucide-react";
import { useLang } from "./LangContext";

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  gameName: string;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  gameName 
}) => {
  const { t, lang } = useLang();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* Header Ribbon */}
        <div className={`absolute -top-4 ${lang === 'ar' ? '-right-4' : '-left-4'} bg-[var(--c-orange)] border-4 border-black px-4 py-2 rotate-[-2deg] z-20 shadow-[4px_4px_0px_#000]`}>
           <span className="text-sm font-black uppercase flex items-center gap-2">
              <Play className="w-4 h-4" /> {t(gameName + " Tutorial", "شرح شحن " + gameName)}
           </span>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute -top-4 ${lang === 'ar' ? '-left-4' : '-right-4'} w-12 h-12 bg-white border-4 border-black flex items-center justify-center hover:bg-[var(--c-orange)] transition-colors z-20 shadow-[4px_4px_0px_#000]`}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="relative border-4 border-black bg-black shadow-[15px_15px_0px_var(--c-lime)] overflow-hidden aspect-video">
           {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
              <iframe 
                src={videoUrl.replace('watch?v=', 'embed/').split('&')[0]} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
           ) : (
              <video 
                 src={videoUrl} 
                 autoPlay 
                 controls 
                 className="w-full h-full object-contain"
              />
           )}
        </div>

        {/* Bottom Info */}
        <div className="mt-8 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
           <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--c-lime)] border-4 border-black flex items-center justify-center shrink-0">
                 <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="text-xl font-black uppercase mb-1">{t("How to find your Player ID?", "كيف تجد الرقم التعريفي (ID) الخاص بك؟")}</h4>
                 <p className="text-sm font-bold opacity-70">
                   {t(`Watch the video above carefully. Usually it's located in the main profile menu or settings page of ${gameName}.`, `شاهد الفيديو أعلاه بتركيز. عادة ما تجد الـ ID في قائمة الملف الشخصي الرئيسية أو صفحة الإعدادات في لعبة ${gameName}.`)}
                 </p>
              </div>
           </div>
           
           <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase opacity-50 border-t-2 border-black/5 pt-4">
              <ShieldCheck className="w-4 h-4" /> Official AL LORD STORE Tutorial System
           </div>
        </div>
      </div>
    </div>
  );
};
