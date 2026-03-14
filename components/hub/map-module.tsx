"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Truck } from "lucide-react";
import { TruckRoute, MOCK_ROUTES, updateMockRoutes } from "@/lib/data/mock-routes";
import { MapCanvas } from "./map-canvas";

export function MapModule() {
  const [routes, setRoutes] = useState<TruckRoute[]>(MOCK_ROUTES);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes((prev) => updateMockRoutes(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    /*
     * h-full so the component fills its CSS Grid cell.
     * flex flex-col so header + map divide space correctly.
     */
    <motion.div
      className="h-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm flex flex-col relative group overflow-hidden"
      whileHover={{ borderColor: "rgba(34, 197, 94, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex-shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Truck size={16} className="text-green-primary" />
          Live Operations Map
        </h3>
        <p className="text-xs text-white/40 mt-0.5">Real-time truck tracking</p>
      </div>

      {/* Map — fills remaining height */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <MapCanvas routes={routes} />
      </div>

      {/* Live indicator */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-primary animate-pulse z-10" />
    </motion.div>
  );
}
