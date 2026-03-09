"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight, ChevronDown, Package, Globe, Zap } from "lucide-react";

const HEADLINE_WORDS = [
  "Canada's",
  "Premier",
  "Fulfillment",
  "Partner.",
];

const BADGES = [
  { icon: Package, label: "50,000+ sq ft Warehouses" },
  { icon: Globe,   label: "150+ Countries Served" },
  { icon: Zap,     label: "48h Avg. Fulfillment" },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Shader background */}
      {mounted && <ShaderAnimation />}

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(34,197,94,0.12),transparent)] z-10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40 z-10" />

      {/* Corner decorations */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 ${pos} border-white/20 z-20`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 + i * 0.15, duration: 0.6 }}
        />
      ))}

      {/* Mouse gradient follower */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-10 transition-[left,top] duration-75 ease-linear"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/5 px-4 py-2 mb-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs font-inter font-medium text-[#4ade80] tracking-widest uppercase">
            Trusted Across Canada
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-montserrat font-black leading-[0.9] tracking-tight mb-6">
          <div className="flex flex-wrap justify-center gap-x-[0.2em]">
            {HEADLINE_WORDS.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 8rem)",
                    color: i === 2 ? "#22c55e" : "#ffffff",
                  }}
                  initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.5 + i * 0.12,
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <motion.p
          className="font-inter font-light text-white/55 max-w-2xl leading-relaxed mb-12"
          style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          From our state-of-the-art warehouses to doorsteps worldwide — Tolum handles
          every step of your supply chain so your brand can{" "}
          <span className="text-white font-medium">scale without limits</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <MagneticButton
            variant="primary"
            href="#contact"
            className="gap-2 text-sm font-semibold px-8 py-4"
          >
            Start Fulfilling
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            href="#how-it-works"
            className="gap-2 text-sm px-8 py-4"
          >
            How It Works
          </MagneticButton>
        </motion.div>

        {/* Social proof badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs text-white/40 font-inter"
            >
              <Icon size={14} className="text-[#22c55e]" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs text-white/30 font-inter tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
