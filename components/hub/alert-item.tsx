"use client";

import { motion } from "motion/react";
import { Alert } from "@/lib/data/mock-alerts";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";

interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  const getIcon = () => {
    switch (alert.severity) {
      case "critical":
        return <AlertCircle size={16} />;
      case "warning":
        return <AlertTriangle size={16} />;
      case "info":
        return <Info size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getColors = () => {
    switch (alert.severity) {
      case "critical":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: "text-red-400",
          text: "text-red-400",
        };
      case "warning":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          icon: "text-yellow-400",
          text: "text-yellow-400",
        };
      case "info":
        return {
          bg: "bg-blue-400/10",
          border: "border-blue-400/30",
          icon: "text-blue-400",
          text: "text-blue-400",
        };
      default:
        return {
          bg: "bg-white/5",
          border: "border-white/10",
          icon: "text-white/40",
          text: "text-white/40",
        };
    }
  };

  const colors = getColors();
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      className={`px-3 py-2.5 rounded-lg border ${colors.bg} ${colors.border} backdrop-blur-sm flex items-start gap-3`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon */}
      <div className={`mt-0.5 flex-shrink-0 ${colors.icon}`}>{getIcon()}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-white truncate">
            {alert.truck ? `[${alert.truck}]` : "System"}
          </p>
          <p className="text-xs text-white/40 flex-shrink-0">
            {formatTime(alert.timestamp)}
          </p>
        </div>
        <p className="text-xs text-white/60 mt-1 line-clamp-2">
          {alert.message}
        </p>
      </div>

      {/* Unread indicator */}
      <div className="w-2 h-2 rounded-full bg-current flex-shrink-0 mt-1" />
    </motion.div>
  );
}
