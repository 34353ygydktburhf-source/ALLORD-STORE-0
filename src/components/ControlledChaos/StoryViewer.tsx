import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminStatus, AdminStatus } from "./AdminStatusContext";
import { useLang } from "./LangContext";

interface StoryViewerProps {
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ onClose }) => {
  const { statuses, markStatusAsSeen } = useAdminStatus();
  const { t } = useLang();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const progressTimer = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const currentStatus = statuses[currentIndex];

  useEffect(() => {
    markStatusAsSeen();
  }, [markStatusAsSeen]);

  // Handle auto-advance
  useEffect(() => {
    if (isPaused || !currentStatus) return;

    const duration = currentStatus.type === "video" ? 30000 : 5000; // Default 30s for video if not loaded
    const speed = 100; // Update every 100ms
    const increment = (speed / duration) * 100;

    progressTimer.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, speed);

    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [currentIndex, isPaused, currentStatus]);

  const handleNext = () => {
    if (currentIndex < statuses.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  if (!currentStatus) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-0 md:p-12 touch-none select-none overflow-hidden">
      {/* Dynamic Background Aura */}
      <div 
        className="absolute inset-0 opacity-40 blur-[150px] scale-150 pointer-events-none transition-all duration-1000"
        style={{ backgroundImage: `url(${currentStatus.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <div className="relative w-full h-[100dvh] md:h-full md:max-w-[450px] md:aspect-[9/19] bg-black rounded-none md:rounded-[50px] border-0 md:border-[12px] border-black shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col group/viewer">
        
        {/* Progress System - Minimalist */}
        <div className="absolute top-6 inset-x-6 z-[100] flex gap-1.5 px-2">
          {statuses.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ 
                  width: i < currentIndex ? "100%" : i === currentIndex ? `${progress}%` : "0%" 
                }}
              />
            </div>
          ))}
        </div>

        {/* Cinematic Header */}
        <div className="absolute top-12 inset-x-6 z-[150] flex items-center justify-between text-white p-2">
          <div className="flex items-center gap-3">
             <div className="w-11 h-11 rounded-full border-2 border-white/20 p-0.5 bg-gradient-to-tr from-[var(--c-lime)] to-[var(--c-orange)] shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-black">
                  <img src="https://i.pinimg.com/736x/0b/91/a5/0b91a5919e54ac44629a8f5ca01e84b3.jpg" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-widest text-white drop-shadow-md">AL LORD STORE</span>
                <span className="text-[9px] font-bold opacity-60 uppercase tracking-tighter">{new Date(currentStatus.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
            {currentStatus.type === "video" && (
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
                className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-red-500/80 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Immersive Content Area */}
        <div className="flex-1 flex items-center justify-center relative bg-black shadow-inner">
          {currentStatus.type === "image" ? (
            <img 
              src={currentStatus.url} 
              className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-active/viewer:scale-[0.98]"
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            />
          ) : (
            <video 
              ref={videoRef}
              src={currentStatus.url}
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleNext}
              className="w-full h-full object-contain relative z-10"
            />
          )}

          {/* Background Media Blur to fill containers */}
          <div 
            className="absolute inset-0 opacity-20 blur-2xl scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${currentStatus.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />

          {/* Universal Interaction HUD */}
          <div className="absolute inset-y-0 left-0 w-1/4 z-[110] cursor-w-resize" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
          <div className="absolute inset-y-0 right-0 w-1/4 z-[110] cursor-e-resize" onClick={(e) => { e.stopPropagation(); handleNext(); }} />
          
          {/* Pause HUD */}
          {isPaused && (
            <div className="absolute inset-0 z-[120] flex items-center justify-center bg-black/10 backdrop-blur-[2px] pointer-events-none">
               <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 animate-pulse">
                  <div className="flex gap-2">
                    <div className="w-3 h-10 bg-white rounded-full shadow-xl" />
                    <div className="w-3 h-10 bg-white rounded-full shadow-xl" />
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Caption Container */}
        {(currentStatus.caption || currentStatus.action) && (
          <div className="absolute bottom-0 inset-x-0 z-[100] pt-32 pb-12 px-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center gap-6 pointer-events-none">
             
             {/* Action Button */}
             {currentStatus.action && (
                <Link 
                   to={currentStatus.action.link}
                   onClick={(e) => {
                      e.stopPropagation();
                      onClose(); // Close viewer when navigating
                   }}
                   className="pointer-events-auto flex items-center gap-3 bg-[var(--c-lime)] text-black px-8 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:bg-white hover:scale-110 active:scale-95 transition-all group/btn"
                >
                   {currentStatus.action.label}
                   <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
             )}

             {currentStatus.caption && (
                <p className="text-center text-white text-base md:text-lg font-bold leading-relaxed tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                   {currentStatus.caption}
                </p>
             )}
          </div>
        )}
      </div>

      {/* Modern Desktop Navigation Helpers */}
      <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-6">
         <button onClick={handlePrev} disabled={currentIndex === 0} className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all disabled:opacity-5">
            <ChevronLeft className="w-10 h-10" />
         </button>
      </div>
      <div className="hidden lg:flex fixed right-12 top-1/2 -translate-y-1/2 flex-col gap-6">
         <button onClick={handleNext} className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <ChevronRight className="w-10 h-10" />
         </button>
      </div>
    </div>
  );
};
