import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import GoldenRecords from './pages/GoldenRecords';
import DataStewardship from './pages/DataStewardship';
import Governance from './pages/Governance';
import DQRules from './pages/DQRules';
import Settings from './pages/Settings';
import Ingestion from './pages/Ingestion';
import DataCatalog from './pages/DataCatalog';

// Simple types for view management
type View = 'dashboard' | 'golden-records' | 'stewardship' | 'ingestion' | 'governance' | 'settings' | 'dq-rules' | 'data-catalog';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'golden-records':
        return <GoldenRecords />;
      case 'stewardship':
        return <DataStewardship />;
      case 'governance':
        return <Governance />;
      case 'dq-rules':
        return <DQRules />;
      case 'settings':
        return <Settings />;
      case 'ingestion':
        return <Ingestion />;
      case 'data-catalog':
        return <DataCatalog />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
             <h2 className="text-xl font-bold mb-2 capitalize">{(currentView as string).replace('-', ' ')}</h2>
             <p>This module is available in the full version.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentView} onNavigate={(page) => setCurrentView(page as View)} />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;