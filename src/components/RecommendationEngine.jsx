import React from 'react';
import { motion as Motion } from 'framer-motion';

// Pack definitions — descriptions are generated dynamically
const getPack = (minutes) => {
    if (minutes <= 100) {
        return {
            name: 'Pack Mini',
            price: '250',
            included: '100 min/mes',
            tag: 'Ideal para empezar',
            features: ['Recepcionista IA 24/7', 'Hasta 100 min de llamadas/mes', 'Agendado en Google Calendar', 'Recordatorios WhatsApp'],
            color: '#94a3b8',
            glowColor: 'rgba(148,163,184,0.1)',
            borderColor: 'rgba(148,163,184,0.15)',
        };
    } else if (minutes <= 250) {
        return {
            name: 'Pack Standard',
            price: '450',
            included: '250 min/mes',
            tag: 'Más popular',
            features: ['Recepcionista IA 24/7', 'Hasta 250 min de llamadas/mes', 'Google Calendar + WhatsApp', 'Soporte prioritario'],
            color: '#00CC66',
            glowColor: 'rgba(0,204,102,0.12)',
            borderColor: 'rgba(0,204,102,0.25)',
        };
    } else {
        return {
            name: 'Pack Medium',
            price: '750',
            included: '600 min/mes',
            tag: 'Alta saturación',
            features: ['Recepcionista IA 24/7', 'Hasta 600 min de llamadas/mes', 'Integraciones avanzadas', 'Account Manager dedicado'],
            color: '#f97316',
            glowColor: 'rgba(249,115,22,0.1)',
            borderColor: 'rgba(249,115,22,0.2)',
        };
    }
};

// Compute how many appointments are needed to break even
const getBreakevenDescription = (packPrice, calculatorData) => {
    const { realisticLoss = 0, callsPerMonth = 0 } = calculatorData || {};
    if (!callsPerMonth || callsPerMonth === 0 || realisticLoss === 0) return null;

    const weightedTicket = realisticLoss / callsPerMonth;        // € per appointment
    const citasNecesarias = Math.ceil(packPrice / weightedTicket); // to cover monthly cost
    const netMonthly = realisticLoss - packPrice;                 // realistic net saving

    const fmt = (v) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);

    return {
        citasNecesarias,
        weightedTicket: Math.round(weightedTicket),
        netMonthly,
        fmtNet: fmt(netMonthly),
        fmtTicket: fmt(weightedTicket),
    };
};

const CheckIcon = ({ color }) => (
    <svg className="w-4 h-4 shrink-0" style={{ color }} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const RecommendationEngine = ({ estimatedMinutes = 0, calculatorData, onPackSelect }) => {
    const pack = getPack(estimatedMinutes);
    const roi = getBreakevenDescription(Number(pack.price), calculatorData);

    React.useEffect(() => {
        if (onPackSelect) onPackSelect(pack);
    }, [estimatedMinutes, pack, onPackSelect]);

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: pack.color }}></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Recomendación Personalizada</span>
            </div>

            <Motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                    border: `1px solid ${pack.borderColor}`,
                }}
            >
                {/* Glow corners */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${pack.glowColor} 0%, transparent 70%)` }}></div>
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${pack.glowColor} 0%, transparent 70%)` }}></div>

                <div className="relative z-10 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Left: details */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                            style={{ background: pack.glowColor, border: `1px solid ${pack.borderColor}`, color: pack.color }}>
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: pack.color }}></span>
                            {pack.tag}
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-1" style={{ color: pack.color }}>
                            {pack.name}
                        </h2>
                        {/* Minutes breakdown */}
                        {(() => {
                            const includedMin = parseInt(pack.included); // e.g. 100, 250, 600
                            const remaining = includedMin - estimatedMinutes;
                            return (
                                <div className="rounded-xl overflow-hidden mb-5 text-xs font-mono"
                                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                                    <div className="flex justify-between items-center px-4 py-2.5"
                                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                                        <span className="text-white/40">Minutos incluidos en el plan</span>
                                        <span className="font-bold text-white/70">{includedMin} min</span>
                                    </div>
                                    <div className="flex justify-between items-center px-4 py-2.5"
                                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <span className="text-white/40">Uso estimado de tus llamadas</span>
                                        <span className="font-bold text-white/50">~{estimatedMinutes} min</span>
                                    </div>
                                    <div className="flex justify-between items-center px-4 py-2.5">
                                        <span style={{ color: remaining >= 0 ? pack.color : '#FF4444', opacity: 0.8 }}>
                                            {remaining >= 0 ? 'Minutos libres de margen' : 'Minutos por encima del plan'}
                                        </span>
                                        <span className="font-bold" style={{ color: remaining >= 0 ? pack.color : '#FF4444' }}>
                                            {remaining >= 0 ? `+${remaining}` : remaining} min
                                        </span>
                                    </div>
                                </div>
                            );
                        })()}


                        <ul className="space-y-3">
                            {pack.features.map((f) => (
                                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                                    <CheckIcon color={pack.color} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: pricing */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
                        <div>
                            <div className="text-6xl sm:text-7xl font-black font-mono tabular-nums" style={{ color: pack.color }}>
                                {pack.price}€
                            </div>
                            <div className="text-white/30 text-sm font-medium mt-1">/mes · sin permanencia</div>
                        </div>

                        {/* Setup fee */}
                        <div className="rounded-xl p-4 w-full md:max-w-xs text-left"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="text-xs text-white/30 mb-1 uppercase tracking-wider font-semibold">Inversión inicial</div>
                            <div className="text-white/70 text-sm font-bold">499€ · Pago único</div>
                            <div className="text-white/25 text-xs mt-0.5">Configuración e infraestructura privada</div>
                        </div>

                        <a href="#lead-form"
                            className="w-full md:max-w-xs flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 hover:opacity-90"
                            style={{
                                background: pack.color,
                                color: '#000',
                                boxShadow: `0 0 30px ${pack.glowColor}`
                            }}>
                            Activar este Pack
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </Motion.div>
        </section>
    );
};

export default RecommendationEngine;
