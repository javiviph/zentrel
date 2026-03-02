import React, { useState, useEffect } from 'react';
import { motion as Motion, useSpring, useTransform } from 'framer-motion';

const FormatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }).format(value);
};

// Fancy Animated Number Component
const AnimatedNumber = ({ value }) => {
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => FormatCurrency(Math.round(current)));

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return <Motion.span>{display}</Motion.span>;
};

const ROICalculator = ({ onCalculate, onInteract }) => {
    const [missedCalls, setMissedCalls] = useState(10);
    const [minTicket, setMinTicket] = useState(50);
    const [maxTicket, setMaxTicket] = useState(150);

    const [minLoss, setMinLoss] = useState(0);
    const [maxLoss, setMaxLoss] = useState(0);

    useEffect(() => {
        // New Formula
        const calculatedMinLoss = missedCalls * 20 * minTicket;
        const calculatedMaxLoss = missedCalls * 20 * maxTicket;

        setMinLoss(calculatedMinLoss);
        setMaxLoss(calculatedMaxLoss);

        if (onCalculate) {
            onCalculate({
                missedCalls,
                minTicket,
                maxTicket,
                minLoss: calculatedMinLoss,
                maxLoss: calculatedMaxLoss
            });
        }
    }, [missedCalls, minTicket, maxTicket, onCalculate]);

    const handleMinTicketChange = (val) => {
        const num = Number(val);
        setMinTicket(num);
        if (num > maxTicket) setMaxTicket(num);
    };

    const handleMaxTicketChange = (val) => {
        const num = Number(val);
        setMaxTicket(num);
        if (num < minTicket) setMinTicket(num);
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-16 text-white" id="calculator">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Subtle background gradient */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none"></div>

                <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                    Calculadora de Pérdidas
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Controls */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Llamadas perdidas al día</label>
                                <span className="text-2xl font-mono text-white">{missedCalls}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={missedCalls}
                                onChange={(e) => {
                                    setMissedCalls(Number(e.target.value));
                                    if (onInteract) onInteract();
                                }}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                            <div className="flex justify-between text-xs text-zinc-600 font-mono">
                                <span>1</span>
                                <span>100</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Ticket Medio Bajo</label>
                                <span className="text-2xl font-mono text-white">{FormatCurrency(minTicket)}</span>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="500"
                                step="5"
                                value={minTicket}
                                onChange={(e) => {
                                    handleMinTicketChange(e.target.value);
                                    if (onInteract) onInteract();
                                }}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                            <div className="flex justify-between text-xs text-zinc-600 font-mono">
                                <span>20€</span>
                                <span>500€</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Ticket Medio Alto</label>
                                <span className="text-2xl font-mono text-white">{FormatCurrency(maxTicket)}</span>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="500"
                                step="5"
                                value={maxTicket}
                                onChange={(e) => {
                                    handleMaxTicketChange(e.target.value);
                                    if (onInteract) onInteract();
                                }}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                            <div className="flex justify-between text-xs text-zinc-600 font-mono">
                                <span>20€</span>
                                <span>500€</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Screen */}
                    <div className="relative">
                        {/* Red Alert Glow */}
                        <div className="absolute inset-0 bg-red-600/10 blur-[60px] rounded-full pointer-events-none transition-all duration-700"></div>

                        <div className="relative bg-black/80 border border-zinc-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                            <span className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-4">Estás perdiendo entre</span>

                            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-500 mb-2 font-mono tracking-tighter drop-shadow-lg flex flex-col md:flex-row items-center gap-2">
                                <AnimatedNumber value={minLoss} />
                                <span className="text-2xl md:text-4xl text-zinc-400 font-sans px-2">y</span>
                                <AnimatedNumber value={maxLoss} />
                            </div>

                            <span className="text-zinc-500 uppercase tracking-widest text-xs font-bold mt-4">al mes</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
