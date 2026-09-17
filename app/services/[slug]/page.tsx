import { notFound } from "next/navigation";
import HeroSection from "@/components/ui/HeroSection";
import ServiceDetailContent from "@/components/ui/ServiceDetailContent";
import { services } from "@/data/services";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <HeroSection
        title={service.title}
        subtitle="Premium aviation solutions customized for your exact requirements."
        backgroundImage={service.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <ServiceDetailContent
        service={{
          ...service,
          icon: <Icon size={40} className="text-warm-gold" />,
        }}
      />
    </>
  );
}
