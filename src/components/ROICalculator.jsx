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

// Animated plain integer
const AnimatedInt = ({ value, suffix = '' }) => {
    const spring = useSpring(value, { mass: 0.6, stiffness: 80, damping: 14 });
    const display = useTransform(spring, (c) => `${Math.round(c)}${suffix}`);
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
            <div className="flex justify-between text-xs text-white/20 font-mono">
                <span>{format ? format(min) : min}</span>
                <span>{format ? format(max) : max}</span>
            </div>
        </div>
    );
};

// Checkbox toggle
const CheckOption = ({ id, label, checked, onChange }) => (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group select-none">
        <div className="relative shrink-0 w-5 h-5 rounded-md transition-colors duration-150"
            style={{
                background: checked ? '#00CC66' : 'rgba(255,255,255,0.06)',
                border: checked ? '1px solid #00CC66' : '1px solid rgba(255,255,255,0.12)',
            }}>
            {checked && (
                <svg className="absolute inset-0 w-full h-full p-0.5 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            )}
            <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        </div>
        <span className="text-xs font-medium text-white/60 group-hover:text-white/80 transition-colors">{label}</span>
        <span className="ml-auto text-xs text-emerald-500/70 font-mono">{checked ? '+4 días' : ''}</span>
    </label>
);

// Stat pill in result card
const StatPill = ({ label, value }) => (
    <div className="flex flex-col items-center gap-0.5">
        <span className="text-lg font-black font-mono text-white/70 tabular-nums">{value}</span>
        <span className="text-xs text-white/25 uppercase tracking-widest">{label}</span>
    </div>
);

// Toggle Switch
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
            className="relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200"
            style={{ background: checked ? '#00CC66' : 'rgba(255,255,255,0.1)' }}>
            <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }} />
        </button>
    </div>
);

