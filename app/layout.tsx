import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/ui/CookieConsent';
import ChatBot from '@/components/ui/ChatBot';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';

const helveticaNeue = localFont({
  src: [
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueUltraLight.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueThin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueHeavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueBlack.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueMediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/font/helvetica-neue-5/HelveticaNeueBoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica',
  display: 'swap',
});

const montserrat = localFont({
  src: [
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/font/Montserrat_Complete/Fonts/OTF/Montserrat-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sabaaviation.com'),
  title: {
    default: 'SABA Aviation | Seamless Airport Operations in Ethiopia',
    template: '%s | SABA Aviation',
  },
  description:
    'Your trusted gateway to seamless airport operations. SABA Aviation provides airport facilitation, regulatory coordination, ground operations, cargo, crew, VIP, and fuel solutions across Ethiopia and East Africa.',
  keywords: [
    'SABA Aviation',
    'airport facilitation Ethiopia',
    'aviation operations support East Africa',
    'VIP aviation services Addis Ababa',
    'aircraft handling Ethiopia',
    'cargo handling Ethiopia',
    'Bole International Airport support',
    'aviation support services Ethiopia',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SABA Aviation | Seamless Airport Operations in Ethiopia',
    description:
      'Your trusted gateway to seamless airport operations for global carriers, charter operators, cargo teams, and aviation stakeholders.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sabaaviation.com',
    siteName: 'SABA Aviation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SABA Aviation',
    description:
      'Airport facilitation, regulatory coordination, ground operations, VIP, crew, cargo, and fuel solutions in Ethiopia and East Africa.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${helveticaNeue.variable} ${montserrat.variable} ${inter.variable}`}>
      <body className="text-white bg-gradient-to-b from-white to-gray-200 font-sans antialiased">
        <LocalBusinessJsonLd />
        <Header />
        <div>
          {children}
        </div>
        <Footer />
        <CookieConsent />
        <ChatBot />
      </body>
    </html>
  );
}
