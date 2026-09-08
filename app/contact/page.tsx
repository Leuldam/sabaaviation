// app/contact/page.tsx — Contact Page
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";
import { contactInfo } from "@/data/company";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    alert("Thank you for your message. Our team will respond within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        title="Contact Us"
        subtitle="Get in Touch with Our Operations Team"
        backgroundImage="/images/hero_contact.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      {/* ── CONTACT FORM + INFO ──────────────────── */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-200">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info — Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-midnight/40 font-semibold mb-2">Get In Touch</p>
                <h2 className="text-3xl font-bold text-midnight mb-8">Our Commitment, Always.</h2>
              </div>

              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-midnight/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-midnight/70" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-midnight/40 text-[10px] uppercase tracking-widest font-semibold mb-1">Our Location</h4>
                    <p className="text-midnight text-sm leading-relaxed">{contactInfo.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-midnight/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-midnight/70" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-midnight/40 text-[10px] uppercase tracking-widest font-semibold mb-1">Phone</h4>
                    <p className="text-midnight text-sm">{contactInfo.phone}</p>
                    <p className="text-midnight/60 text-xs mt-1">Fax: {contactInfo.fax}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-midnight/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-midnight/70" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-midnight/40 text-[10px] uppercase tracking-widest font-semibold mb-1">Email</h4>
                    <p className="text-midnight text-sm">{contactInfo.email}</p>
                    <p className="text-midnight/60 text-xs mt-1">{contactInfo.operations}</p>
                  </div>
                </div>
                
                {/* Office Hours */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-midnight/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-midnight/70" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-midnight/40 text-[10px] uppercase tracking-widest font-semibold mb-1">Office Hours</h4>
                    <p className="text-midnight text-sm">{contactInfo.officeHours}</p>
                    <p className="text-warm-gold text-xs font-medium mt-1">
                      {contactInfo.operationsHours}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form — Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 sm:p-12 rounded-2xl border border-black/5 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-midnight mb-8">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-midnight/60 text-[10px] uppercase tracking-widest font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-midnight text-sm placeholder:text-gray-400 focus:outline-none focus:border-warm-gold/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-midnight/60 text-[10px] uppercase tracking-widest font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-midnight text-sm placeholder:text-gray-400 focus:outline-none focus:border-warm-gold/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-midnight/60 text-[10px] uppercase tracking-widest font-semibold mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-midnight text-sm focus:outline-none focus:border-warm-gold/50 transition-all appearance-none"
                  >
                    <option value="" className="text-gray-400">Select a subject</option>
                    <option value="flight-support">Flight Support Request</option>
                    <option value="ground-handling">Ground Handling Inquiry</option>
                    <option value="vip">VIP & Business Aviation</option>
                    <option value="cargo">Cargo & Logistics</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-midnight/60 text-[10px] uppercase tracking-widest font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-midnight text-sm placeholder:text-gray-400 focus:outline-none focus:border-warm-gold/50 transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="w-full bg-warm-gold text-midnight hover:bg-[#0A0A0A] hover:text-white transition-colors py-4 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 mt-4">
                  SEND MESSAGE <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-gray-200">
        <div className="container-max section-padding-sm">
          <SectionHeading title="Find Us" centered light />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 rounded-xl overflow-hidden border border-card-border h-[400px]"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d${contactInfo.coordinates.lng}!3d${contactInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBole+International+Airport!5e0!3m2!1sen!2set!4v1600000000000`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SABA Aviation Location"
            />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner
        title="Need team is ready 24/7 to support your operation."
        subtitle="Contact our operations center for immediate assistance and support."
        buttonText="CONTACT OPERATIONS"
        buttonHref="/contact"
      />
    </>
  );
}
