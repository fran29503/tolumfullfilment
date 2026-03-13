"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { TrendingUp, DollarSign } from "lucide-react";
import { Lead, MOCK_LEADS, updateMockLeads } from "@/lib/data/mock-leads";
import { LeadCard } from "./lead-card";

export function SalesModule() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  // Update leads every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLeads((prevLeads) => updateMockLeads(prevLeads));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Calculate statistics
  const stats = useCallback(() => {
    const totalValue = leads.reduce((sum, l) => sum + l.value, 0);
    const converted = leads.filter((l) => l.status === "converted").length;
    const avgProbability = Math.floor(
      leads.reduce((sum, l) => sum + l.probability, 0) / leads.length
    );

    return { totalValue, converted, avgProbability };
  }, [leads]);

  const { totalValue, converted, avgProbability } = stats();

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
            <TrendingUp size={16} className="text-green-primary" />
            AI Sales Panel
          </h3>
          <p className="text-xs text-white/40 mt-1">Lead pipeline intelligence</p>
        </motion.div>
      </div>

      {/* Leads carousel */}
      <motion.div
        className="flex-1 overflow-x-auto overflow-y-hidden px-4 py-3 flex gap-3 scroll-smooth"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </motion.div>

      {/* Stats bar */}
      <motion.div
        className="px-4 py-3 border-t border-white/5 bg-black/20 grid grid-cols-3 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {/* Total Pipeline Value */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider flex items-center justify-center gap-1">
            <DollarSign size={12} />
            Pipeline
          </p>
          <motion.p
            key={`val-${totalValue}`}
            className="text-lg font-bold text-green-bright mt-1"
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            ${(totalValue / 1000000).toFixed(1)}M
          </motion.p>
        </div>

        {/* Conversions */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Converted
          </p>
          <motion.p
            key={`conv-${converted}`}
            className="text-lg font-bold text-green-bright mt-1"
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {converted}/{leads.length}
          </motion.p>
        </div>

        {/* Avg Win Probability */}
        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Avg Probability
          </p>
          <motion.p
            key={`prob-${avgProbability}`}
            className="text-lg font-bold text-green-bright mt-1"
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {avgProbability}%
          </motion.p>
        </div>
      </motion.div>

      {/* Live indicator pulse */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-primary animate-pulse" />
    </motion.div>
  );
}
