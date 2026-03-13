"use client";

import { motion } from "motion/react";
import { ChatMessage } from "@/lib/data/mock-messages";
import { MessageCircle, Bot } from "lucide-react";

interface ChatMessageComponentProps {
  message: ChatMessage;
}

export function ChatMessageComponent({ message }: ChatMessageComponentProps) {
  const isAssistant = message.sender === "assistant";

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <motion.div
      className={`flex gap-3 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isAssistant ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isAssistant
            ? "bg-green-primary/20 border border-green-primary/40"
            : "bg-blue-400/20 border border-blue-400/40"
        }`}
      >
        {isAssistant ? (
          <Bot size={14} className="text-green-bright" />
        ) : (
          <MessageCircle size={14} className="text-blue-400" />
        )}
      </div>

      {/* Message bubble */}
      <div className={`flex flex-col max-w-[200px] ${isAssistant ? "items-start" : "items-end"}`}>
        {/* Role label */}
        <p className="text-xs text-white/50 mb-1">{message.role}</p>

        {/* Message text */}
        <motion.div
          className={`px-3 py-2 rounded-lg text-xs leading-relaxed ${
            isAssistant
              ? "bg-green-primary/10 border border-green-primary/20 text-white"
              : "bg-blue-400/10 border border-blue-400/20 text-white"
          }`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {message.message}
        </motion.div>

        {/* Timestamp */}
        <p className="text-xs text-white/30 mt-1">{formatTime(message.timestamp)}</p>
      </div>
    </motion.div>
  );
}
