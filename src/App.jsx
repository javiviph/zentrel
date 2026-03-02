import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import ROICalculator from './components/ROICalculator';
import RecommendationEngine from './components/RecommendationEngine';
import LeadForm from './components/LeadForm';
import {
  HowItWorks,
  PainPoints,
  Features,
  Comparison,
  UseCases,
  FAQ,
  CTABanner,
  VideoDemo,
} from './components/Sections';

const Divider = () => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}></div>
  </div>
);

function App() {
  const [calculatorData, setCalculatorData] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [recommendedPack, setRecommendedPack] = useState(null);

  const handleCalculate = useCallback((data) => setCalculatorData(data), []);
  const handleInteract = useCallback(() => setHasInteracted(true), []);
  const handlePackSelect = useCallback((pack) => setRecommendedPack(pack), []);

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden selection:bg-emerald-500/30 selection:text-white dot-grid"
      style={{ background: '#030A06' }}
    >
      {/* ── HERO ─────────────────────────────────── */}
      <Hero />
      <Divider />

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <HowItWorks />
      <Divider />

      {/* ── VIDEO DEMO ───────────────────────────── */}
      <VideoDemo />
      <Divider />

      {/* ── PAIN POINTS ──────────────────────────── */}
      <PainPoints />
      <Divider />

      {/* ── FEATURES ─────────────────────────────── */}
      <Features />
      <Divider />

      {/* ── COMPARISON TABLE ─────────────────────── */}
      <Comparison />
      <Divider />

      {/* ── ROI CALCULATOR ───────────────────────── */}
      <ROICalculator onCalculate={handleCalculate} onInteract={handleInteract} />

      {hasInteracted && calculatorData && (
        <>
          <Divider />
          <RecommendationEngine maxLoss={calculatorData.maxLoss} onPackSelect={handlePackSelect} />
          <Divider />
          <LeadForm calculatorData={calculatorData} recommendedPack={recommendedPack} />
        </>
      )}

      <Divider />

      {/* ── USE CASES ────────────────────────────── */}
      <UseCases />
      <Divider />

      {/* ── CTA BANNER ───────────────────────────── */}
      <CTABanner />
      <Divider />

      {/* ── FAQ ──────────────────────────────────── */}
      <FAQ />
      <Divider />

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="text-center py-12 text-white/20 text-xs">
        <div className="max-w-5xl mx-auto px-4">
          <span className="font-semibold tracking-widest uppercase text-white/30">ZENTREL</span>
          <span className="mx-3 text-white/10">·</span>
          <span>Automatización de Citas con IA · {new Date().getFullYear()}</span>
          <div className="mt-3 text-white/10">
            Agendado automático con Google Calendar + Recordatorios por WhatsApp
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
