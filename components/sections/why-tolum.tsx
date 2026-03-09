"use client";
import React from "react";
import { motion } from "motion/react";
import { WordAnimation, FadeUp, BadgeReveal } from "@/components/ui/word-animation";
import {
  Globe,
  Zap,
  Package,
  RefreshCw,
  BarChart2,
  Shield,
  Layers,
  Clock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Globe,
    title: "Worldwide Reach",
    description:
      "Ship to 150+ countries with DHL, FedEx, UPS, Canada Post, and 150+ carrier partners — optimized for every destination.",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Same-Day Processing",
    description:
      "Orders placed before 2 PM local time are picked, packed, and dispatched the same business day. No exceptions.",
    highlight: true,
  },
  {
    icon: Package,
    title: "Custom Packaging",
    description:
      "Your brand, your unboxing. From branded boxes to custom tissue, inserts, and gift notes — all at scale.",
    highlight: false,
  },
  {
    icon: RefreshCw,
    title: "Seamless Returns",
    description:
      "Returns handled with zero friction. Inspect, restock, or liquidate — all managed through your dashboard.",
    highlight: false,
  },
  {
    icon: BarChart2,
    title: "Real-Time Dashboard",
    description:
      "Live inventory counts, order status, and carrier tracking — all in one powerful, intuitive interface.",
    highlight: false,
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "Every item stored in our warehouses is insured. Your inventory is protected, your peace of mind is guaranteed.",
    highlight: false,
  },
  {
    icon: Layers,
    title: "Multi-SKU Mastery",
    description:
      "Handle complex catalogs with ease — bundles, variants, kits, and seasonal lines managed with surgical precision.",
    highlight: false,
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description:
      "Our fulfillment centers never sleep. Around-the-clock operations mean your customers get their orders faster.",
    highlight: false,
  },
];

export function WhyTolum() {
  return (
    <section id="why-tolum" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(34,197,94,0.04),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <BadgeReveal className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/5 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-xs font-inter font-medium text-[#4ade80] tracking-widest uppercase">
                Why Tolum
              </span>
            </BadgeReveal>

            <WordAnimation
              text="Built for brands that refuse to compromise."
              className="font-montserrat font-black text-white leading-[1.05] tracking-tight block"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" } as React.CSSProperties}
              staggerDelay={60}
              as="h2"
            />
          </div>

          <FadeUp delay={300} className="max-w-sm lg:mb-2">
            <p className="font-inter font-light text-white/40 text-base leading-relaxed">
              We built Tolum around a simple idea: brands deserve a fulfillment partner
              as serious about quality as they are.
            </p>
          </FadeUp>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`relative rounded-2xl p-8 flex flex-col gap-6 cursor-default overflow-hidden premium-card ${
                feature.highlight
                  ? "border-[#22c55e]/30 bg-[#22c55e]/5"
                  : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: (i % 4) * 0.08 + Math.floor(i / 4) * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Glow for highlighted card */}
              {feature.highlight && (
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,197,94,0.15),transparent)] pointer-events-none" />
              )}

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  feature.highlight
                    ? "bg-[#22c55e] text-black"
                    : "bg-white/5 text-[#22c55e]"
                }`}
              >
                <feature.icon size={18} strokeWidth={2} />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-montserrat font-bold text-white text-lg mb-2 leading-tight">
                  {feature.title}
                </h3>
                <p className="font-inter font-light text-white/40 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#22c55e]/5 to-transparent rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
