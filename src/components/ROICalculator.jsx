import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, useSpring, useTransform } from 'framer-motion';

const FormatCurrency = (value) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

// Animated counter with spring physics
const AnimatedNumber = ({ value }) => {
    const spring = useSpring(value, { mass: 0.6, stiffness: 80, damping: 14 });
    const display = useTransform(spring, (c) => FormatCurrency(Math.round(c)));
    useEffect(() => { spring.set(value); }, [spring, value]);
    return <Motion.span>{display}</Motion.span>;
};

// Slider with dynamic fill track
const Slider = ({ id, label, value, min, max, step = 1, format, onChange }) => {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-white/40">{label}</label>
                <span className="text-sm font-mono font-bold text-white/90 tabular-nums">{format ? format(value) : value}</span>
            </div>
            <div className="relative">
                <input
                    id={id}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{ '--range-fill': `${pct}%` }}
                    className="w-full"
                />
            </div>
            <div className="flex justify-between text-xs text-white/20 font-mono">
                <span>{format ? format(min) : min}</span>
                <span>{format ? format(max) : max}</span>
            </div>
        </div>
    );
};

// Toggle Switch component
const Toggle = ({ id, label, hint, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
            <label htmlFor={id} className="text-xs font-semibold text-white/60 cursor-pointer">{label}</label>
            {hint && <p className="text-xs text-white/25 mt-0.5">{hint}</p>}
        </div>
        <button
            id={id}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
            style={{ background: checked ? '#00CC66' : 'rgba(255,255,255,0.1)' }}
        >
            <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }} />
        </button>
    </div>
);

