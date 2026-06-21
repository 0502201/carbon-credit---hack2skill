import { describe, it, expect } from 'vitest';
import { getEcosystemState, generateNudge, translateCarbon } from './carbonEngine';

describe('carbonEngine', () => {
  describe('getEcosystemState', () => {
    it('returns flourishing for low carbon < 20', () => {
      expect(getEcosystemState(10)).toBe('flourishing');
      expect(getEcosystemState(-50)).toBe('flourishing');
    });

    it('returns stable for 20 <= carbon < 50', () => {
      expect(getEcosystemState(25)).toBe('stable');
      expect(getEcosystemState(49.9)).toBe('stable');
    });

    it('returns degraded for 50 <= carbon < 100', () => {
      expect(getEcosystemState(50)).toBe('degraded');
      expect(getEcosystemState(99)).toBe('degraded');
    });

    it('returns critical for carbon >= 100', () => {
      expect(getEcosystemState(100)).toBe('critical');
      expect(getEcosystemState(500)).toBe('critical');
    });
  });

  describe('generateNudge', () => {
    it('handles reduction actions correctly', () => {
      const treeNudge = generateNudge('plant_tree', -20);
      expect(treeNudge).toContain('20');
      expect(treeNudge).toContain('lungs of the earth');

      const recycleNudge = generateNudge('recycle_week', -5);
      expect(recycleNudge).toContain('5');
      expect(recycleNudge).toContain('Great job recycling');
    });

    it('handles emission actions correctly', () => {
      const flightNudge = generateNudge('flight_short', 150);
      expect(flightNudge).toContain('virtual meetings');
      
      const meatNudge = generateNudge('meal_meat', 3);
      expect(meatNudge).toContain('Meatless Mondays');
    });
  });

  describe('translateCarbon', () => {
    it('returns empty array for negative or zero carbon', () => {
      expect(translateCarbon(0)).toEqual([]);
      expect(translateCarbon(-10)).toEqual([]);
    });

    it('calculates equivalents correctly for positive carbon', () => {
      const results = translateCarbon(10);
      expect(results.length).toBe(3);
      
      // 10 kg * 121 = 1210 smartphone charges
      const phoneEq = results.find(r => r.metric === 'smartphone_charges');
      expect(phoneEq.value).toBe(1210);
      
      // 10 kg * 0.5 = 5 days of electricity
      const electricityEq = results.find(r => r.metric === 'home_electricity_days');
      expect(electricityEq.value).toBe(5);
    });
  });
});
