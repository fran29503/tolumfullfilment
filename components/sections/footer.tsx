"use client";
import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

const NAV_LINKS = {
  Services: [
    { label: "Warehousing", href: "#services" },
    { label: "Pick & Pack", href: "#services" },
    { label: "Global Shipping", href: "#services" },
    { label: "Returns Management", href: "#services" },
    { label: "Inventory Control", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Coverage", href: "#coverage" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#" },
  ],
  Resources: [
    { label: "Pricing", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "API Docs", href: "#" },
  ],
};

const SOCIALS = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-1 text-sm text-white/35 hover:text-white transition-colors duration-300"
    >
      {children}
      <ArrowUpRight
        size={11}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-0.5 translate-x-0.5"
      />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/6 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#22c55e]/4 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <a href="#" className="inline-flex items-center gap-3 group mb-6 block">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-[#22c55e] rounded-lg rotate-12 group-hover:rotate-6 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black rounded-lg rotate-6 group-hover:rotate-3 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#22c55e]/20 rounded-lg border border-[#22c55e]/40 flex items-center justify-center">
                  <span className="text-[#22c55e] font-montserrat font-black text-xs leading-none">T</span>
                </div>
              </div>
              <span className="font-montserrat font-black text-xl tracking-widest text-white group-hover:text-[#22c55e] transition-colors duration-300">
                TOLUM
              </span>
            </a>

            <p className="font-inter font-light text-sm text-white/40 leading-relaxed max-w-xs mb-8">
              Canada&apos;s premier fulfillment partner. End-to-end logistics solutions for growing brands — from coast to coast and beyond every border.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a
                href="mailto:hello@tolum.ca"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center group-hover:border-[#22c55e]/30 group-hover:bg-[#22c55e]/5 transition-all duration-300">
                  <Mail size={13} className="text-[#22c55e]" />
                </div>
                hello@tolum.ca
              </a>
              <a
                href="tel:+16132340000"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center group-hover:border-[#22c55e]/30 group-hover:bg-[#22c55e]/5 transition-all duration-300">
                  <Phone size={13} className="text-[#22c55e]" />
                </div>
                +1 (613) 234-0000
              </a>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center">
                  <MapPin size={13} className="text-[#22c55e]" />
                </div>
                Ottawa, Ontario, Canada
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-white/40 hover:text-white hover:border-[#22c55e]/40 hover:bg-[#22c55e]/8 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-3 gap-8">
            {Object.entries(NAV_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="font-inter text-xs font-semibold text-white/25 tracking-widest uppercase mb-5">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Bottom bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-white/20">
            © {new Date().getFullYear()} Tolum Fulfillment Inc. All rights reserved.
          </p>

          {/* Center: certifications / badges */}
          <div className="flex items-center gap-4">
            {["SOC 2 Compliant", "ISO 9001", "BBB A+"].map((badge) => (
              <span
                key={badge}
                className="font-inter text-[10px] text-white/25 tracking-wider uppercase border border-white/8 rounded px-2 py-1"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="font-inter text-xs text-white/25 hover:text-white/60 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="font-inter text-xs text-white/25 hover:text-white/60 transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Large background wordmark */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-montserrat font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(6rem, 15vw, 14rem)" }}
          aria-hidden
        >
          TOLUM
        </div>
      </div>
    </footer>
  );
}
