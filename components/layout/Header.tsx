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

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
            <div className="flex flex-col gap-1.5 w-6">
              <span className="w-4 h-0.5 bg-white rounded-full mx-auto transition-all"></span>
              <span className="w-6 h-0.5 bg-white rounded-full transition-all"></span>
              <span className="w-4 h-0.5 bg-white rounded-full mx-auto transition-all"></span>
            </div>
          )}
        </button>
      </nav>

      {/* ── Dropdown Menu ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.01 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* responsive panel:
                - mobile: full screen (inset-0) with no rounded corners
                - desktop: right floating panel with rounded corners (aligned with menu button, positioned lower)
            */}
            <motion.aside
              key="panel"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 48 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={
                "fixed z-50 bg-white shadow-2xl p-6 overflow-auto scrollbar-hide " +
                "inset-0 md:inset-auto md:top-24 md:right-6 md:w-80 md:max-w-[38%] md:max-h-[calc(100vh-120px)] " +
                "rounded-none md:rounded-lg"
              }
              role="dialog"
              aria-modal="true"
            >
              <button
                className="absolute top-4 right-4 text-gray-600 z-10 hover:text-gray-900 transition-colors"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="mt-2 font-helvetica space-y-6 text-gray-800">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-sm font-helvetica font-bold text-dark uppercase tracking-wider mb-3">
                    saba
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        href="/about"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block"
                      >
                        About Us
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <Link
                        href="/operations"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block"
                      >
                        Operations
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        href="/safety-quality"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block"
                      >
                        Safety & Quality
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Link
                        href="/careers"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block"
                      >
                        Careers
                      </Link>
                    </motion.li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                    Our Services
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        href="/services"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block font-medium"
                      >
                        All Services
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Link
                        href="/services/flight-support"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        Flight Support
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        href="/services/ground-handling"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        Ground Handling
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <Link
                        href="/services/passenger-services"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        Passenger Services
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        href="/services/vip-business-aviation"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        VIP & Business Aviation
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <Link
                        href="/services/cargo-logistics"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        Cargo & Logistics
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        href="/services/fuel-coordination"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        Fuel Coordination
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 }}
                    >
                      <Link
                        href="/services/ground-transportation"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        Ground Transportation
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Link
                        href="/services/crew-services"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block pl-3"
                      >
                        Crew Support Services
                      </Link>
                    </motion.li>
                  </ul>
                </div>

                {/* Additional Links */}
                <div className="pt-4 border-t border-gray-200">
                  <ul className="space-y-2 text-sm">
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.75 }}
                    >
                      <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block font-medium"
                      >
                        Contact Us
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Link
                        href="/privacy-policy"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block text-xs text-gray-500"
                      >
                        Privacy Policy
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85 }}
                    >
                      <Link
                        href="/terms"
                        onClick={() => setMenuOpen(false)}
                        className="hover:text-warm-gold transition-colors block text-xs text-gray-500"
                      >
                        Terms & Conditions
                      </Link>
                    </motion.li>
                  </ul>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
