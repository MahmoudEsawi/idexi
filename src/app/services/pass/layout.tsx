import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stop Duplicate Ticket Scanning | idexi Pass",
  description:
    "Issue cryptographic, fraud-proof digital QR passes in minutes. Stop screenshotted and duplicate ticket entries with instant scan invalidation.",
};

export default function PassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
