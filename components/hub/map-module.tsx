"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Truck, AlertTriangle } from "lucide-react";
import { TruckRoute, MOCK_ROUTES, updateMockRoutes } from "@/lib/data/mock-routes";
import { MapCanvas } from "./map-canvas";

export function MapModule() {
  const [routes, setRoutes] = useState<TruckRoute[]>(MOCK_ROUTES);

  // Update routes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes((prevRoutes) => updateMockRoutes(prevRoutes));
    }, 3000);

    return () => clearInterval(interval);
  }, []);


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

      {/* Map container - fills remaining space */}
      <div className="flex-1 min-h-0 relative bg-gradient-to-br from-near-black to-dark-surface p-3 overflow-hidden">
        <MapCanvas routes={routes} />
      </div>

      {/* Live indicator pulse */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-primary animate-pulse" />
    </motion.div>
  );
}
