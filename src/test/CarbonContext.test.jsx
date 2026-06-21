import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CarbonProvider, useCarbon } from '../context/CarbonContext';

describe('CarbonContext', () => {
  it('provides initial state', () => {
    const { result } = renderHook(() => useCarbon(), { wrapper: CarbonProvider });
    expect(result.current.activities).toEqual([]);
    expect(result.current.totalCarbon).toBe(0);
    expect(result.current.ecosystemState).toBe('flourishing');
    expect(result.current.latestNudge).toBe('');
  });

  it('adds an activity and updates state', () => {
    const { result } = renderHook(() => useCarbon(), { wrapper: CarbonProvider });
    
    act(() => {
      result.current.addActivity({ type: 'flight_short', name: 'Short Flight', cost: 150 });
    });

    expect(result.current.activities.length).toBe(1);
    expect(result.current.totalCarbon).toBe(150);
    expect(result.current.ecosystemState).toBe('critical'); // > 100 is critical
    expect(result.current.latestNudge).toContain('flight');
  });

  it('clears activities', () => {
    const { result } = renderHook(() => useCarbon(), { wrapper: CarbonProvider });
    
    act(() => {
      result.current.addActivity({ type: 'flight_short', name: 'Short Flight', cost: 150 });
    });
    
    expect(result.current.activities.length).toBe(1);
    
    act(() => {
      result.current.clearActivities();
    });

    expect(result.current.activities).toEqual([]);
    expect(result.current.totalCarbon).toBe(0);
    expect(result.current.ecosystemState).toBe('flourishing');
  });
});
