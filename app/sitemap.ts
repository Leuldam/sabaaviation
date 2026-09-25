import type { MetadataRoute } from 'next';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sabaaviation.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/booking',
    '/operations',
    '/safety-quality',
    '/contact',
    '/careers',
    '/privacy-policy',
    '/terms',
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const bookingRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/booking/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...bookingRoutes];
}
