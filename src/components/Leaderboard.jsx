import React, { memo } from 'react';
import { useCarbon } from '../context/CarbonContext';
import { Users, Trophy, ChevronUp, ChevronDown } from 'lucide-react';
import './Leaderboard.css';

const MOCK_TEAMS = [
  { id: 't1', name: 'Design Team', score: 250, trend: 'down' },
  { id: 't2', name: 'Engineering', score: 320, trend: 'up' },
  { id: 't3', name: 'Hostel A', score: 410, trend: 'up' },
  { id: 't4', name: 'Hostel B', score: 580, trend: 'down' },
];

export const Leaderboard = memo(() => {
  const { totalCarbon } = useCarbon();
  
  // Create a combined list placing the user in the leaderboard
  const userTeam = {
    id: 'user',
    name: 'You (Solo)',
    score: totalCarbon,
    trend: 'stable',
    isUser: true
  };
  
  const allTeams = [...MOCK_TEAMS, userTeam].sort((a, b) => a.score - b.score);

  return (
    <div className="leaderboard-container glass-panel animate-fade-in" role="region" aria-label="Carbon Footprint Leaderboard">
      <div className="leaderboard-header flex-between">
        <div className="flex-center" style={{ gap: '0.5rem' }}>
          <Trophy size={20} className="trophy-icon" aria-hidden="true" />
          <h2>Weekly Leaderboard</h2>
        </div>
        <Users size={20} color="var(--color-text-muted)" aria-hidden="true" />
      </div>
      
      <p className="leaderboard-subtitle">Lowest carbon footprint wins.</p>
      
      <div className="leaderboard-list" role="list">
        {allTeams.map((team, index) => (
          <div 
            key={team.id} 
            className={`leaderboard-item ${team.isUser ? 'user-highlight' : ''}`}
            role="listitem"
            tabIndex={0}
            aria-label={`${index + 1}. ${team.name}: ${Math.round(team.score)} kg CO2e`}
          >
            <div className="rank" aria-hidden="true">#{index + 1}</div>
            <div className="team-info">
              <span className="team-name">{team.name}</span>
            </div>
            <div className="team-score" aria-hidden="true">
              {Math.round(team.score)} kg
              {team.trend === 'down' && <ChevronDown size={16} color="var(--color-accent-green)" />}
              {team.trend === 'up' && <ChevronUp size={16} color="var(--color-danger)" />}
              {team.trend === 'stable' && <span style={{ width: '16px' }}></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Leaderboard.displayName = 'Leaderboard';
