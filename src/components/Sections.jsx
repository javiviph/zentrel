import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';

// --- Shared fade-in animation wrapper ---
const FadeIn = ({ children, delay = 0, className = '' }) => (
    <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </Motion.div>
);

const SectionLabel = ({ color = '#00CC66', children }) => (
    <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: color }}></div>
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">{children}</span>
    </div>
);

const Divider = () => (
    <div className="max-w-5xl mx-auto px-4">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}></div>
    </div>
);

// ─── 1. HOW IT WORKS ───────────────────────────────────────────────────────────
const STEPS = [
    {
        number: '01',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        title: 'El cliente llama a tu número',
        description: 'Tu número habitual sigue siendo el mismo. El agente de voz de Zentrel responde en menos de 1 segundo con voz natural, como si fuera tu recepcionista.',
    },
    {
        number: '02',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Agenda la cita en tu Google Calendar',
        description: 'El agente consulta tu disponibilidad en tiempo real, propone huecos libres, y confirma la cita directamente en tu Google Calendar. Sin intermediarios.',
    },
    {
        number: '03',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 002 2zm4-13a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: 'Recordatorio automático por WhatsApp',
        description: 'Antes de la cita, el cliente recibe un recordatorio personalizado por WhatsApp. Reduce los no-shows hasta un 80% sin que tú hagas nada.',
    },
];

