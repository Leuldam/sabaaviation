// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { FaBehance, FaDribbble, FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white w-full">
      <div className="w-full px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Tagline */}
          <div>
            <h3 className="text-2xl md:text-3xl font-light leading-tight mb-6">
              SABA Aviation<br />
              Service & Flight<br />
              Support
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional aviation ground handling and flight support services in Ethiopia.
            </p>
          </div>

          {/* Addis Ababa Location */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-medium">
              ADDIS ABABA, ETHIOPIA
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:info@sabaaviation.com"
                className="block hover:text-[#FF6B35] transition-colors"
              >
                info@sabaaviation.com
              </a>
              <p className="text-gray-400">+251 11 551 6897</p>
              <p className="text-gray-400 leading-relaxed text-sm">
                Bole International Airport,<br />
                Addis Ababa, Ethiopia
              </p>
              <Link
                href="/contact"
                className="inline-block text-white hover:text-[#FF6B35] transition-colors mt-3 text-sm underline"
              >
                SEE ON MAP →
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-medium">
              OUR SERVICES
            </h4>
            <div className="space-y-2 text-sm">
              <Link href="/services/ground-handling" className="block text-gray-400 hover:text-white transition-colors">
                Ground Handling
              </Link>
              <Link href="/services/flight-support" className="block text-gray-400 hover:text-white transition-colors">
                Flight Support
              </Link>
              <Link href="/services/vip-business-aviation" className="block text-gray-400 hover:text-white transition-colors">
                VIP Services
              </Link>
              <Link
                href="/services"
                className="inline-block text-white hover:text-[#FF6B35] transition-colors mt-3 text-sm underline"
              >
                VIEW ALL SERVICES →
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-medium">
              GET IN TOUCH
            </h4>
            <p className="text-sm text-gray-400 mb-4">Available 24/7</p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors text-xs uppercase tracking-wider mb-6"
            >
              CONTACT US
            </Link>

            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-3 font-medium">
                FOLLOW US
              </p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6B35] transition-colors flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6B35] transition-colors flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6B35] transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6B35] transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} SABA Aviation Service & Flight Support PLC. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/" className="hover:text-white transition-colors uppercase">
                HOME
              </Link>
              <Link href="/about" className="hover:text-white transition-colors uppercase">
                ABOUT
              </Link>
              <Link href="/services" className="hover:text-white transition-colors uppercase">
                SERVICES
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors uppercase">
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
