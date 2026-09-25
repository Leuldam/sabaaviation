// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { FaBehance, FaDribbble, FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white w-full font-[Inter,ui-sans-serif,system-ui,sans-serif]">
      <div className="w-full px-6 md:px-12 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Tagline */}
          <div>
            <h3 className="text-2xl md:text-3xl font-light leading-tight mb-6">
              SABA Aviation
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted gateway to seamless airport operations across Ethiopia and East Africa.
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
                className="block text-gray-300 hover:text-white transition-colors"
              >
                info@sabaaviation.com
              </a>
              <a
                href="tel:+251115516897"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                +251 11 551 6897
              </a>
              <a
                href="https://maps.google.com/?q=Bole+International+Airport+Addis+Ababa+Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors leading-relaxed"
              >
                Bole International Airport,<br />
                Addis Ababa, Ethiopia
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="hidden md:block">
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-medium">
              OUR SERVICES
            </h4>
            <div className="space-y-2 text-sm">
              <Link href="/services/ground-handling" className="block text-gray-400 hover:text-white transition-colors">
                Ground Operations
              </Link>
              <Link href="/services/flight-support" className="block text-gray-400 hover:text-white transition-colors">
                Airport Facilitation
              </Link>
              <Link href="/services/vip-business-aviation" className="block text-gray-400 hover:text-white transition-colors">
                VIP Services
              </Link>
              <Link
                href="/services"
                className="inline-block text-white hover:text-[#052f4d] transition-colors mt-3 text-sm  "
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
            <p className="text-sm hidden md:block text-gray-400 mb-4">Available 24/7</p>
            <Link
              href="/contact"
              className="hidden md:inline-block rounded-full px-6 py-2 border border-white text-white hover:bg-[#FAF8F3] hover:text-black transition-colors text-xs uppercase tracking-wider mb-6"
            >
              CONTACT US
            </Link>

            <div>
              <p className="text-[10px] hidden md:block uppercase tracking-[0.15em] text-gray-500 mb-3 font-medium">
                FOLLOW US
              </p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#052f4d] transition-colors flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#052f4d] transition-colors flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#052f4d] transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#052f4d] transition-colors flex items-center justify-center"
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