export const HowItWorks = () => (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <FadeIn>
            <SectionLabel>Cómo funciona</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 leading-tight">
                De llamada perdida a cita confirmada.<br />
                <span style={{ color: '#00CC66' }}>Automáticamente.</span>
            </h2>
            <p className="text-white/40 text-sm mb-12 max-w-xl">
                Sin cambiar tu número de teléfono. Sin contratar más personal. Sin tocar el ordenador.
            </p>
        </FadeIn>

        <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px mx-16"
                style={{ background: 'linear-gradient(to right, transparent, rgba(0,204,102,0.2), rgba(0,204,102,0.2), transparent)' }}></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEPS.map((step, i) => (
                    <FadeIn key={step.number} delay={i * 0.1}>
                        <div className="relative rounded-2xl p-6 h-full"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                border: '1px solid rgba(255,255,255,0.07)',
                            }}>
                            {/* Number badge */}
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 text-black font-black text-sm"
                                style={{ background: '#00CC66' }}>
                                {step.number}
                            </div>
                            {/* Icon */}
                            <div className="text-white/30 mb-4">{step.icon}</div>
                            <h3 className="font-bold text-white mb-2 text-base">{step.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    </section>
);

// ─── 2. PAIN POINTS ────────────────────────────────────────────────────────────
const PAINS = [
    {
        emoji: '📵',
        stat: '73%',
        title: 'No vuelven a llamar',
        description: 'El 73% de los clientes no vuelven a intentarlo si no les atienden a la primera. Cada tono que suena en el vacío es dinero que se va.',
    },
    {
        emoji: '🌙',
        stat: '22:00h',
        title: 'Clientes fuera de horario',
        description: 'Tus clientes llaman por la noche, en fines de semana o mientras atiendes a otro. Tu competencia sí contesta. Zentrel también lo hace.',
    },
    {
        emoji: '🏳️',
        stat: '40%',
        title: 'No-shows sin avisar',
        description: 'Sin confirmación previa, hasta el 40% de las citas no se presentan. Un simple recordatorio de WhatsApp lo soluciona por completo.',
    },
];

export const PainPoints = () => (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <FadeIn>
            <SectionLabel color="#FF4444">El problema real</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 leading-tight">
                Cada llamada no atendida es un{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FF4444 0%, #FF8800 100%)' }}>
                    cliente que se marcha.
                </span>
            </h2>
            <p className="text-white/40 text-sm mb-12 max-w-xl">
                No es un problema de producto ni de precio. Es un problema de disponibilidad.
            </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAINS.map((pain, i) => (
                <FadeIn key={pain.stat} delay={i * 0.1}>
                    <div className="rounded-2xl p-6"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,68,68,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                            border: '1px solid rgba(255,68,68,0.12)',
                        }}>
                        <div className="text-3xl mb-3">{pain.emoji}</div>
                        <div className="text-4xl font-black font-mono mb-2" style={{ color: '#FF4444' }}>{pain.stat}</div>
                        <h3 className="font-bold text-white mb-2">{pain.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{pain.description}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    </section>
);

// ─── 3. FEATURES ───────────────────────────────────────────────────────────────
const FEATURES = [
    {
        icon: '🎙️',
        title: 'Voz natural, no un robot',
        description: 'El agente de Zentrel suena como una persona real. Responde preguntas frecuentes, maneja objeciones básicas y guía al cliente hasta confirmar su cita.',
        tag: 'IA de Voz',
    },
    {
        icon: '📅',
        title: 'Integración con Google Calendar',
        description: 'Consulta tu disponibilidad real en tiempo real y agenda la cita sin tu intervención. El cliente elige horario y queda registrado automáticamente.',
        tag: 'Google Calendar',
    },
    {
        icon: '💬',
        title: 'Recordatorios por WhatsApp',
        description: 'El cliente recibe un mensaje de confirmación inmediato y un recordatorio personalizado 24h antes. Cero no-shows, cero llamadas de confirmación manuales.',
        tag: 'WhatsApp',
    },
    {
        icon: '⚡',
        title: 'Activo en menos de 48 horas',
        description: 'Sin instalaciones complejas. Configuramos tu agente, lo conectamos a tu calendario y número de teléfono. En 48h está funcionando.',
        tag: 'Setup rápido',
    },
    {
        icon: '🔔',
        title: 'Notificación al instante',
        description: 'Cada vez que se agenda una cita, recibes una notificación inmediata por WhatsApp con los datos del cliente y el horario confirmado.',
        tag: 'Alertas',
    },
    {
        icon: '📊',
        title: '100% auditable',
        description: 'Accede a los registros de todas las llamadas gestionadas. Sabe quién llamó, qué pidió y si se agendó correctamente.',
        tag: 'Trazabilidad',
    },
];

export const Features = () => (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <FadeIn>
            <SectionLabel>Qué incluye</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 leading-tight">
                Todo lo que necesitas.<br />
                <span style={{ color: '#00CC66' }}>Nada de lo que no necesitas.</span>
            </h2>
            <p className="text-white/40 text-sm mb-12 max-w-xl">
                Zentrel se centra en una sola cosa y la hace muy bien: que nunca pierdas una cita por no haber cogido el teléfono.
            </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feat, i) => (
                <FadeIn key={feat.title} delay={i * 0.07}>
                    <div className="rounded-2xl p-5 h-full flex flex-col gap-3 group hover:border-emerald-500/20 transition-colors duration-300"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                        <div className="flex items-start justify-between">
                            <span className="text-2xl">{feat.icon}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ background: 'rgba(0,204,102,0.1)', color: '#00CC66', border: '1px solid rgba(0,204,102,0.15)' }}>
                                {feat.tag}
                            </span>
                        </div>
                        <h3 className="font-bold text-white text-sm">{feat.title}</h3>
                        <p className="text-white/40 text-xs leading-relaxed">{feat.description}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    </section>
);

// ─── 4. COMPARISON TABLE ───────────────────────────────────────────────────────
export const Comparison = () => (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <FadeIn>
            <SectionLabel>Comparativa</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Zentrel vs recepcionista tradicional
            </h2>
            <p className="text-white/40 text-sm mb-10 max-w-xl">
                El mismo trabajo. Sin el coste, sin el horario, sin los días libres.
            </p>
        </FadeIn>

        <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <th className="text-left p-5 text-white/40 font-semibold uppercase tracking-wider text-xs">Característica</th>
                            <th className="p-5 text-white/40 font-semibold uppercase tracking-wider text-xs text-center">Recepcionista Humana</th>
                            <th className="p-5 font-semibold uppercase tracking-wider text-xs text-center rounded-tr-2xl"
                                style={{ background: 'rgba(0,204,102,0.08)', color: '#00CC66' }}>
                                Zentrel IA ✦
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['Coste mensual', '1.200€ – 2.000€ + SS', 'Desde 250€/mes'],
                            ['Disponibilidad', 'Lun–Vie, 9h–18h', '24h / 7 días / 365 días'],
                            ['Tiempo de respuesta', 'Variable (tono en espera)', '< 1 segundo'],
                            ['Agenda citas', '✓ Manual', '✓ Automático (Google Calendar)'],
                            ['Recordatorio WhatsApp', '✗ No incluido', '✓ Automático'],
                            ['Vacaciones / Bajas', '✗ Necesitas sustituto', '✓ Nunca para'],
                            ['Escalabilidad', '1 llamada a la vez', 'Llamadas simultáneas ilimitadas'],
                        ].map(([feature, human, zentrel], i) => (
                            <tr key={feature} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <td className="p-4 text-white/60 text-xs font-medium">{feature}</td>
                                <td className="p-4 text-white/30 text-xs text-center">{human}</td>
                                <td className="p-4 text-xs text-center font-semibold"
                                    style={{ background: 'rgba(0,204,102,0.04)', color: '#00CC66' }}>
                                    {zentrel}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </FadeIn>
    </section>
);

// ─── 5. USE CASES / SECTORS ────────────────────────────────────────────────────
const CASES = [
    {
        icon: '🦷',
        sector: 'Clínicas y Centros de Salud',
        quote: 'Desde que activamos Zentrel, ya no perdemos pacientes por no coger el teléfono durante las consultas. Las citas se agendan solas y los recordatorios por WhatsApp han eliminado casi todos los no-shows.',
        result: '+35% citas agendadas fuera de horario',
    },
    {
        icon: '💆',
        sector: 'Centros de Estética y Belleza',
        quote: 'Antes pasábamos el día al teléfono interrumpiendo tratamientos. Ahora el agente gestiona todo y nosotras nos centramos en atender a quien ya está delante.',
        result: '0 llamadas perdidas en días de máxima ocupación',
    },
    {
        icon: '🔧',
        sector: 'Talleres y Servicios Técnicos',
        quote: 'Los clientes llaman para pedir presupuesto y nosotros no podíamos atender. Zentrel recoge el nombre y teléfono y agenda la visita. Perfecto para nosotros.',
        result: '100% de leads recogidos, hasta en fin de semana',
    },
];

export const UseCases = () => (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <FadeIn>
            <SectionLabel>Sectores</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Funciona en cualquier negocio<br />
                <span style={{ color: '#00CC66' }}>que dependa de citas.</span>
            </h2>
            <p className="text-white/40 text-sm mb-12 max-w-xl">
                Si recibes llamadas de clientes que quieren reservar, Zentrel puede automatizarlo.
            </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
                <FadeIn key={c.sector} delay={i * 0.1}>
                    <div className="rounded-2xl p-6 flex flex-col justify-between h-full"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}>
                        <div>
                            <div className="text-3xl mb-3">{c.icon}</div>
                            <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">{c.sector}</div>
                            <p className="text-white/60 text-sm leading-relaxed italic mb-5">"{c.quote}"</p>
                        </div>
                        <div className="px-3 py-2 rounded-lg text-xs font-bold"
                            style={{ background: 'rgba(0,204,102,0.1)', color: '#00CC66', border: '1px solid rgba(0,204,102,0.15)' }}>
                            {c.result}
                        </div>
                    </div>
                </FadeIn>
            ))}
        </div>
    </section>
);

