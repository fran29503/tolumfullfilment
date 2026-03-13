"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Zap, Clock } from "lucide-react";

export function HubHeader() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 py-4 max-w-[1920px] mx-auto">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-primary to-green-bright flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" strokeWidth={3} />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-lg text-white">
                TOLUM Operations Hub
              </h1>
              <p className="text-xs text-white/40">AI-Powered Logistics Dashboard</p>
            </div>
          </div>

          {/* Live indicator + Time */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-primary/10 border border-green-primary/30">
              <div className="w-2 h-2 rounded-full bg-green-primary animate-pulse" />
              <span className="text-xs font-inter text-green-bright tracking-widest uppercase">
                Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs font-inter">
              <Clock size={14} />
              <span className="w-16">{time || "00:00:00"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
