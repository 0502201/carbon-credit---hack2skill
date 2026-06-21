import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Integration', () => {
  it('renders the main application correctly', () => {
    render(<App />);
    
    // Check for header
    expect(screen.getByText('EcoAware')).toBeInTheDocument();
    
    // Check for sections
    expect(screen.getByText('Flourishing Ecosystem')).toBeInTheDocument();
    expect(screen.getByText('Log an Activity')).toBeInTheDocument();
    expect(screen.getByText('Weekly Leaderboard')).toBeInTheDocument();
  });
});
