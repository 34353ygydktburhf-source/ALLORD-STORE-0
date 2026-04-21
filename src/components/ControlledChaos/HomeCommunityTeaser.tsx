import React from "react";
import { Users, ArrowUpRight, Flame, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeCommunityTeaser() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white border-y-8 border-black relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--c-lime)] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--c-orange)] opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-[var(--c-orange)] text-black px-4 py-2 text-sm font-black uppercase border-4 border-black mb-6 rotate-2 shadow-[4px_4px_0px_#000]">
              <Flame className="w-5 h-5 fill-black" /> جديد في المجتمع
            </div>
            <h2 className="text-3xl md:text-7xl font-black uppercase mb-6 leading-[0.9] tracking-tighter">
              انضم لأكبر تجمع <br /> <span className="text-[var(--c-purple)] underline decoration-black decoration-8 underline-offset-4 md:underline-offset-8">للاعبين المحترفين</span>
            </h2>
            <p className="text-lg md:text-xl font-bold opacity-70 mb-8 max-w-2xl md:ml-0 md:mr-auto">
              بيع، اشترِ، وشحن في بيئة آمنة تماماً. مئات العروض تضاف يومياً من لاعبين مثلك. اكتشف التشكيلة الجديدة من حسابات ببجي وفري فاير الآن.
            </p>
            
            <Link 
              to="/community"
              className="group inline-flex items-center gap-4 bg-black text-[var(--c-lime)] px-8 py-6 text-xl font-black uppercase border-4 border-black shadow-[10px_10px_0px_var(--c-purple)] transition-all hover:-translate-y-2 hover:shadow-[15px_15px_0px_var(--c-purple)] active:translate-y-0 active:shadow-none"
            >
              استكشف المجتمع <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="w-full md:w-1/3 grid grid-cols-1 gap-4 rotate-3">
             <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 bg-[var(--c-lime)] border-2 border-black flex items-center justify-center">
                      <Users className="w-4 h-4 text-black" />
                   </div>
                   <span className="text-[10px] font-black uppercase opacity-60">بائع موثوق</span>
                </div>
                <p className="text-xs font-black uppercase mb-1">حساب ببجي ليفل 80</p>
                <p className="text-[10px] font-bold opacity-50 truncate">يحتوي على 15 سكن ميثيك ونوادر...</p>
             </div>
             
             <div className="bg-[var(--c-purple)] border-4 border-black p-4 shadow-[6px_6px_0px_#000] -translate-x-4">
                <div className="flex items-center gap-2 mb-2">
                   <MessageSquare className="w-4 h-4 text-black" />
                   <span className="text-[10px] font-black uppercase">مناقشة نشطة</span>
                </div>
                <p className="text-xs font-black uppercase mb-1 text-white">مين عايز يبدل حساب فري فاير؟</p>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-white"></div>)}
                </div>
             </div>

             <div className="bg-black text-[var(--c-orange)] border-4 border-black p-4 shadow-[6px_6px_0px_var(--c-purple)] -translate-x-2">
                <p className="text-xl font-black uppercase italic">The Lord's Choice 👑</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
