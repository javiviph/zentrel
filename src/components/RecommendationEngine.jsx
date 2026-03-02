import React from 'react';
import { motion as Motion } from 'framer-motion';

const getRecommendation = (maxLoss) => {
    if (maxLoss < 1500) {
        return {
            name: 'Pack Mini',
            price: '250',
            description: 'Ideal para recuperar tu inversión con solo 2 citas salvadas.',
            color: 'from-zinc-400 to-zinc-600'
        };
    } else if (maxLoss >= 1500 && maxLoss <= 4500) {
        return {
            name: 'Pack Standard',
            price: '450',
            description: 'La solución equilibrada para clínicas en crecimiento.',
            color: 'from-green-400 to-emerald-600'
        };
    } else if (maxLoss > 4500 && maxLoss <= 8000) {
        return {
            name: 'Pack Medium',
            price: '750',
            description: 'Máxima eficiencia para negocios con alta saturación.',
            color: 'from-orange-400 to-orange-600'
        };
    } else {
        // maxLoss > 8000
        return {
            name: 'Pack Enterprise',
            price: 'Consultar',
            description: 'Infraestructura multi-agente para grandes volúmenes.',
            color: 'from-purple-400 to-purple-600'
        };
    }
};

const RecommendationEngine = ({ maxLoss, onPackSelect }) => {
    const recommendation = getRecommendation(maxLoss);

    // Notify parent of the suggested pack
    React.useEffect(() => {
        if (onPackSelect) onPackSelect(recommendation);
    }, [maxLoss, recommendation, onPackSelect]);

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8 relative">
            <Motion.div
                key={recommendation.name} // re-animate on change
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-zinc-900/80 border border-zinc-700/50 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
            >
                {/* Glow effect matching the pack color faintly */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${recommendation.color} opacity-10 blur-[80px] rounded-full pointer-events-none`}></div>
                <div className={`absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr ${recommendation.color} opacity-10 blur-[80px] rounded-full pointer-events-none`}></div>

                <h3 className="text-xl md:text-2xl text-zinc-300 font-medium mb-2">Recomendación para tu negocio:</h3>

                <div className={`text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${recommendation.color} mb-6 tracking-tight`}>
                    {recommendation.name}
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
                    <div className="text-white text-5xl font-mono font-bold">
                        {recommendation.price !== 'Consultar' ? `${recommendation.price}€` : recommendation.price}
                        {recommendation.price !== 'Consultar' && <span className="text-xl text-zinc-500 font-sans font-normal">/mes</span>}
                    </div>
                </div>

                <div className="bg-black/40 rounded-xl p-4 md:p-6 mb-8 border border-zinc-800">
                    <p className="text-lg text-zinc-200">
                        {recommendation.description}
                    </p>
                </div>

                {/* Setup Disclaimer */}
                <p className="text-xs text-zinc-500 uppercase tracking-widest px-4">
                    * Inversión de Setup inicial: 499€ (Pago único por configuración de infraestructura y entrenamiento de IA)
                </p>

            </Motion.div>
        </section>
    );
};

export default RecommendationEngine;
