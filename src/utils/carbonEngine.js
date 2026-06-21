// Data and conversion multipliers

/**
 * @typedef {Object} ActivityTypes
 * @property {string} TRANSPORT
 * @property {string} FOOD
 * @property {string} ENERGY
 * @property {string} REDUCTION
 */
export const ACTIVITY_TYPES = {
  TRANSPORT: 'transport',
  FOOD: 'food',
  ENERGY: 'energy',
  REDUCTION: 'reduction'
};

// Base unit: kg CO2e
export const CARBON_COSTS = {
  flight_short: 150, // Short haul flight (< 3 hrs)
  flight_long: 500, // Long haul flight
  drive_car_10km: 2.5,
  metro_10km: 0.3,
  meal_meat: 3.0,
  meal_veg: 0.5,
  home_ac_1hr: 1.0,
  // Positive Actions (reductions)
  plant_tree: -20.0,
  recycle_week: -5.0,
  bike_10km: -2.5
};

// Equivalencies for translation (cognitive click)
export const EQUIVALENCIES = [
  { metric: 'smartphone_charges', perKgCO2: 121, label: 'smartphone charges' },
  { metric: 'tree_days', perKgCO2: 16.5, label: 'days a tree takes to absorb this' },
  { metric: 'home_electricity_days', perKgCO2: 0.5, label: 'days of household electricity' }
];

/**
 * Translate kg CO2e into relatable equivalents.
 */
export const translateCarbon = (kgCO2) => {
  if (kgCO2 <= 0) return [];
  
  return EQUIVALENCIES.map(eq => ({
    ...eq,
    value: Math.round(kgCO2 * eq.perKgCO2 * 10) / 10
  }));
};

/**
 * Determine the ecosystem state based on user's recent score or total score
 */
export const getEcosystemState = (totalCarbon) => {
  // Let's assume a weekly budget of 50kg CO2e for a "stable" state
  if (totalCarbon < 20) return 'flourishing';
  if (totalCarbon < 50) return 'stable';
  if (totalCarbon < 100) return 'degraded';
  return 'critical';
};

/**
 * Generate a contextual nudge based on an activity and its cost
 * @param {string} activityId 
 * @param {number} cost 
 * @returns {string}
 */
export const generateNudge = (activityId, cost) => {
  // Positive Actions (Negative Cost)
  if (cost < 0) {
    if (activityId === 'plant_tree') {
      return `Amazing! You've offset ${Math.abs(cost)} kg CO2e. Trees are the lungs of the earth.`;
    }
    if (activityId === 'recycle_week') {
      return `Great job recycling! That saves ${Math.abs(cost)} kg CO2e from the atmosphere.`;
    }
    if (activityId === 'bike_10km') {
      return `Pedal power! Biking instead of driving saved ${Math.abs(cost)} kg CO2e.`;
    }
    return `Thank you for taking positive action! You've saved ${Math.abs(cost)} kg CO2e.`;
  }

  // Emission Actions (Positive Cost)
  if (activityId.includes('flight')) {
    const electricityDays = Math.round(cost * 0.5);
    return `That flight uses as much carbon as powering your home for ${electricityDays} days. Consider virtual meetings!`;
  }
  if (activityId === 'meal_meat') {
    return `Eating meat once produces 6x more carbon than a plant-based meal. Try Meatless Mondays?`;
  }
  if (activityId === 'drive_car_10km') {
    return `Taking the metro instead of driving saves ${CARBON_COSTS.drive_car_10km - CARBON_COSTS.metro_10km} kg CO2e per trip!`;
  }
  return `You logged ${cost} kg CO2e. Keep tracking to build awareness!`;
};
