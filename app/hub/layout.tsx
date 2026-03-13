import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tolum AI Operations Hub | Real-Time Logistics Dashboard",
  description:
    "AI-powered operations dashboard showcasing real-time logistics management, predictive alerts, and intelligent sales automation.",
};

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
