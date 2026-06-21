import React, { createContext, useContext, useState, useEffect } from 'react';
import { getEcosystemState, generateNudge } from '../utils/carbonEngine';

const CarbonContext = createContext();

export const useCarbon = () => useContext(CarbonContext);

export const CarbonProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [totalCarbon, setTotalCarbon] = useState(0);
  const [ecosystemState, setEcosystemState] = useState('flourishing'); // flourishing, stable, degraded, critical
  const [latestNudge, setLatestNudge] = useState('');

  // Calculate total whenever activities change
  useEffect(() => {
    const total = activities.reduce((sum, act) => sum + act.cost, 0);
    setTotalCarbon(total);
    setEcosystemState(getEcosystemState(total));
  }, [activities]);

  const addActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setActivities(prev => [newActivity, ...prev]);
    
    // Generate nudge
    setLatestNudge(generateNudge(activity.type, activity.cost));
  };

  const clearActivities = () => {
    setActivities([]);
    setLatestNudge('');
  };

  return (
    <CarbonContext.Provider value={{
      activities,
      totalCarbon,
      ecosystemState,
      latestNudge,
      addActivity,
      clearActivities
    }}>
      {children}
    </CarbonContext.Provider>
  );
};
