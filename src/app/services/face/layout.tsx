import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Event Photo Delivery | idexi Face",
  description:
    "Match and deliver private, branded photo galleries to event guests within minutes using 99% accurate facial recognition AI. Zero manual sorting.",
};

export default function FaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
