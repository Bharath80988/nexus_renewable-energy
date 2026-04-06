import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ArrowRight } from 'lucide-react';

const R = '#E63946';

const content = {
  solar: {
    title: 'Photovoltaic Conversion',
    subtitle: 'Solar Energy Generation Sequence',
    steps: [
      'Photons from sunlight strike semiconductor panels',
      'Electrons are excited and released from silicon atoms',
      'Direct current flows through the collector circuit',
      'Inverter converts DC to grid-compatible AC power',
    ],
    Animation: () => (
      <div className="relative w-full h-56 flex flex-col items-center justify-center">
        {/* Sun */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-16 h-16 rounded-full absolute top-0"
          style={{ background: `radial-gradient(circle, #fff 0%, ${R} 60%, transparent 100%)`, boxShadow: `0 0 60px ${R}80, 0 0 120px ${R}30` }}
        />

        {/* Photon beams */}
        {[35, 45, 50, 55, 65].map((left, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 90, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="absolute w-0.5 h-6 rounded-full bg-white"
            style={{ left: `${left}%`, top: 16, boxShadow: '0 0 6px #fff' }}
          />
        ))}

        {/* Panel */}
        <div className="absolute top-[100px] w-36 h-10 rounded-md overflow-hidden" style={{ background: '#1a0000', border: `2px solid ${R}40`, boxShadow: `0 0 25px ${R}25` }}>
          <div className="grid grid-cols-6 grid-rows-2 h-full gap-px p-px">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                className="rounded-sm"
                style={{ background: `${R}30` }}
              />
            ))}
          </div>
        </div>

        {/* Wire down */}
        <div className="absolute top-[140px] w-0.5 h-12 bg-gray-700 rounded">
          <motion.div
            animate={{ top: [0, 40] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute w-full h-3 rounded-full"
            style={{ background: '#fff', boxShadow: '0 0 8px #fff' }}
          />
        </div>

        {/* Inverter */}
        <motion.div
          animate={{ boxShadow: [`0 0 5px ${R}40`, `0 0 25px ${R}80`, `0 0 5px ${R}40`] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-0 px-4 py-2 rounded-lg text-[10px] text-white font-bold uppercase tracking-widest"
          style={{ background: '#111', border: `1px solid ${R}50` }}
        >
          ⚡ Inverter Output
        </motion.div>
      </div>
    )
  },

  wind: {
    title: 'Kinetic Wind Conversion',
    subtitle: 'Turbine Generation Sequence',
    steps: [
      'Aerodynamic blades capture kinetic wind energy',
      'Rotor spins the internal drive shaft at high RPM',
      'Gearbox amplifies rotational speed by 100x',
      'Generator coils produce alternating current electricity',
    ],
    Animation: () => (
      <div className="relative w-full h-56 flex flex-col items-center justify-end pb-4">
        {/* Wind streaks */}
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: -120, opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
            className="absolute h-[1px] rounded-full"
            style={{ width: 40 + i * 10, top: 20 + i * 18, background: `linear-gradient(90deg, transparent, ${R}80, transparent)` }}
          />
        ))}

        {/* Tower */}
        <div className="absolute bottom-4 w-2 h-40 rounded-t-sm" style={{ background: 'linear-gradient(to bottom, #555, #222)' }} />

        {/* Nacelle */}
        <div className="absolute top-8 w-6 h-4 rounded-sm bg-gray-600" style={{ boxShadow: `0 0 10px ${R}30` }} />

        {/* Blades */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="absolute top-2 w-28 h-28 origin-center"
        >
          {[0, 120, 240].map(deg => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 w-1.5 h-14 origin-bottom rounded-full"
              style={{ transform: `translateX(-50%) rotate(${deg}deg)`, background: 'linear-gradient(to top, #888, #fff)', boxShadow: `0 0 10px ${R}60` }}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ background: R, boxShadow: `0 0 15px ${R}` }} />
        </motion.div>

        {/* Energy pulse out */}
        <div className="absolute bottom-4 w-32 h-1 rounded-full bg-gray-800 overflow-hidden">
          <motion.div
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${R}, #fff)`, boxShadow: `0 0 10px ${R}` }}
          />
        </div>
      </div>
    )
  },

  ocean: {
    title: 'Tidal Wave Conversion',
    subtitle: 'Hydro-kinetic Generation Sequence',
    steps: [
      'Gravitational forces drive ocean current oscillation',
      'Wave energy converters absorb vertical movement',
      'Submerged turbines convert lateral flow to rotation',
      'Sealed generators produce electricity underwater',
    ],
    Animation: () => (
      <div className="relative w-full h-56 overflow-hidden rounded-xl" style={{ background: '#0a0005', border: `1px solid ${R}15` }}>
        {/* Animated waves */}
        {[0, 1, 2].map(i => (
          <motion.svg
            key={i}
            animate={{ x: [-200 - i * 50, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
            className="absolute" style={{ top: 8 + i * 10 }}
            width="1000" height="30" viewBox="0 0 1000 30"
          >
            <path
              d={`M0 15 Q 50 ${i % 2 === 0 ? 0 : 30} 100 15 T 200 15 T 300 15 T 400 15 T 500 15 T 600 15 T 700 15 T 800 15 T 900 15 T 1000 15`}
              fill="none"
              stroke={R}
              strokeWidth={1}
              opacity={0.3 - i * 0.08}
            />
          </motion.svg>
        ))}

        {/* Turbine tube */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-14 rounded-full overflow-hidden" style={{ background: '#111', border: `1px solid ${R}30`, boxShadow: `inset 0 0 30px rgba(0,0,0,0.8), 0 0 20px ${R}15` }}>
          {/* Water flow */}
          <motion.div
            animate={{ x: [-100, 250] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-20 h-full blur-sm"
            style={{ background: `${R}15` }}
          />

          {/* Rotor */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ border: `2px solid ${R}60` }}
          >
            <div className="w-2 h-2 rounded-full bg-white" style={{ boxShadow: '0 0 8px #fff' }} />
          </motion.div>

          {/* Output indicator */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{ background: R, boxShadow: `0 0 15px ${R}` }}
          />
        </div>

        {/* Depth label */}
        <div className="absolute bottom-3 right-4 text-[9px] text-gray-600 uppercase tracking-widest">Depth: -50m</div>
      </div>
    )
  },

  nuclear: {
    title: 'Nuclear Fission Sequence',
    subtitle: 'Controlled Chain Reaction',
    steps: [
      'Uranium-235 fuel rods undergo controlled chain fission',
      'Released thermal energy heats pressurized coolant water',
      'Steam at extreme pressure drives massive turbine rotors',
      'Synchronized generator converts torque to grid electricity',
    ],
    Animation: () => (
      <div className="relative w-full h-56 flex items-end justify-center gap-4 pb-4">
        {/* Reactor vessel */}
        <div className="relative w-24 h-40 rounded-t-2xl overflow-hidden" style={{ background: '#111', border: `2px solid ${R}40`, borderBottom: 'none', boxShadow: `0 0 30px ${R}15` }}>
          {/* Fuel rods */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -12, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                className="w-2 h-24 rounded-t-sm"
                style={{ background: `linear-gradient(to top, ${R}, #fff)`, boxShadow: `0 0 12px ${R}80` }}
              />
            ))}
          </div>

          {/* Coolant */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-0 w-full h-28"
            style={{ background: `linear-gradient(to top, ${R}25, transparent)`, borderTop: `1px solid ${R}40` }}
          />

          {/* Steam particles */}
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{ y: -60, opacity: [0, 0.6, 0], scale: 1.5 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-3 h-3 rounded-full blur-sm bg-white/30"
              style={{ left: 15 + i * 18, top: 10 }}
            />
          ))}
        </div>

        {/* Pipe */}
        <div className="relative w-16 h-3 rounded-full mb-20 -ml-4" style={{ background: '#333', boxShadow: `0 0 8px ${R}20` }}>
          <motion.div
            animate={{ x: [-8, 50] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute w-5 h-1.5 rounded-full top-0.5"
            style={{ background: '#fff', boxShadow: '0 0 8px #fff' }}
          />
        </div>

        {/* Turbine */}
        <div className="relative w-16 h-24 rounded-t-full overflow-hidden mb-10 -ml-4" style={{ background: '#111', border: `2px solid ${R}50`, boxShadow: `0 0 15px ${R}15` }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{ border: `3px dashed ${R}70` }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="w-3 h-3 rounded-full"
              style={{ background: '#fff', boxShadow: `0 0 15px #fff, 0 0 30px ${R}` }}
            />
          </motion.div>
        </div>
      </div>
    )
  }
};

const EnergyInfoModal = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;
  const data = content[type];
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          onClick={e => e.stopPropagation()}
          initial={{ y: 60, scale: 0.92, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 60, scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 200 }}
          className="w-full max-w-2xl overflow-hidden rounded-2xl relative"
          style={{
            background: 'linear-gradient(160deg, rgba(25,0,0,0.95), rgba(8,8,8,0.98))',
            border: `1px solid ${R}25`,
            boxShadow: `0 0 80px ${R}15, 0 30px 60px rgba(0,0,0,0.8)`
          }}
        >
          {/* Top glow bar */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
            className="h-1 absolute top-0 left-0"
            style={{ background: `linear-gradient(90deg, transparent, ${R}, transparent)` }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 rounded-full z-10 border border-gray-800 hover:border-[#E63946]"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <X size={16} />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-[#E63946]" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold" style={{ color: R }}>System Active</span>
            </div>
            <h2 className="text-3xl font-exo font-bold text-white mb-1" style={{ textShadow: `0 0 20px ${R}40` }}>
              {data.title}
            </h2>
            <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">{data.subtitle}</p>

            {/* Animation area */}
            <div className="rounded-xl overflow-hidden mb-6 relative" style={{ background: '#050505', border: `1px solid ${R}10` }}>
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(230,57,70,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <data.Animation />
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <h4 className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: R }} />
                Generation Sequence
              </h4>
              {data.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: `${R}15`, color: R, border: `1px solid ${R}30` }}>
                    {i + 1}
                  </div>
                  <span className="text-gray-300 leading-relaxed pt-0.5">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnergyInfoModal;
