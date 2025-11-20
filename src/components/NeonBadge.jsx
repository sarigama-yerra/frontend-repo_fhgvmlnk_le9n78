import React from 'react';

export default function NeonBadge({ children, color = 'green', className = '' }) {
  const map = {
    green: { bg: 'from-[#22C55E]/20 to-transparent', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]', text: 'text-[#22C55E]' },
    gold: { bg: 'from-[#F59E0B]/20 to-transparent', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]', text: 'text-[#F59E0B]' },
    white: { bg: 'from-white/30 to-transparent', glow: 'shadow-[0_0_20px_rgba(255,255,255,0.35)]', text: 'text-white' },
  }[color] || { bg: 'from-[#22C55E]/20 to-transparent', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]', text: 'text-[#22C55E]' };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${map.text} 
      bg-gradient-to-r ${map.bg} border border-white/10 backdrop-blur-md ${map.glow} ${className}`}>
      {children}
    </span>
  );
}
