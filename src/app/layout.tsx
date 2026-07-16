import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "idexi — Intelligent Event Solutions | AI-Powered Crowd & Photo Management",
  description: "Transform event experiences with idexi. Features idexi Face (instant AI photo delivery), idexi Flow (smart crowd analytics), and idexi Pass (seamless access control).",
  keywords: ["AI events", "face recognition photos", "crowd diagnostics", "digital check-in", "event check-in app", "smart check-in", "idexi", "event software"],
  authors: [{ name: "idexi Team" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
};
