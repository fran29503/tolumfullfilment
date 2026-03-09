"use client";
import React from "react";
import { motion } from "motion/react";
import { WordAnimation, FadeUp, BadgeReveal } from "@/components/ui/word-animation";
import { MapPin } from "lucide-react";

const REGIONS = [
  { name: "Canada", detail: "Coast-to-coast delivery network", flag: "🇨🇦", primary: true },
  { name: "United States", detail: "Cross-border fulfillment specialists", flag: "🇺🇸", primary: false },
  { name: "Europe", detail: "UK, EU, and beyond", flag: "🇪🇺", primary: false },
  { name: "Asia-Pacific", detail: "Australia, Japan, Southeast Asia", flag: "🌏", primary: false },
  { name: "Latin America", detail: "Mexico, Brazil, and key markets", flag: "🌎", primary: false },
  { name: "Middle East & Africa", detail: "Emerging market specialists", flag: "🌍", primary: false },
];

const CANADIAN_HUBS = [
  { city: "Toronto", province: "ON", x: "72%", y: "48%" },
  { city: "Vancouver", province: "BC", x: "14%", y: "52%" },
  { city: "Montréal", province: "QC", x: "78%", y: "44%" },
  { city: "Calgary", province: "AB", x: "30%", y: "50%" },
  { city: "Edmonton", province: "AB", x: "28%", y: "42%" },
];

export function Coverage() {
  return (
    <section id="coverage" className="relative py-32 bg-[#060606] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_50%,rgba(34,197,94,0.04),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <BadgeReveal className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/5 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-xs font-inter font-medium text-[#4ade80] tracking-widest uppercase">
                Global Coverage
              </span>
            </BadgeReveal>

            <WordAnimation
              text="From Vancouver to Halifax. And everywhere beyond."
              className="font-montserrat font-black text-white leading-[1.05] tracking-tight block"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" } as React.CSSProperties}
              staggerDelay={60}
              as="h2"
            />

            <FadeUp delay={400} className="mt-8">
              <p className="font-inter font-light text-white/45 text-lg leading-relaxed">
                Strategically positioned warehouses across Canada&apos;s major logistics
                corridors — giving your brand the speed, reach, and reliability to
                deliver anywhere on Earth.
              </p>
            </FadeUp>

            <FadeUp delay={600} className="mt-8">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#22c55e]" />
                <span className="font-inter text-sm text-white/50">
                  5 strategic fulfillment hubs across Canada
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Canada schematic map */}
          <FadeUp delay={300} className="relative">
            <div className="relative aspect-[2/1] rounded-2xl border border-white/5 bg-white/2 overflow-hidden">
              {/* Simplified Canada outline SVG */}
              <svg
                viewBox="0 0 800 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background grid */}
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                </pattern>
                <rect width="800" height="400" fill="url(#mapGrid)" />

                {/* Simplified Canada shape */}
                <path
                  d="M110,180 L80,150 L90,120 L130,100 L170,90 L220,85 L280,80 L340,78 L400,80 L460,82 L520,85 L580,90 L630,100 L660,115 L680,130 L690,150 L680,170 L660,185 L640,195 L620,210 L590,220 L560,225 L530,228 L500,232 L470,235 L440,238 L410,240 L380,242 L350,240 L320,238 L290,235 L260,232 L230,228 L200,222 L170,215 L145,205 L125,192 L110,180 Z"
                  fill="rgba(34,197,94,0.04)"
                  stroke="rgba(34,197,94,0.15)"
                  strokeWidth="1.5"
                />

                {/* Maritime region */}
                <path
                  d="M660,140 L680,130 L700,135 L710,150 L700,165 L680,170 L660,160 Z"
                  fill="rgba(34,197,94,0.06)"
                  stroke="rgba(34,197,94,0.2)"
                  strokeWidth="1"
                />

                {/* Hub points */}
                {CANADIAN_HUBS.map((hub) => {
                  const cx = parseFloat(hub.x) * 8;
                  const cy = parseFloat(hub.y) * 4;
                  return (
                    <g key={hub.city} filter="url(#glow)">
                      <circle cx={cx} cy={cy} r="12" fill="rgba(34,197,94,0.08)" />
                      <circle cx={cx} cy={cy} r="5" fill="#22c55e" opacity="0.9" />
                      <circle cx={cx} cy={cy} r="2" fill="#4ade80" />
                      <text
                        x={cx}
                        y={cy - 14}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.6)"
                        fontSize="9"
                        fontFamily="Inter, sans-serif"
                        fontWeight="500"
                      >
                        {hub.city}
                      </text>
                    </g>
                  );
                })}

                {/* Connection lines */}
                <polyline
                  points={CANADIAN_HUBS.map(h => `${parseFloat(h.x)*8},${parseFloat(h.y)*4}`).join(" ")}
                  fill="none"
                  stroke="rgba(34,197,94,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-transparent to-[#060606] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-transparent to-[#060606] pointer-events-none" />
            </div>
          </FadeUp>
        </div>

        {/* Global regions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region.name}
              className={`rounded-2xl border p-6 flex items-center gap-5 transition-all duration-400 ${
                region.primary
                  ? "border-[#22c55e]/30 bg-[#22c55e]/5 premium-card"
                  : "border-white/5 bg-white/2 premium-card"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="text-3xl">{region.flag}</span>
              <div>
                <p className={`font-montserrat font-semibold text-sm ${region.primary ? "text-[#4ade80]" : "text-white"}`}>
                  {region.name}
                </p>
                <p className="font-inter text-xs text-white/35 mt-0.5">{region.detail}</p>
              </div>
              {region.primary && (
                <div className="ml-auto w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
