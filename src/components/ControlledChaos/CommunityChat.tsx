import React, { useState, useEffect, useRef } from "react";
import { useCommunity, ChatMessage } from "./CommunityContext";
import { useLogin } from "./LoginContext";
import { useLang } from "./LangContext";
import { verifyContent } from "@/lib/contentFilter";
import { X, Send, ShieldAlert, CheckCircle, AlertTriangle, ImagePlus } from "lucide-react";

interface CommunityChatProps {
  otherUserId: string;
  otherUserName: string;
  postId?: string;
  onClose: () => void;
}

export function CommunityChat({ otherUserId, otherUserName, postId, onClose }: CommunityChatProps) {
  const { userData } = useLogin();
  const { lang } = useLang();
  const { posts, getChatHistory, sendMessage, approveMessage, isAuthenticatedDev, requestMiddleman, middlemanRequests } = useCommunity();
  const [text, setText] = useState("");
  const [chatImageStr, setChatImageStr] = useState("");
  
  const currentUserId = isAuthenticatedDev ? "dev" : (userData?.contact || "guest123");
  const currentUserName = isAuthenticatedDev ? "AL LORD (Developer)" : (userData?.name || "Guest User");
  
  const messages = getChatHistory(currentUserId, otherUserId, postId);
  const contextPost = postId ? posts.find(p => p.id === postId) : null;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const hasRequestedMiddleman = middlemanRequests.some(r => 
    (r.userAId === currentUserId && r.userBId === otherUserId) || 
    (r.userAId === otherUserId && r.userBId === currentUserId)
  );

  const handleRequestMiddleman = () => {
    requestMiddleman(currentUserId, currentUserName, otherUserId, otherUserName, postId);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setChatImageStr(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (!text.trim() && !chatImageStr) return;
    
    // Content Filter Check
    const filter = verifyContent(text);
    if (!filter.isClean && (filter.type === 'profanity' || filter.type === 'religion')) {
      alert(lang === 'ar' ? 'يرجى الالتزام بلغة محترمة وتجنب الإساءة للأديان.' : 'Please maintain respectful language and avoid religious insults.');
      return;
    }

    sendMessage({
      senderId: currentUserId,
      senderName: currentUserName,
      receiverId: otherUserId,
      text: text,
      image: chatImageStr || undefined,
      postId: postId
    });
    setText("");
    setChatImageStr("");
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-[100dvh] md:h-[90vh] md:max-w-4xl bg-[var(--c-bg)] border-0 md:border-8 border-[var(--c-ink)] flex flex-col shadow-none md:shadow-[16px_16px_0px_#000] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[var(--c-ink)] text-[var(--c-bg)] p-3 md:p-6 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-black uppercase text-lg md:text-3xl leading-tight text-[var(--c-lime)]">{otherUserName}</h3>
            <p className="text-[9px] md:text-sm font-bold opacity-80 flex items-center gap-1 mt-0.5 md:mt-1">
              <ShieldAlert className="w-3.5 h-3.5 md:w-4 h-4 text-[var(--c-orange)]" /> 
              محادثة مشفرة - يمنع تبادل الروابط أو الأرقام
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center border-4 border-[var(--c-bg)] hover:bg-red-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5 md:w-6 h-6" />
          </button>
        </div>

        {/* Middleman Action Banner */}
        {!isAuthenticatedDev && (
          <div className={`shrink-0 p-2 border-b-4 border-[var(--c-ink)] flex items-center justify-between ${hasRequestedMiddleman ? 'bg-[var(--c-lime)]' : 'bg-[#fffdf0]'}`}>
            <span className="text-[10px] font-black uppercase flex items-center gap-1">
              {hasRequestedMiddleman ? (
                <><CheckCircle className="w-3 h-3 text-black" /> تم إرسال طلب تدخل لوسيط وتتم المراقبة الآن</>
              ) : (
                <><ShieldAlert className="w-3 h-3 text-[var(--c-orange)]" /> لتأمين التبادل وفتح الروابط المشفرة:</>
              )}
            </span>
            {!hasRequestedMiddleman && (
              <button 
                onClick={handleRequestMiddleman}
                className="bg-[var(--c-orange)] text-[var(--c-ink)] border-2 border-[var(--c-ink)] px-3 py-1 text-[10px] font-black uppercase hover:bg-black hover:text-[var(--c-orange)] transition-colors shadow-[2px_2px_0px_#000] active:translate-y-0.5 active:shadow-none"
              >
                دعوة وسيط
              </button>
            )}
          </div>
        )}

        {contextPost && messages.length === 0 && (
          <div className="shrink-0 p-3 bg-[var(--c-purple)] border-b-4 border-black text-black">
            <p className="text-[10px] uppercase font-black opacity-80 mb-1">بخصوص المنشور:</p>
            <h4 className="text-sm font-black truncate">{contextPost.title}</h4>
          </div>
        )}

        {/* Chat Log */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 md:p-8 space-y-4 md:space-y-6 bg-[var(--c-bg)] bg-[radial-gradient(#000_1px,transparent_0)] bg-[size:15px_15px] md:bg-[size:20px_20px] opacity-[0.98]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
              <MessageSquareIcon className="w-20 h-20 mb-4" />
              <p className="font-black text-xl uppercase">بداية قصة نجاح...</p>
              <p className="text-sm font-bold">كن محترفاً في تعاملك، ولا تتبادل الروابط.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.senderId === currentUserId;
              const isMiddlemanPending = msg.status === "pending_middleman";

              return (
                <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-200`}>
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-black uppercase opacity-60">
                      {msg.senderName} 
                      {msg.senderId === "dev" && <span className="text-[var(--c-orange)] ml-1">(وسيط)</span>}
                    </span>
                  </div>
                  
                  <div className={`relative max-w-[92%] md:max-w-[70%] p-3 md:p-4 border-[3px] md:border-4 border-[var(--c-ink)] ${isMine ? 'bg-[var(--c-lime)]' : 'bg-white'} ${isMiddlemanPending ? 'border-dashed border-[var(--c-orange)] bg-orange-50' : ''} shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000]`}>
                     {isMiddlemanPending && !isAuthenticatedDev && isMine && (
                       <div className="flex items-center gap-2 text-[10px] uppercase font-black text-red-600 mb-2 bg-red-100 p-1 border-2 border-red-200">
                         <AlertTriangle className="w-3 h-3 shrink-0" />
                         <span>هذه الرسالة تحتوي على وسيلة تواصل. مخفية في انتظار موافقة الإدارة.</span>
                       </div>
                     )}
                     
                     {isMiddlemanPending && !isAuthenticatedDev && !isMine && (
                       <div className="flex items-center gap-2 text-[10px] uppercase font-black text-[var(--c-orange)] mb-2 bg-orange-100 p-1 border-2 border-orange-200">
                         <ShieldAlert className="w-3 h-3 shrink-0" />
                         <span>رسالة مشفرة تحتوي على روابط/أرقام. يرجى طلب وسيط للمعاملة.</span>
                       </div>
                     )}

                     {msg.image && (
                       <img src={msg.image} alt="Upload" className={`max-h-48 rounded mb-2 border-2 border-black ${(isMiddlemanPending && !isAuthenticatedDev && !isMine) ? 'blur-md select-none' : ''}`} />
                     )}

                     {msg.text && (
                       <p className={`font-bold text-sm break-words whitespace-pre-wrap ${(isMiddlemanPending && !isAuthenticatedDev && !isMine) ? 'blur-sm select-none' : ''}`}>
                         {(isMiddlemanPending && !isAuthenticatedDev && !isMine) ? "xxxxxxxxxxxxxxx (Hidden for privacy rules) xxxxxxxxxxxxx" : msg.text}
                       </p>
                     )}

                     {isAuthenticatedDev && isMiddlemanPending && (
                       <div className="mt-3 pt-3 border-t-2 border-dashed border-black/20">
                         <p className="text-[10px] font-black text-[var(--c-orange)] uppercase mb-2">طلب وساطة مرصود</p>
                         <button 
                           onClick={() => approveMessage(msg.id)}
                           className="w-full bg-[var(--c-ink)] text-white py-1.5 text-xs font-black uppercase flex items-center justify-center gap-1 hover:bg-green-600 border-2 border-black"
                         >
                           <CheckCircle className="w-3 h-3" /> السماح للطرف الآخر بالرؤية
                         </button>
                       </div>
                     )}
                  </div>
                  <span className="text-[9px] font-bold opacity-40 mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <div className="p-3 md:p-6 bg-white border-t-4 md:border-t-8 border-[var(--c-ink)] flex flex-col gap-3 md:gap-4 shrink-0">
          {chatImageStr && (
            <div className="relative self-start">
              <img src={chatImageStr} alt="Preview" className="h-20 w-20 md:h-32 md:w-32 object-cover border-4 border-[var(--c-ink)]" />
              <button onClick={() => setChatImageStr("")} className="absolute -top-2.5 -right-2.5 bg-red-600 text-white w-7 h-7 flex items-center justify-center border-4 border-[var(--c-ink)] hover:scale-110">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="flex gap-2 h-14 md:h-20">
            <label className="w-14 md:w-20 bg-[var(--c-lime)] flex items-center justify-center border-2 md:border-4 border-[var(--c-ink)] hover:bg-[var(--c-purple)] hover:text-white cursor-pointer transition-colors shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none">
              <ImagePlus className="w-6 h-6 md:w-8 md:h-8 cursor-pointer text-[var(--c-ink)]" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="اكتب..."
              className="flex-1 border-2 md:border-4 border-[var(--c-ink)] px-3 md:px-4 text-sm md:text-xl font-bold focus:outline-none focus:border-[var(--c-orange)] bg-[var(--c-bg)]"
            />
            <button 
              onClick={handleSend}
              disabled={!text.trim() && !chatImageStr}
              className="w-14 md:w-32 bg-[var(--c-ink)] flex items-center justify-center hover:bg-[var(--c-orange)] transition-colors border-2 md:border-4 border-[var(--c-ink)] text-[var(--c-lime)] hover:text-black disabled:opacity-50 disabled:bg-[var(--c-ink)] shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none"
            >
              <Send className="w-6 h-6 md:w-8 md:h-8 -ml-0.5 mt-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageSquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
