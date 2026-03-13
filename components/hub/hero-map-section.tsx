"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TruckRoute, MOCK_ROUTES, updateMockRoutes } from "@/lib/data/mock-routes";
import { MapCanvas } from "./map-canvas";

// Mock truck stats interface for overlay
interface TruckStat {
  id: string;
  name: string;
  status: string;
  currentLoad: number;
  fuelLevel: number;
  costAccumulated: number;
  delayRisk: number;
}

const MOCK_TRUCK_STATS: TruckStat[] = [
  {
    id: "TRUCK-A1",
    name: "TRK-001",
    status: "in-transit",
    currentLoad: 87,
    fuelLevel: 65,
    costAccumulated: 2340,
    delayRisk: 12,
  },
  {
    id: "TRUCK-B2",
    name: "TRK-002",
    status: "in-transit",
    currentLoad: 72,
    fuelLevel: 82,
    costAccumulated: 1890,
    delayRisk: 5,
  },
  {
    id: "TRUCK-C3",
    name: "TRK-003",
    status: "delayed",
    currentLoad: 65,
    fuelLevel: 45,
    costAccumulated: 3120,
    delayRisk: 48,
  },
];

export function HeroMapSection() {
  const [routes, setRoutes] = useState<TruckRoute[]>(MOCK_ROUTES);
  const [selectedTruckId, setSelectedTruckId] = useState<string>("TRUCK-A1");
  const [truckStats, setTruckStats] = useState<TruckStat[]>(MOCK_TRUCK_STATS);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes((prevRoutes) => updateMockRoutes(prevRoutes));
      setTruckStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          costAccumulated:
            stat.costAccumulated +
            Math.floor(Math.random() * 50 + 10),
          delayRisk: Math.max(0, Math.min(100, stat.delayRisk + (Math.random() - 0.5) * 10)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const selectedTruck = truckStats.find((t) => t.id === selectedTruckId);

  return (
    <div className="flex-1 min-h-0 flex flex-col rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden relative group">
      {/* Map Container - Fixed 50% height */}
      <motion.div
        className="h-1/2 w-full border-b border-white/10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <MapCanvas routes={routes} />
      </motion.div>

      {/* Info Panels Container - Scrollable */}
      <motion.div
        className="flex-1 min-h-0 flex flex-col overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Truck Selector Tabs */}
        <div className="px-4 py-4 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex gap-2 flex-wrap">
            {truckStats.map((truck) => (
              <motion.button
                key={truck.id}
                onClick={() => setSelectedTruckId(truck.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedTruckId === truck.id
                    ? "bg-green-primary text-black"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {truck.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Truck info stats - 6 columns */}
        {selectedTruck && (
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-6 gap-3">
            {/* Status */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-2">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">
                Status
              </p>
              <p className={`text-sm font-semibold ${
                selectedTruck.status === "in-transit"
                  ? "text-green-bright"
                  : "text-red-400"
              }`}>
                {selectedTruck.status === "in-transit" ? "Moving" : "Delayed"}
              </p>
            </div>

            {/* Current Load */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-2">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">
                Load
              </p>
              <motion.p
                key={`load-${selectedTruck.currentLoad}`}
                className="text-sm font-semibold text-green-bright"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {selectedTruck.currentLoad}%
              </motion.p>
            </div>

            {/* Fuel */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-2">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">
                Fuel
              </p>
              <motion.p
                key={`fuel-${selectedTruck.fuelLevel}`}
                className={`text-sm font-semibold ${
                  selectedTruck.fuelLevel > 30 ? "text-green-bright" : "text-yellow-400"
                }`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {selectedTruck.fuelLevel}%
              </motion.p>
            </div>

            {/* Cost Accumulated */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-2">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">
                Cost
              </p>
              <motion.p
                key={`cost-${selectedTruck.costAccumulated}`}
                className="text-sm font-semibold text-green-bright"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                ${selectedTruck.costAccumulated}
              </motion.p>
            </div>

            {/* Delay Risk */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-2">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">
                Delay Risk
              </p>
              <motion.p
                key={`risk-${Math.round(selectedTruck.delayRisk)}`}
                className={`text-sm font-semibold ${
                  selectedTruck.delayRisk > 30
                    ? "text-red-400"
                    : "text-green-bright"
                }`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(selectedTruck.delayRisk)}%
              </motion.p>
            </div>

            {/* ETA */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-2">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">
                ETA
              </p>
              <p className="text-sm font-semibold text-green-bright">
                {routes.find((r) => r.truckId === selectedTruck.id)?.eta || "N/A"}
              </p>
              </div>
            </div>
            </div>
          )}
      </motion.div>

      {/* Live pulse indicator */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-primary animate-pulse" />
    </div>
  );
}
