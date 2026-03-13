"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Truck, AlertTriangle } from "lucide-react";
import { TruckRoute, MOCK_ROUTES, updateMockRoutes } from "@/lib/data/mock-routes";
import { MapCanvas } from "./map-canvas";
import { TruckInfoPanel } from "./truck-info-panel";

export function MapModule() {
  const [routes, setRoutes] = useState<TruckRoute[]>(MOCK_ROUTES);

  // Update routes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes((prevRoutes) => updateMockRoutes(prevRoutes));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate statistics
  const stats = useCallback(() => {
    const totalPackages = routes.reduce((sum, r) => sum + r.packages, 0);
    const activeRoutes = routes.filter((r) => r.status === "in-transit").length;
    const delayed = routes.filter((r) => r.status === "delayed").length;

    return { totalPackages, activeRoutes, delayed };
  }, [routes]);

  const { totalPackages, activeRoutes, delayed } = stats();

  return (
    <motion.div
      className="w-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm flex flex-col relative group"
      whileHover={{ borderColor: "rgba(34, 197, 94, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Truck size={16} className="text-green-primary" />
            Live Operations Map
          </h3>
          <p className="text-xs text-white/40 mt-1">Real-time truck tracking</p>
        </motion.div>
      </div>

      {/* Map container */}
      <div className="h-64 relative bg-gradient-to-br from-near-black to-dark-surface p-3 overflow-hidden">
        <MapCanvas routes={routes} />
      </div>

      {/* Truck Info Panel */}
      <motion.div
        className="px-3 pt-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      >
        <TruckInfoPanel />
      </motion.div>

      {/* Stats bar */}
      <motion.div
        className="px-4 py-3 border-t border-white/5 bg-black/20 grid grid-cols-3 gap-3 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Total Packages */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Packages
          </p>
          <motion.p
            key={`pkg-${totalPackages}`}
            className="text-lg font-bold text-green-bright mt-1"
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {totalPackages}
          </motion.p>
        </div>

        {/* Active Routes */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Active
          </p>
          <motion.p
            key={`active-${activeRoutes}`}
            className="text-lg font-bold text-green-bright mt-1"
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activeRoutes}/{routes.length}
          </motion.p>
        </div>

        {/* Delayed */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider flex items-center justify-center gap-1">
            {delayed > 0 && (
              <AlertTriangle size={12} className="text-red-400" />
            )}
            Delayed
          </p>
          <motion.p
            key={`delayed-${delayed}`}
            className={`text-lg font-bold mt-1 ${delayed > 0 ? "text-red-400" : "text-green-bright"}`}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {delayed}
          </motion.p>
        </div>
      </motion.div>

      {/* Live indicator pulse */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-primary animate-pulse" />
    </motion.div>
  );
}
