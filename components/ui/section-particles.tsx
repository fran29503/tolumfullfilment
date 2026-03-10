"use client";

import { useEffect, useState } from "react";

function rand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const PARTICLES = Array.from({ length: 70 }, (_, i) => ({
  x: Math.round(rand(i * 3) * 10000) / 100,
  y: Math.round(rand(i * 3 + 1) * 10000) / 100,
  size: Math.round((rand(i * 3 + 2) * 1.5 + 0.8) * 10) / 10,
  opacity: Math.round((rand(i * 7) * 0.35 + 0.12) * 100) / 100,
}));

export function SectionParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
      aria-hidden
    >
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
