// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-midnight/95 backdrop-blur-xl shadow-lg shadow-black/20"
        : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
    >
      <nav className="container-max flex items-center justify-between h-20 px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-40 sm:w-48 lg:w-56 h-20 sm:h-16 lg:h-20">
            <Image
              src="/images/sabalogo.png"
              alt="SABA Aviation Logo"
              fill
              className="object-contain object-left transition-transform group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 text-[15px] font-medium transition-all duration-200 ${isActive(item.href)
                  ? "text-warm-gold"
                  : "text-white "
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="ml-4">
            <Link href="/contact" className="btn-outline text-[10px] sm:text-xs py-2.5 px-6">
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-midnight/98 backdrop-blur-xl transition-all duration-400 ${menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        style={{ top: "80px" }}
      >
        <ul className="flex flex-col items-center pt-12 gap-2 px-6">
          {navigation.map((item) => (
            <li key={item.href} className="w-full">
              <Link
                href={item.href}
                className={`block text-center py-3 text-lg font-medium rounded-lg transition-all ${isActive(item.href)
                  ? "text-warm-gold bg-warm-gold/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="w-full mt-4">
            <Link
              href="/contact"
              className="btn-primary w-full justify-center py-3.5"
              onClick={() => setMenuOpen(false)}
            >
              CONTACT US
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