const ROICalculator = ({ onCalculate, onInteract }) => {
    const [missedCalls, setMissedCalls] = useState(5);
    const [minTicket, setMinTicket] = useState(80);
    const [maxTicket, setMaxTicket] = useState(200);
    const [attendSat, setAttendSat] = useState(false);
    const [attendSun, setAttendSun] = useState(false);
    const [isPremiumFrequent, setIsPremiumFrequent] = useState(false);

    const [realisticLoss, setRealisticLoss] = useState(0);
    const [potentialLoss, setPotentialLoss] = useState(0);
    const [realisticAnnual, setRealisticAnnual] = useState(0);
    const [potentialAnnual, setPotentialAnnual] = useState(0);
    const [callsPerMonth, setCallsPerMonth] = useState(0);
    const [estimatedMinutes, setEstimatedMinutes] = useState(0);
    const [workingDays, setWorkingDays] = useState(20);

    const interacted = useRef(false);

    useEffect(() => {
        const days = 20 + (attendSat ? 4 : 0) + (attendSun ? 4 : 0);
        const lowW = isPremiumFrequent ? 0.5 : 0.8;
        const highW = isPremiumFrequent ? 0.5 : 0.2;
        const wTicket = (minTicket * lowW) + (maxTicket * highW);

        const calls = missedCalls * days;
        const minutes = calls * 2;
        const calcR = calls * wTicket;
        const calcP = calls * maxTicket;

        setWorkingDays(days);
        setCallsPerMonth(calls);
        setEstimatedMinutes(minutes);
        setRealisticLoss(calcR);
        setPotentialLoss(calcP);
        setRealisticAnnual(calcR * 12);
        setPotentialAnnual(calcP * 12);

        if (onCalculate) onCalculate({
            missedCalls, minTicket, maxTicket,
            workingDays: days,
            callsPerMonth: calls,
            estimatedMinutes: minutes,
            realisticLoss: calcR,
            potentialLoss: calcP,
            maxLoss: calcR, // used by RecommendationEngine for net saving calc
        });
    }, [missedCalls, minTicket, maxTicket, attendSat, attendSun, isPremiumFrequent, onCalculate]);

    const markInteracted = () => {
        if (!interacted.current) {
            interacted.current = true;
            if (onInteract) onInteract();
        }
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
                {/* Glow blob */}
                <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(0,180,80,0.1) 0%, transparent 70%)' }}></div>

                {/* Section label */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-4 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Calculadora de Pérdidas</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 leading-tight">
                    Descubre cuánto te cuesta<br />
                    <span style={{ color: '#00CC66' }}>no coger el teléfono.</span>
                </h2>
                <p className="text-white/40 text-sm mb-10 max-w-xl">
                    Ajusta los datos de tu negocio y mira cómo se acumula la pérdida mes a mes.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* ── LEFT: inputs ── */}
                    <div className="space-y-7">
                        <Slider
                            id="missed-calls"
                            label="Llamadas perdidas al día"
                            value={missedCalls}
                            min={1} max={20}
                            onChange={(v) => { setMissedCalls(v); markInteracted(); }}
                        />
                        <Slider
                            id="min-ticket"
                            label="Ticket Medio Bajo"
                            value={minTicket}
                            min={20} max={500} step={5}
                            format={(v) => `${v}€`}
                            onChange={(v) => {
                                setMinTicket(v);
                                if (v > maxTicket) setMaxTicket(v);
                                markInteracted();
                            }}
                        />
                        <Slider
                            id="max-ticket"
                            label="Ticket Medio Alto"
                            value={maxTicket}
                            min={20} max={500} step={5}
                            format={(v) => `${v}€`}
                            onChange={(v) => {
                                setMaxTicket(v);
                                if (v < minTicket) setMinTicket(v);
                                markInteracted();
                            }}
                        />

                        {/* Weekend checkboxes */}
                        <div className="rounded-xl px-4 py-4 space-y-3"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">¿En qué días recibes llamadas?</p>
                            <CheckOption
                                id="attend-sat"
                                label="Atendemos sábados"
                                checked={attendSat}
                                onChange={(v) => { setAttendSat(v); markInteracted(); }}
                            />
                            <CheckOption
                                id="attend-sun"
                                label="Atendemos domingos"
                                checked={attendSun}
                                onChange={(v) => { setAttendSun(v); markInteracted(); }}
                            />
                            <p className="text-xs text-white/20 pt-1">
                                Días de cálculo: <span className="text-white/40 font-mono font-bold">{workingDays} días/mes</span>
                            </p>
                        </div>

                        {/* Frequency toggle */}
                        <Toggle
                            id="premium-frequent"
                            label="¿Tu ticket alto es un servicio frecuente?"
                            hint={`Proporción aplicada: ${ratio} (bajo / alto)`}
                            checked={isPremiumFrequent}
                            onChange={(v) => { setIsPremiumFrequent(v); markInteracted(); }}
                        />
                    </div>

                    {/* ── RIGHT: result card ── */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(220,30,30,0.1) 0%, transparent 70%)' }}></div>

                        <div className="relative rounded-2xl p-6 sm:p-8 flex flex-col w-full text-center"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                border: '1px solid rgba(255,50,50,0.15)'
                            }}>

                            {/* Stats row */}
                            <div className="flex justify-around mb-6 pb-5"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <StatPill label="Días / mes" value={<AnimatedInt value={workingDays} />} />
                                <div className="w-px" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
                                <StatPill label="Llamadas / mes" value={<AnimatedInt value={callsPerMonth} />} />
                                <div className="w-px" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
                                <StatPill label="Minutos estimados" value={<AnimatedInt value={estimatedMinutes} suffix=" min" />} />
                            </div>

                            {/* Escenario Realista */}
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

                            {/* Escenario de Éxito */}
                            <div className="mb-5">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                                    style={{ background: 'rgba(255,170,0,0.1)', color: '#FFAA00', border: '1px solid rgba(255,170,0,0.15)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    Escenario de Éxito (ticket alto)
                                </div>
                                <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums" style={{ color: '#FF8800' }}>
                                    <AnimatedNumber value={potentialLoss} />
                                </div>
                                <div className="text-xs text-white/25 mt-1">/ mes · si tu IA captura los servicios de ticket alto</div>
                            </div>

                            {/* Annual */}
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

                            {/* Bottom line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px"
                                style={{ background: 'linear-gradient(to right, transparent, rgba(255,68,68,0.4), transparent)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Bottom explanation */}
                <div className="mt-8 rounded-xl px-5 py-4 flex gap-3 items-start"
                    style={{ background: 'rgba(0,204,102,0.04)', border: '1px solid rgba(0,204,102,0.1)' }}>
                    <svg className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-white/40 leading-relaxed">
                        {isPremiumFrequent
                            ? <><span className="text-white/60 font-semibold">Proporción 50/50 activa:</span> Calculamos que el 50% de tus ventas son del ticket bajo y el otro 50% del ticket alto. Úsalo si tus servicios premium son igual de frecuentes que los básicos.</>
                            : <><span className="text-white/60 font-semibold">Proporción 80/20 activa:</span> Calculamos que el 80% de tus ventas son del ticket medio bajo y solo el 20% del ticket alto. Es el reparto más habitual en servicios: los clientes contratan más lo básico y menos lo premium.</>
                        }
                        {' '}<span className="text-white/30">La recomendación de pack siempre usa el escenario realista.</span>
                    </p>
                </div>
            </Motion.div>
        </section>
    );
};

export default ROICalculator;
