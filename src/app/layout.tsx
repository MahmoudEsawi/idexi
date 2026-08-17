import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "idexi: Intelligent Event Solutions | AI-Powered Access Control & Photo Management",
  description: "Transform event experiences with idexi. Features idexi Face (instant AI photo delivery), idexi Flow (staff-powered access control & event logistics), and idexi Pass (smart digital ticketing).",
  keywords: ["AI events", "face recognition photos", "event access control", "digital check-in", "event check-in app", "smart check-in", "idexi", "event software"],
  authors: [{ name: "idexi Team" }],
  robots: "index, follow",
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
  // data-scroll-behavior="smooth" is what Next.js checks for before
  // trusting the CSS scroll-behavior: smooth on <html> (globals.css) —
  // without it, Next.js's own scroll-to-top-on-route-change logic can
  // fight the CSS smooth-scroll during navigation.
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Sets data-theme before paint so the new dual-theme sections
            (see globals.css --st-* tokens) never flash the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body style={bodyStyle}>
        <Navbar />
        <main style={mainStyle}>
          {children}
        </main>
        <Footer />
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