// ─── 6. FAQ ────────────────────────────────────────────────────────────────────
const FAQS = [
    {
        q: '¿Necesito cambiar mi número de teléfono?',
        a: 'No. Zentrel funciona con tu número actual mediante desvío de llamada. En menos de 5 minutos está configurado sin que tus clientes noten ningún cambio.',
    },
    {
        q: '¿Cuánto tarda en estar activo?',
        a: 'El proceso completo de configuración y entrenamiento del agente tarda menos de 48 horas. Incluye la integración con tu Google Calendar y la configuración de los mensajes de WhatsApp.',
    },
    {
        q: '¿Qué pasa si el cliente hace una pregunta que el agente no sabe responder?',
        a: 'El agente está entrenado para gestionar las preguntas frecuentes de tu negocio. Si surge algo fuera de su alcance, puede recoger el nombre y teléfono del cliente para que tú le devuelvas la llamada.',
    },
    {
        q: '¿El agente suena como un robot?',
        a: 'No. Usamos tecnología de síntesis de voz de última generación. La voz es natural y la conversación fluye de forma humana. La mayoría de clientes no notan la diferencia.',
    },
    {
        q: '¿Necesito tener Google Calendar?',
        a: 'Sí, actualmente el sistema de agendado funciona con Google Calendar. Es gratuito y si no lo tienes lo configuramos nosotros durante el setup.',
    },
    {
        q: '¿Puedo cancelar cuando quiera?',
        a: 'Sí. No hay permanencias ni contratos de larga duración. Puedes cancelar al mes siguiente sin penalizaciones.',
    },
];

