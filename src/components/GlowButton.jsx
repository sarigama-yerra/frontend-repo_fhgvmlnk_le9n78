import React from 'react';
import { motion } from 'framer-motion';

export default function GlowButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white 
        bg-gradient-to-r from-[#00D9FF] via-[#8B5CF6] to-[#00D9FF]
        shadow-[0_0_30px_rgba(0,217,255,0.35)]
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
        ${className}`}
      {...props}
    >
      <span className="absolute inset-0 rounded-xl opacity-70 blur-xl bg-gradient-to-r from-[#00D9FF] via-[#8B5CF6] to-[#FF006E] animate-pulse" />
      <span className="relative z-10 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">{children}</span>
    </motion.button>
  );
}
