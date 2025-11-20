import React, { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

export default function SparklineChart({ data = [], colorFrom = '#00D9FF', colorTo = '#8B5CF6' }) {
  const formatted = useMemo(() => data.map((v, i) => ({ i, v })), [data]);

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formatted} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={colorFrom} stopOpacity={0.9} />
              <stop offset="100%" stopColor={colorTo} stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorFrom} stopOpacity={0.35} />
              <stop offset="100%" stopColor={colorTo} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Tooltip cursor={false} content={() => null} />
          <Area type="monotone" dataKey="v" stroke="url(#spark)" strokeWidth={2}
            fill="url(#fill)" isAnimationActive />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
