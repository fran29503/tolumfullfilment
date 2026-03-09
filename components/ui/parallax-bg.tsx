"use client";
import { useScroll, useTransform, motion } from "motion/react";

export function ParallaxBg() {
  const { scrollY } = useScroll();

  // Different rates = depth illusion
  const y1 = useTransform(scrollY, [0, 5000], [0, -900]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -550]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -300]);
  const y4 = useTransform(scrollY, [0, 5000], [0, -1100]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top-left deep orb */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[300px] -left-[250px] w-[900px] h-[900px] rounded-full"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.055)_0%,transparent_65%)]" />
      </motion.div>

      {/* Right-center medium orb */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[25%] -right-[350px] w-[750px] h-[750px] rounded-full"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.04)_0%,transparent_65%)]" />
      </motion.div>

      {/* Bottom-left slow orb */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[55%] -left-[200px] w-[600px] h-[600px] rounded-full"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.03)_0%,transparent_65%)]" />
      </motion.div>

      {/* Far deep orb — bottom right, fastest */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[80%] right-[5%] w-[500px] h-[500px] rounded-full"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.045)_0%,transparent_65%)]" />
      </motion.div>
    </div>
  );
}
