// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/navigation";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-midnight border-t border-borders">
      {/* Main footer content */}
      <div className="container-max section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <div className="relative w-40 sm:w-56 h-12 sm:h-16">
                <Image
                  src="/images/sabalogo.png"
                  alt="SABA Aviation Logo"
                  fill
                  className="object-contain object-left transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Premium aviation ground handling and flight support services connecting operators to
              Ethiopia and beyond.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted text-sm hover:text-warm-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-2.5">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted text-sm hover:text-warm-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-muted text-sm">
                <MapPin size={16} className="text-warm-gold mt-0.5 flex-shrink-0" />
                Bole International Airport, Addis Ababa, Ethiopia
              </li>
              <li className="flex items-center gap-2.5 text-muted text-sm">
                <Phone size={16} className="text-warm-gold flex-shrink-0" />
                +251-11-551-6897
              </li>
              <li className="flex items-center gap-2.5 text-muted text-sm">
                <Mail size={16} className="text-warm-gold flex-shrink-0" />
                info@sabaaviation.com
              </li>
              <li className="flex items-center gap-2.5 text-muted text-sm">
                <Clock size={16} className="text-warm-gold flex-shrink-0" />
                24/7 Operations Support
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-max px-5 sm:px-8 lg:px-12 py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} SABA Aviation Service & Flight Support PLC. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-12">
            <p className="text-muted/60 text-xs">
              Aviation Support, Ethiopia, Beyond.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/40 font-semibold tracking-widest uppercase">Follow Us</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
