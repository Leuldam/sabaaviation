// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/navigation";
import { FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-midnight/95 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <nav className="w-full flex items-center justify-between h-20 px-5 sm:px-8 lg:px-10 xl:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-40 sm:w-48 lg:w-56 h-20 sm:h-16 lg:h-20">
            <Image
              src="/images/sabalogo.png"
              alt="SABA Aviation Logo"
              fill
              className="object-contain object-left pr-14 transition-transform group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6 ml-auto">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 text-[15px] font-helvetica font-thin uppercase tracking-widest transition-all duration-200 ${
                  isActive(item.href) ? "text-warm-gold" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Menu toggle button */}
        <button
          className="flex ml-6 lg:ml-8 items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition-colors focus:outline-none group text-white"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <FiX className="w-5 h-5" />
          ) : (
            <FiMenu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* ── Full-screen overlay ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-midnight/98 backdrop-blur-xl z-40 flex flex-col lg:flex-row font-helvetica"
            style={{ top: "80px" }}
          >
            {/* Left: Nav links with stagger */}
            <ul className="flex flex-col justify-center gap-0 px-10 lg:px-20 pt-8 pb-4 lg:w-1/2">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full overflow-hidden"
                >
                  <Link
                    href={item.href}
                    className={`group block py-3.5 lg:py-4 text-2xl lg:text-4xl font-black uppercase tracking-tight border-b border-white/10 transition-all duration-300 hover:pl-4 ${
                      isActive(item.href)
                        ? "text-warm-gold pl-4"
                        : "text-white/75 hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="inline-flex items-center gap-4">
                      {/* Small index number */}
                      <span className="text-white/20 text-sm font-normal tabular-nums w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.name}
                    </span>
                  </Link>
                </motion.li>
              ))}

              {/* Contact CTA */}
              <motion.li
                className="mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 + navigation.length * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-warm-gold text-midnight font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-all duration-300 group"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.li>
            </ul>

            {/* Right panel — desktop only */}
            <motion.div
              className="hidden lg:flex flex-col justify-end items-start lg:w-1/2 px-20 pb-20 border-l border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4">
                Get in touch
              </p>
              <p className="text-white text-3xl font-light leading-relaxed mb-8 max-w-sm">
                We operate 24/7 for seamless aviation support across Ethiopia.
              </p>
              <div className="flex flex-col gap-3 text-sm text-white/50">
                <span>✦ Addis Ababa Bole International Airport</span>
                <span>✦ +251 911 123 456</span>
                <span>✦ info@sabaaviation.com</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
