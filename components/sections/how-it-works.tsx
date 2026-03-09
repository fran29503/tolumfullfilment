"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { WordAnimation, FadeUp, BadgeReveal } from "@/components/ui/word-animation";
import { Store, Package, Truck, TrendingUp } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Store,
    title: "Connect Your Store",
    description:
      "Integrate with Shopify, WooCommerce, Amazon, and 40+ platforms in minutes. Our onboarding team handles the setup — no engineering required.",
    detail: "Setup in under 48 hours",
  },
  {
    number: "02",
    icon: Package,
    title: "Send Your Inventory",
    description:
      "Ship your products directly to our strategically located Canadian warehouses. We receive, inspect, and catalog every SKU with pinpoint accuracy.",
    detail: "Free receiving & inspection",
  },
  {
    number: "03",
    icon: Truck,
    title: "We Fulfill Every Order",
    description:
      "When a customer orders, our team picks, packs, and ships — fast. Custom packaging, gift notes, inserts — all handled with care.",
    detail: "99.7% accuracy guaranteed",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "You Scale Without Limits",
    description:
      "Focus on growth. We flex with your volume — from 10 orders a day to 10,000. Real-time analytics keep you in full control.",
    detail: "Unlimited scalability",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_50%,rgba(34,197,94,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24">
          <BadgeReveal className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/5 px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-inter font-medium text-[#4ade80] tracking-widest uppercase">
              How It Works
            </span>
          </BadgeReveal>

          <div className="max-w-2xl">
            <WordAnimation
              text="Simple by design. Powerful by execution."
              className="font-montserrat font-black text-white leading-[1.05] tracking-tight block"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" } as React.CSSProperties}
              staggerDelay={70}
              as="h2"
            />
            <FadeUp delay={400} className="mt-6">
              <p className="font-inter font-light text-white/45 text-lg leading-relaxed">
                Getting started takes less than 48 hours. Once you&apos;re in, our system
                handles the rest — so you can focus entirely on building your brand.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-white/5 hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-[#22c55e] to-[#22c55e]/30"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-8 lg:gap-16 py-14 border-b border-white/5 last:border-0 group"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Step indicator */}
                <div className="relative flex-shrink-0 hidden lg:flex flex-col items-center">
                  <motion.div
                    className="w-[52px] h-[52px] rounded-full border border-[#22c55e]/30 bg-[#22c55e]/5 flex items-center justify-center relative z-10 group-hover:border-[#22c55e]/70 group-hover:bg-[#22c55e]/10 transition-all duration-500"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  >
                    <step.icon size={20} className="text-[#22c55e]" />
                    <div className="absolute inset-0 rounded-full bg-[#22c55e]/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
                  <div className="lg:w-1/2">
                    {/* Mobile icon */}
                    <div className="flex items-center gap-3 mb-4 lg:hidden">
                      <div className="w-10 h-10 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/5 flex items-center justify-center">
                        <step.icon size={18} className="text-[#22c55e]" />
                      </div>
                      <span className="font-montserrat text-sm font-medium text-[#22c55e]/50">
                        {step.number}
                      </span>
                    </div>

                    <span className="hidden lg:block font-montserrat text-sm font-medium text-[#22c55e]/50 mb-3">
                      {step.number}
                    </span>
                    <h3 className="font-montserrat font-bold text-white text-2xl md:text-3xl leading-tight mb-4 tracking-tight group-hover:text-[#22c55e] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="font-inter font-light text-white/45 leading-relaxed text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Detail badge */}
                  <div className="lg:mt-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/5 px-5 py-2.5">
                      <div className="w-1 h-1 rounded-full bg-[#22c55e]" />
                      <span className="font-inter text-sm text-[#4ade80] font-medium">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
