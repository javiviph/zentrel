import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

const DynamicBadge = () => {
    // Valores base realistas
    const [appointments, setAppointments] = useState(1245);
    const [revenue, setRevenue] = useState(84500);

    useEffect(() => {
        // Incremento aleatorio simulando actividad real en la plataforma
        const interval = setInterval(() => {
            // Se asume un ticket medio aleatorio de entre 45€ y 150€ por nueva cita
            const newTicket = Math.floor(Math.random() * (150 - 45 + 1) + 45);
            setAppointments(prev => prev + 1);
            setRevenue(prev => prev + newTicket);
        }, 3500); // Cada 3.5 segundos

        return () => clearInterval(interval);
    }, []);

    const formattedApps = new Intl.NumberFormat('es-ES').format(appointments);
    const formattedRev = new Intl.NumberFormat('es-ES').format(revenue);

    return (
        <Motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-7 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/25 text-xs font-medium text-emerald-400 tracking-wider transition-all"
            style={{ background: 'rgba(0,204,102,0.07)' }}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div className="flex items-center gap-1.5 sm:gap-2">
                <span>{formattedApps} citas agendadas</span>
                <span className="text-white/20">·</span>
                <span className="font-bold text-emerald-300">{formattedRev}€ recuperados</span>
            </div>
        </Motion.div>
    );
};

const Hero = () => {
    return (
        <section className="relative w-full flex flex-col items-center justify-center text-center px-4 pt-28 pb-24 overflow-hidden">
            {/* Deep radial background glow */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,180,80,0.13) 0%, transparent 70%)' }}>
            </div>

            {/* Dot grid overlay */}
            <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none"></div>

            {/* Nav bar */}
            <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-5 z-20">
                <span className="text-white font-bold text-xl tracking-[0.15em] uppercase select-none">ZENTREL</span>
                <a
                    href="#lead-form"
                    className="text-sm font-semibold px-5 py-2 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 glow-green-sm"
                >
                    Empezar ahora
                </a>
            </nav>

            {/* Dynamic Badge */}
            <DynamicBadge />

            {/* Headline */}
            <Motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-10 max-w-4xl mx-auto"
            >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
                    style={{ letterSpacing: '-0.02em' }}>
                    ¿Cuánto dinero estás{' '}
                    <span className="relative inline-block">
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(135deg, #cc2222 0%, #cc3333 100%)' }}>
                            perdiendo
                        </span>
                    </span>
                    {' '}por no descolgar el teléfono?
                </h1>

                <p className="mt-6 text-base sm:text-lg text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                    La recepcionista virtual que atiende el 100% de las llamadas, califica leads y agenda citas en tu Calendario. 24/7. Sin contratar personal extra.
                </p>
            </Motion.div>

            {/* CTA Arrow down */}
            <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative z-10 mt-12 flex flex-col items-center gap-1"
            >
                <span className="text-xs text-white/30 uppercase tracking-widest">Calcula ahora</span>
                <svg className="w-5 h-5 text-emerald-500 animate-bounce mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Motion.div>

            {/* Social Proof */}
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="relative z-10 mt-20 flex flex-col items-center w-full"
            >
                <span className="text-xs font-bold text-white/30 tracking-widest uppercase mb-6">
                    EMPRESAS QUE YA NO PIERDEN LLAMADAS
                </span>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
                    <span className="text-xl md:text-2xl font-black tracking-tighter">NexoClínicas</span>
                    <span className="text-xl md:text-2xl font-black tracking-tighter">MotorTech</span>
                    <span className="text-xl md:text-2xl font-black tracking-tighter">DentalStudio</span>
                    <span className="text-xl md:text-2xl font-black tracking-tighter">BellaBeauty</span>
                </div>
            </Motion.div>
        </section>
    );
};

export default Hero;
