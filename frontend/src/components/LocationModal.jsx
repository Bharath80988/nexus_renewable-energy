import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, Globe, Radio } from 'lucide-react';
import WorldMapSelector from './WorldMapSelector';

const LocationModal = ({ isOpen, onClose, onSelectLocation, onLocateMe, currentLocationName }) => {
  // Auto-request GPS on first open
  useEffect(() => {
    if (isOpen && currentLocationName === 'New York, US') {
      // Prompt user for location on first open
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-start justify-center pt-16 px-4"
        onClick={onClose}
      >
        <motion.div 
          onClick={e => e.stopPropagation()}
          initial={{ y: -80, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -80, scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-full max-w-5xl relative overflow-hidden rounded-2xl"
          style={{ 
            background: 'linear-gradient(145deg, rgba(20,0,0,0.95), rgba(10,10,10,0.98))',
            border: '1px solid rgba(230, 57, 70, 0.3)',
            boxShadow: '0 0 80px rgba(230, 57, 70, 0.15), 0 25px 50px rgba(0,0,0,0.8)'
          }}
        >
          {/* Red accent line top */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E63946] to-transparent" />

          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors bg-black/50 p-2 rounded-full z-10 border border-gray-800 hover:border-[#E63946]"
          >
            <X size={18} />
          </button>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Globe size={16} className="text-[#E63946]" />
                  <span className="text-[10px] text-[#E63946] font-bold tracking-[0.3em] uppercase">Global Network Uplink</span>
                </div>
                <h2 className="text-3xl font-exo font-bold text-white neon-text-white">
                  Select Target Node
                </h2>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => { onLocateMe(); onClose(); }} 
                  className="px-5 py-3 flex items-center gap-2 bg-[#E63946] hover:bg-[#ff4757] text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:shadow-[0_0_30px_rgba(230,57,70,0.6)]"
                >
                  <Navigation size={16} /> Auto-Detect Location
                </button>
              </div>
            </div>

            <WorldMapSelector 
              onSelectLocation={(name, lat, lon) => {
                onSelectLocation(name, lat, lon);
                onClose();
              }} 
            />

            <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-400">
                <Radio size={14} className="text-[#E63946]" />
                Active Link: <span className="font-bold text-white ml-1">{currentLocationName}</span>
              </div>
              <div className="text-gray-500 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
                Click any node to recalibrate prediction models
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationModal;
