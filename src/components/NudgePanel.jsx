import React, { memo } from 'react';
import { useCarbon } from '../context/CarbonContext';
import { Lightbulb, Info } from 'lucide-react';
import { translateCarbon } from '../utils/carbonEngine';
import './NudgePanel.css';

export const NudgePanel = memo(() => {
  const { latestNudge, activities } = useCarbon();
  
  if (activities.length === 0) return null;
  
  const latestActivity = activities[0];
  const equivalents = translateCarbon(latestActivity.cost);

  return (
    <div className="nudge-panel-container glass-panel animate-fade-in" role="complementary" aria-label="Contextual Impact">
      <div className="nudge-header flex-between">
        <h2>Contextual Impact</h2>
        <Lightbulb size={20} className="nudge-icon" aria-hidden="true" />
      </div>
      
      {latestNudge && (
        <div className="nudge-message flex-center" aria-live="polite" role="status">
          <Info size={16} aria-hidden="true" />
          <p>{latestNudge}</p>
        </div>
      )}

      {equivalents.length > 0 && (
        <div className="equivalents-grid" aria-label="Carbon equivalents">
          <h3>That equals approximately:</h3>
          {equivalents.map(eq => (
            <div key={eq.metric} className="equivalent-item" tabIndex={0} aria-label={`${Math.abs(eq.value)} ${eq.label}`}>
              <span className="eq-value" aria-hidden="true">{Math.abs(eq.value)}</span>
              <span className="eq-label" aria-hidden="true">{eq.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

NudgePanel.displayName = 'NudgePanel';
