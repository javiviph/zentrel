import React, { useState } from 'react';
import Hero from './components/Hero';
import ROICalculator from './components/ROICalculator';
import LeadForm from './components/LeadForm';

function App() {
  const [calculatorData, setCalculatorData] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleCalculate = (data) => {
    setCalculatorData(data);
  };

  const handleInteract = () => {
    setHasInteracted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pb-20">
      <Hero />
      <ROICalculator onCalculate={handleCalculate} onInteract={handleInteract} />
      {/* Show LeadForm conditionally after interaction to guide user attention */}
      {hasInteracted && <LeadForm calculatorData={calculatorData} />}
    </main>
  );
}

export default App;
