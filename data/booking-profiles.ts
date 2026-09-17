export type BookingField = {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "date" | "time" | "number";
  control?: "input" | "checkboxes";
  required?: boolean;
  options?: string[];
};

export type BookingProfile = {
  eyebrow: string;
  description: string;
  responseTime: string;
  preparation: string[];
  fields: BookingField[];
  detailsLabel: string;
  detailsPlaceholder: string;
};

const sharedContactFields: BookingField[] = [
  { name: "name", label: "Contact name", placeholder: "Full name", required: true },
  { name: "email", label: "Work email", placeholder: "name@company.com", type: "email", required: true },
  { name: "phone", label: "Phone or WhatsApp", placeholder: "+251 ...", type: "tel" },
  { name: "company", label: "Company or operator", placeholder: "Company name" },
];

export const bookingProfiles: Record<string, BookingProfile> = {
  "flight-support": {
    eyebrow: "Operational request",
    description: "Share your route and aircraft details so our operations desk can begin permits, slots, flight planning, and crew coordination.",
    responseTime: "Initial response within 30 minutes during operations",
    preparation: ["Aircraft registration and type", "Origin, destination, and routing", "Estimated arrival and departure times"],
    fields: [...sharedContactFields, { name: "origin", label: "Origin airport", placeholder: "ICAO / IATA code", required: true }, { name: "destination", label: "Destination airport", placeholder: "ICAO / IATA code", required: true }, { name: "aircraftType", label: "Aircraft type / registration", placeholder: "e.g. B737 / ET-ABC", required: true }, { name: "flightNumber", label: "Flight number", placeholder: "Optional" }, { name: "date", label: "Date of operation", placeholder: "Select date", type: "date", required: true }, { name: "arrivalTime", label: "Estimated arrival", placeholder: "Select time", type: "time" }],
    detailsLabel: "Routing and permit notes",
    detailsPlaceholder: "Add routing, permit deadlines, PPR requirements, crew notes, or any time-critical detail.",
  },
  "ground-handling": {
    eyebrow: "Turnaround request",
    description: "Give us the aircraft movement and turnaround plan. We will coordinate ramp, passenger, cargo, cabin, and equipment support around your schedule.",
    responseTime: "Turnaround plan acknowledged within 30 minutes",
    preparation: ["Aircraft type and registration", "Arrival and departure times", "Required ramp or cabin services"],
    fields: [...sharedContactFields, { name: "airport", label: "Airport / station", placeholder: "Airport name or code", required: true }, { name: "aircraftType", label: "Aircraft type / registration", placeholder: "e.g. B737 / ET-ABC", required: true }, { name: "date", label: "Handling date", placeholder: "Select date", type: "date", required: true }, { name: "arrivalTime", label: "Arrival time", placeholder: "Select time", type: "time", required: true }, { name: "departureTime", label: "Departure time", placeholder: "Select time", type: "time" }, { name: "passengerCount", label: "Passengers / crew", placeholder: "Total people", type: "number" }],
    detailsLabel: "Handling scope",
    detailsPlaceholder: "List GSE, cargo, baggage, cleaning, water, lavatory, pushback, or special turnaround requirements.",
  },
  "passenger-services": {
    eyebrow: "Passenger assistance",
    description: "Plan meet-and-assist, terminal support, lounge access, or special assistance for an arrival, departure, or connecting passenger.",
    responseTime: "Passenger plan confirmed within 60 minutes",
    preparation: ["Passenger count and flight number", "Arrival or departure details", "Any accessibility or privacy needs"],
    fields: [...sharedContactFields, { name: "airport", label: "Airport / terminal", placeholder: "Airport or terminal", required: true }, { name: "serviceDirection", label: "Journey type", placeholder: "Select journey type", options: ["Arrival", "Departure", "Connection"], required: true }, { name: "flightNumber", label: "Flight number", placeholder: "e.g. ET 302", required: true }, { name: "date", label: "Travel date", placeholder: "Select date", type: "date", required: true }, { name: "passengerCount", label: "Passenger count", placeholder: "Number of passengers", type: "number", required: true }],
    detailsLabel: "Passenger requirements",
    detailsPlaceholder: "Mention wheelchair assistance, unaccompanied minor service, lounge preference, baggage concerns, or VIP handling.",
  },
  "vip-business-aviation": {
    eyebrow: "Private aviation desk",
    description: "Build a discreet, end-to-end arrival or departure plan with VIP terminal handling, vehicles, catering, security, and concierge support.",
    responseTime: "A dedicated coordinator responds within 30 minutes",
    preparation: ["Aircraft and passenger profile", "Movement time and airport", "Vehicle, catering, or security preferences"],
    fields: [...sharedContactFields, { name: "airport", label: "Airport / FBO", placeholder: "Airport or FBO", required: true }, { name: "aircraftType", label: "Aircraft type / registration", placeholder: "Aircraft details" }, { name: "date", label: "Movement date", placeholder: "Select date", type: "date", required: true }, { name: "arrivalTime", label: "Movement time", placeholder: "Select time", type: "time", required: true }, { name: "passengerCount", label: "VIP passenger count", placeholder: "Number of passengers", type: "number" }, { name: "vehicle", label: "Ground vehicle", placeholder: "Sedan, SUV, van, or armored" }],
    detailsLabel: "Discreet handling brief",
    detailsPlaceholder: "Share privacy, security, catering, accommodation, transport, or protocol requirements. Keep sensitive details to a minimum here.",
  },
  "cargo-logistics": {
    eyebrow: "Cargo movement request",
    description: "Give our cargo desk the complete shipment profile, routing, handling scope, and documents required to coordinate a compliant movement.",
    responseTime: "Cargo feasibility check within 60 minutes",
    preparation: ["Cargo description, packages, weight, and dimensions", "Origin, destination, and airport schedule", "Air waybill and customs documents where available"],
    fields: [
      ...sharedContactFields,
      { name: "cargoType", label: "Cargo type", placeholder: "e.g. General cargo, PER, AVI", required: true },
      { name: "cargoDescription", label: "Description", placeholder: "Commodity and contents", required: true },
      { name: "packages", label: "Number of packages", placeholder: "e.g. 12", type: "number", required: true },
      { name: "weight", label: "Total weight", placeholder: "e.g. 1,200 kg", required: true },
      { name: "dimensions", label: "Dimensions", placeholder: "L x W x H per piece" },
      { name: "volume", label: "Volume", placeholder: "e.g. 4.8 m3" },
      { name: "dangerousGoods", label: "Dangerous goods?", placeholder: "Select", options: ["Yes", "No"], required: true },
      { name: "temperatureControlled", label: "Temperature controlled?", placeholder: "Select", options: ["Yes", "No"], required: true },
      { name: "fragile", label: "Fragile?", placeholder: "Select", options: ["Yes", "No"] },
      { name: "valuableCargo", label: "Valuable cargo?", placeholder: "Select", options: ["Yes", "No"] },
      { name: "origin", label: "Shipment origin", placeholder: "City / airport", required: true },
      { name: "destination", label: "Shipment destination", placeholder: "City / airport", required: true },
      { name: "arrivalAirport", label: "Arrival airport", placeholder: "ICAO / IATA code", required: true },
      { name: "departureAirport", label: "Departure airport", placeholder: "ICAO / IATA code", required: true },
      { name: "shipmentDate", label: "Shipment date", placeholder: "Select date", type: "date", required: true },
      { name: "deliveryDate", label: "Required delivery date", placeholder: "Select date", type: "date" },
      { name: "handling", label: "Handling requested", placeholder: "Select services", control: "checkboxes", options: ["Loading", "Unloading", "Storage", "Customs Coordination", "Ground Transportation", "Special Handling", "Documentation Assistance"] },
      { name: "documents", label: "Documents available", placeholder: "Select documents", control: "checkboxes", options: ["Air Waybill", "Commercial Invoice", "Packing List", "Customs Documents", "Dangerous Goods Declaration"] },
    ],
    detailsLabel: "Additional cargo requirements",
    detailsPlaceholder: "Include temperature range, storage duration, delivery address, customs status, security needs, or other special instructions.",
  },
  "fuel-coordination": {
    eyebrow: "Fuel uplift request",
    description: "Request a fuel quotation and uplift plan with the aircraft, volume, timing, and payment details our supplier network needs.",
    responseTime: "Fuel quotation returned within 30 minutes",
    preparation: ["Aircraft registration and type", "Fuel type and requested uplift", "Uplift date, time, and station"],
    fields: [...sharedContactFields, { name: "aircraftRegistration", label: "Aircraft registration", placeholder: "e.g. ET-XXX", required: true }, { name: "aircraftType", label: "Aircraft type", placeholder: "e.g. B737-800", required: true }, { name: "operator", label: "Operator", placeholder: "Operator name", required: true }, { name: "flightNumber", label: "Flight number", placeholder: "e.g. AB123" }, { name: "fuelType", label: "Fuel type", placeholder: "Select fuel type", options: ["Jet A-1", "Avgas", "Other"], required: true }, { name: "quantity", label: "Requested quantity", placeholder: "e.g. 12,000", required: true }, { name: "unit", label: "Unit", placeholder: "Select unit", options: ["Litres", "US Gallons"], required: true }, { name: "upliftDate", label: "Uplift date", placeholder: "Select date", type: "date", required: true }, { name: "upliftTime", label: "Uplift time", placeholder: "Select time", type: "time", required: true }, { name: "airport", label: "Airport", placeholder: "ICAO / IATA code", required: true }, { name: "stand", label: "Parking stand / location", placeholder: "Stand or parking location" }, { name: "arrivalTime", label: "Arrival time", placeholder: "Select time", type: "time" }, { name: "departureTime", label: "Departure time", placeholder: "Select time", type: "time" }, { name: "supplier", label: "Fuel supplier", placeholder: "Select preference", options: ["Preferred Supplier", "No Preference"] }, { name: "requirements", label: "Additional requirements", placeholder: "Select requirements", control: "checkboxes", options: ["Fuel Truck", "Into-Plane Service", "Fuel Documentation", "Fuel Receipt"] }],
    detailsLabel: "Fuel coordination notes",
    detailsPlaceholder: "Add fuel release, credit terms, tax exemption, uplift deadline, or other operational requirements.",
  },
  "ground-transportation": {
    eyebrow: "Surface transport request",
    description: "Arrange reliable crew, VIP, passenger, or cargo transport between the airport, hotel, city, and final destination.",
    responseTime: "Vehicle availability confirmed within 60 minutes",
    preparation: ["Pick-up and drop-off points", "Passenger or cargo count", "Vehicle and timing requirements"],
    fields: [...sharedContactFields, { name: "pickup", label: "Pickup location", placeholder: "Airport, hotel, or address", required: true }, { name: "dropoff", label: "Drop-off location", placeholder: "Destination address", required: true }, { name: "date", label: "Date", placeholder: "Select date", type: "date", required: true }, { name: "pickupTime", label: "Pickup time", placeholder: "Select time", type: "time", required: true }, { name: "passengerCount", label: "Number of passengers", placeholder: "Count", type: "number", required: true }, { name: "passengerNames", label: "Passenger names", placeholder: "Names or attach roster" }, { name: "bags", label: "Number of bags", placeholder: "Count", type: "number" }, { name: "vehicle", label: "Vehicle", placeholder: "Select vehicle", options: ["Sedan", "SUV", "Van", "Bus", "Executive Vehicle", "Other"], required: true }, { name: "requirements", label: "Requirements", placeholder: "Select requirements", control: "checkboxes", options: ["Meet & Greet", "Airport Transfer", "Crew Transfer", "VIP Transfer", "Multiple Stops", "Waiting Service"] }, { name: "returnRequired", label: "Return journey required?", placeholder: "Select", options: ["Yes", "No"], required: true }, { name: "returnDate", label: "Return date", placeholder: "Select date", type: "date" }, { name: "returnTime", label: "Return time", placeholder: "Select time", type: "time" }],
    detailsLabel: "Transportation notes",
    detailsPlaceholder: "Include flight number, luggage volume, waiting time, escort needs, security requirements, or multiple stops.",
  },
  "crew-services": {
    eyebrow: "Crew layover request",
    description: "Coordinate the complete layover experience, including immigration support, hotel rooms, transfers, meals, and emergency assistance.",
    responseTime: "Crew plan acknowledged within 60 minutes",
    preparation: ["Crew count and roster timing", "Layover duration", "Hotel and transfer preferences"],
    fields: [...sharedContactFields, { name: "airport", label: "Airport / station", placeholder: "Airport or station", required: true }, { name: "crewCount", label: "Crew count", placeholder: "Number of crew", type: "number", required: true }, { name: "date", label: "Arrival / layover date", placeholder: "Select date", type: "date", required: true }, { name: "arrivalTime", label: "Arrival time", placeholder: "Select time", type: "time", required: true }, { name: "hotelNights", label: "Hotel nights", placeholder: "Number of nights", type: "number" }, { name: "flightNumber", label: "Flight number", placeholder: "e.g. ET 302" }],
    detailsLabel: "Crew support notes",
    detailsPlaceholder: "Mention rooming list timing, hotel category, dietary needs, visas, transport, medical support, or special rest requirements.",
  },
};

export const defaultBookingProfile: BookingProfile = {
  eyebrow: "Aviation service request",
  description: "Share the essentials of your operation and our team will come back with the right next steps.",
  responseTime: "Our operations desk will respond as soon as possible",
  preparation: ["Your contact details", "Operation date and location", "A short description of the support required"],
  fields: sharedContactFields,
  detailsLabel: "Request details",
  detailsPlaceholder: "Tell us what you need and when.",
};

export function getBookingProfile(slug: string) {
  return bookingProfiles[slug] ?? defaultBookingProfile;
}
