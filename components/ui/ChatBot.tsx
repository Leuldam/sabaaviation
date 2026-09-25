"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const WHATSAPP_PHONE = "251115516897";
const TELEGRAM_USERNAME = "sabaaviation";

const WHATSAPP_GREEN = "#25D366";
const TELEGRAM_BLUE = "#229ED9";
const NAVY_DEEP = "#063252";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Hello SABA Aviation 24/7 Operations Desk, I would like to request support."
  )}`;
  const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3.5"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* WhatsApp button */}
      <AnimatePresence>
        {isOpen && (
          <motion.a
            key="whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with SABA Aviation on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.6 }}
            transition={{ type: "spring", damping: 18, stiffness: 320, delay: 0.06 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center rounded-full text-white"
            style={{
              width: 52,
              height: 52,
              background: `linear-gradient(155deg, ${WHATSAPP_GREEN} 0%, #1da851 100%)`,
              boxShadow: `0 8px 20px -4px ${WHATSAPP_GREEN}66, inset 0 1px 0 rgba(255,255,255,0.35)`,
            }}
          >
            <span className="absolute inset-0 rounded-full ring-1 ring-white/40 pointer-events-none" />
            <FaWhatsapp size={24} className="drop-shadow-sm" />

            {/* Tooltip label */}
            <span
              className="absolute right-full mr-4 whitespace-nowrap text-xs font-semibold text-white rounded-lg px-3 py-1.5 shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ backgroundColor: NAVY_DEEP }}
            >
              WhatsApp
              <span
                className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45"
                style={{ backgroundColor: NAVY_DEEP }}
              />
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Telegram button */}
      <AnimatePresence>
        {isOpen && (
          <motion.a
            key="telegram"
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with SABA Aviation on Telegram"
            initial={{ opacity: 0, y: 16, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.6 }}
            transition={{ type: "spring", damping: 18, stiffness: 320 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center rounded-full text-white"
            style={{
              width: 52,
              height: 52,
              background: `linear-gradient(155deg, ${TELEGRAM_BLUE} 0%, #1a86b8 100%)`,
              boxShadow: `0 8px 20px -4px ${TELEGRAM_BLUE}66, inset 0 1px 0 rgba(255,255,255,0.35)`,
            }}
          >
            <span className="absolute inset-0 rounded-full ring-1 ring-white/40 pointer-events-none" />
            <FaTelegramPlane size={22} className="drop-shadow-sm" />

            {/* Tooltip label */}
            <span
              className="absolute right-full mr-4 whitespace-nowrap text-xs font-semibold text-white rounded-lg px-3 py-1.5 shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ backgroundColor: NAVY_DEEP }}
            >
              Telegram
              <span
                className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45"
                style={{ backgroundColor: NAVY_DEEP }}
              />
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Main FAB toggle */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close messaging options" : "Open messaging options"}
        aria-expanded={isOpen}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04243b] ${isOpen ? "bg-[#0a0a0a]" : ""
          }`}
        style={
          isOpen
            ? { boxShadow: "0 10px 28px -6px rgba(0,0,0,0.55)" }
            : {
              background: "linear-gradient(155deg, #0a4b7c 0%, #073f67 55%, #04243b 100%)",
              boxShadow: "0 10px 28px -6px rgba(4,36,59,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
            }
        }
      >
        <span
          className={`absolute inset-0 rounded-full pointer-events-none ${isOpen ? "ring-1 ring-white/15" : "ring-1 ring-white/20"
            }`}
        />

        {/* Pulsing ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#073f67]/30 pointer-events-none" />
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-white"
          >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.div>
        </AnimatePresence>

        {/* WhatsApp + Telegram corner badges when closed */}
        {!isOpen && (
          <div className="absolute -top-1.5 -right-1.5 flex items-center -space-x-1.5">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-white border-2"
              style={{ backgroundColor: WHATSAPP_GREEN, borderColor: NAVY_DEEP }}
            >
              <FaWhatsapp size={10} />
            </span>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-white border-2"
              style={{ backgroundColor: TELEGRAM_BLUE, borderColor: NAVY_DEEP }}
            >
              <FaTelegramPlane size={9} />
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}