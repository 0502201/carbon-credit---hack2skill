/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { getEcosystemState, generateNudge } from '../utils/carbonEngine';

const CarbonContext = createContext();

export const useCarbon = () => useContext(CarbonContext);

export const CarbonProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [latestNudge, setLatestNudge] = useState('');

  // Derive state from activities directly during render for efficiency (no cascading updates)
  const totalCarbon = useMemo(() => activities.reduce((sum, act) => sum + act.cost, 0), [activities]);
  const ecosystemState = useMemo(() => getEcosystemState(totalCarbon), [totalCarbon]);

  const addActivity = useCallback((activity) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setActivities(prev => [newActivity, ...prev]);
    
    // Generate nudge
    setLatestNudge(generateNudge(activity.type, activity.cost));
  }, []);

  const clearActivities = useCallback(() => {
    setActivities([]);
    setLatestNudge('');
  }, []);

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
