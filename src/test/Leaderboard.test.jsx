import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Leaderboard } from '../components/Leaderboard';
import { CarbonProvider } from '../context/CarbonContext';

describe('Leaderboard Component', () => {
  it('renders the leaderboard and mock teams', () => {
    render(
      <CarbonProvider>
        <Leaderboard />
      </CarbonProvider>
    );

    expect(screen.getByText('Weekly Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Design Team')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });
});
