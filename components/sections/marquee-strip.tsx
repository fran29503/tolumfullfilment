"use client";
import React from "react";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";

const MARQUEE_ITEMS = [
  "Warehousing & Storage",
  "Pick & Pack Fulfillment",
  "Global Shipping",
  "Returns Management",
  "Inventory Control",
  "B2B & DTC Fulfillment",
  "Kitting & Assembly",
  "Same-Day Processing",
  "Custom Packaging",
  "Real-Time Tracking",
  "Cold Chain Logistics",
  "Canadian 3PL Leader",
];

export function MarqueeStrip() {
  return (
    <section className="relative py-6 overflow-hidden border-y border-white/5 bg-[#0a0a0a]">
      {/* Green glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent" />

      <InfiniteMarquee
        items={MARQUEE_ITEMS}
        speed={28}
        className="text-xs font-inter font-medium text-white/35 tracking-widest uppercase"
        itemClassName="gap-6"
        separator="·"
      />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent" />
    </section>
  );
}
