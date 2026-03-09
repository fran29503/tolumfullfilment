"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
  direction?: "left" | "right";
}

export function InfiniteMarquee({
  items,
  speed = 30,
  className,
  itemClassName,
  separator = "·",
  direction = "left",
}: InfiniteMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("flex overflow-hidden whitespace-nowrap", className)}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        className={cn(
          "flex shrink-0 gap-0 will-change-transform",
          direction === "left" ? "animate-[marquee_var(--duration)_linear_infinite]" : "animate-[marquee-reverse_var(--duration)_linear_infinite]"
        )}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span key={i} className={cn("inline-flex items-center gap-4 px-4", itemClassName)}>
            <span>{item}</span>
            <span className="text-[#22c55e] text-xs opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
