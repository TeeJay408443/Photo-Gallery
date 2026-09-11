import React, { useEffect } from 'react';

export const App: React.FC = () => {
  useEffect(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
  }, []);

  return <div className="min-h-screen bg-[#0f1115]" />;
};

export default App;
