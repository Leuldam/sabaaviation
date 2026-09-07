"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ChevronDown, User, Bot } from "lucide-react";

type Message = {
  id: number;
  type: "bot" | "user";
  text: string;
};

// Predefined questions and answers for the "only reply" bot
const qaDatabase = [
  {
    question: "What services do you offer?",
    answer:
      "We offer comprehensive aviation support including Flight Support, Ground Handling, Passenger & Crew Services, VIP Aviation, Cargo Logistics, and Fuel Coordination.",
  },
  {
    question: "How can I contact Operations?",
    answer:
      "Our operations team is available 24/7. You can reach them at info@sabaaviation.com or call +251-11-551-6897.",
  },
  {
    question: "Where are you located?",
    answer:
      "Our headquarters and main operations are based at Bole International Airport in Addis Ababa, Ethiopia.",
  },
  {
    question: "Do you handle VIP flights?",
    answer:
      "Yes! We provide elite, discreet, and highly personalized handling for VIP flights, corporate jets, and air ambulances.",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hello! Welcome to SABA Aviation. How can I help you today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleQuestionClick = (qa: typeof qaDatabase[0]) => {
    // Add user question
    const userMsg: Message = { id: Date.now(), type: "user", text: qa.question };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate bot thinking then replying
    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, type: "bot", text: qa.answer };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-warm-gold hover:bg-light-gold text-midnight rounded-full flex items-center justify-center shadow-lg shadow-black/40 transition-colors"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-3rem)] bg-midnight border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dark-navy px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-warm-gold flex items-center justify-center">
                  <span className="text-midnight font-bold text-xs">S</span>
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold">SABA Support</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-white/50 text-[10px] uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-midnight/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.type === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-dark-navy flex items-center justify-center flex-shrink-0 mt-1 border border-white/5">
                      <Bot size={12} className="text-warm-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.type === "user"
                        ? "bg-warm-gold text-midnight rounded-tr-sm font-medium"
                        : "bg-dark-navy text-white/90 rounded-tl-sm border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies (Input Area) */}
            <div className="p-4 bg-dark-navy border-t border-white/10">
              <p className="text-white/40 text-xs mb-3 text-center">Select an option to reply</p>
              <div className="flex flex-col gap-2">
                {qaDatabase.map((qa, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(qa)}
                    className="text-left px-4 py-2.5 rounded-xl border border-warm-gold/30 hover:bg-warm-gold/10 text-warm-gold text-sm transition-colors"
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
