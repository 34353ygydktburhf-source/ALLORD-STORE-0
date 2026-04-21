import React from "react";
import { useAdminStatus } from "./AdminStatusContext";

interface StatusRingProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
}

export const StatusRing: React.FC<StatusRingProps> = ({ children, onClick, size = "md", shape = "circle" }) => {
  const { hasActiveStatus, isStatusSeen, openViewer } = useAdminStatus();

  const handleRingClick = (e: React.MouseEvent) => {
    if (hasActiveStatus) {
      e.stopPropagation();
      openViewer();
    } else if (onClick) {
      onClick();
    }
  };

  const isCircle = shape === "circle";
  
  // Offset based on size
  const offsetClass = {
    sm: "-inset-1",
    md: "-inset-1.5",
    lg: "-inset-2",
  }[size];

  return (
    <div 
      onClick={handleRingClick}
      className={`relative inline-block cursor-pointer group transition-all hover:scale-105 active:scale-90 pointer-events-auto`}
    >
      {/* The Status Ring / Frame */}
      {hasActiveStatus && (
        <>
          {/* Notification Badge */}
          {!isStatusSeen && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-[60] whitespace-nowrap bg-[var(--c-lime)] text-black text-[10px] font-black px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] animate-bounce">
              {shape === 'circle' ? 'حالة جديدة' : 'متوفر حالة جديدة'}
            </div>
          )}

          {/* External Glow / Border */}
          <div 
            className={`absolute ${offsetClass} ${isCircle ? 'rounded-full' : 'rounded-none'} border-[3px] z-0 transition-all duration-500
              ${isStatusSeen 
                ? 'border-black/10' 
                : 'border-transparent'
              }`}
            style={!isStatusSeen ? {
              backgroundImage: "linear-gradient(var(--c-bg), var(--c-bg)), linear-gradient(45deg, #ccff00, #ff5e00, #b084ff)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
              boxShadow: "0 0 15px rgba(255, 94, 0, 0.4)"
            } : {
              // Solid border for seen
              backgroundColor: "white",
              border: "3px solid #e5e7eb", // Light gray solid border
              boxShadow: "2px 2px 0px rgba(0,0,0,0.1)" // Subtle brutalist shadow
            }}
          />
          
          {/* Extra pulse blur for unseen statuses */}
          {!isStatusSeen && (
            <div className={`absolute ${offsetClass} ${isCircle ? 'rounded-full' : 'rounded-none'} bg-gradient-to-tr from-[#ccff00] via-[#ff5e00] to-[#b084ff] animate-pulse opacity-30 -z-10 blur-sm`} />
          )}
        </>
      )}

      {/* Internal Content (Untouched) */}
      <div className="relative z-10 transition-transform flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
