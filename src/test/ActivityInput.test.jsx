import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActivityInput } from '../components/ActivityInput';
import { CarbonProvider } from '../context/CarbonContext';

describe('ActivityInput Component', () => {
  it('renders all activity buttons', () => {
    render(
      <CarbonProvider>
        <ActivityInput />
      </CarbonProvider>
    );

    expect(screen.getByText('Log an Activity')).toBeInTheDocument();
    expect(screen.getByText('Short Flight (<3h)')).toBeInTheDocument();
    expect(screen.getByText('Plant Tree')).toBeInTheDocument();
  });

  it('can click an activity to log it', () => {
    render(
      <CarbonProvider>
        <ActivityInput />
      </CarbonProvider>
    );

    const button = screen.getByLabelText(/Log activity: Meat Meal/i);
    fireEvent.click(button);
    // Since we just test component isolated from context spy, 
    // it shouldn't crash.
  });
});
