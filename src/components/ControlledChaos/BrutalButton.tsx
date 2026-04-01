import React from "react";

interface BrutalButtonProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function BrutalButton({ children, color = "bg-[#ccff00]", className = "" }: BrutalButtonProps) {
  return (
    <button className={`group relative inline-block ${className}`}>
      <div className={`absolute inset-0 ${color} translate-x-2 translate-y-2 border-2 border-[var(--c-ink)] transition-transform group-hover:translate-x-1 group-hover:translate-y-1`} />
      <div className={`relative ${color} border-2 border-[var(--c-ink)] px-6 py-3 font-bold uppercase tracking-wider text-[var(--c-ink)] transition-transform group-hover:translate-x-1 group-hover:translate-y-1`}>
        {children}
      </div>
    </button>
  );
}
