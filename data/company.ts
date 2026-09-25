// data/company.ts

export const companyInfo = {
  name: "SABA Aviation Service & Flight Support PLC",
  shortName: "SABA Aviation",
  tagline: "Your Trusted Gateway to Seamless Airport Operations",
  description:
    "Reliable, technology-enabled airport support, facilitation, and aviation services connecting operators to Ethiopia, East Africa, and strategic international gateways.",
  founded: "2026",
  headquarters: "Addis Ababa, Ethiopia",
};

export const story = {
  title: "Our Story",
  content:
    "SABA Aviation Service & Flight Support PLC is an emerging leader in airport support, facilitation, and aviation services. Headquartered in Ethiopia, we deliver innovative, technology-enabled solutions across East Africa and strategic international gateway airports for global carriers, charter operators, and industry stakeholders.",
};

export const mission = {
  title: "Our Mission",
  content:
    "To connect airlines, airports, regulators, and service providers through safe, compliant, and seamlessly coordinated aviation support that lets operators focus on their core flight operations.",
};

export const vision = {
  title: "Our Vision",
  content:
    "To shape the future of seamless air transport connectivity while creating sustainable economic value and developing aviation talent across the region.",
};

export const values = [
  { label: "Safety", description: "Uncompromising safety, compliance, and operational discipline." },
  { label: "Quality", description: "Consistent service standards across every stakeholder touchpoint." },
  { label: "Competence", description: "Veteran-led expertise and highly qualified aviation professionals." },
  { label: "Coordination", description: "Reliable communication that keeps complex operations moving." },
];

export const airports = [
  { name: "Addis Ababa", code: "HAAB", isPrimary: true },
  { name: "Dire Dawa", code: "HADR", isPrimary: false },
  { name: "Bahir Dar", code: "HABD", isPrimary: false },
  { name: "Mekelle", code: "HAMK", isPrimary: false },
  { name: "Gondar", code: "HAGN", isPrimary: false },
  { name: "Hawassa", code: "HAHW", isPrimary: false },
];

export const processSteps = [
  {
    step: 1,
    title: "Request",
    description: "Handling Request Received",
  },
  {
    step: 2,
    title: "Assessment",
    description: "Requirements Review",
  },
  {
    step: 3,
    title: "Coordination",
    description: "Permits & Services Arranged",
  },
  {
    step: 4,
    title: "Arrival",
    description: "Ground Handling Deployed",
  },
  {
    step: 5,
    title: "Turnaround",
    description: "Passenger & Cargo Processed",
  },
  {
    step: 6,
    title: "Departure",
    description: "Final Checks & Clearance",
  },
];

export const safetyPillars = [
  {
    title: "Safety Management",
    description:
      "Comprehensive SMS framework aligned with ICAO standards, ensuring proactive risk identification and mitigation across all operations.",
  },
  {
    title: "Regulatory Compliance",
    description:
      "Full compliance with ECAA regulations, IATA standards, and international aviation safety requirements.",
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous quality management systems with regular audits, inspections, and continuous improvement protocols.",
  },
  {
    title: "Security",
    description:
      "Robust security procedures protecting aircraft, passengers, cargo, and ground operations at all times.",
  },
  {
    title: "Operational Standards",
    description:
      "Standardized operating procedures ensuring consistent, safe, and efficient service delivery.",
  },
];

export const contactInfo = {
  address: "Bole International Airport, Addis Ababa, Ethiopia",
  phone: "+251-11-551-6897",
  fax: "+251-11-551-6898",
  email: "info@sabaaviation.com",
  operations: "ops@sabaaviation.com",
  officeHours: "Mon - Fri: 08:00 - 17:00 EAT",
  operationsHours: "24/7 Operations Support",
  coordinates: { lat: 8.9779, lng: 38.7993 },
};

// Add these two exports to your existing @/data/company file,
// alongside `story`, `mission`, `vision`, and `values`.
// Swap in real photos, bios, and links when ready — everything
// below is placeholder content matching the shape the page expects.

