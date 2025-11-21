"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  left: string;
  top: string;
  bg: string;
}

export default function Particles() {
  const [positions, setPositions] = useState<Particle[]>([]);

  useEffect(() => {
    const newPositions = [...Array(6)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      bg:
        i % 3 === 0
          ? "linear-gradient(135deg, #a855f7, #ec4899)"
          : i % 3 === 1
          ? "linear-gradient(135deg, #06b6d4, #22c55e)"
          : "linear-gradient(135deg, #facc15, #f97316)",
    }));
    setPositions(newPositions);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-20"
          style={{ background: pos.bg, left: pos.left, top: pos.top }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
