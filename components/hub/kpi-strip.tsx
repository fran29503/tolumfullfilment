"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOCK_ROUTES, updateMockRoutes, TruckRoute } from "@/lib/data/mock-routes";

export function KpiStrip() {
  const [routes, setRoutes] = useState<TruckRoute[]>(MOCK_ROUTES);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes((prevRoutes) => updateMockRoutes(prevRoutes));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeTrucks = routes.filter((r) => r.status === "in-transit").length;
  const delayedTrucks = routes.filter((r) => r.status === "delayed").length;
  const deliveredTrucks = routes.filter((r) => r.status === "delivered").length;
  const totalPackages = routes.reduce((sum, r) => sum + r.packages, 0);

  const onTimePercentage = routes.length
    ? Math.round(
        ((routes.length - delayedTrucks) / routes.length) * 100
      )
    : 0;

  return (
    <motion.div
      className="grid grid-cols-4 gap-px rounded-lg overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Active Trucks */}
      <div className="px-4 py-3 bg-black/60 border-r border-white/5">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
          Active Trucks
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={`active-${activeTrucks}`}
            className="text-2xl font-bold text-green-bright"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTrucks}
          </motion.p>
        </AnimatePresence>
        <p className="text-xs text-white/40 mt-1">of {routes.length}</p>
      </div>

      {/* Delayed Trucks */}
      <div className="px-4 py-3 bg-black/60 border-r border-white/5">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
          Delayed
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={`delayed-${delayedTrucks}`}
            className={`text-2xl font-bold ${delayedTrucks > 0 ? "text-red-400" : "text-green-bright"}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {delayedTrucks}
          </motion.p>
        </AnimatePresence>
        <p className="text-xs text-white/40 mt-1">at risk</p>
      </div>

      {/* On-Time % */}
      <div className="px-4 py-3 bg-black/60 border-r border-white/5">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
          On-Time
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={`ontime-${onTimePercentage}`}
            className="text-2xl font-bold text-green-bright"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {onTimePercentage}%
          </motion.p>
        </AnimatePresence>
        <p className="text-xs text-white/40 mt-1">delivery rate</p>
      </div>

      {/* Total Packages */}
      <div className="px-4 py-3 bg-black/60">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
          Packages
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={`packages-${totalPackages}`}
            className="text-2xl font-bold text-green-bright"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {totalPackages}
          </motion.p>
        </AnimatePresence>
        <p className="text-xs text-white/40 mt-1">in transit</p>
      </div>
    </motion.div>
  );
}
