import React from 'react';
import { motion as Motion } from 'framer-motion';

// ── Pack definitions ────────────────────────────────────────────────────────
const PACKS = [
    {
        id: 'micro',
        name: 'Plan Micro',
        price: '99',
        includedCalls: 20,
        setup: 0,
        setupLabel: 'Gratis',
        tag: 'Sin riesgo',
        idealFor: 'Autónomos, primeras pruebas, primeros clientes',
        features: [
            'Agente IA con voz humana (ElevenLabs)',
            'Información de servicios y horarios',
            'Agendamiento en Google Calendar',
            'Confirmación por WhatsApp',
            'Sin coste de activación',
        ],
        color: '#94a3b8',
        glowColor: 'rgba(148,163,184,0.1)',
        borderColor: 'rgba(148,163,184,0.15)',
    },
    {
        id: 'basico',
        name: 'Plan Básico',
        price: '199',
        includedCalls: 100,
        setup: 499,
        setupLabel: '499 € · pago único',
        tag: 'Más popular',
        idealFor: 'Peluquerías, talleres, fisioterapeutas, autónomos',
        features: [
            'Todo lo del Plan Micro',
            'Personalización completa (voz, guion, tono)',
            'Integración total con calendario compartido',
            'Bono extra de llamadas disponible',
            'Soporte básico',
        ],
        color: '#00CC66',
        glowColor: 'rgba(0,204,102,0.12)',
        borderColor: 'rgba(0,204,102,0.25)',
    },
    {
        id: 'estandar',
        name: 'Plan Estándar',
        price: '399',
        includedCalls: 300,
        setup: 499,
        setupLabel: '499 € · pago único',
        tag: 'Alto volumen',
        idealFor: 'Clínicas, dentistas, gimnasios, peluquerías medianas',
        features: [
            'Todo lo del Plan Básico',
            'Mayor capacidad de llamadas simultáneas',
            'Asignación por nombre o disponibilidad',
            'Informes mensuales básicos',
            'Soporte prioritario',
        ],
        color: '#f97316',
        glowColor: 'rgba(249,115,22,0.1)',
        borderColor: 'rgba(249,115,22,0.2)',
    },
    {
        id: 'medida',
        name: 'A Medida',
        price: '699',
        includedCalls: Infinity,
        setup: null,
        setupLabel: 'Setup a medida',
        tag: 'Empresas y cadenas',
        idealFor: 'Cadenas, restaurantes, concesionarios, clínicas grandes',
        features: [
            'Todo lo del Plan Estándar',
            'Volumen ilimitado de llamadas',
            'Integraciones CRM, multi-calendario, API',
            'Analíticas e informes personalizados',
            'Soporte prioritario 24/7',
            'Ajustes y optimizaciones continuas',
        ],
        color: '#a78bfa',
        glowColor: 'rgba(167,139,250,0.1)',
        borderColor: 'rgba(167,139,250,0.2)',
    },
];

// Recommend pack based on estimated calls per month
const getPack = (callsPerMonth) => {
    if (callsPerMonth <= 20) return PACKS[0]; // Micro
    if (callsPerMonth <= 100) return PACKS[1]; // Básico
    if (callsPerMonth <= 300) return PACKS[2]; // Estándar
    return PACKS[3];                           // A medida
};

const CheckIcon = ({ color }) => (
    <svg className="w-4 h-4 shrink-0" style={{ color }} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const RecommendationEngine = ({ callsPerMonth = 0, onPackSelect }) => {
    const pack = getPack(callsPerMonth);

    React.useEffect(() => {
        if (onPackSelect) onPackSelect(pack);
    }, [callsPerMonth, pack, onPackSelect]);

    const isUnlimited = pack.includedCalls === Infinity;
    const remaining = isUnlimited ? null : pack.includedCalls - callsPerMonth;

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: pack.color }}></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Recomendación Personalizada</span>
            </div>

            <Motion.div
                key={pack.id}
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

                    {/* ── Left ── */}
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

                        {/* Calls breakdown */}
                        <div className="rounded-xl overflow-hidden mb-5 mt-4 text-xs font-mono"
                            style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                            <div className="flex justify-between items-center px-4 py-2.5"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                                <span className="text-white/40">Llamadas incluidas al mes</span>
                                <span className="font-bold text-white/70">
                                    {isUnlimited ? 'Ilimitadas' : `${pack.includedCalls} llamadas`}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-4 py-2.5"
                                style={{ borderBottom: !isUnlimited ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                <span className="text-white/40">Tus llamadas estimadas</span>
                                <span className="font-bold text-white/50">~{callsPerMonth} llamadas</span>
                            </div>
                            {!isUnlimited && (
                                <div className="flex justify-between items-center px-4 py-2.5">
                                    <span style={{ color: remaining >= 0 ? pack.color : '#FF4444', opacity: 0.8 }}>
                                        {remaining >= 0 ? 'Llamadas de margen' : 'Llamadas por encima del plan'}
                                    </span>
                                    <span className="font-bold" style={{ color: remaining >= 0 ? pack.color : '#FF4444' }}>
                                        {remaining >= 0 ? `+${remaining}` : remaining}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Ideal for */}
                        <p className="text-xs text-white/30 mb-4 italic">Ideal para: {pack.idealFor}</p>

                        {/* Features */}
                        <ul className="space-y-3">
                            {pack.features.map((f) => (
                                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                                    <CheckIcon color={pack.color} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Right: pricing ── */}
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
                            <div className="text-xs text-white/30 mb-1 uppercase tracking-wider font-semibold">Activación inicial</div>
                            <div className="font-bold" style={{ color: pack.setup === 0 ? pack.color : 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                {pack.setupLabel}
                            </div>
                            {pack.setup === 0 && (
                                <div className="text-white/25 text-xs mt-0.5">Sin coste para los primeros clientes</div>
                            )}
                            {pack.setup === 499 && (
                                <div className="text-white/25 text-xs mt-0.5">Configuración e infraestructura privada</div>
                            )}
                            {pack.setup === null && (
                                <div className="text-white/25 text-xs mt-0.5">Se presupuesta según necesidades</div>
                            )}
                        </div>

                        <a href="#lead-form"
                            className="w-full md:max-w-xs flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 hover:opacity-90"
                            style={{
                                background: pack.color,
                                color: '#000',
                                boxShadow: `0 0 30px ${pack.glowColor}`
                            }}>
                            {pack.id === 'medida' ? 'Solicitar presupuesto' : 'Activar este Plan'}
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
