"use client";
import React from "react";
import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FadeUp, WordAnimation, BadgeReveal } from "@/components/ui/word-animation";

const STATS = [
  {
    value: 50000,
    suffix: "+",
    unit: "sq ft",
    label: "Warehouse Space",
    description: "Flexible storage across strategic Canadian locations",
  },
  {
    value: 99.7,
    suffix: "%",
    unit: "",
    label: "Order Accuracy",
    description: "Industry-leading precision on every shipment",
    decimals: 1,
  },
  {
    value: 150,
    suffix: "+",
    unit: "",
    label: "Carrier Partners",
    description: "Best-in-class rates to 150+ countries worldwide",
  },
  {
    value: 48,
    suffix: "h",
    unit: "",
    label: "Avg. Fulfillment",
    description: "From received order to dispatched package",
  },
];

export function Stats() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(34,197,94,0.04),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <BadgeReveal className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/5 px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-inter font-medium text-[#4ade80] tracking-widest uppercase">
              By the Numbers
            </span>
          </BadgeReveal>

          <WordAnimation
            text="Performance you can count on."
            className="font-montserrat font-black text-white leading-tight tracking-tight justify-center"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" } as React.CSSProperties}
            as="h2"
          />

          <FadeUp delay={300} className="mt-4">
            <p className="font-inter text-white/40 text-lg max-w-xl mx-auto">
              Numbers that reflect our commitment to reliability, accuracy, and scale.
            </p>
          </FadeUp>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative bg-[#0a0a0a] p-10 flex flex-col justify-between group hover:bg-[#0f1a0f] transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_80%_80%_at_50%_100%,rgba(34,197,94,0.06),transparent)]" />

              {/* Number */}
              <div className="relative">
                <div
                  className="font-montserrat font-black leading-none text-white tabular-nums"
                  style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
                >
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                  {stat.unit && (
                    <span className="font-inter font-light text-white/30 text-xl ml-1">
                      {stat.unit}
                    </span>
                  )}
                </div>

                {/* Underline accent */}
                <motion.div
                  className="h-px bg-gradient-to-r from-[#22c55e] to-transparent mt-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.5, duration: 0.8 }}
                />
              </div>

              {/* Label + description */}
              <div className="mt-8 relative">
                <p className="font-montserrat font-semibold text-white text-lg mb-2">
                  {stat.label}
                </p>
                <p className="font-inter font-light text-white/35 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
