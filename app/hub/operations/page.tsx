"use client";

import { motion } from "motion/react";
import { HubHeader } from "@/components/hub/hub-header";
import { MapModule } from "@/components/hub/map-module";
import { TruckInfoPanel } from "@/components/hub/truck-info-panel";
import { SidebarNav } from "@/components/hub/sidebar-nav";

export default function OperationsPage() {
  return (
    <>
      <SidebarNav />

      <main className="bg-black h-screen overflow-hidden ml-[250px] flex flex-col">
        <HubHeader />

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden px-6 py-4 relative gap-4">
          {/* Decorative grid background */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-0" />

          {/* Content */}
          <motion.div
            className="relative z-10 flex-1 min-h-0 flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title row */}
            <div className="flex items-center justify-between flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">Live Operations</h1>
              <p className="text-sm text-white/40">Real-time truck tracking and fleet management</p>
            </div>

            {/*
             * CSS Grid — 50% map / 50% truck info.
             * flex-1 min-h-0 ensures it fills remaining space after the title row.
             * grid-rows-2 guarantees exact 50/50 regardless of content height.
             */}
            <div className="flex-1 min-h-0 grid grid-rows-2 gap-4">
              <MapModule />
              <TruckInfoPanel />
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
