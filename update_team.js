const fs = require("fs");
const c = fs.readFileSync("data/company.ts", "utf8").trim();
const tail = c.lastIndexOf("];");
const members = [
  { name: "Abebe Angesa Guressa", role: "Operations Manager", experience: "10+ yrs", bio: "Oversees day-to-day ground operations and coordinates cross-functional teams to deliver reliable service across Ethiopian airports.", image: "/images/team/abebe-angesa-guressa.png", linkedin: "", email: "" },
  { name: "Birhanu Kassa Mekonen", role: "Flight Coordination Specialist", experience: "8+ yrs", bio: "Manages overflight permits, slot coordination, and ATC liaison for international and domestic operators.", image: "/images/team/birhanu-kassa-mekonen.png", linkedin: "", email: "" },
  { name: "Selamawit Fikru Tullu", role: "Passenger Services Lead", experience: "7+ yrs", bio: "Leads VIP and CIP facilitation, ensuring seamless terminal experiences for high-profile passengers and delegations.", image: "/images/team/selamawit-fikru-tullu.png", linkedin: "", email: "" },
  { name: "Getachew Birru Feyisa", role: "Cargo and Freight Coordinator", experience: "9+ yrs", bio: "Handles end-to-end cargo facilitation, customs brokerage, and hazardous goods compliance for freighter and belly-cargo clients.", image: "/images/team/getachew-birru-feyisa.png", linkedin: "", email: "" },
  { name: "Abdisa Bekele Bulto", role: "Ramp Supervisor", experience: "11+ yrs", bio: "Supervises ramp and turnaround operations, ensuring IATA and ISAGO standards are maintained on every aircraft movement.", image: "/images/team/abdisa-bekele-bulto.png", linkedin: "", email: "" },
  { name: "Yeabsira Getahun Gebreselasie", role: "Fuel Solutions Coordinator", experience: "6+ yrs", bio: "Coordinates fuel uplifts and supplier relationships, ensuring timely delivery and full quality-compliance documentation.", image: "/images/team/yeabsira-getahun-gebreselasie.png", linkedin: "", email: "" },
  { name: "Kaleab Yohannes Kassa", role: "Ground Transportation Manager", experience: "8+ yrs", bio: "Manages crew transfers, VIP surface logistics, and a fleet of vetted vehicles across Addis Ababa and key regional airports.", image: "/images/team/kaleab-yohannes-kassa.png", linkedin: "", email: "" },
];
const lines = members.map(m => `  { name: "${m.name}", role: "${m.role}", experience: "${m.experience}", bio: "${m.bio}", image: "${m.image}", linkedin: "${m.linkedin}", email: "${m.email}" },`).join("\n");
const result = c.slice(0, tail) + "\n" + lines + "\n];";
fs.writeFileSync("data/company.ts", result, "utf8");
console.log("Team updated");
