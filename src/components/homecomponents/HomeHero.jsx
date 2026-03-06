"use client";
import React, { useState, useEffect } from "react";

const HomeHero = () => {
  const [visible, setVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300);
    const t2 = setTimeout(() => setSubVisible(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const quote = "I embrace imperfections, yet I still chase perfection.";
  const words = quote.split(" ");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Quote */}
      <div className="relative z-10 max-w-3xl text-center">
        {/* Decorative top line */}
        <div
          className="mx-auto mb-10 h-px bg-white/20 transition-all duration-1000"
          style={{
            width: visible ? "80px" : "0px",
            transitionDelay: "200ms",
          }}
        />

        <h1
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide"
          style={{
            
            letterSpacing: "0.02em",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.3em] transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${300 + i * 80}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Decorative bottom line */}
        <div
          className="mx-auto mt-10 h-px bg-white/20 transition-all duration-1000"
          style={{
            width: visible ? "80px" : "0px",
            transitionDelay: `${300 + words.length * 80 + 200}ms`,
          }}
        />  
      </div>
    </section>
  );
};

export default HomeHero;