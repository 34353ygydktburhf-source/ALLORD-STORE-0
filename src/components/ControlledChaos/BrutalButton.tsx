import React from "react";

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function BrutalButton({ children, color = "bg-[#ccff00]", className = "", ...props }: BrutalButtonProps) {
  return (
    <button {...props} className={`group relative inline-block ${className}`}>
      <div className={`absolute inset-0 ${color} translate-x-1.5 translate-y-1.5 border-2 border-[var(--c-ink)] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[2px_2px_0px_#000]`} />
      <div className={`relative ${color} border-2 border-[var(--c-ink)] px-6 py-3 font-black uppercase text-xs md:text-sm tracking-wider text-[var(--c-ink)] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5`}>
        {children}
      </div>
    </button>
  );
}
