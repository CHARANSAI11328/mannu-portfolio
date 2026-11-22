import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "MANSOOR | Shaik Mansoor — Personal Fitness Coaching, Bapatla",
  description:
    "Official personal fitness training and athlete coaching by competitive bodybuilder Shaik Mansoor. Online and offline training at 7 Eleven Fitness Studio, Bapatla.",
  keywords: [
    "Shaik Mansoor",
    "personal trainer Bapatla",
    "fitness coach Bapatla",
    "7 Eleven Fitness Studio",
    "bodybuilding coach Bapatla",
    "men personal training Andhra Pradesh",
  ],
  authors: [{ name: "Shaik Mansoor" }],
  creator: "Shaik Mansoor",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mansoorfitness.com",
    title: "MANSOOR | Shaik Mansoor Personal Fitness Coaching",
    description:
      "Personal fitness coaching built around proven methods, clear structure, and sustainable progress. Online & offline at 7 Eleven Fitness Studio, Bapatla.",
    siteName: "MANSOOR Personal Training",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "MANSOOR | Shaik Mansoor Personal Fitness Coaching",
    "image": "https://mansoorfitness.com/images/hero-poster.jpg",
    "description":
      "Official personal fitness training and athlete coaching by competitive bodybuilder Shaik Mansoor. Online and offline training at 7 Eleven Fitness Studio, Bapatla.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7 Eleven Fitness Studio, GBC Road",
      "addressLocality": "Bapatla",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "522101",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 15.9042,
      "longitude": 80.4674,
    },
    "url": "https://mansoorfitness.com",
    "priceRange": "₹999 - ₹3,999",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        "opens": "06:00",
        "closes": "21:00",
      },
    ],
  };

  return (
    <html lang="en" className={`dark ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#000000] text-white antialiased flex flex-col font-sans selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
