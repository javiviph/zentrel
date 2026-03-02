import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import ROICalculator from './components/ROICalculator';
import RecommendationEngine from './components/RecommendationEngine';
import LeadForm from './components/LeadForm';

function App() {
  const [calculatorData, setCalculatorData] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [recommendedPack, setRecommendedPack] = useState(null);

  const handleCalculate = useCallback((data) => setCalculatorData(data), []);
  const handleInteract = useCallback(() => setHasInteracted(true), []);
  const handlePackSelect = useCallback((pack) => setRecommendedPack(pack), []);

  return (
    <main className="min-h-screen text-white overflow-x-hidden selection:bg-emerald-500/30 selection:text-white"
      style={{ background: '#030A06' }}>
      <Hero />

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}></div>
      </div>

      <ROICalculator onCalculate={handleCalculate} onInteract={handleInteract} />

      {hasInteracted && calculatorData && (
        <>
          {/* Divider */}
          <div className="max-w-5xl mx-auto px-4">
            <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}></div>
          </div>

          <RecommendationEngine maxLoss={calculatorData.maxLoss} onPackSelect={handlePackSelect} />

          {/* Divider */}
          <div className="max-w-5xl mx-auto px-4">
            <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}></div>
          </div>

          <LeadForm calculatorData={calculatorData} recommendedPack={recommendedPack} />
        </>
      )}

      {/* Footer */}
      <footer className="text-center pb-12 text-white/20 text-xs">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-px mb-8" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }}></div>
          <span className="font-semibold tracking-widest uppercase text-white/30">ZENTREL</span>
          <span className="mx-3 text-white/10">·</span>
          <span>Agencia de Automatización de IA · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
