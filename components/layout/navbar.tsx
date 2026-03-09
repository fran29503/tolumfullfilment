"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Coverage", href: "#coverage" },
  { label: "Testimonials", href: "#testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-6"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-lg bg-[#22c55e] blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            </div>
            <span className="font-montserrat font-800 text-xl tracking-[0.15em] text-white uppercase">
              TOLUM
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm text-white/60 hover:text-white transition-colors duration-300 font-inter group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#22c55e] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors duration-300 font-inter">
              Log in
            </a>
            <MagneticButton variant="primary" href="#contact" className="text-xs px-6 py-3">
              Get Started
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-montserrat text-3xl font-bold text-white/60 hover:text-white transition-colors"
              initial={{ y: 30, opacity: 0 }}
              animate={mobileOpen ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={mobileOpen ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
          >
            <MagneticButton variant="primary" href="#contact" className="mt-4">
              Get Started
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
