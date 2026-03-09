"use client";
import React, { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  variant = "primary",
  href,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseClasses =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full font-montserrat font-semibold tracking-wide transition-all duration-300 cursor-pointer select-none";

  const variants = {
    primary: cn(
      "bg-[#22c55e] text-black px-8 py-4 text-sm",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
      isHovered
        ? "shadow-[0_0_30px_rgba(34,197,94,0.5),0_0_60px_rgba(34,197,94,0.2)]"
        : "shadow-[0_0_0px_rgba(34,197,94,0)]"
    ),
    secondary: cn(
      "border border-white/20 text-white px-8 py-4 text-sm bg-transparent",
      "hover:border-[#22c55e] hover:text-[#22c55e]",
      "after:absolute after:inset-0 after:rounded-full after:bg-[#22c55e]/5 after:scale-0 hover:after:scale-100 after:transition-transform after:duration-300"
    ),
    ghost: cn(
      "text-white/70 px-4 py-2 text-sm hover:text-white",
      "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full",
      "after:bg-[#22c55e] after:transition-all after:duration-300"
    ),
  };

  const content = (
    <motion.div
      ref={ref}
      className={cn(baseClasses, variants[variant], className)}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return (
    <button type={type} onClick={onClick} className="outline-none">
      {content}
    </button>
  );
}
