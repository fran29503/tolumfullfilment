"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface WordAnimationProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

export function WordAnimation({
  text,
  className,
  style,
  delay = 0,
  staggerDelay = 120,
  once = true,
  as: Tag = "span",
}: WordAnimationProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: "-60px" });
  const words = text.split(" ");
  const Component = Tag as React.ElementType;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Component ref={ref as any} className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)} style={style}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={isInView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : {}}
            transition={{
              duration: 0.7,
              delay: delay / 1000 + (i * staggerDelay) / 1000,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

// Character-by-character variant
interface CharAnimationProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function CharAnimation({
  text,
  className,
  charClassName,
  delay = 0,
  staggerDelay = 40,
  once = true,
}: CharAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  const chars = text.split("");

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {chars.map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={cn("inline-block", charClassName)}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: delay / 1000 + (i * staggerDelay) / 1000,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Fade-up block variant (for paragraphs/subtitles)
interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function FadeUp({ children, className, delay = 0, duration = 0.7, once = true }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
      animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration, delay: delay / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// Label badge variant
export function BadgeReveal({ children, className, delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}
