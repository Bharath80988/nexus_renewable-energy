import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const GLOBAL_CENTRES = [
  { name: 'Mumbai', coordinates: [72.8777, 19.0760] },
  { name: 'Chennai', coordinates: [80.2707, 13.0827] },
  { name: 'Delhi', coordinates: [77.1025, 28.7041] },
  { name: 'Bangalore', coordinates: [77.5946, 12.9716] },
  { name: 'New York', coordinates: [-74.0060, 40.7128] },
  { name: 'London', coordinates: [-0.1278, 51.5074] },
  { name: 'Tokyo', coordinates: [139.6917, 35.6895] },
  { name: 'Sydney', coordinates: [151.2093, -33.8688] },
  { name: 'Berlin', coordinates: [13.4050, 52.5200] },
  { name: 'Paris', coordinates: [2.3522, 48.8566] },
  { name: 'Moscow', coordinates: [37.6173, 55.7558] },
  { name: 'Dubai', coordinates: [55.2708, 25.2048] },
  { name: 'Singapore', coordinates: [103.8198, 1.3521] },
  { name: 'São Paulo', coordinates: [-46.6333, -23.5505] },
  { name: 'Reykjavik', coordinates: [-21.9426, 64.1466] },
  { name: 'Cape Town', coordinates: [18.4241, -33.9249] },
];

const WorldMapSelector = ({ onSelectLocation }) => {
  return (
    <div className="w-full h-56 md:h-72 relative overflow-hidden bg-[#080808] rounded-xl flex items-center justify-center">
      <ComposableMap 
        projectionConfig={{ scale: 130 }} 
        width={800} height={420} 
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="rgba(230, 57, 70, 0.06)"
                stroke="rgba(230, 57, 70, 0.15)"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "rgba(230, 57, 70, 0.15)", outline: "none" },
                  pressed: { outline: "none" }
                }}
              />
            ))
          }
        </Geographies>
        {GLOBAL_CENTRES.map(({ name, coordinates }, i) => (
          <Marker key={name} coordinates={coordinates}>
            {/* Pulse ring */}
            <motion.circle
              r={10}
              fill="none"
              stroke="#E63946"
              strokeWidth={1}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            />
            {/* Dot */}
            <motion.circle
              r={4}
              fill="#E63946"
              stroke="#fff"
              strokeWidth={1}
              whileHover={{ scale: 2.5 }}
              onClick={() => onSelectLocation(name, coordinates[1], coordinates[0])}
              className="cursor-pointer"
              style={{ filter: "drop-shadow(0 0 6px #E63946)" }}
            />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontFamily: "Inter", fill: "rgba(255,255,255,0.85)", fontSize: "8px", fontWeight: 600, pointerEvents: "none", textShadow: "0 0 4px rgba(0,0,0,0.8)" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default WorldMapSelector;
