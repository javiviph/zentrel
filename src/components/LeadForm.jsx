import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';

const LeadForm = ({ calculatorData, recommendedPack }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
            const checkoutUrl = import.meta.env.VITE_LEMON_SQUEEZY_URL;
            const payload = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                minLoss: calculatorData?.minLoss || 0,
                maxLoss: calculatorData?.maxLoss || 0,
                minTicket: calculatorData?.minTicket || 0,
                maxTicket: calculatorData?.maxTicket || 0,
                missedCalls: calculatorData?.missedCalls || 0,
                recommendedPack: recommendedPack?.name || 'N/A'
            };
            if (webhookUrl) {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).catch(() => { });
            }
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                alert('Configura VITE_LEMON_SQUEEZY_URL en el archivo .env');
            }
        } catch { /* silent */ }
        finally { setIsSubmitting(false); }
    };

    const packName = recommendedPack?.name || 'tu Pack';
    const packColor = recommendedPack?.color || '#00CC66';

    return (
        <section className="relative w-full max-w-5xl mx-auto px-4 py-8 mb-24" id="lead-form">
            {/* Section label */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Activar ahora</span>
            </div>

            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
                {/* Left: value prop panel */}
                <div className="relative px-8 py-10 flex flex-col justify-between overflow-hidden"
                    style={{ background: 'linear-gradient(160deg, rgba(0,180,80,0.12) 0%, rgba(0,0,0,0) 70%)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                    {/* Glow */}
                    <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(0,180,80,0.15) 0%, transparent 70%)' }}></div>

                    <div className="relative z-10">
                        <div className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">¿Qué obtienes?</div>
                        <h2 className="text-2xl sm:text-3xl font-black mb-6 leading-tight">
                            Empieza a recuperar ingresos<br />
                            <span className="text-emerald-400">desde el primer día</span>
                        </h2>
                        <ul className="space-y-4">
                            {[
                                'Recepcionista IA configurada en 48h',
                                'Sin permanencias ni contratos ocultos',
                                'Tu IA aprende de tu negocio',
                                'Notificaciones en tiempo real',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-white/60 text-sm">
                                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Stat */}
                    {calculatorData?.realisticLoss > 0 && (() => {
                        const fmt = (v) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);
                        const packPrice = recommendedPack?.price ? Number(recommendedPack.price) : 0;
                        const netSaving = Math.max(0, calculatorData.realisticLoss - packPrice);
                        return (
                            <div className="relative z-10 mt-8 rounded-xl p-4 space-y-3"
                                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,204,102,0.2)' }}>

                                {/* Realistic scenario */}
                                <div>
                                    <div className="text-xs text-white/25 uppercase tracking-widest mb-1">Escenario realista</div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40">Ingresos recuperados</span>
                                        <span className="text-sm font-mono font-semibold text-white/50">{fmt(calculatorData.realisticLoss)}</span>
                                    </div>
                                    {packPrice > 0 && (
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-xs text-white/30">Coste Zentrel / mes</span>
                                            <span className="text-sm font-mono text-red-400/50">− {fmt(packPrice)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: packColor }}>Ganancia neta</span>
                                        <span className="text-xl font-black font-mono" style={{ color: packColor }}>{fmt(netSaving)}</span>
                                    </div>
                                </div>

                                {/* Potential scenario */}
                                {calculatorData.potentialLoss > calculatorData.realisticLoss && (
                                    <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-white/25">Escenario de éxito</span>
                                            <span className="text-sm font-mono font-semibold text-amber-400/50">{fmt(calculatorData.potentialLoss)}</span>
                                        </div>
                                        <p className="text-xs text-white/20 mt-1">Si tu IA captura los servicios de ticket medio alto</p>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>

                {/* Right: form */}
                <div className="px-8 py-10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h3 className="text-lg font-bold text-white mb-1">Activa {packName}</h3>
                    <p className="text-white/40 text-xs mb-7">Nuestro equipo te contactará en menos de 2 horas.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { name: 'name', label: 'Nombre Completo', type: 'text', placeholder: 'Juan García' },
                            { name: 'email', label: 'Email Profesional', type: 'email', placeholder: 'juan@clinica.com' },
                            { name: 'phone', label: 'WhatsApp', type: 'tel', placeholder: '+34 600 000 000' },
                        ].map(({ name, label, type, placeholder }) => (
                            <div key={name}>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-white/30 mb-1.5">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    required
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'rgba(0,204,102,0.4)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50"
                            style={{
                                background: '#00CC66',
                                color: '#000',
                                boxShadow: '0 0 30px rgba(0,204,102,0.25)',
                            }}
                        >
                            {isSubmitting ? (
                                <span>Procesando...</span>
                            ) : (
                                <>
                                    <span>Activar mi {packName} ahora</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </>
                            )}
                        </button>

                        <p className="text-center text-white/20 text-xs pt-2">
                            Sin permanencias · Cancela cuando quieras
                        </p>
                    </form>
                </div>
            </Motion.div>
        </section>
    );
};

export default LeadForm;
