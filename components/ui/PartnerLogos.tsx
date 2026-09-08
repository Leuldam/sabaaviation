"use client";

const partners = [
  // Airlines & Aviation Leaders
  {
    name: "Ethiopian Airlines",
    category: "Airline",
    logo: "/images/partners/ethiopian-airlines.svg",
  },
  {
    name: "Emirates",
    category: "Airline",
    logo: "/images/partners/emirates.svg",
  },
  {
    name: "Qatar Airways",
    category: "Airline",
    logo: "/images/partners/qatar-airways.svg",
  },
  {
    name: "Turkish Airlines",
    category: "Airline",
    logo: "/images/partners/turkish-airlines.svg",
  },
  {
    name: "Lufthansa",
    category: "Airline",
    logo: "/images/partners/lufthansa.svg",
  },
  {
    name: "Kenya Airways",
    category: "Airline",
    logo: "/images/partners/kenya-airways.svg",
  },
  // Luxury Hospitality & Ethiopian Partner Hotels
  {
    name: "Sheraton Addis",
    category: "Luxury Hotel",
    logo: "/images/partners/sheraton.svg",
  },
  {
    name: "Marriott Executive Apartments",
    category: "Luxury Hotel",
    logo: "/images/partners/marriott.svg",
  },
  {
    name: "Ramada Addis",
    category: "Hotel",
    logo: "/images/partners/ramada.svg",
  },
  {
    name: "Radisson Blu Addis Ababa",
    category: "Luxury Hotel",
    logo: "/images/partners/radisson-blu.svg",
  },
  {
    name: "Ethiopian Skylight Hotel",
    category: "Aviation Hotel",
    logo: "/images/partners/skylight.png",
  },
  {
    name: "Hilton Addis Ababa",
    category: "Hotel",
    logo: "/images/partners/hilton.svg",
  },
  {
    name: "Hyatt Regency Addis Ababa",
    category: "Luxury Hotel",
    logo: "/images/partners/hyatt.svg",
  },
];

export default function PartnerLogos() {
  return (
    <section className="py-14 bg-midnight border-b border-white/5 overflow-hidden flex flex-col items-center select-none">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-px bg-warm-gold/40" />
        <p className="text-[11px] uppercase tracking-[0.28em] text-white font-medium text-center">
          Trusted by Global Aviation Leaders &amp; Premier Ethiopian Hospitality
        </p>
        <span className="w-8 h-px bg-warm-gold/40" />
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right gradient masks for smooth entrance/exit */}
        <div className="absolute top-0 left-0 w-24 sm:w-40 h-full bg-gradient-to-r from-midnight via-midnight/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 sm:w-40 h-full bg-gradient-to-l from-midnight via-midnight/90 to-transparent z-10 pointer-events-none" />

        {/* Seamless 2-track infinite marquee */}
        <div className="flex w-max group-hover:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex items-center gap-14 sm:gap-20 shrink-0 pr-14 sm:pr-20 animate-marquee">
            {partners.map((partner, index) => (
              <div
                key={`track1-${index}-${partner.name}`}
                className="flex flex-col items-center justify-center group/logo"
              >
                <div className="flex items-center justify-center h-14 sm:h-16 w-32 sm:w-44 px-3 py-1 rounded-lg transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-105">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain pointer-events-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] text-white/30 tracking-wider uppercase mt-1 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          {/* Track 2 (Exact identical clone for continuous loop without jump) */}
          <div
            aria-hidden="true"
            className="flex items-center gap-14 sm:gap-20 shrink-0 pr-14 sm:pr-20 animate-marquee"
          >
            {partners.map((partner, index) => (
              <div
                key={`track2-${index}-${partner.name}`}
                className="flex flex-col items-center justify-center group/logo"
              >
                <div className="flex items-center justify-center h-14 sm:h-16 w-32 sm:w-44 px-3 py-1 rounded-lg transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-105">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain pointer-events-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] text-white/30 tracking-wider uppercase mt-1 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
