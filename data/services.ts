// data/services.ts
import {
  Compass,
  Settings,
  ConciergeBell,
  Coffee,
  Crown,
  Boxes,
  Fuel,
  CarFront,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  slug: string;
  image: string;
  details: {
    longDescription: string;
    features: string[];
    benefits: string[];
  };
}

export const services: Service[] = [
  {
    icon: Compass,
    title: "Flight and Permit Coordination",
    subtitle: "One Point of Coordination",
    description:
      "Digitally integrated tracking to expedite operating permits, overflight clearances, and landing authorizations.",
    slug: "flight-support",
    image: "/images/service_flight_support.jpg",
    details: {
      longDescription: "Our comprehensive flight support services are designed to ensure your aircraft operates seamlessly within Ethiopia and the surrounding region. We handle the complex regulatory and operational requirements, from securing overflight and landing permits to meticulous flight planning and weather briefing. By partnering with SABA Aviation, flight crews and operators can rely on accurate, real-time information and proactive coordination to avoid delays and optimize routing.",
      features: [
        "Overflight and Landing Clearances",
        "Computerized Flight Planning (CFP)",
        "Weather NOTAMs & Route Analysis",
        "Slot Coordination & PPR",
        "ATC Flight Plan Filing",
        "Navigation & Ground Communication Support"
      ],
      benefits: [
        "Guaranteed regulatory compliance across regional airspaces",
        "Reduced administrative burden for flight crews",
        "Proactive problem-solving to prevent operational delays"
      ]
    }
  },
  {
    icon: Settings,
    title: "Ramp and Crew Support",
    subtitle: "Turnaround Oversight",
    description:
      "Pre-arrival verification of fueling, catering, ground transportation, and hotel accommodations completed at least two hours prior to arrival.",
    slug: "ground-handling",
    image: "/images/service_ground_handling.jpg",
    details: {
      longDescription: "SABA Aviation offers world-class ground handling services tailored to scheduled airlines, charter flights, and cargo operators. Our highly trained ramp agents and specialized ground support equipment (GSE) ensure safe, efficient, and rapid aircraft turnarounds. From pushback and towing to baggage loading and lavatory services, we adhere strictly to international IATA and ISAGO safety standards.",
      features: [
        "Ramp Handling & Aircraft Marshalling",
        "Baggage & Cargo Loading/Unloading",
        "GPU, ASU, and Pushback Services",
        "Lavatory and Potable Water Services",
        "Cabin Cleaning and Restocking",
        "De-icing Operations (where applicable)"
      ],
      benefits: [
        "Minimized turnaround times maximizing aircraft utilization",
        "Strict adherence to international safety and quality standards",
        "Modern, reliable Ground Support Equipment (GSE)"
      ]
    }
  },
  {
    icon: ConciergeBell,
    title: "VIP/CIP Meet-and-Greet",
    subtitle: "Premium Passenger Journeys",
    description:
      "Confidential, high-touch terminal facilitation and expedited service in close coordination with security authorities.",
    slug: "passenger-services",
    image: "/images/service_passenger.jpg",
    details: {
      longDescription: "We elevate the passenger experience by providing seamless terminal services from curbside to the cabin. Our professional passenger service agents are trained to deliver courteous, culturally aware, and highly efficient assistance. Whether managing check-in counters for commercial airlines or providing bespoke VIP escorts, we ensure a smooth journey through the airport.",
      features: [
        "Check-in, Ticketing, and Boarding Assistance",
        "Meet & Assist Services (Arrivals/Departures)",
        "Lost & Found / Baggage Tracing",
        "Special Assistance (Wheelchair, Unaccompanied Minors)",
        "Lounge Access Coordination",
        "Immigration and Customs Fast-Track"
      ],
      benefits: [
        "Enhanced passenger satisfaction and airline brand loyalty",
        "Smooth navigation through complex airport terminals",
        "Dedicated care for VIPs and vulnerable passengers"
      ]
    }
  },
  {
    icon: Crown,
    title: "On-Ground Operations",
    subtitle: "Welfare & Readiness",
    description:
      "Ground handling liaison and support for non-scheduled flights customized to operator requirements.",
    slug: "vip-business-aviation",
    image: "/images/service_vip_aviation.jpg",
    details: {
      longDescription: "SABA Aviation provides elite, discreet, and highly personalized handling for VIP flights, heads of state, corporate jets, and air ambulances. We understand the unique demands of general and business aviation, prioritizing absolute privacy, security, and flexibility. Our dedicated VIP agents coordinate every detail, ensuring a flawless experience for high-net-worth individuals and executives.",
      features: [
        "Access to FBO / VIP Lounges",
        "Discreet Tarmac Vehicle Access (where permitted)",
        "VIP Catering from Premium Local Providers",
        "Luxury Ground Transportation Coordination",
        "Enhanced Aircraft Security & Guarding",
        "Bespoke Concierge & Personal Shopper Services"
      ],
      benefits: [
        "Absolute privacy and discretion for high-profile passengers",
        "Unmatched flexibility to accommodate schedule changes",
        "A premium end-to-end luxury travel experience"
      ]
    }
  },
  {
    icon: Boxes,
    title: "Cargo & Freight Facilitation",
    subtitle: "Transparent Supply Chains",
    description:
      "Rapid, transparent, and compliant cargo movements across the aviation supply chain.",
    slug: "cargo-logistics",
    image: "/images/service_cargo.jpg",
    details: {
      longDescription: "Our comprehensive cargo handling solutions cater to freighter operators and belly-cargo on passenger flights. SABA Aviation ensures the safe, secure, and expeditious movement of all types of freight, including perishables, live animals, dangerous goods, and oversized cargo. We liaise closely with customs authorities to facilitate rapid clearance and seamless supply chain transitions.",
      features: [
        "ULD Build-up and Breakdown",
        "Specialized Cargo Handling (AVI, PER, DGR, VAL)",
        "Document Processing & Customs Brokerage",
        "Secure Warehousing & Storage Coordination",
        "Freighter Ramp Handling",
        "Cargo Security Screening"
      ],
      benefits: [
        "Maintained integrity of temperature-sensitive and high-value cargo",
        "Expedited customs processing avoiding costly delays",
        "Trained experts ensuring full compliance with IATA DGR"
      ]
    }
  },
  {
    icon: Fuel,
    title: "Aviation Fuel Solutions",
    subtitle: "Reliable Uplift Coordination",
    description:
      "Dependable fuel coordination and supplier management to optimize flight economics.",
    slug: "fuel-coordination",
    image: "/images/service_flight_support.jpg",
    details: {
      longDescription: "Aviation fuel is one of the most critical operational requirements. SABA Aviation acts as your reliable liaison to secure competitive fuel rates and guarantee timely uplifts. We partner exclusively with certified, reputable into-plane suppliers to ensure that the fuel provided meets all international quality standards (Jet A-1 / Avgas) and is delivered safely to your aircraft.",
      features: [
        "Jet A-1 and Avgas Uplift Coordination",
        "Credit Facility and Payment Processing",
        "Quality Control and Vendor Verification",
        "Fuel Price Negotiation",
        "Rapid Uplift for Quick Turnarounds",
        "VAT/Tax Exemption Assistance"
      ],
      benefits: [
        "Cost savings through established local supplier relationships",
        "Eliminates payment friction and delays on the tarmac",
        "Guaranteed fuel quality protecting aircraft engines"
      ]
    }
  },
  {
    icon: CarFront,
    title: "Ground Transportation",
    subtitle: "VIP & Crew Surface Transit",
    description:
      "Airport transfers & surface transport for crew, passengers & cargo.",
    slug: "ground-transportation",
    image: "/images/service_ground_handling.jpg",
    details: {
      longDescription: "Whether it is moving crew to their hotel, transferring VIPs in luxury vehicles, or transporting time-sensitive cargo from the airport to its final destination, SABA Aviation provides reliable surface transportation solutions. We maintain a network of vetted, professional drivers and a modern fleet of vehicles to ensure safety, punctuality, and comfort.",
      features: [
        "VIP Luxury Sedans and SUVs",
        "Crew Minibuses and Coasters",
        "Tarmac/Ramp Transfers (Subject to Authority Approval)",
        "Armored/Secure Transportation",
        "Last-Mile Cargo Delivery Trucks",
        "24/7 Dispatch and Vehicle Tracking"
      ],
      benefits: [
        "Seamless door-to-door transit experience",
        "High standards of vehicle safety, hygiene, and maintenance",
        "Professional, bilingual drivers familiar with local routes"
      ]
    }
  },
  {
    icon: Coffee,
    title: "Crew Support Services",
    subtitle: "Accommodation & Layover Care",
    description:
      "Accommodation, transport & support for flight crews during turnarounds.",
    slug: "crew-services",
    image: "/images/service_crew.jpg",
    details: {
      longDescription: "Recognizing that rested crews are critical to flight safety, we offer dedicated crew support services designed to maximize comfort and minimize stress during layovers. From the moment the aircraft engines shut down, we handle immigration clearance, ground transportation, and premium hotel accommodations.",
      features: [
        "Express Crew Immigration & Customs Clearance",
        "Premium Hotel Sourcing & Reservations",
        "Dedicated Airport-to-Hotel Transfers",
        "Visa on Arrival Processing",
        "Medical & Emergency Support Coordination",
        "Layover Concierge & Catering"
      ],
      benefits: [
        "Ensures crew well-being and rest compliance",
        "Competitive rates with top-tier hotel partners",
        "Punctual and reliable ground transfers"
      ]
    }
  },
];
