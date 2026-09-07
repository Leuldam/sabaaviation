import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedLayout from "@/components/layout/AnimatedLayout";
import Preloader from "@/components/ui/Preloader";
import ChatBot from "@/components/ui/ChatBot";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabaaviation.com"),
  title: {
    default: "SABA Aviation | Aviation Service & Flight Support in Ethiopia",
    template: "%s | SABA Aviation",
  },
  description:
    "Premium aviation ground handling and flight support services for airlines, operators, and private aviation in Ethiopia.",
  openGraph: {
    title: "SABA Aviation | Aviation Service & Flight Support in Ethiopia",
    description: "Professional B2B aviation operations partner.",
    url: "https://sabaaviation.com",
    siteName: "SABA Aviation",
    images: [{ url: "/images/hero_home.png", alt: "SABA Aviation" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SABA Aviation",
    description:
      "Premium aviation ground handling and flight support services.",
    images: ["/images/hero_home.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${cormorant.variable}`}>
      <body className={`min-h-screen flex flex-col bg-midnight text-white ${poppins.className}`}>
        <Preloader />
        <Header />
        <AnimatedLayout>{children}</AnimatedLayout>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
