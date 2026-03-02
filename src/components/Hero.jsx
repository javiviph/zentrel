import React from 'react';

const Hero = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 bg-black text-white relative overflow-hidden">
            {/* Subtle top glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white opacity-[0.03] blur-[100px] pointer-events-none rounded-full"></div>

            <div className="mb-12 cursor-default select-none">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase" style={{ letterSpacing: '0.2em' }}>
                    ZENTREL
                </h1>
            </div>

            <div className="max-w-4xl mx-auto z-10">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight md:leading-tight">
                    ¿Cuánto dinero estás <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">perdiendo</span> hoy por no descolgar el teléfono?
                </h2>
                <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light">
                    Calcula tu pérdida de ingresos real y descubre cómo nuestra inteligencia artificial puede recuperarlos automáticamente 24/7.
                </p>
            </div>
        </section>
    );
};

export default Hero;