export const FAQ = () => {
    const [open, setOpen] = useState(null);

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-16">
            <FadeIn>
                <SectionLabel>Preguntas frecuentes</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12">
                    Resolvemos tus dudas.
                </h2>
            </FadeIn>

            <div className="space-y-3">
                {FAQS.map((faq, i) => (
                    <FadeIn key={faq.q} delay={i * 0.05}>
                        <div className="rounded-xl overflow-hidden"
                            style={{
                                border: open === i ? '1px solid rgba(0,204,102,0.2)' : '1px solid rgba(255,255,255,0.06)',
                                background: open === i ? 'rgba(0,204,102,0.04)' : 'rgba(255,255,255,0.02)',
                                transition: 'border-color 0.2s, background 0.2s',
                            }}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex justify-between items-center gap-4 px-5 py-4 text-left"
                            >
                                <span className="font-medium text-white/80 text-sm">{faq.q}</span>
                                <span className="shrink-0 text-white/30 transition-transform duration-200" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                            </button>
                            {open === i && (
                                <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
};

// ─── 7. FINAL CTA BANNER ───────────────────────────────────────────────────────
export const CTABanner = () => (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <FadeIn>
            <div className="relative rounded-3xl overflow-hidden px-8 py-12 text-center"
                style={{
                    background: 'linear-gradient(135deg, rgba(0,180,80,0.15) 0%, rgba(0,0,0,0) 60%)',
                    border: '1px solid rgba(0,204,102,0.2)',
                }}>
                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(0,204,102,0.15) 0%, transparent 70%)' }}></div>

                <div className="relative z-10">
                    <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">Empieza hoy</div>
                    <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
                        Deja de perder citas.<br />Activa tu agente en 48h.
                    </h2>
                    <p className="text-white/40 text-sm max-w-md mx-auto mb-8">
                        Sin permanencias. Sin programación. Sin cambiar tu número de teléfono. Solo más citas confirmadas cada día.
                    </p>
                    <a href="#lead-form"
                        className="inline-flex items-center gap-3 py-4 px-8 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            background: '#00CC66',
                            color: '#000',
                            boxShadow: '0 0 40px rgba(0,204,102,0.3)',
                        }}>
                        Calcular mi pérdida y activar
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <p className="text-white/20 text-xs mt-4">Setup inicial: 499€ · Suscripción mensual desde 250€</p>
                </div>
            </div>
        </FadeIn>
    </section>
);
