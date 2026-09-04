import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectEasterEgg from "@/components/ArchitectEasterEgg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://idexi.tech"),
  title: {
    default: "idexi — AI Event Check-In, Ticketing & Photo Delivery",
    template: "%s | idexi",
  },
  description:
    "AI event check-in software, fraud-proof digital ticketing, and instant photo delivery with offline support. Plans from $199 with a full refund guarantee.",
  keywords: [
    "event check-in software",
    "how to stop duplicate ticket scanning",
    "offline event check-in app",
    "AI event ticketing",
    "facial recognition event photos",
    "event access control",
    "digital check-in software",
    "stop duplicate ticket entry",
    "qr ticket scanner app",
    "idexi",
  ],
  authors: [
    { name: "Saif Alqdessi", url: "https://www.linkedin.com/in/saif-alqdess" },
    { name: "Jafar Alkhadrawi", url: "https://www.linkedin.com/in/jafar-alkhadrawi" },
    { name: "idexi Team", url: "https://idexi.tech" },
  ],
  creator: "idexi",
  publisher: "idexi",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://idexi.tech",
    siteName: "idexi",
    title: "idexi — AI Event Check-In, Ticketing & Photo Delivery",
    description:
      "AI event check-in software, fraud-proof digital ticketing, and instant photo delivery with offline support. Plans from $199 with a full refund guarantee.",
    images: [
      {
        url: "/flow-conference-hall.jpg",
        width: 1200,
        height: 630,
        alt: "idexi — AI Event Check-In, Ticketing & Photo Delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "idexi — AI Event Check-In, Ticketing & Photo Delivery",
    description:
      "AI event check-in software, fraud-proof digital ticketing, and instant photo delivery with offline support. Plans from $199 with a full refund guarantee.",
    images: ["/flow-conference-hall.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLdOrgAndProduct = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://idexi.tech/#organization",
      "name": "idexi",
      "url": "https://idexi.tech",
      "logo": "https://idexi.tech/logo-black-horizontal.png",
      "description":
        "AI-powered event solutions: intelligent check-in, fraud-proof digital ticketing, and facial recognition photo delivery.",
      "founders": [
        {
          "@type": "Person",
          "name": "Saif Alqdessi",
          "jobTitle": "Co-Founder & Tech Lead",
          "email": "alqdessi.qp@gmail.com",
          "sameAs": "https://www.linkedin.com/in/saif-alqdess"
        },
        {
          "@type": "Person",
          "name": "Jafar Alkhadrawi",
          "jobTitle": "Co-Founder & Business Lead",
          "email": "khadrawi.jafer@gmail.com",
          "sameAs": "https://www.linkedin.com/in/jafar-alkhadrawi"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@idexi.tech",
        "contactType": "customer support"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://idexi.tech/#software",
      "name": "idexi Event Suite",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "description":
        "AI event check-in software, fraud-proof digital ticketing, and facial recognition photo delivery with offline sync and 100% full refund guarantee if check-in fails.",
      "offers": {
        "@type": "Offer",
        "price": "199.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "description": "Starting at $199 per event with full refund guarantee if check-in fails at the door."
      }
    }
  ]
};

const themeInitScript = `
  (function () {
    try {
      var stored = window.localStorage.getItem('idexi-theme');
      var theme = stored === 'light' || stored === 'dark'
        ? stored
        : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrgAndProduct) }}
        />
      </head>
      <body style={bodyStyle}>
        <Navbar />
        <main style={mainStyle}>
          {children}
        </main>
        <Footer />
        <ArchitectEasterEgg />
      </body>
    </html>
  );
}

const bodyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  paddingTop: "80px", // Provide padding so navbar does not overlay content
  position: "relative",
  zIndex: 1,
  overflow: "visible",
};
