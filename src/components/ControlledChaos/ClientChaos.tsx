import React from "react";

export function ClientChaos() {
  const tools = [
    { name: "REACT", icon: "⚛️" },
    { name: "TAILWIND", icon: "🎨" },
    { name: "GSAP", icon: "✨" },
    { name: "TYPESCRIPT", icon: "📘" },
    { name: "FIGMA", icon: "🎯" },
    { name: "VITE", icon: "⚡" },
  ];

  return (
    <section className="py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "var(--c-bg)" }}>
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--c-ink)] opacity-30 whitespace-nowrap overflow-hidden mb-12">
        {Array(20).fill("TECH_STACK.EXE ").join("")}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {tools.map((t, i) => (
            <div key={i} className="border-4 border-[var(--c-ink)] p-8 flex flex-col items-center justify-center aspect-video hover:bg-[var(--c-lime)] transition-colors group">
              <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">{t.icon}</span>
              <span className="text-sm font-black uppercase tracking-widest">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
