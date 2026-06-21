import { memo, useState } from 'react';
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
  { id: 'fast_fashion_item', label: 'Fast Fashion', icon: Recycle, cost: CARBON_COSTS.fast_fashion_item },
  { id: 'plant_tree', label: 'Plant Tree', icon: TreePine, cost: CARBON_COSTS.plant_tree },
  { id: 'recycle_week', label: 'Recycle (Week)', icon: Recycle, cost: CARBON_COSTS.recycle_week },
  { id: 'bike_10km', label: 'Bike (10km)', icon: Bike, cost: CARBON_COSTS.bike_10km },
  { id: 'second_hand_clothing', label: 'Thrifting', icon: Recycle, cost: CARBON_COSTS.second_hand_clothing },
];

export const ActivityInput = memo(() => {
  const { addActivity, clearActivities } = useCarbon();
  const [toastMessage, setToastMessage] = useState('');

  const handleLogActivity = (activity) => {
    addActivity({
      type: activity.id,
      name: activity.label,
      cost: activity.cost
    });
    setToastMessage(`Logged: ${activity.label}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="activity-input-container glass-panel animate-fade-in" aria-label="Activity Logging">
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <div>
          <h2>Log an Activity</h2>
          <p className="subtitle">See how your daily choices impact the ecosystem.</p>
        </div>
        <button className="reset-button hover-lift" onClick={clearActivities} aria-label="Reset Progress">
          Reset
        </button>
      </div>

      {toastMessage && (
        <div className="toast-notification animate-fade-in" aria-live="polite">
          {toastMessage}
        </div>
      )}
      
      <div className="activities-grid" role="group" aria-label="Available Activities">
        {ACTIVITIES.map(act => (
          <button 
            key={act.id} 
            className={`activity-card hover-lift ${act.cost < 0 ? 'positive-action' : ''}`}
            onClick={() => {
              if (act && act.id && typeof act.cost === 'number') {
                handleLogActivity(act);
              } else {
                console.error("Invalid activity data");
              }
            }}
            aria-label={`Log activity: ${act.label}. ${act.cost < 0 ? 'Reduces' : 'Adds'} ${Math.abs(act.cost)} kg CO2e`}
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
    </section>
  );
});

ActivityInput.displayName = 'ActivityInput';
