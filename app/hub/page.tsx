"use client";

import { motion } from "motion/react";
import { HubHeader } from "@/components/hub/hub-header";
import { KpiStrip } from "@/components/hub/kpi-strip";
import { HeroMapSection } from "@/components/hub/hero-map-section";
import { AlertsTray } from "@/components/hub/alerts-tray";
import { SidebarNav } from "@/components/hub/sidebar-nav";

export default function HubPage() {
  return (
    <>
      <SidebarNav />

      <main className="bg-black h-screen overflow-hidden ml-[250px] flex flex-col">
        <HubHeader />

        {/* Content wrapper with proper height cascade */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-4 gap-4 relative">
          {/* Decorative grid background - absolute within relative parent */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-0" />

          {/* Content stack - positioned above grid */}
          <motion.div
            className="relative z-10 flex flex-col gap-4 h-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* KPI Strip - fixed height at top */}
            <KpiStrip />

            {/* Hero Map Section - flex to fill remaining space */}
            <HeroMapSection />

            {/* Alerts Tray - fixed height at bottom */}
            <AlertsTray />
          </motion.div>
        </div>
      </main>
    </>
  );
}
