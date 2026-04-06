import React from 'react';
import { motion } from 'framer-motion';

const LiveMeter = ({ value = 0, max = 100, label, showStats = false, efficiency, status }) => {
  const numericValue = Number(value);
  const safeValue = isNaN(numericValue) ? 0 : numericValue;
  const percent = Math.min(100, (safeValue / max) * 100);
  const displayLabel = label ?? `${safeValue.toFixed(1)} / ${max} kW`;

  return (
    <div className="mt-4 space-y-2">
      {/* Stats row */}
      {showStats && (
        <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest">
          <span>Efficiency: <span className="text-white font-bold">{efficiency || `${Math.round(percent)}%`}</span></span>
          <span>Status: <span className={`font-bold ${percent > 50 ? 'text-[#E63946]' : 'text-gray-400'}`}>{status || (percent > 50 ? 'OPTIMAL' : 'LOW')}</span></span>
        </div>
      )}

      {/* Label row */}
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{displayLabel}</span>
        <span className="text-white font-bold font-exo">{Math.round(percent)}%</span>
      </div>

      {/* The meter bar */}
      <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden relative" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
        <motion.div
          className="h-full rounded-full relative"
          style={{ 
            background: 'linear-gradient(90deg, #E63946, #ff6b6b)',
            boxShadow: `0 0 10px rgba(230, 57, 70, 0.6), 0 0 3px rgba(230, 57, 70, 0.8)`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Shimmer effect */}
        <motion.div 
          className="absolute top-0 h-full w-8 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
          animate={{ left: ['-10%', '110%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
        />
      </div>
    </div>
  );
};

export default LiveMeter;
