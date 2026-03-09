"use client";
import { useScroll, useTransform, motion } from "motion/react";

export function ParallaxBg() {
  const { scrollY, scrollYProgress } = useScroll();

  // --- Vertical parallax: clearly distinct speeds = depth illusion ---
  const y1 = useTransform(scrollY, [0, 8000], [0, -1800]); // fastest
  const y2 = useTransform(scrollY, [0, 8000], [0, -1050]); // medium
  const y3 = useTransform(scrollY, [0, 8000], [0, -480]);  // slowest

  // --- Horizontal drift: X axis adds true 3-D feel ---
  const x1 = useTransform(scrollY, [0, 8000], [0, 170]);
  const x2 = useTransform(scrollY, [0, 8000], [0, -140]);

  // --- Subtle scale variation per orb ---
  const scale1 = useTransform(scrollY, [0, 8000], [1, 1.25]);
  const scale2 = useTransform(scrollY, [0, 8000], [1.1, 0.85]);

  // --- Aurora beam: sweeps from above viewport to below as user reads page ---
  const beamY = useTransform(scrollYProgress, [0, 1], [-700, 1900]);

  // --- Second accent beam (faster, subtler) ---
  const beam2Y = useTransform(scrollYProgress, [0, 1], [200, -900]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >

      {/* ── Orb 1 — top-left, fastest, biggest ── */}
      <motion.div
        style={{ y: y1, x: x1, scale: scale1 }}
        className="absolute -top-[15%] -left-[15%] w-[1000px] h-[1000px]"
        aria-hidden
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.07) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>

      {/* ── Orb 2 — right side, medium speed ── */}
      <motion.div
        style={{ y: y2, x: x2, scale: scale2 }}
        className="absolute top-[22%] -right-[20%] w-[850px] h-[850px]"
        aria-hidden
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.13) 0%, rgba(34,197,94,0.05) 40%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />
      </motion.div>

      {/* ── Orb 3 — bottom-left, slowest ── */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[52%] -left-[12%] w-[650px] h-[650px]"
        aria-hidden
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.11) 0%, rgba(34,197,94,0.04) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* ── Aurora beam — diagonal sweep as user scrolls down ── */}
      <motion.div
        style={{ y: beamY }}
        className="absolute left-[-25%] right-[-25%] h-[320px] -rotate-[7deg]"
        aria-hidden
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(34,197,94,0.05) 30%, rgba(34,197,94,0.1) 50%, rgba(34,197,94,0.05) 70%, transparent 100%)",
            filter: "blur(55px)",
          }}
        />
      </motion.div>

      {/* ── Second beam — counter-direction, subtler ── */}
      <motion.div
        style={{ y: beam2Y }}
        className="absolute left-[-30%] right-[-30%] h-[200px] rotate-[5deg]"
        aria-hidden
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(34,197,94,0.035) 40%, rgba(34,197,94,0.055) 50%, rgba(34,197,94,0.035) 60%, transparent 100%)",
            filter: "blur(70px)",
          }}
        />
      </motion.div>

    </div>
  );
}
