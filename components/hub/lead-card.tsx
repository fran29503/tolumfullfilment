"use client";

import { motion } from "motion/react";
import { Lead } from "@/lib/data/mock-leads";
import { TrendingUp, CheckCircle, Clock } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-blue-400";
      case "qualified":
        return "text-yellow-400";
      case "negotiating":
        return "text-orange-400";
      case "converted":
        return "text-green-bright";
      default:
        return "text-white/50";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-400/10 border-blue-400/30";
      case "qualified":
        return "bg-yellow-400/10 border-yellow-400/30";
      case "negotiating":
        return "bg-orange-400/10 border-orange-400/30";
      case "converted":
        return "bg-green-primary/10 border-green-primary/30";
      default:
        return "bg-white/5 border-white/10";
    }
  };

  const formatValue = (val: number) => {
    return `$${(val / 1000).toFixed(0)}K`;
  };

  return (
    <motion.div
      className={`flex-1 rounded-lg border p-3 ${getStatusBg(lead.status)} backdrop-blur-sm transition-all duration-300`}
      whileHover={{ scale: 1.02, borderColor: "rgba(34, 197, 94, 0.3)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header: Company + Value */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-white truncate">
            {lead.company}
          </h4>
          <p className="text-xs text-white/50 truncate">{lead.contact}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-bold text-green-bright">
            {formatValue(lead.value)}
          </p>
        </div>
      </div>

      {/* Status badges */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)} ${getStatusBg(lead.status)} border`}
        >
          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
        </span>
      </div>

      {/* Engagement bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/40">Engagement</span>
          <motion.span
            key={`eng-${Math.floor(lead.engagement)}`}
            className="text-xs font-semibold text-green-bright"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.floor(lead.engagement)}%
          </motion.span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-primary to-green-bright"
            initial={{ width: "0%" }}
            animate={{ width: `${lead.engagement}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Probability bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/40">Win Probability</span>
          <motion.span
            key={`prob-${Math.floor(lead.probability)}`}
            className="text-xs font-semibold text-green-bright"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.floor(lead.probability)}%
          </motion.span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-green-bright"
            initial={{ width: "0%" }}
            animate={{ width: `${lead.probability}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Next action */}
      <div className="flex items-center gap-2 text-xs">
        {lead.status === "converted" ? (
          <>
            <CheckCircle size={12} className="text-green-bright flex-shrink-0" />
            <span className="text-green-bright truncate">Converted</span>
          </>
        ) : (
          <>
            <Clock size={12} className="text-white/40 flex-shrink-0" />
            <span className="text-white/50 truncate">{lead.nextAction}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
