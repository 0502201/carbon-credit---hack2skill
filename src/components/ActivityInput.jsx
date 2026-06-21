import React, { memo } from 'react';
import { useCarbon } from '../context/CarbonContext';
import { CARBON_COSTS } from '../utils/carbonEngine';
import { Plane, Car, Train, Utensils, Zap, TreePine, Recycle, Bike } from 'lucide-react';
import './ActivityInput.css';

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} label
 * @property {React.ElementType} icon
 * @property {number} cost
 */

/** @type {Activity[]} */
const ACTIVITIES = [
  { id: 'flight_short', label: 'Short Flight (<3h)', icon: Plane, cost: CARBON_COSTS.flight_short },
  { id: 'flight_long', label: 'Long Flight (>3h)', icon: Plane, cost: CARBON_COSTS.flight_long },
  { id: 'drive_car_10km', label: 'Drive Car (10km)', icon: Car, cost: CARBON_COSTS.drive_car_10km },
  { id: 'metro_10km', label: 'Metro (10km)', icon: Train, cost: CARBON_COSTS.metro_10km },
  { id: 'meal_meat', label: 'Meat Meal', icon: Utensils, cost: CARBON_COSTS.meal_meat },
  { id: 'meal_veg', label: 'Veg/Vegan Meal', icon: Utensils, cost: CARBON_COSTS.meal_veg },
  { id: 'home_ac_1hr', label: 'Home AC (1 hr)', icon: Zap, cost: CARBON_COSTS.home_ac_1hr },
  { id: 'plant_tree', label: 'Plant Tree', icon: TreePine, cost: CARBON_COSTS.plant_tree },
  { id: 'recycle_week', label: 'Recycle (Week)', icon: Recycle, cost: CARBON_COSTS.recycle_week },
  { id: 'bike_10km', label: 'Bike (10km)', icon: Bike, cost: CARBON_COSTS.bike_10km },
];

export const ActivityInput = memo(() => {
  const { addActivity } = useCarbon();

  const handleLogActivity = (activity) => {
    addActivity({
      type: activity.id,
      name: activity.label,
      cost: activity.cost
    });
  };

  return (
    <div className="activity-input-container glass-panel animate-fade-in" role="region" aria-label="Activity Logging">
      <h2>Log an Activity</h2>
      <p className="subtitle">See how your daily choices impact the ecosystem.</p>
      
      <div className="activities-grid" role="group" aria-label="Available Activities">
        {ACTIVITIES.map(act => (
          <button 
            key={act.id} 
            className={`activity-card hover-lift ${act.cost < 0 ? 'positive-action' : ''}`}
            onClick={() => handleLogActivity(act)}
            aria-label={`Log activity: ${act.label}. ${act.cost < 0 ? 'Reduces' : 'Adds'} ${Math.abs(act.cost)} kg CO2e`}
            tabIndex={0}
          >
            <div className="activity-icon flex-center" aria-hidden="true">
              <act.icon size={24} />
            </div>
            <span className="activity-label">{act.label}</span>
            <span className="activity-cost" aria-hidden="true" style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
              {act.cost > 0 ? '+' : ''}{act.cost} kg
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});

ActivityInput.displayName = 'ActivityInput';
