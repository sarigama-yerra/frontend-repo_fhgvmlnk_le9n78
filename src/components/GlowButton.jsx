import React from 'react';
import { motion } from 'framer-motion';

export default function GlowButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white 
        bg-gradient-to-r from-[#22C55E] via-[#16A34A] to-[#F59E0B]
        shadow-[0_0_30px_rgba(34,197,94,0.35)]
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:ring-offset-2 focus:ring-offset-[#0B0F14]
        ${className}`}
      {...props}
    >
      <span className="absolute inset-0 rounded-xl opacity-70 blur-xl bg-gradient-to-r from-[#22C55E] via-[#16A34A] to-[#F59E0B] animate-pulse" />
      <span className="relative z-10 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">{children}</span>
    </motion.button>
  );
}
