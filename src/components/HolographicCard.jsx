import React from 'react';
import { motion } from 'framer-motion';

export default function HolographicCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      className={`relative rounded-2xl p-5 bg-white/5 backdrop-blur-2xl border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_30px_rgba(0,217,255,0.1)]
        ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border 
        border-transparent [background:linear-gradient(#0000,#0000)_padding-box,linear-gradient(120deg,#00D9FF,#8B5CF6,#FF006E)_border-box]" />
      <div className="pointer-events-none absolute -inset-8 opacity-30 blur-3xl bg-[conic-gradient(from_180deg_at_50%_50%,#00D9FF,transparent_30%,#8B5CF6,transparent_60%,#FF006E,transparent_90%)]" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
