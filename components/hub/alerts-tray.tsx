"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { AlertCircle, AlertTriangle, Info, ChevronRight } from "lucide-react";
import { Alert, MOCK_ALERTS, updateMockAlerts } from "@/lib/data/mock-alerts";

export function AlertsTray() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prevAlerts) => updateMockAlerts(prevAlerts));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get top 3 most critical alerts
  const topAlerts = alerts
    .sort((a, b) => {
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    })
    .slice(0, 3);

  const getSeverityIcon = (severity: "critical" | "warning" | "info") => {
    switch (severity) {
      case "critical":
        return <AlertCircle size={12} className="text-red-400 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle size={12} className="text-yellow-400 flex-shrink-0" />;
      case "info":
        return <Info size={12} className="text-blue-400 flex-shrink-0" />;
    }
  };

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <AlertCircle size={14} className="text-green-primary" />
          Active Alerts
        </h3>
        <Link
          href="/hub/alerts"
          className="flex items-center gap-1 text-xs text-green-bright hover:text-green-primary transition-colors"
        >
          View all {alerts.length} <ChevronRight size={12} />
        </Link>
      </div>

      {/* Alerts grid */}
      <div className="flex items-center gap-2 flex-wrap">
        {topAlerts.length > 0 ? (
          topAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {getSeverityIcon(alert.severity)}
              <span className="text-white/80 truncate max-w-[280px]">
                {alert.message}
              </span>
            </motion.div>
          ))
        ) : (
          <p className="text-xs text-white/40">All systems operational</p>
        )}
      </div>
    </motion.div>
  );
}
