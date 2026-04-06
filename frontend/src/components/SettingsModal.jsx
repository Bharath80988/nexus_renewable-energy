import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, refreshRate, setRefreshRate, units, setUnits }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.9, opacity: 0 }}
          className="glass-panel w-full max-w-md p-6 relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-exo font-bold mb-6 text-primary neon-text-red">System Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Auto-Refresh Interval (Seconds)</label>
              <select 
                value={refreshRate}
                onChange={(e) => setRefreshRate(Number(e.target.value))}
                className="w-full bg-background/50 border border-borderDark text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value={2000}>2 Seconds (Aggressive)</option>
                <option value={5000}>5 Seconds (Standard)</option>
                <option value={15000}>15 Seconds (Relaxed)</option>
                <option value={60000}>60 Seconds (Manual Focus)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Measurement System</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={units === 'metric'} onChange={() => setUnits('metric')} className="text-primary"/>
                  <span className={units === 'metric' ? 'text-white' : 'text-gray-400'}>Metric (kW, km/h)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={units === 'imperial'} onChange={() => setUnits('imperial')} className="text-primary"/>
                  <span className={units === 'imperial' ? 'text-white' : 'text-gray-400'}>Imperial (kW, mph)</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-borderDark">
              <button 
                onClick={onClose}
                className="w-full bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <Save size={18} /> Apply Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;
