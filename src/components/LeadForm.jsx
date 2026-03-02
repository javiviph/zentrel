import React, { useState } from 'react';

const LeadForm = ({ calculatorData }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' });
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
                monthlySaving: calculatorData?.monthlyLoss || 0,
                annualSaving: calculatorData?.annualLoss || 0,
                minTicket: calculatorData?.minTicket || 0,
                maxTicket: calculatorData?.maxTicket || 0,
                missedCalls: calculatorData?.missedCalls || 0
            };

            if (webhookUrl) {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).catch(err => console.error("Webhook submission failed", err)); // Silently catch so redirect still happens
            }

            if (checkoutUrl) {
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

    return (
        <section className="w-full max-w-xl mx-auto px-4 py-8 mb-20 animate-fade-in-up" id="lead-form">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Deja de perder dinero hoy</h3>
                <p className="text-zinc-400 text-center mb-8 text-sm">
                    Déjanos tus datos, nuestro equipo se pondrá en contacto y comenzarás la configuración para recuperar tus ingresos.
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
                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
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
                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>

                    {/* Hidden fields just displayed as context info */}
                    <div className="bg-black/50 p-4 rounded-xl border border-zinc-800/50 mb-6 flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Ahorro Mensual Proyectado:</span>
                        <span className="text-green-400 font-mono font-bold">
                            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(calculatorData?.monthlyLoss || 0)}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-zinc-200 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                    >
                        {isSubmitting ? 'Procesando...' : 'Quiero dejar de perder dinero hoy'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default LeadForm;
