"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Ethiopian Airlines", logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Ethiopian_Airlines_Logo.svg" },
  { name: "Qatar Airways", logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Qatar_Airways_logo.svg" },
  { name: "Emirates", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" },
  { name: "Turkish Airlines", logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Turkish_Airlines_logo_2019_compact.svg" },
  { name: "Kenya Airways", logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Kenya_Airways_Logo.svg" },
  { name: "Lufthansa", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lufthansa_Logo_2018.svg" },
];

export default function PartnerLogos() {
  return (
    <section className="py-12 bg-midnight border-b border-white/5 overflow-hidden flex flex-col items-center">
      <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-8 text-center">
        Trusted by Global Aviation Leaders
      </p>
      
      {/* Marquee Container */}
      <div className="relative w-full max-w-[100vw] flex overflow-hidden group">
        {/* Left/Right fading gradients for smooth entering/exiting */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-midnight to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-midnight to-transparent z-10 pointer-events-none" />
        
        {/* Track */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {/* We duplicate the array a few times to ensure infinite scroll fills the screen */}
          {[...Array(4)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex items-center gap-24 px-12">
              {partners.map((partner, i) => (
                <div 
                  key={`${arrayIndex}-${i}`}
                  className="flex items-center justify-center h-16 w-40 opacity-50 grayscale contrast-125 brightness-150 hover:grayscale-0 hover:opacity-100 hover:brightness-100 transition-all duration-300"
                >
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-full max-w-full object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
