// data/company.ts

export const companyInfo = {
  name: "SABA Aviation Service & Flight Support PLC",
  shortName: "SABA Aviation",
  tagline: "Precision on the Ground. Confidence in the Air.",
  description:
    "Premium aviation ground handling and flight support services connecting operators to Ethiopia and beyond.",
  founded: "2015",
  headquarters: "Addis Ababa, Ethiopia",
};

export const story = {
  title: "Our Story",
  content:
    "SABA Aviation Service & Flight Support PLC was established with a clear objective: to provide reliable, responsive and professionally coordinated aviation support services for operators flying to and through Ethiopia. Since our founding, we have grown into a trusted partner for airlines, charter operators, and private aviation clients seeking seamless ground handling and flight support across Ethiopian airports.",
};

export const mission = {
  title: "Our Mission",
  content:
    "To deliver high-quality aviation support services that ensure safe, efficient and seamless operations for our clients.",
};

export const vision = {
  title: "Our Vision",
  content:
    "To be a leading aviation services provider in Ethiopia and beyond, recognized for excellence, reliability and integrity.",
};

export const values = [
  { label: "Safety", description: "Uncompromising commitment to safety in every operation." },
  { label: "Precision", description: "Meticulous attention to detail in all services." },
  { label: "Responsiveness", description: "Swift and adaptive service delivery." },
  { label: "Integrity", description: "Transparent and ethical business practices." },
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
