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

    const recipient = "info@sabaaviation.com";
    const subject = encodeURIComponent(formData.subject || "Contact Request");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
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

                <button type="submit" className="w-full bg-warm-gold text-white hover:bg-[#0A0A0A] hover:text-white transition-colors py-4 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 mt-4">
                  SEND MESSAGE <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ─────────────────────────────────── */}
      <section className="w-full h-[300px] sm:h-[400px] lg:h-[450px] relative bg-gray-100">
        {/* We use a grayscale filter for a premium integrated look, returning to full color on hover */}
        <iframe
          src="https://maps.google.com/maps?q=Addis%20Ababa%20Bole%20International%20Airport&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[0.85] opacity-90 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-in-out"
        />
        
        {/* Subtle inner shadow overlay */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_10px_30px_rgba(0,0,0,0.05),inset_0_-10px_30px_rgba(0,0,0,0.05)]" />
      </section>
    </>
  );
}
