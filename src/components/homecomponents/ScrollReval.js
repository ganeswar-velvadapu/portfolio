import React, { useState, useEffect, useRef } from 'react';

export default function CursorRevealName() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const name = "GANESWAR VELVADAPU";
  const lettersRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getDistanceFromCursor = (letterElement) => {
    if (!letterElement) return Infinity;
    
    const rect = letterElement.getBoundingClientRect();
    const letterCenterX = rect.left + rect.width / 2;
    const letterCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePos.x - letterCenterX, 2) + 
      Math.pow(mousePos.y - letterCenterY, 2)
    );
    
    return distance;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative opacity-20">
        {/* Cursor light effect */}
        <div 
          className="absolute w-[600px] h-[600px] pointer-events-none transition-all duration-150 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-100%, -100%)',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(59, 130, 246, 0.6) 30%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Main text */}
        <h1 className="text-3xl md:text-7xl lg:text-8xl font-bold tracking-wider select-none whitespace-nowrap px-8">
          {name.split('').map((char, index) => {
            const isSpace = char === ' ';
            const distance = getDistanceFromCursor(lettersRef.current[index]);
            const revealRadius = 250; // Distance in pixels for full reveal
            const opacity = isSpace ? 0 : Math.max(0.05, 1 - (distance / revealRadius));
            const scale = isSpace ? 1 : 0.95 + (opacity * 0.05);
            const brightness = 0.3 + (opacity * 1.2);
            
            return (
              <span
                key={index}
                ref={el => lettersRef.current[index] = el}
                className="inline-block transition-all duration-300 ease-out"
                style={{
                  color: isSpace ? 'transparent' : '#ffffff',
                  opacity: opacity,
                  textShadow: opacity > 0.3
                    ? `0 0 ${opacity * 40}px rgba(255, 255, 255, ${opacity}),
                       0 0 ${opacity * 80}px rgba(255, 255, 255, ${opacity * 0.8}),
                       0 0 ${opacity * 120}px rgba(59, 130, 246, ${opacity * 0.6})` 
                    : 'none',
                  filter: `brightness(${brightness})`,
                  transform: `scale(${scale})`,
                }}
              >
                {char === ' ' ? '\u00A0\u00A0\u00A0' : char}
              </span>
            );
          })}
        </h1>
      </div>
    </div>
  );
}