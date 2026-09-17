import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { COMPANY, SERVICES } from "@/lib/constants";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://borothotafoleng.co.za"),
  title: {
    default: "Borotho Tafoleng Cleaning & Maintenance | Professional Cleaning Services in QwaQwa",
    template: "%s | Borotho Tafoleng Cleaning & Maintenance",
  },
  description:
    "Professional cleaning services in QwaQwa, Free State. Youth-owned cleaning company providing school, office, residential, church, and commercial cleaning. Empowering young people through meaningful employment.",
  keywords: [
    "cleaning services QwaQwa",
    "professional cleaning Free State",
    "youth-owned business South Africa",
    "school cleaning",
    "office cleaning",
    "residential cleaning",
    "church cleaning",
    "commercial cleaning",
    "deep cleaning",
    "Borotho Tafoleng",
    "cleaning company",
    "QwaQwa cleaning",
    "youth employment",
    "community development",
  ],
  authors: [{ name: COMPANY.name }],
  creator: "PrimeCode Solutions",
  publisher: COMPANY.name,
  // The tab icon is src/app/icon.svg — Next generates the <link> tags from that
  // file automatically, so there is no `icons` entry to keep in sync here.
  openGraph: {
    title: "Borotho Tafoleng Cleaning & Maintenance | Professional Cleaning Services in QwaQwa",
    description:
      "Youth-owned cleaning company providing professional cleaning services while empowering young people in QwaQwa, Free State.",
    url: "https://borothotafoleng.co.za",
    siteName: "Borotho Tafoleng Cleaning & Maintenance",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-bg.png",
        width: 1344,
        height: 768,
        alt: "Borotho Tafoleng Cleaning Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Borotho Tafoleng Cleaning & Maintenance",
    description:
      "Professional cleaning services in QwaQwa. Youth-owned, community-driven.",
    images: ["/images/hero/hero-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    description:
      "Professional cleaning services in QwaQwa, Free State. Youth-owned cleaning company.",
    url: COMPANY.url,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "QwaQwa",
      addressLocality: COMPANY.locality,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-28.5",
      longitude: "28.3",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "-28.5",
        longitude: "28.3",
      },
      geoRadius: "50000",
    },
    foundingDate: COMPANY.foundingYear,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 15,
      maxValue: 20,
    },
    serviceType: SERVICES.map((service) => service.title),
    priceRange: "R$$",
    image: "/images/hero/hero-bg.png",
    sameAs: [COMPANY.facebook],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
