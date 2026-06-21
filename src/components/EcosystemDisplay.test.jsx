import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EcosystemDisplay } from './EcosystemDisplay';
import { CarbonProvider } from '../context/CarbonContext';

// Mock the context provider value
vi.mock('../context/CarbonContext', async () => {
  const actual = await vi.importActual('../context/CarbonContext');
  return {
    ...actual,
    useCarbon: vi.fn(),
  };
});

import { useCarbon } from '../context/CarbonContext';

describe('EcosystemDisplay', () => {
  it('renders flourishing state correctly', () => {
    useCarbon.mockReturnValue({ ecosystemState: 'flourishing', totalCarbon: 10 });
    
    render(<EcosystemDisplay />);
    
    expect(screen.getByText('Flourishing Ecosystem')).toBeInTheDocument();
    expect(screen.getByText(/Your footprint is low/)).toBeInTheDocument();
    expect(screen.getByText('10 kg CO2e')).toBeInTheDocument();
  });

  it('renders critical state correctly', () => {
    useCarbon.mockReturnValue({ ecosystemState: 'critical', totalCarbon: 150 });
    
    render(<EcosystemDisplay />);
    
    expect(screen.getByText('Critical Crisis')).toBeInTheDocument();
    expect(screen.getByText(/Immediate reduction needed/)).toBeInTheDocument();
    expect(screen.getByText('150 kg CO2e')).toBeInTheDocument();
  });
});
