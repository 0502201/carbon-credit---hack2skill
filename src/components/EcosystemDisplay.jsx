import { memo, useMemo } from 'react';
import { useCarbon } from '../context/CarbonContext';
import { Cloud, CloudRain, Sun, TreePine, Leaf, Skull } from 'lucide-react';
import './EcosystemDisplay.css';

export const EcosystemDisplay = memo(() => {
  const { ecosystemState, totalCarbon } = useCarbon();

  const config = useMemo(() => {
    switch(ecosystemState) {
      case 'flourishing':
        return {
          title: 'Flourishing Ecosystem',
          skyClass: 'sky-flourishing',
          groundClass: 'ground-flourishing',
          Icon: Sun,
          iconColor: '#fef08a',
          TreeIcon: TreePine,
          treeColor: '#10b981',
          particleCount: 5, // Birds or leaves
          message: 'Your footprint is low. Nature is thriving!'
        };
      case 'stable':
        return {
          title: 'Stable Ecosystem',
          skyClass: 'sky-stable',
          groundClass: 'ground-stable',
          Icon: Cloud,
          iconColor: '#e2e8f0',
          TreeIcon: TreePine,
          treeColor: '#34d399',
          particleCount: 2,
          message: 'Nature is stable, but keep an eye on your emissions.'
        };
      case 'degraded':
        return {
          title: 'Degraded Environment',
          skyClass: 'sky-degraded',
          groundClass: 'ground-degraded',
          Icon: CloudRain,
          iconColor: '#94a3b8',
          TreeIcon: Leaf,
          treeColor: '#f59e0b',
          particleCount: 0,
          message: 'Warning: Your emissions are impacting the environment.'
        };
      case 'critical':
      default:
        return {
          title: 'Critical Crisis',
          skyClass: 'sky-critical',
          groundClass: 'ground-critical',
          Icon: Skull,
          iconColor: '#ef4444',
          TreeIcon: Skull,
          treeColor: '#7f1d1d',
          particleCount: 0,
          message: 'Critical level! Immediate reduction needed.'
        };
    }
  }, [ecosystemState]);

  return (
    <div className="ecosystem-container glass-panel">
      <div className={`ecosystem-world ${config.skyClass}`}>
        
        {/* Weather Icon */}
        <div className="weather-icon animate-pulse">
          <config.Icon size={64} color={config.iconColor} />
        </div>
        
        {/* Ground & Trees */}
        <div className={`ecosystem-ground ${config.groundClass}`}>
          <div className="trees-container">
            <config.TreeIcon size={80} color={config.treeColor} className="tree tree-left" />
            <config.TreeIcon size={120} color={config.treeColor} className="tree tree-center" />
            <config.TreeIcon size={60} color={config.treeColor} className="tree tree-right" />
          </div>
        </div>
      </div>
      
      <div className="ecosystem-status" aria-live="polite" aria-atomic="true">
        <h3>{config.title}</h3>
        <p>{config.message}</p>
        <div className="carbon-meter">
          <div className="meter-bar">
            <div 
              className="meter-fill" 
              style={{ width: `${Math.min(totalCarbon, 150) / 150 * 100}%`, backgroundColor: `var(--eco-${ecosystemState})` }}
            ></div>
          </div>
          <span className="meter-label">{Math.round(totalCarbon)} kg CO2e</span>
        </div>
      </div>
    </div>
  );
});

EcosystemDisplay.displayName = 'EcosystemDisplay';
