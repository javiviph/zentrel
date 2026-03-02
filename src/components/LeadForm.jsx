import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';

const LeadForm = ({ calculatorData, recommendedPack }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                }).catch(err => console.error("Webhook submission failed", err));
            }

            if (checkoutUrl) {
                // Here you could append pass-through variables for the agent like ?checkout[custom][agent_id]=...
                // For now, redirecting to the main URL as specified
                window.location.href = checkoutUrl;
            } else {
                alert("Configura VITE_LEMON_SQUEEZY_URL en el archivo .env");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const buttonText = recommendedPack
        ? `Activar mi ${recommendedPack.name} ahora`
        : 'Activar mi Pack ahora';

    return (
        <section className="w-full max-w-xl mx-auto px-4 py-8 mb-20 relative z-10" id="lead-form">
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black border border-zinc-800 rounded-3xl p-8 shadow-2xl"
            >
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Únete a Zentrel hoy</h3>
                <p className="text-zinc-400 text-center mb-8 text-sm">
                    Déjanos tus datos, nuestro equipo se pondrá en contacto inmediatamente para configurar tu infraestructura y detener las pérdidas.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-400 uppercase tracking-widest font-semibold mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej. Juan Pérez"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 uppercase tracking-widest font-semibold mb-2">Email Profesional</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="juan@empresa.com"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 uppercase tracking-widest font-semibold mb-2">Teléfono (WhatsApp)</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+34 600 000 000"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-bold text-sm md:text-base py-4 rounded-xl hover:bg-zinc-200 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider relative overflow-hidden group"
                    >
                        <span className="relative z-10">{isSubmitting ? 'Procesando...' : buttonText}</span>
                        <div className="absolute inset-0 bg-green-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 opacity-20"></div>
                    </button>
                </form>
            </Motion.div>
        </section>
    );
};

export default LeadForm;
