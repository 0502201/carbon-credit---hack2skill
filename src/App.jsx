import { CarbonProvider } from './context/CarbonContext';
import { ActivityInput } from './components/ActivityInput';
import { EcosystemDisplay } from './components/EcosystemDisplay';
import { NudgePanel } from './components/NudgePanel';
import { Leaderboard } from './components/Leaderboard';
import { Leaf } from 'lucide-react';
import './App.css';

function App() {
  return (
    <CarbonProvider>
      <div className="app-container">
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <header className="app-header">
          <div className="logo flex-center">
            <Leaf size={32} color="var(--color-accent-green)" />
            <h1>EcoAware</h1>
          </div>
          <p>Prompt Wars Challenge 3</p>
        </header>
        
        <main id="main-content" className="main-content">
          <div className="grid-layout">
            <div className="left-column">
              <EcosystemDisplay />
              <div style={{ marginTop: '2rem' }}>
                <NudgePanel />
              </div>
            </div>
            
            <div className="right-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <ActivityInput />
              <Leaderboard />
            </div>
          </div>
        </main>
      </div>
    </CarbonProvider>
  );
}

export default App;
