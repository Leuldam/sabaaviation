const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SABA Aviation Service & Flight Support PLC',
  alternateName: 'SABA Aviation',
  url: 'https://www.sabaaviation.com',
  logo: 'https://www.sabaaviation.com/images/logo.png',
  image: 'https://www.sabaaviation.com/images/hero_home.png',
  description:
    'Reliable, technology-enabled airport facilitation, regulatory coordination, ground operations, VIP, crew, cargo, and fuel solutions across Ethiopia and East Africa.',
  telephone: '+251-11-551-6897',
  email: 'info@sabaaviation.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bole International Airport',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  areaServed: {
    '@type': 'Place',
    name: 'Ethiopia and East Africa',
  },
  availableLanguage: ['English', 'Amharic'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.linkedin.com',
    'https://www.facebook.com',
    'https://www.instagram.com',
  ],
  priceRange: '$$$',
};

export default function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
