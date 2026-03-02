import React, { useState, useEffect } from 'react';

const FormatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }).format(value);
};

const ROICalculator = ({ onCalculate, onInteract }) => {
    const [missedCalls, setMissedCalls] = useState(5);
    const [minTicket, setMinTicket] = useState(500);
    const [maxTicket, setMaxTicket] = useState(1500);

    const [monthlyLoss, setMonthlyLoss] = useState(0);
    const [annualLoss, setAnnualLoss] = useState(0);

    useEffect(() => {
        // Formula calculation
        const avgTicket = (minTicket + maxTicket) / 2;
        // Assuming 20 working days per month
        const lossPerMonth = missedCalls * 20 * avgTicket;
        const lossPerYear = lossPerMonth * 12;

        setMonthlyLoss(lossPerMonth);
        setAnnualLoss(lossPerYear);

        if (onCalculate) {
            onCalculate({
                missedCalls,
                minTicket,
                maxTicket,
                monthlyLoss,
                annualLoss
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
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                    Calculadora de Pérdidas
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                                max="50"
                                value={missedCalls}
                                onChange={(e) => {
                                    setMissedCalls(Number(e.target.value));
                                    if (onInteract) onInteract();
                                }}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                            <div className="flex justify-between text-xs text-zinc-600 font-mono">
                                <span>1</span>
                                <span>50+</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Ticket Medio Mínimo</label>
                                <span className="text-2xl font-mono text-white">{FormatCurrency(minTicket)}</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="5000"
                                step="50"
                                value={minTicket}
                                onChange={(e) => {
                                    handleMinTicketChange(e.target.value);
                                    if (onInteract) onInteract();
                                }}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">Ticket Medio Máximo</label>
                                <span className="text-2xl font-mono text-white">{FormatCurrency(maxTicket)}</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="10000"
                                step="50"
                                value={maxTicket}
                                onChange={(e) => {
                                    handleMaxTicketChange(e.target.value);
                                    if (onInteract) onInteract();
                                }}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>
                    </div>

                    {/* Results Screen */}
                    <div className="relative">
                        {/* Background Glow based on loss */}
                        <div className="absolute inset-0 bg-red-600/10 blur-[60px] rounded-full pointer-events-none transition-all duration-700"></div>

                        <div className="relative bg-black/60 border border-zinc-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                            <span className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-2">Mensualmente pierdes</span>

                            <div className="text-5xl md:text-7xl font-bold text-red-500 mb-6 font-mono tracking-tighter transition-all duration-300">
                                {FormatCurrency(monthlyLoss)}
                            </div>

                            <div className="w-full h-px bg-zinc-800 my-4"></div>

                            <span className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-2">Anualmente pierdes</span>
                            <div className="text-4xl md:text-5xl font-bold text-orange-500 font-mono tracking-tighter transition-all duration-300">
                                {FormatCurrency(annualLoss)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Zentrel Value Proposition */}
                <div className="mt-12 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center transform hover:scale-[1.02] transition-transform cursor-default">
                    <p className="text-xl md:text-2xl font-medium text-green-400 flex flex-col md:flex-row items-center justify-center gap-2">
                        <span>✨ Recupera todo esto por solo</span>
                        <span className="font-bold text-white bg-green-500/20 px-3 py-1 rounded-lg">450€ / mes</span>
                        <span>con nuestra IA.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
