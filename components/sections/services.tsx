"use client";
import React from "react";
import { motion } from "motion/react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow";
import { WordAnimation, FadeUp, BadgeReveal } from "@/components/ui/word-animation";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    id: "warehousing",
    label: "01",
    title: "Warehousing & Storage",
    description:
      "Flexible space from pallet-level to enterprise scale — climate-controlled, insured, and managed in real time.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop",
    tag: "Storage",
  },
  {
    id: "pick-pack",
    label: "02",
    title: "Pick & Pack Fulfillment",
    description:
      "Precision order processing with 99.7% accuracy — from single-item orders to complex multi-SKU bundles.",
    imageUrl:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=900&auto=format&fit=crop",
    tag: "Fulfillment",
  },
  {
    id: "global-shipping",
    label: "03",
    title: "Global Shipping",
    description:
      "150+ carrier partnerships unlock the best rates and fastest transit times to 150+ countries worldwide.",
    imageUrl:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=900&auto=format&fit=crop",
    tag: "Logistics",
  },
  {
    id: "returns",
    label: "04",
    title: "Returns Management",
    description:
      "Seamless reverse logistics that protect your margins — inspect, restock, or dispose in one streamlined flow.",
    imageUrl:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=900&auto=format&fit=crop",
    tag: "Reverse Logistics",
  },
  {
    id: "inventory",
    label: "05",
    title: "Inventory Control",
    description:
      "Real-time dashboard visibility across all your SKUs — automated alerts, low-stock warnings, and detailed analytics.",
    imageUrl:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=900&auto=format&fit=crop",
    tag: "Technology",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 bg-black overflow-hidden">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-20">
          <BadgeReveal className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/5 px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-inter font-medium text-[#4ade80] tracking-widest uppercase">
              Our Services
            </span>
          </BadgeReveal>

          <WordAnimation
            text="Everything your brand needs to ship at scale."
            className="font-montserrat font-black text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" } as React.CSSProperties}
            staggerDelay={80}
            as="h2"
          />

          <FadeUp delay={300} className="mt-6 max-w-xl">
            <p className="font-inter font-light text-white/45 text-lg leading-relaxed">
              From the moment your inventory arrives to the second it lands at your
              customer&apos;s door — we handle every step with precision.
            </p>
          </FadeUp>
        </div>

        {/* HoverSlider */}
        <HoverSlider className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: service list */}
          <div className="flex flex-col space-y-1">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="group flex items-start gap-4 py-5 border-b border-white/5 cursor-pointer">
                  <span className="font-montserrat text-xs font-medium text-[#22c55e]/50 mt-2 w-8 shrink-0">
                    {service.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <TextStaggerHover
                      text={service.title}
                      index={index}
                      className="font-montserrat font-bold text-2xl md:text-3xl leading-tight tracking-tight"
                    />
                    <motion.p
                      className="font-inter text-sm text-white/40 mt-2 leading-relaxed max-w-md"
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: "auto" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                  <span className="shrink-0 mt-2 text-white/20 group-hover:text-[#22c55e] transition-colors duration-300">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: image reveal */}
          <div className="relative lg:sticky lg:top-32 hidden lg:block">
            <HoverSliderImageWrap className="h-[500px] rounded-2xl overflow-hidden">
              {SERVICES.map((service, index) => (
                <HoverSliderImage
                  key={service.id}
                  index={index}
                  imageUrl={service.imageUrl}
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              ))}
            </HoverSliderImageWrap>

            {/* Image overlay gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating tag */}
            <motion.div
              className="absolute bottom-6 left-6 bg-black/80 border border-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-inter font-medium text-[#22c55e] tracking-wider uppercase">
                Fulfillment
              </span>
            </motion.div>

            {/* Decorative glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#22c55e]/10 via-transparent to-transparent -z-10 blur-xl" />
          </div>
        </HoverSlider>
      </div>
    </section>
  );
}
