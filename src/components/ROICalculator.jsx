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

const ROICalculator = ({ onCalculate, onInteract }) => {
    const [missedCalls, setMissedCalls] = useState(10);
    const [minTicket, setMinTicket] = useState(80);
    const [maxTicket, setMaxTicket] = useState(200);
    const [minLoss, setMinLoss] = useState(0);
    const [maxLoss, setMaxLoss] = useState(0);
    const [minLossAnnual, setMinLossAnnual] = useState(0);
    const [maxLossAnnual, setMaxLossAnnual] = useState(0);
    const interacted = useRef(false);

    useEffect(() => {
        const calcMin = missedCalls * 20 * minTicket;
        const calcMax = missedCalls * 20 * maxTicket;
        setMinLoss(calcMin);
        setMaxLoss(calcMax);
        setMinLossAnnual(calcMin * 12);
        setMaxLossAnnual(calcMax * 12);
        if (onCalculate) onCalculate({ missedCalls, minTicket, maxTicket, minLoss: calcMin, maxLoss: calcMax });
    }, [missedCalls, minTicket, maxTicket, onCalculate]);

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
                    {/* Sliders */}
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
                    </div>

                    {/* Result card */}
                    <div className="relative">
                        {/* Red glow */}
                        <div className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(220,30,30,0.12) 0%, transparent 70%)' }}></div>

                        <div className="relative rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[220px]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                border: '1px solid rgba(255,50,50,0.15)'
                            }}>
                            <span className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">Estás perdiendo entre</span>

                            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 w-full mb-5">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tabular-nums"
                                    style={{ color: '#FF4444' }}>
                                    <AnimatedNumber value={minLoss} />
                                </span>
                                <span className="text-lg sm:text-xl text-white/30 font-light px-1">y</span>
                                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tabular-nums"
                                    style={{ color: '#FF8800' }}>
                                    <AnimatedNumber value={maxLoss} />
                                </span>
                            </div>

                            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">al mes</span>

                            {/* Annual loss */}
                            <div className="mt-4 pt-4 w-full border-t border-white/5 flex items-center justify-center gap-2">
                                <span className="text-xs text-white/20 uppercase tracking-widest">Al año:</span>
                                <span className="text-sm font-mono font-bold text-white/30">
                                    <AnimatedNumber value={minLossAnnual} />
                                </span>
                                <span className="text-xs text-white/20">—</span>
                                <span className="text-sm font-mono font-bold text-white/30">
                                    <AnimatedNumber value={maxLossAnnual} />
                                </span>
                            </div>

                            {/* Decorative bottom line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px"
                                style={{ background: 'linear-gradient(to right, transparent, rgba(255,68,68,0.4), transparent)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Bottom hint */}
                <p className="mt-8 text-center text-xs text-white/20 font-light">
                    Basado en 20 días laborables al mes · Ajusta los sliders para ver tu estimación personalizada
                </p>
            </Motion.div>
        </section>
    );
};

export default ROICalculator;