export const stats = [
  { label: "Years in Operation", value: 12, suffix: "+" },
  { label: "Flights Coordinated", value: 3200, suffix: "+" },
  { label: "Partner Airlines", value: 24, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
];

export const team = [
  {
    name: "Selam Tesfaye",
    role: "Founder & Chief Executive Officer",
    experience: "18+ yrs",
    bio: "Led ground operations and airline partnerships across East Africa before founding SABA to modernize regional aviation support.",
    image: "/images/team/selam-tesfaye.png",
    linkedin: "#",
    email: "selam@sabaaviation.com",
  },
  {
    name: "Dawit Bekele",
    role: "Chief Operating Officer",
    experience: "15+ yrs",
    bio: "Former flight operations manager who has overseen turnaround logistics for thousands of flights across four countries.",
    image: "/images/team/dawit-bekele.png",
    linkedin: "#",
    email: "dawit@sabaaviation.com",
  },
  {
    name: "Meron Alemu",
    role: "Board Member & Strategic Advisor",
    experience: "20+ yrs",
    bio: "Aviation finance veteran and long-time stakeholder guiding SABA's expansion strategy and regulatory partnerships.",
    image: "/images/team/meron-alemu.png",
    linkedin: "#",
    email: "",
  },
  {
    name: "Yohannes Girma",
    role: "Head of Flight Safety & Compliance",
    experience: "13+ yrs",
    bio: "Certified safety auditor ensuring every operation meets IATA and regional aviation authority standards.",
    image: "/images/team/yohannes-girma.png",
    linkedin: "#",
    email: "yohannes@sabaaviation.com",
  },

  { name: "Abebe Angesa Guressa", role: "Operations Manager", experience: "10+ yrs", bio: "Oversees day-to-day ground operations and coordinates cross-functional teams to deliver reliable service across Ethiopian airports.", image: "/images/team/abebe-angesa-guressa.png", linkedin: "", email: "" },
  { name: "Birhanu Kassa Mekonen", role: "Flight Coordination Specialist", experience: "8+ yrs", bio: "Manages overflight permits, slot coordination, and ATC liaison for international and domestic operators.", image: "/images/team/birhanu-kassa-mekonen.png", linkedin: "", email: "" },
  { name: "Selamawit Fikru Tullu", role: "Passenger Services Lead", experience: "7+ yrs", bio: "Leads VIP and CIP facilitation, ensuring seamless terminal experiences for high-profile passengers and delegations.", image: "/images/team/selamawit-fikru-tullu.png", linkedin: "", email: "" },
  { name: "Getachew Birru Feyisa", role: "Cargo and Freight Coordinator", experience: "9+ yrs", bio: "Handles end-to-end cargo facilitation, customs brokerage, and hazardous goods compliance for freighter and belly-cargo clients.", image: "/images/team/getachew-birru-feyisa.png", linkedin: "", email: "" },
  { name: "Abdisa Bekele Bulto", role: "Ramp Supervisor", experience: "11+ yrs", bio: "Supervises ramp and turnaround operations, ensuring IATA and ISAGO standards are maintained on every aircraft movement.", image: "/images/team/abdisa-bekele-bulto.png", linkedin: "", email: "" },
  { name: "Yeabsira Getahun Gebreselasie", role: "Fuel Solutions Coordinator", experience: "6+ yrs", bio: "Coordinates fuel uplifts and supplier relationships, ensuring timely delivery and full quality-compliance documentation.", image: "/images/team/yeabsira-getahun-gebreselasie.png", linkedin: "", email: "" },
  { name: "Kaleab Yohannes Kassa", role: "Ground Transportation Manager", experience: "8+ yrs", bio: "Manages crew transfers, VIP surface logistics, and a fleet of vetted vehicles across Addis Ababa and key regional airports.", image: "/images/team/kaleab-yohannes-kassa.png", linkedin: "", email: "" },
];