"use client";

import { motion } from "motion/react";
import { HubHeader } from "@/components/hub/hub-header";
import { ModuleContainer } from "@/components/hub/module-container";
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
          <ModuleContainer delay={0.1}>
            <MapModule />
          </ModuleContainer>

          {/* Top-right: AI Sales Panel */}
          <ModuleContainer delay={0.2}>
            <SalesModule />
          </ModuleContainer>

          {/* Bottom-left: AI Chat Assistant */}
          <ModuleContainer delay={0.3}>
            <ChatModule />
          </ModuleContainer>

          {/* Bottom-right: Smart Alerts */}
          <ModuleContainer delay={0.4}>
            <AlertsModule />
          </ModuleContainer>
        </motion.div>
      </div>
    </main>
  );
}
