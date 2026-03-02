import React, { useState } from 'react';
import Hero from './components/Hero';
import ROICalculator from './components/ROICalculator';
import RecommendationEngine from './components/RecommendationEngine';
import LeadForm from './components/LeadForm';

function App() {
  const [calculatorData, setCalculatorData] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [recommendedPack, setRecommendedPack] = useState(null);

  const handleCalculate = (data) => {
    setCalculatorData(data);
  };

  const handleInteract = () => {
    setHasInteracted(true);
  };

  const handlePackSelect = (packData) => {
    setRecommendedPack(packData);
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pb-20 overflow-x-hidden">
      <Hero />
      <ROICalculator onCalculate={handleCalculate} onInteract={handleInteract} />

      {hasInteracted && calculatorData && (
        <React.Fragment>
          <RecommendationEngine
            maxLoss={calculatorData.maxLoss}
            onPackSelect={handlePackSelect}
          />
          <LeadForm
            calculatorData={calculatorData}
            recommendedPack={recommendedPack}
          />
        </React.Fragment>
      )}
    </main>
  );
}

export default App;
