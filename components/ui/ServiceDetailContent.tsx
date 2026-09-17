"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface ServiceDetailContentProps {
  service: {
    title: string;
    description: string;
    slug: string;
    image: string;
    details: {
      longDescription: string;
      features: string[];
      benefits: string[];
    };
    icon: React.ReactNode;
  };
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  return (
    <>
      <section className="section-padding bg-gradient-to-b from-white to-gray-200 relative">
        <div className="container-max">
          <div className="mb-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-warm-gold text-sm font-semibold uppercase tracking-widest hover:text-midnight transition-colors"
            >
              <ArrowLeft size={16} /> Back to Services
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="w-20 h-20 rounded-2xl bg-warm-gold/10 flex items-center justify-center mb-8 border border-warm-gold/20">
                  <div className="text-warm-gold [&_svg]:h-10 [&_svg]:w-10">{service.icon}</div>
                </div>
                <h2 className="text-3xl font-bold text-midnight mb-4 leading-tight">
                  {service.title}
                </h2>
                <p className="text-midnight/70 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-midnight/80 leading-relaxed text-lg mb-8">
                  {service.details.longDescription}
                </p>

                <h3 className="text-midnight text-2xl font-semibold mb-6 mt-12">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {service.details.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-warm-gold flex-shrink-0 mt-1" />
                      <span className="text-midnight/70">{feature}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-midnight text-2xl font-semibold mb-6">Why Choose SABA for {service.title}?</h3>
                <div className="space-y-4 mb-6">
                  {service.details.benefits.map((benefit, i) => (
                    <p key={i} className="text-midnight/80 leading-relaxed flex items-start gap-3">
                      <span className="text-warm-gold font-bold">•</span> {benefit}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-black/10">
                <Link
                  href={`/booking/${service.slug}`}
                  className="btn-primary inline-flex"
                >
                  Book {service.title.toUpperCase()}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