const ROICalculator = ({ onCalculate, onInteract }) => {
    const [missedCalls, setMissedCalls] = useState(10);
    const [minTicket, setMinTicket] = useState(80);
    const [maxTicket, setMaxTicket] = useState(200);
    // Toggle: is the premium ticket frequent? No → 80/20, Yes → 50/50
    const [isPremiumFrequent, setIsPremiumFrequent] = useState(false);

    const [realisticLoss, setRealisticLoss] = useState(0);
    const [potentialLoss, setPotentialLoss] = useState(0);
    const [realisticAnnual, setRealisticAnnual] = useState(0);
    const [potentialAnnual, setPotentialAnnual] = useState(0);

    const interacted = useRef(false);

    useEffect(() => {
        // Weighted ticket: 80/20 or 50/50 depending on toggle
        const lowWeight = isPremiumFrequent ? 0.5 : 0.8;
        const highWeight = isPremiumFrequent ? 0.5 : 0.2;
        const realisticTicket = (minTicket * lowWeight) + (maxTicket * highWeight);

        const calcRealistic = missedCalls * 20 * realisticTicket;
        const calcPotential = missedCalls * 20 * maxTicket;

        setRealisticLoss(calcRealistic);
        setPotentialLoss(calcPotential);
        setRealisticAnnual(calcRealistic * 12);
        setPotentialAnnual(calcPotential * 12);

        if (onCalculate) onCalculate({
            missedCalls, minTicket, maxTicket,
            realisticLoss: calcRealistic,
            potentialLoss: calcPotential,
            // Expose for RecommendationEngine (uses realistic)
            maxLoss: calcRealistic,
        });
    }, [missedCalls, minTicket, maxTicket, isPremiumFrequent, onCalculate]);

    const handleChange = (setter) => (val) => {
        setter(val);
        if (!interacted.current) {
            interacted.current = true;
            if (onInteract) onInteract();
        }
    };

    const handleMinTicket = (val) => {
        handleChange(setMinTicket)(val);
        if (val > maxTicket) setMaxTicket(val);
    };

    const handleMaxTicket = (val) => {
        handleChange(setMaxTicket)(val);
        if (val < minTicket) setMinTicket(val);
    };

    const ratio = isPremiumFrequent ? '50 / 50' : '80 / 20';

    return (
        <section className="relative w-full max-w-5xl mx-auto px-4 py-8" id="calculator">
            <Motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
            >
                {/* Background glow blob */}
                <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(0,180,80,0.1) 0%, transparent 70%)' }}></div>

                {/* Section label */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-1.5 h-4 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Calculadora de Pérdidas</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Sliders + Toggle */}
                    <div className="space-y-8">
                        <Slider
                            id="missed-calls"
                            label="Llamadas perdidas al día"
                            value={missedCalls}
                            min={1} max={100}
                            onChange={handleChange(setMissedCalls)}
                        />
                        <Slider
                            id="min-ticket"
                            label="Ticket Medio Bajo"
                            value={minTicket}
                            min={20} max={500} step={5}
                            format={(v) => `${v}€`}
                            onChange={handleMinTicket}
                        />
                        <Slider
                            id="max-ticket"
                            label="Ticket Medio Alto"
                            value={maxTicket}
                            min={20} max={500} step={5}
                            format={(v) => `${v}€`}
                            onChange={handleMaxTicket}
                        />

                        {/* Toggle */}
                        <Toggle
                            id="premium-frequent"
                            label="¿Tu ticket alto es un servicio frecuente?"
                            hint={`Proporción aplicada: ${ratio} (bajo / alto)`}
                            checked={isPremiumFrequent}
                            onChange={(val) => {
                                setIsPremiumFrequent(val);
                                if (!interacted.current) {
                                    interacted.current = true;
                                    if (onInteract) onInteract();
                                }
                            }}
                        />
                    </div>

                    {/* Result card — two scenarios */}
                    <div className="relative">
                        {/* Red glow */}
                        <div className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(220,30,30,0.1) 0%, transparent 70%)' }}></div>

                        <div className="relative rounded-2xl p-6 sm:p-8 flex flex-col w-full text-center"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                border: '1px solid rgba(255,50,50,0.15)'
                            }}>

                            {/* ── Escenario Realista ── */}
                            <div className="mb-5">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                                    style={{ background: 'rgba(255,68,68,0.1)', color: '#FF6666', border: '1px solid rgba(255,68,68,0.15)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                    Escenario Realista ({ratio})
                                </div>
                                <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums" style={{ color: '#FF4444' }}>
                                    <AnimatedNumber value={realisticLoss} />
                                </div>
                                <div className="text-xs text-white/25 mt-1">/ mes · lo que recuperarás seguro</div>
                            </div>

                            {/* Separator */}
                            <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.05)' }}></div>

                            {/* ── Escenario de Éxito ── */}
                            <div className="mb-5">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                                    style={{ background: 'rgba(255,170,0,0.1)', color: '#FFAA00', border: '1px solid rgba(255,170,0,0.15)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    Escenario de Éxito (ticket alto)
                                </div>
                                <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums" style={{ color: '#FF8800' }}>
                                    <AnimatedNumber value={potentialLoss} />
                                </div>
                                <div className="text-xs text-white/25 mt-1">/ mes · si tu IA captura los servicios premium</div>
                            </div>

                            {/* Annual row */}
                            <div className="mt-2 pt-4 w-full border-t border-white/5">
                                <div className="text-xs text-white/20 uppercase tracking-widest mb-2">Pérdida anual acumulada</div>
                                <div className="flex justify-center items-center gap-3 flex-wrap">
                                    <span className="text-sm font-mono font-bold text-red-400/50">
                                        <AnimatedNumber value={realisticAnnual} />
                                    </span>
                                    <span className="text-white/15 text-xs">—</span>
                                    <span className="text-sm font-mono font-bold text-amber-400/50">
                                        <AnimatedNumber value={potentialAnnual} />
                                    </span>
                                </div>
                            </div>

                            {/* Decorative bottom line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px"
                                style={{ background: 'linear-gradient(to right, transparent, rgba(255,68,68,0.4), transparent)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Bottom hint */}
                <p className="mt-8 text-center text-xs text-white/20 font-light">
                    Basado en 20 días laborables al mes · La recomendación de pack usa siempre el escenario realista
                </p>
            </Motion.div>
        </section>
    );
};

export default ROICalculator;
