import React from "react";

interface BrutalFlagProps {
  code: string;
  className?: string;
  size?: string;
}

export const BrutalFlag = ({ code, className = "", size = "w-6 h-6" }: BrutalFlagProps) => (
  <div className={`${size} rounded-full overflow-hidden border-2 border-[var(--c-ink)] shadow-[2px_2px_0px_var(--c-ink)] shrink-0 bg-white inline-flex items-center justify-center ${className}`}>
    <img 
      src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`} 
      alt={code}
      className={`w-full h-full object-cover ${code.toLowerCase() === 'ps' ? 'object-left scale-125' : 'object-center scale-150'}`}
    />
  </div>
);
