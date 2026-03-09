"use client";
import React, { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WordAnimation, FadeUp } from "@/components/ui/word-animation";
import { ArrowRight, Mail, Phone } from "lucide-react";

// Floating particle
function Particle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <div
      className="absolute w-px h-px rounded-full bg-[#22c55e]"
      style={{
        left: x,
        top: y,
        animation: `float-particle 5s ease-in-out ${delay}s infinite`,
        opacity: 0,
      }}
    />
  );
}

type Particle = { x: string; y: string; delay: number };

export function CTA() {
  const [formState, setFormState] = useState({ name: "", email: "", brand: "" });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent" />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(34,197,94,0.07),transparent)]" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <WordAnimation
            text="Ready to Scale Your Fulfillment?"
            className="font-montserrat font-black text-white leading-[1.0] tracking-tight justify-center"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" } as React.CSSProperties}
            staggerDelay={60}
            as="h2"
          />

          <FadeUp delay={500} className="mt-6">
            <p className="font-inter font-light text-white/45 text-xl max-w-2xl mx-auto leading-relaxed">
              Join 200+ Canadian brands that trust Tolum to handle their fulfillment.{" "}
              <span className="text-white font-medium">Start in 48 hours. No minimums.</span>
            </p>
          </FadeUp>
        </div>

        {/* Form card */}
        <FadeUp delay={700}>
          <div className="relative rounded-3xl border border-white/8 bg-white/2 backdrop-blur-sm p-8 lg:p-14">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#22c55e]/6 via-transparent to-transparent pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="font-inter text-xs font-medium text-white/40 tracking-widest uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Smith"
                  className="bg-white/4 border border-white/8 rounded-xl px-5 py-4 font-inter text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#22c55e]/4 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-inter text-xs font-medium text-white/40 tracking-widest uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@yourbrand.com"
                  className="bg-white/4 border border-white/8 rounded-xl px-5 py-4 font-inter text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#22c55e]/4 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-inter text-xs font-medium text-white/40 tracking-widest uppercase">
                  Brand / Company Name
                </label>
                <input
                  type="text"
                  value={formState.brand}
                  onChange={(e) => setFormState({ ...formState, brand: e.target.value })}
                  placeholder="Your Brand Inc."
                  className="bg-white/4 border border-white/8 rounded-xl px-5 py-4 font-inter text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#22c55e]/4 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton
                variant="primary"
                className="gap-3 text-sm font-semibold px-10 py-4 w-full sm:w-auto justify-center"
              >
                Request a Free Quote
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                href="tel:+16132340000"
                className="gap-2 text-sm px-8 py-4 w-full sm:w-auto justify-center"
              >
                <Phone size={15} />
                Book a Call
              </MagneticButton>
            </div>

            <p className="font-inter text-xs text-white/25 mt-6 text-center">
              No credit card required · Onboarding in 48 hours · Cancel anytime
            </p>
          </div>
        </FadeUp>

        {/* Bottom contact info */}
        <FadeUp delay={900} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
          <a href="mailto:hello@tolum.ca" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300">
            <Mail size={15} className="text-[#22c55e]" />
            hello@tolum.ca
          </a>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <a href="tel:+16132340000" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300">
            <Phone size={15} className="text-[#22c55e]" />
            +1 (613) 234-0000
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
