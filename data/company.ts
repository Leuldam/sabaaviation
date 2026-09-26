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
    "By 2040 SABA Aviation Service will be recognized as the preferred aviation support partner for airlines, airports, governments, and aviation stakeholders across Africa and beyond—renowned for operational excellence, digital innovation, professional competence, and exceptional customer experience.",
};

export const vision = {
  title: "Our Vision",
  content:
    "To create sustainable economic value through innovative aviation services, facilitate operational excellence for airline partners, transfer aviation expertise to future generations, create meaningful employment opportunities, and support the growth and competitiveness of national and international carriers.",
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
  { label: "Years in Operation", value: 35, suffix: "+" },
  { label: "All over east africa", value: 3, suffix: "+ Airports" },
  { label: "24/7 Flight Support", value: 24, suffix: "+" },
  { label: "Reliability", value: 100, suffix: "%" },
];

export const team = [
  {
    name: "Abebe Angesa Guressa",
    role: "Stakeholder",
    experience: "15+ yrs",
    bio: "Led ground operations and airline partnerships across East Africa before founding SABA to modernize regional aviation support.",
    image: "/images/abebe.jpg",
    linkedin: "#",
    email: "",
  },

  {
    name: "Dawit Bekele",
    role: "Stakeholder",
    experience: "15+ yrs",
    bio: "Former flight operations manager who has overseen turnaround logistics for thousands of flights across four countries.",
    image: "/images/profile2.jpg",
    linkedin: "#",
    email: "dawit@sabaaviation.com",
  },

  {
    name: "Birhanu Kassa Mekonen",
    role: "Stakeholder",
    experience: "15+ yrs",
    bio: "Led ground operations and airline partnerships across East Africa before founding SABA to modernize regional aviation support.",
    image: "/images/profile2.jpg",
    linkedin: "#",
    email: "",
  },
  {
    name: "Selamawit Fikru Tullu",
    role: "Stakeholder",
    experience: "15+ yrs",
    bio: "Experienced aviation professional with a strong background in strategic planning and stakeholder management.",
    image: "/images/samrawirpro.jpg",
    linkedin: "#",
    email: "",
  },
  {
    name: "Getachew Birru Feyisa",
    role: "Stakeholder",
    experience: "15+ yrs",
    bio: "Led ground operations and airline partnerships across East Africa before founding SABA to modernize regional aviation support.",
    image: "/images/profile2.jpg",
    linkedin: "#",
    email: "",
  },
  {
    name: "Abdisa Bekele Bulto",
    role: "Stakeholder",
    experience: "",
    bio: "Led ground operations and airline partnerships across East Africa before founding SABA to modernize regional aviation support.",
    image: "/images/profile2.jpg",
    linkedin: "#",
    email: "",
  },
  {
    name: "Yeabsira Getahun Gebreselasie",
    role: "Stakeholder",
    experience: "",
    bio: "Experienced aviation professional with a strong background in strategic planning and stakeholder management.",
    image: "/images/profile2.jpg",
    linkedin: "#",
    email: "",
  },
  {
    name: "Kaleab Yohannes Kassa",
    role: "Stakeholder",
    experience: "",
    bio: "Experienced aviation professional with a strong background in strategic planning and stakeholder management.",
    image: "/images/profile2.jpg",
    linkedin: "#",
    email: "",
  },
];