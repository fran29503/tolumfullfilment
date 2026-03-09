"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WordAnimation, BadgeReveal } from "@/components/ui/word-animation";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Co-Founder & CEO",
    company: "Lumière Skincare",
    location: "Toronto, ON",
    avatar: "SM",
    color: "#22c55e",
    rating: 5,
    text: "Switching to Tolum was the best operational decision we've made. Our order accuracy went from 94% to 99.8% overnight, and our customers noticed. Returns dropped by 40%. These guys are the real deal.",
    metric: "+40% fewer returns",
  },
  {
    id: 2,
    name: "James Okonkwo",
    role: "Director of Operations",
    company: "NorthPeak Athletics",
    location: "Vancouver, BC",
    avatar: "JO",
    color: "#4ade80",
    rating: 5,
    text: "We were drowning in peak season before Tolum. Now we scale from 500 to 15,000 orders a week without breaking a sweat. Their dashboard is insanely good — real-time everything. Total game changer.",
    metric: "15,000+ orders/week",
  },
  {
    id: 3,
    name: "Émilie Tremblay",
    role: "Founder",
    company: "Boréal Home Goods",
    location: "Montréal, QC",
    avatar: "ÉT",
    color: "#86efac",
    rating: 5,
    text: "We ship to 22 countries and Tolum handles it like it's nothing. Their carrier network saved us 18% on shipping costs immediately. Onboarding was done in 36 hours — I couldn't believe it.",
    metric: "−18% shipping costs",
  },
  {
    id: 4,
    name: "Tyler Chung",
    role: "Growth Lead",
    company: "Cedar & Pine Co.",
    location: "Calgary, AB",
    avatar: "TC",
    color: "#22c55e",
    rating: 5,
    text: "The custom packaging integration is chef's kiss. We went from plain boxes to a full branded unboxing experience. Customer NPS jumped 22 points in three months. Tolum isn't just a 3PL — it's a growth tool.",
    metric: "+22 NPS points",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.05),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <BadgeReveal className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/5 px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-inter font-medium text-[#4ade80] tracking-widest uppercase">
              Client Results
            </span>
          </BadgeReveal>

          <WordAnimation
            text="Brands that scaled with Tolum."
            className="font-montserrat font-black text-white leading-tight tracking-tight justify-center"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" } as React.CSSProperties}
            as="h2"
          />
        </div>

        {/* Testimonial showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* Main testimonial */}
          <div className="lg:col-span-3 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: direction * 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -direction * 40, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Quote card */}
                <div className="relative rounded-3xl border border-white/8 bg-gradient-to-br from-white/3 to-transparent p-10 lg:p-14">
                  <Quote
                    size={48}
                    className="absolute top-8 right-10 text-[#22c55e]/10"
                    strokeWidth={1}
                  />

                  {/* Stars */}
                  <div className="flex gap-1 mb-8">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#22c55e] text-[#22c55e]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="font-inter font-light text-white/80 text-xl lg:text-2xl leading-relaxed mb-10 relative">
                    &ldquo;{current.text}&rdquo;
                  </blockquote>

                  {/* Metric pill */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 px-5 py-2.5 mb-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span className="font-montserrat font-bold text-[#4ade80] text-sm">
                      {current.metric}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-montserrat font-bold text-black text-sm"
                      style={{ backgroundColor: current.color }}
                    >
                      {current.avatar}
                    </div>
                    <div>
                      <p className="font-montserrat font-semibold text-white">
                        {current.name}
                      </p>
                      <p className="font-inter text-sm text-white/40">
                        {current.role} · {current.company} · {current.location}
                      </p>
                    </div>
                  </div>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#22c55e]/8 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#22c55e]/40 hover:bg-[#22c55e]/10 transition-all duration-300 group"
              >
                <ChevronLeft size={16} className="text-white/40 group-hover:text-[#22c55e] transition-colors" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#22c55e]/40 hover:bg-[#22c55e]/10 transition-all duration-300 group"
              >
                <ChevronRight size={16} className="text-white/40 group-hover:text-[#22c55e] transition-colors" />
              </button>

              {/* Dots */}
              <div className="flex gap-2 ml-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                    className={`h-px transition-all duration-300 ${
                      i === active ? "w-8 bg-[#22c55e]" : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {TESTIMONIALS.filter((_, i) => i !== active).slice(0, 2).map((t, i) => (
              <motion.button
                key={t.id}
                onClick={() => { setDirection(1); setActive(TESTIMONIALS.findIndex(x => x.id === t.id)); }}
                className="text-left p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-[#22c55e]/20 hover:bg-[#22c55e]/3 transition-all duration-400 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={10} className="fill-[#22c55e]/50 text-[#22c55e]/50" />
                  ))}
                </div>
                <p className="font-inter text-sm text-white/40 line-clamp-3 mb-4 leading-relaxed group-hover:text-white/60 transition-colors">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-montserrat font-bold text-black text-xs"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-white text-sm">{t.name}</p>
                    <p className="font-inter text-xs text-white/30">{t.company}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
