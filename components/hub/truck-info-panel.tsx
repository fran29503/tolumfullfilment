"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  Route,
  DollarSign,
  AlertTriangle,
  Gauge,
  Truck,
} from "lucide-react";
import {
  TruckInfo,
  MOCK_TRUCK_INFO,
  updateTruckStats,
} from "@/lib/data/truck-stats";

const RISK_CONFIG = {
  low: { label: "Low", color: "text-green-bright" },
  medium: { label: "Medium", color: "text-yellow-400" },
  high: { label: "High", color: "text-red-400" },
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  updateKey: string;
}

function StatCard({ icon, label, value, color, updateKey }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg bg-white/5 border border-white/5">
      <div className={`${color} opacity-80`}>{icon}</div>
      <p className="text-[10px] text-white/40 uppercase tracking-wider text-center leading-tight">
        {label}
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={updateKey}
          className={`text-sm font-bold ${color} text-center`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function TruckInfoPanel() {
  const [trucks, setTrucks] = useState<TruckInfo[]>(MOCK_TRUCK_INFO);
  const [selectedId, setSelectedId] = useState<string>("TRK-001");

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks((prev) => updateTruckStats(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const selected = trucks.find((t) => t.id === selectedId) ?? trucks[0];
  const risk = RISK_CONFIG[selected.delayRisk];

  return (
    <motion.div
      className="w-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col relative group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ borderColor: "rgba(34, 197, 94, 0.3)" }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Truck size={16} className="text-green-primary" />
            Truck Information
          </h3>
          <p className="text-xs text-white/40 mt-0.5">Live stats per unit</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {trucks.map((truck) => (
            <button
              key={truck.id}
              onClick={() => setSelectedId(truck.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                selectedId === truck.id
                  ? "bg-green-primary/20 text-green-bright border border-green-primary/40"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {truck.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid - 6 columns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          className="px-4 py-4 grid grid-cols-6 gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* ETA */}
          <StatCard
            icon={<Clock size={14} />}
            label="ETA"
            value={selected.eta}
            color="text-green-bright"
            updateKey={`eta-${selected.id}-${selected.eta}`}
          />

          {/* KM sin parar */}
          <StatCard
            icon={<Route size={14} />}
            label="KM no stop"
            value={`${selected.kmWithoutStop} km`}
            color="text-blue-400"
            updateKey={`km-${selected.id}-${selected.kmWithoutStop}`}
          />

          {/* Costo acumulado */}
          <StatCard
            icon={<DollarSign size={14} />}
            label="Acum. cost"
            value={`$${selected.accumulatedCost.toLocaleString()}`}
            color="text-yellow-400"
            updateKey={`cost-${selected.id}-${selected.accumulatedCost}`}
          />

          {/* Riesgo de retraso */}
          <StatCard
            icon={<AlertTriangle size={14} />}
            label="Delay risk"
            value={risk.label}
            color={risk.color}
            updateKey={`risk-${selected.id}-${selected.delayRisk}`}
          />

          {/* Velocidad */}
          <StatCard
            icon={<Gauge size={14} />}
            label="Speed"
            value={`${selected.speed} km/h`}
            color="text-purple-400"
            updateKey={`spd-${selected.id}-${selected.speed}`}
          />

          {/* Unit ID */}
          <StatCard
            icon={<Truck size={14} />}
            label="Unit ID"
            value={selected.id}
            color="text-white/70"
            updateKey={`id-${selected.id}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Live indicator */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-primary animate-pulse" />
    </motion.div>
  );
}
