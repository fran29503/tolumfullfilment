"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Bell, AlertTriangle } from "lucide-react";
import { Alert, MOCK_ALERTS, updateMockAlerts } from "@/lib/data/mock-alerts";
import { AlertItem } from "./alert-item";

export function AlertsModule() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  // Update alerts every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prevAlerts) => updateMockAlerts(prevAlerts));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate statistics
  const stats = useCallback(() => {
    const critical = alerts.filter((a) => a.type === "critical").length;
    const warning = alerts.filter((a) => a.type === "warning").length;
    const unread = alerts.filter((a) => !a.acknowledged).length;

    return { critical, warning, unread };
  }, [alerts]);

  const { critical, warning, unread } = stats();

  return (
    <motion.div
      className="w-full h-96 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col relative group"
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
            <Bell size={16} className="text-green-primary" />
            Smart Alerts Center
          </h3>
          <p className="text-xs text-white/40 mt-1">Real-time system notifications</p>
        </motion.div>
      </div>

      {/* Alerts feed */}
      <motion.div
        className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/40">
            <p className="text-xs">No alerts</p>
          </div>
        ) : (
          alerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)
        )}
      </motion.div>

      {/* Stats bar */}
      <motion.div
        className="px-4 py-3 border-t border-white/5 bg-black/20 grid grid-cols-3 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {/* Critical count */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider flex items-center justify-center gap-1">
            {critical > 0 && (
              <AlertTriangle size={12} className="text-red-400" />
            )}
            Critical
          </p>
          <motion.p
            key={`crit-${critical}`}
            className={`text-lg font-bold mt-1 ${critical > 0 ? "text-red-400" : "text-white/50"}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {critical}
          </motion.p>
        </div>

        {/* Warning count */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Warnings
          </p>
          <motion.p
            key={`warn-${warning}`}
            className={`text-lg font-bold mt-1 ${warning > 0 ? "text-yellow-400" : "text-white/50"}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {warning}
          </motion.p>
        </div>

        {/* Unread count */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Unread
          </p>
          <motion.p
            key={`unread-${unread}`}
            className="text-lg font-bold text-green-bright mt-1"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {unread}
          </motion.p>
        </div>
      </motion.div>

      {/* Live indicator pulse */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-primary animate-pulse" />
    </motion.div>
  );
}
