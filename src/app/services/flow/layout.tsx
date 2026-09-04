import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline Event Check-In Software | idexi Flow",
  description:
    "Transform any smartphone into an offline event check-in scanner. Handle entrance rushes with sub-second QR scans and zero scanner hardware rental.",
};

export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
