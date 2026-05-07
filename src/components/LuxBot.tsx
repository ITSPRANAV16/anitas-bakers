"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, Mic } from "lucide-react";
import { DEFAULT_PRODUCTS, APP_CONFIG } from "@/lib/firebase";

export default function LuxBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string | React.ReactNode; sender: "bot" | "user" }[]>([
    { text: "Hello! I am Anita's Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text, sender: "user" }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(text);
      setMessages(prev => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (txt: string): React.ReactNode => {
    const q = txt.toLowerCase();
    
    if (q.includes("cake")) {
      const cakes = DEFAULT_PRODUCTS.filter(p => p.cat === "cakes").slice(0, 3);
      return (
        <div className="flex flex-col gap-2">
          <p>Here are some of our popular cakes:</p>
          <div className="flex flex-col gap-2 mt-2">
            {cakes.map(p => (
              <div key={p.id} className="bg-[#1a1614] border border-gold-main/30 rounded-lg overflow-hidden flex flex-col">
                <div className="relative h-24 w-full">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <div className="p-2 flex justify-between items-center">
                  <div>
                    <div className="text-white text-xs font-semibold">{p.name}</div>
                    <div className="text-gold-main text-xs font-bold">{p.price}</div>
                  </div>
                  <button 
                    onClick={() => window.open(\`https://wa.me/\${APP_CONFIG.WHATSAPP_NUM}?text=I want to order \${p.name}\`, "_blank")}
                    className="bg-gold-main text-black text-[0.65rem] px-2 py-1 rounded font-bold"
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (q.includes("address") || q.includes("location") || q.includes("shop")) {
      return "📍 Our Address: Dutt Mandir Jawal, Narsingpur (Ishwarpur). Please visit us! 😊";
    }

    if (q.includes("order")) {
      return "🛍️ You can order by clicking the 'Order Now' button on any product, or by messaging us on WhatsApp!";
    }

    return "I am a simple AI assistant. You can ask me about our 'cakes', 'address', or how to 'order'!";
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 w-[340px] max-w-[calc(100vw-40px)] h-[500px] max-h-[calc(100vh-120px)] bg-[#0e0c0a]/95 backdrop-blur-xl border border-gold-main/30 rounded-2xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 origin-bottom-right
          ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1614] to-[#2a2420] p-4 border-b border-gold-main/20 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-main flex items-center justify-center text-xl shadow-inner">
              👩‍🍳
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Anita's Assistant</div>
              <div className="text-[#4ade80] text-xs flex items-center gap-1">
                <span className="text-[10px]">●</span> Online
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gold-main/20">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed animate-fade-in-up
                ${msg.sender === "bot" 
                  ? "bg-white/5 text-gray-200 self-start rounded-bl-sm" 
                  : "bg-gradient-to-br from-gold-main to-gold-dark text-black font-medium self-end rounded-br-sm shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                }
              `}
            >
              {msg.text}
            </div>
          ))}
          
          {isTyping && (
            <div className="bg-white/5 self-start rounded-2xl rounded-bl-sm p-4 animate-fade-in-up">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-gold-main rounded-full animate-pulse-bot" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 bg-gold-main rounded-full animate-pulse-bot" style={{ animationDelay: "200ms" }}></div>
                <div className="w-1.5 h-1.5 bg-gold-main rounded-full animate-pulse-bot" style={{ animationDelay: "400ms" }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Chips */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {["🧁 Cakes", "🍞 Breads", "📍 Address"].map(chip => (
            <button 
              key={chip}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap bg-gold-main/10 border border-gold-main/20 text-gold-main px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gold-main/20 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#0b0908] border-t border-white/5 flex gap-2 items-center shrink-0">
          <button className="text-gold-main p-2 hover:bg-gold-main/10 rounded-full transition-colors opacity-70 hover:opacity-100">
            <Mic size={18} />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/30"
          />
          <button 
            onClick={() => handleSend(inputValue)}
            className="text-gold-main p-2 hover:bg-gold-main/10 rounded-full transition-colors opacity-70 hover:opacity-100"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>
      </div>

      {/* FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-br from-gold-main to-gold-dark shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center text-black hover:scale-110 transition-transform duration-300
          ${!isOpen && "animate-[pulseBot_2s_infinite]"}
        `}
        aria-label="Toggle Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} className="fill-black" />}
      </button>
    </div>
  );
}
