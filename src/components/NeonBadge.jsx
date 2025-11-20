import React from 'react';

export default function NeonBadge({ children, color = 'cyan', className = '' }) {
  const map = {
    cyan: { bg: 'from-[#00D9FF]/20 to-transparent', glow: 'shadow-[0_0_20px_rgba(0,217,255,0.5)]', text: 'text-[#00D9FF]' },
    violet: { bg: 'from-[#8B5CF6]/20 to-transparent', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.5)]', text: 'text-[#8B5CF6]' },
    rose: { bg: 'from-[#FF006E]/20 to-transparent', glow: 'shadow-[0_0_20px_rgba(255,0,110,0.5)]', text: 'text-[#FF006E]' }
  }[color] || {};

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${map.text} 
      bg-gradient-to-r ${map.bg} border border-white/10 backdrop-blur-md ${map.glow} ${className}`}>
      {children}
    </span>
  );
}
