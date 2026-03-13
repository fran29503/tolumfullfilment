"use client";

import { motion } from "motion/react";
import { HubHeader } from "@/components/hub/hub-header";
import { MapModule } from "@/components/hub/map-module";
import { SidebarNav } from "@/components/hub/sidebar-nav";

export default function OperationsPage() {
  return (
    <>
      <SidebarNav />

      <main className="bg-black h-screen overflow-hidden ml-[250px] flex flex-col">
        <HubHeader />

        <div className="flex-1 flex flex-col overflow-hidden px-6 py-4 relative">
          {/* Decorative grid background */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-0" />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col gap-4 h-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-white">Live Operations</h1>
              <p className="text-sm text-white/40">Real-time truck tracking and fleet management</p>
            </div>

            {/* Full map module */}
            <MapModule />
          </motion.div>
        </div>
      </main>
    </>
  );
}
