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
  const [isLight, setIsLight] = useState(false);

  const handleCalculate = useCallback((data) => setCalculatorData(data), []);
  const handleInteract = useCallback(() => setHasInteracted(true), []);
  const handlePackSelect = useCallback((pack) => setRecommendedPack(pack), []);

  return (
    <>
      <main
        className={`min-h-screen text-white overflow-x-hidden selection:bg-emerald-500/30 selection:text-white dot-grid ${
          isLight ? 'light-theme-filter' : ''
        }`}
        style={{ background: '#030A06', minHeight: '100vh', width: '100%' }}
      >
      {/* ── HERO ─────────────────────────────────── */}
      <Hero />
      <Divider />

      {/* ── VIDEO DEMO ───────────────────────────── */}
      <VideoDemo />
      <Divider />

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <HowItWorks />
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
          <RecommendationEngine
            callsPerMonth={calculatorData.callsPerMonth || 0}
            onPackSelect={handlePackSelect}
          />
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

      {/* Floating Theme Toggle (Outside of filter so it stays fixed to viewport) */}
      <ThemeToggle isLight={isLight} setIsLight={setIsLight} />
    </>
  );
}

const ThemeToggle = ({ isLight, setIsLight }) => {
  return (
    <button
      onClick={() => setIsLight(!isLight)}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center 
        ${isLight ? 'bg-white text-[#0B1015]' : 'bg-[#0B1015] border border-white/10 text-white hover:border-emerald-500/50'}`}
      style={{
        boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.5)'
      }}
      title={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    >
      {isLight ? (
        <svg className="w-5 h-5 transition-transform hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 transition-transform hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
};

export default App;
