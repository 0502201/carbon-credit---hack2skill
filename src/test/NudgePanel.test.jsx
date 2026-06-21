import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NudgePanel } from '../components/NudgePanel';
import { CarbonProvider, useCarbon } from '../context/CarbonContext';

// Helper component to inject activity
const TestWrapper = ({ children }) => {
  const { addActivity } = useCarbon();
  useEffect(() => {
    addActivity({ type: 'flight_short', name: 'Short Flight (<3h)', cost: 150 });
  }, [addActivity]);
  return <>{children}</>;
};

describe('NudgePanel Component', () => {
  it('renders nudge message and equivalents when an activity is logged', () => {
    render(
      <CarbonProvider>
        <TestWrapper>
          <NudgePanel />
        </TestWrapper>
      </CarbonProvider>
    );

    expect(screen.getByText('Contextual Impact')).toBeInTheDocument();
    expect(screen.getByText(/That flight uses as much carbon as/i)).toBeInTheDocument();
    
    // Equivalents
    expect(screen.getByText('That equals approximately:')).toBeInTheDocument();
    expect(screen.getByText('smartphone charges')).toBeInTheDocument();
  });
});
