import axios from 'axios';

export const fetchCurrentWeather = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,shortwave_radiation,cloud_cover,surface_pressure,relative_humidity_2m&hourly=temperature_2m,shortwave_radiation,wind_speed_10m&forecast_days=1`;
    const response = await axios.get(url);
    const data = response.data.current;

    const temperature = data.temperature_2m;
    const windSpeed = data.wind_speed_10m; // km/h
    const irradiance = data.shortwave_radiation; 
    const cloudCover = data.cloud_cover || 0;
    const pressure = data.surface_pressure || 1013;
    const humidity = data.relative_humidity_2m || 50;

    // Advanced Physics Simulation Constants
    const SOLAR_CAPACITY = 50; // kW
    const WIND_CAPACITY = 100; // kW
    const OCEAN_CAPACITY = 80; // kW
    const NUCLEAR_CAPACITY = 200; // kW steady

    // 1. Solar
    // Diminished by cloud cover heavily
    const solarFactor = Math.max(0, 1 - (cloudCover / 100));
    const solarOutputKw = (irradiance * 0.15 * 100) / 1000 * solarFactor;

    // 2. Wind
    // Air density impact loosely via pressure and humidity logic, cut-in speed 10 kmh
    const airDensity = pressure / (287 * (temperature + 273.15)); // ideal gas law approx
    const windOutputKw = windSpeed > 10 ? Math.min(WIND_CAPACITY, (Math.pow(windSpeed / 3.6, 3) * 0.5 * airDensity * 30 * 0.4) / 1000) : 0;

    // 3. Ocean / Tidal
    // Simplified tidal cycle using current hour to approximate sine wave tide + chaotic waves based on wind
    const hour = new Date().getHours();
    const tideEffect = (Math.sin(hour * Math.PI / 6) + 1) / 2; // oscillates 0 to 1 over 12 hours
    const waveEffect = Math.min(0.5, windSpeed / 100);
    const oceanOutputKw = (OCEAN_CAPACITY * tideEffect * 0.7) + (OCEAN_CAPACITY * waveEffect);

    // 4. Nuclear 
    // Consistent 95% base load output barring random microscopic variation
    const nuclearVariation = 0.94 + Math.random() * 0.02; 
    const nuclearOutputKw = NUCLEAR_CAPACITY * nuclearVariation;

    const totalOutput = solarOutputKw + windOutputKw + oceanOutputKw + nuclearOutputKw;
    
    // Max theoretical from these params ~ 430 kW
    const efficiencyScore = Math.min((totalOutput / 400) * 100, 100).toFixed(1);
    const carbonSavingsKg = (totalOutput * 0.4).toFixed(2); 

    // Generate historic mockup for the chart
    const history = [];
    const hourlyLogs = response.data.hourly;
    const currentHourIndex = new Date().getHours();
    
    for (let i = Math.max(0, currentHourIndex - 11); i <= currentHourIndex; i++) {
        const hIrr = hourlyLogs.shortwave_radiation[i] || 0;
        const hWind = hourlyLogs.wind_speed_10m[i] || 0;
        
        const sOut = (hIrr * 0.15 * 100) / 1000;
        const wOut = hWind > 10 ? Math.min(WIND_CAPACITY, (Math.pow(hWind / 3.6, 3) * 0.5 * 1.225 * 30 * 0.4) / 1000) : 0;
        const oOut = (OCEAN_CAPACITY * ((Math.sin(i * Math.PI / 6) + 1) / 2) * 0.7) + (OCEAN_CAPACITY * Math.min(0.5, hWind/100));
        const nOut = NUCLEAR_CAPACITY * 0.95;

        history.push({
            time: hourlyLogs.time[i].split('T')[1],
            solar: sOut.toFixed(2),
            wind: wOut.toFixed(2),
            ocean: oOut.toFixed(2),
            nuclear: nOut.toFixed(2),
            total: (sOut + wOut + oOut + nOut).toFixed(2)
        });
    }

    // Determine an AI Insight
    let insight = "Grid load balances optimally.";
    if (solarOutputKw > 20 && windOutputKw > 40) insight = "Renewable surge! Nuclear base scaling down.";
    else if (cloudCover > 80 && windSpeed < 10) insight = "Low natural factors. Tidal and Nuclear sustaining grid.";
    else if (totalOutput > 380) insight = "Hyper-generation. Battery arrays charging at max capacity.";

    return {
      current: {
        temperature,
        windSpeed,
        irradiance,
        cloudCover,
        pressure,
        humidity,
        solarOutputKw: solarOutputKw.toFixed(2),
        windOutputKw: windOutputKw.toFixed(2),
        oceanOutputKw: oceanOutputKw.toFixed(2),
        nuclearOutputKw: nuclearOutputKw.toFixed(2),
        totalOutput: totalOutput.toFixed(2),
        efficiencyScore,
        carbonSavingsKg
      },
      history,
      insight
    };

  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw new Error('Failed to fetch energy data from weather API');
  }
};

export const getPredictionFromService = async (features) => {
  const { irradiance, windSpeed, temperature } = features;
  
  const solar = Math.max(0, (irradiance * 0.15 * 100) / 1000);
  const wind = windSpeed > 10 ? Math.min(100, (Math.pow(windSpeed / 3.6, 3) * 0.5 * 1.2 * 30 * 0.4) / 1000) : 0;
  const ocean = 80 * 0.7; // baseline prediction average
  const nuclear = 200 * 0.95; 
  
  const base_calc = solar + wind + ocean + nuclear;
  
  const randomFactor = 0.95 + Math.random() * 0.1; 
  const predicted_energy = base_calc * randomFactor;
  
  const timeline = [];
  let current_val = predicted_energy;
  
  for (let i = 1; i <= 12; i++) {
    const variation = -0.05 + Math.random() * 0.1; // tighten variance due to steady baseloads
    current_val = Math.max(0, current_val + (current_val * variation));
    timeline.push({
      hour: `+${i}h`,
      predicted: parseFloat(current_val.toFixed(2))
    });
  }
  
  const sumFirst6 = timeline.slice(0, 6).reduce((sum, item) => sum + item.predicted, 0);
  const sumLast6 = timeline.slice(6, 12).reduce((sum, item) => sum + item.predicted, 0);
  const trendSum = sumFirst6 - sumLast6;
  
  let trendType = trendSum > 0 ? "decreasing" : "increasing";
  if (Math.abs(trendSum) < predicted_energy * 0.05) {
      trendType = "stable";
  }

  return {
      predictedEnergy: parseFloat(predicted_energy.toFixed(2)),
      forecast_timeline: timeline,
      trend: trendType
  };
};
