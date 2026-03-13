"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { MessageSquare, Send } from "lucide-react";
import { ChatMessage, MOCK_MESSAGES, updateMockMessages } from "@/lib/data/mock-messages";
import { ChatMessageComponent } from "./chat-message";

export function ChatModule() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) => updateMockMessages(prevMessages));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Calculate stats
  const stats = useCallback(() => {
    const totalMessages = messages.length;
    const assistantMessages = messages.filter(
      (m) => m.sender === "assistant"
    ).length;
    const userMessages = totalMessages - assistantMessages;

    return { totalMessages, assistantMessages, userMessages };
  }, [messages]);

  const { totalMessages, assistantMessages, userMessages } = stats();

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
            <MessageSquare size={16} className="text-green-primary" />
            TOLUM AI Assistant
          </h3>
          <p className="text-xs text-white/40 mt-1">Real-time operational insights</p>
        </motion.div>
      </div>

      {/* Messages feed */}
      <motion.div
        className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Input + Stats bar */}
      <motion.div
        className="px-4 py-3 border-t border-white/5 bg-black/20 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {/* Input field */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask TOLUM AI..."
            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-green-primary/30 transition-colors"
            readOnly
          />
          <button className="px-2 py-1.5 bg-green-primary/20 border border-green-primary/30 rounded hover:bg-green-primary/30 transition-colors flex items-center justify-center">
            <Send size={14} className="text-green-bright" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>Messages: {totalMessages}</span>
          <span>AI: {assistantMessages} • Users: {userMessages}</span>
        </div>
      </motion.div>

      {/* Live indicator pulse */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-primary animate-pulse" />
    </motion.div>
  );
}
