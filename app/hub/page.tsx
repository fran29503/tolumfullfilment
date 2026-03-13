"use client";

import { motion } from "motion/react";
import { HubHeader } from "@/components/hub/hub-header";
import { MapModule } from "@/components/hub/map-module";
import { SalesModule } from "@/components/hub/sales-module";
import { ChatModule } from "@/components/hub/chat-module";
import { AlertsModule } from "@/components/hub/alerts-module";

export default function HubPage() {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <HubHeader />

      <div className="relative px-6 py-8 max-w-[1920px] mx-auto">
        {/* Decorative grid background */}
        <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none z-0" />

        {/* 4-Module Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top-left: Live Operations Map */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <MapModule />
          </motion.div>

          {/* Top-right: AI Sales Panel */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SalesModule />
          </motion.div>

          {/* Bottom-left: AI Chat Assistant */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ChatModule />
          </motion.div>

          {/* Bottom-right: Smart Alerts */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AlertsModule />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
