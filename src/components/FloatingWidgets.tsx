"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { formatTakaDecimals } from "@/data/catalog";
import {
  BagIcon,
  ChatIcon,
  ChevronUpIcon,
  CloseIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function FloatingWidgets() {
  const { totalItems, subtotal, openCart } = useStore();
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<
    { from: "agent" | "user"; text: string }[]
  >([
    {
      from: "agent",
      text: "Assalamu Alaikum! Welcome to GhorerBazar. How can we help you today?",
    },
  ]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      {
        from: "agent",
        text: "Thanks for messaging GhorerBazar! For fastest order confirmation or product help, call +8809642922922 or click WhatsApp below.",
      },
    ]);
    setChatInput("");
  };

  return (
    <>
      {/* Fixed Right-Edge Floating Cart Badge */}
      <button
        type="button"
        onClick={openCart}
        aria-label="Open floating cart"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[80] flex flex-col overflow-hidden rounded-l-[6px] shadow-[0_4px_14px_rgba(0,0,0,0.18)] border border-r-0 border-[#f48721] cursor-pointer group"
      >
        <div className="bg-[#f48721] group-hover:bg-[#df7412] text-white px-2.5 py-2 flex flex-col items-center justify-center transition-colors min-w-[68px]">
          <BagIcon className="h-5 w-5 mb-0.5" />
          <span className="text-[11.5px] font-bold leading-tight">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>
        <div className="bg-white px-2 py-1 text-center text-[11.5px] font-bold text-[#f48721]">
          {formatTakaDecimals(subtotal)}
        </div>
      </button>

      {/* Bottom-Right Controls: Scroll To Top + Live Support Chat */}
      <div className="fixed bottom-5 right-5 z-[85] flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="w-[310px] sm:w-[330px] rounded-xl bg-white border border-gray-200 shadow-[0_16px_40px_rgba(0,0,0,0.18)] overflow-hidden mb-1">
            <div className="bg-[#041f1e] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">GhorerBazar Live Support</p>
                <p className="text-[11px] text-[#f48721]">
                  Safe &amp; Reliable Food Helpdesk
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3.5 space-y-2.5 max-h-[230px] overflow-y-auto bg-[#faf8f4]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-3 py-2 text-xs leading-relaxed max-w-[85%] ${
                      m.from === "user"
                        ? "bg-[#f48721] text-white"
                        : "bg-white border border-gray-200 text-[#222831]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100 bg-white">
              <a
                href="tel:8809642922922"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded bg-[#faf8f4] border border-gray-200 py-1.5 text-[11px] font-semibold text-[#222831] hover:border-[#f48721]"
              >
                <PhoneIcon className="h-3.5 w-3.5 text-[#f48721]" />
                <span>Call Hotline</span>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=8801321208940&text=Hello%20GhorerBazar!"
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded bg-[#e8f8ed] border border-[#088d2d]/20 py-1.5 text-[11px] font-semibold text-[#088d2d] hover:bg-[#d8f3e0]"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <form
              onSubmit={sendChat}
              className="flex items-center gap-1.5 p-2.5 border-t border-gray-200 bg-white"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-[#f48721]"
              />
              <button
                type="submit"
                className="rounded-md bg-[#f48721] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#df7412] cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="h-10 w-10 rounded-full bg-[#f48721] text-white border-2 border-white shadow-[0_4px_14px_rgba(244,135,33,0.45)] flex items-center justify-center hover:bg-[#df7412] transition-all cursor-pointer"
          >
            <ChevronUpIcon className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open support chat"
          className="h-12 w-12 rounded-full bg-[#f48721] text-white shadow-[0_6px_18px_rgba(244,135,33,0.45)] flex items-center justify-center hover:bg-[#df7412] transition-transform hover:scale-105 cursor-pointer"
        >
          <ChatIcon className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
