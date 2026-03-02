import React from 'react';
import { motion as Motion } from 'framer-motion';

const PACKS = {
    mini: {
        name: 'Pack Mini',
        price: '250',
        tag: 'Ideal para empezar',
        description: 'Recupera tu inversión con solo 2 citas salvadas al mes. Perfecto para autónomos y pequeños negocios.',
        features: ['Recepcionista IA 24/7', 'Hasta 200 llamadas/mes', 'WhatsApp automatizado', 'Soporte por email'],
        color: '#94a3b8',
        glowColor: 'rgba(148,163,184,0.1)',
        borderColor: 'rgba(148,163,184,0.15)',
    },
    standard: {
        name: 'Pack Standard',
        price: '450',
        tag: 'Más popular',
        description: 'La solución equilibrada para clínicas y negocios en crecimiento que no pueden permitirse perder ni una llamada más.',
        features: ['Recepcionista IA 24/7', 'Llamadas ilimitadas', 'WhatsApp + CRM integrado', 'Soporte prioritario'],
        color: '#00CC66',
        glowColor: 'rgba(0,204,102,0.12)',
        borderColor: 'rgba(0,204,102,0.25)',
    },
    medium: {
        name: 'Pack Medium',
        price: '750',
        tag: 'Alta saturación',
        description: 'Máxima eficiencia para negocios con alto volumen de llamadas que necesitan automatización completa.',
        features: ['Todo lo del Standard', 'Multi-agente IA', 'Integraciones avanzadas', 'Account Manager dedicado'],
        color: '#f97316',
        glowColor: 'rgba(249,115,22,0.1)',
        borderColor: 'rgba(249,115,22,0.2)',
    },
    enterprise: {
        name: 'Pack Enterprise',
        price: null,
        tag: 'Grandes volúmenes',
        description: 'Infraestructura multi-agente personalizada para empresas con necesidades críticas de alto volumen.',
        features: ['Infraestructura dedicada', 'SLA garantizado', 'Integración a medida', 'Soporte 24/7 premium'],
        color: '#a855f7',
        glowColor: 'rgba(168,85,247,0.1)',
        borderColor: 'rgba(168,85,247,0.2)',
    },
};

const getPackKey = (maxLoss) => {
    if (maxLoss < 1500) return 'mini';
    if (maxLoss <= 4500) return 'standard';
    if (maxLoss <= 8000) return 'medium';
    return 'enterprise';
};

const CheckIcon = ({ color }) => (
    <svg className="w-4 h-4 shrink-0" style={{ color }} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const RecommendationEngine = ({ maxLoss, onPackSelect }) => {
    const packKey = getPackKey(maxLoss);
    const pack = PACKS[packKey];

    React.useEffect(() => {
        if (onPackSelect) onPackSelect(pack);
    }, [packKey, pack, onPackSelect]);

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: pack.color }}></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Recomendación Personalizada</span>
            </div>

            <Motion.div
                key={packKey}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                    border: `1px solid ${pack.borderColor}`,
                }}
            >
                {/* Glow in corner */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${pack.glowColor} 0%, transparent 70%)` }}></div>
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${pack.glowColor} 0%, transparent 70%)` }}></div>

                <div className="relative z-10 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: details */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                            style={{ background: `${pack.glowColor}`, border: `1px solid ${pack.borderColor}`, color: pack.color }}>
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: pack.color }}></span>
                            {pack.tag}
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2" style={{ color: pack.color }}>
                            {pack.name}
                        </h2>

                        <p className="text-white/50 text-sm leading-relaxed mb-6">{pack.description}</p>

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
                            {pack.price ? (
                                <>
                                    <div className="text-6xl sm:text-7xl font-black font-mono tabular-nums" style={{ color: pack.color }}>
                                        {pack.price}€
                                    </div>
                                    <div className="text-white/30 text-sm font-medium mt-1">/mes · sin permanencia</div>
                                </>
                            ) : (
                                <div className="text-5xl font-black" style={{ color: pack.color }}>Consultar</div>
                            )}
                        </div>

                        {/* Setup fee */}
                        <div className="rounded-xl p-4 w-full md:max-w-xs text-left"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="text-xs text-white/30 mb-1 uppercase tracking-wider font-semibold">Setup inicial</div>
                            <div className="text-white/70 text-sm font-medium">499€ · Pago único</div>
                            <div className="text-white/30 text-xs mt-0.5">Configuración de infraestructura y entrenamiento de IA</div>
                        </div>

                        <a href="#lead-form"
                            className="w-full md:max-w-xs flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95"
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
