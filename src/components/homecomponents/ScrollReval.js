import React, { useState, useEffect, useRef } from 'react';

export default function CursorRevealName() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const containerRef = useRef(null);
  const name = "GANESWAR VELVADAPU";
  const lettersRef = useRef([]);
  const trailLength = 15;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPos = { x: e.clientX, y: e.clientY, id: Date.now() };
      setMousePos(newPos);
      
      setTrail(prevTrail => {
        const newTrail = [newPos, ...prevTrail];
        return newTrail.slice(0, trailLength);
      });
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
      <div className="relative">
        {/* Trail effect */}
        {trail.map((pos, index) => {
          const opacity = 1 - (index / trailLength);
          const size = 80 - (index * 4);
          
          return (
            <div
              key={pos.id}
              className="fixed pointer-events-none"
              style={{
                left: pos.x,
                top: pos.y,
                width: `${size}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, rgba(255, 255, 255, ${opacity * 0.3}) 0%, rgba(59, 130, 246, ${opacity * 0.25}) 40%, transparent 70%)`,
                filter: 'blur(15px)',
                mixBlendMode: 'screen',
                transition: 'opacity 0.3s ease-out',
                opacity: opacity * 0.4,
              }}
            />
          );
        })}

        {/* Main cursor light effect - bright star core */}
        <div 
          className="fixed pointer-events-none transition-none"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: '500px',
            height: '500px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.3) 5%, rgba(59, 130, 246, 0.3) 15%, rgba(59, 130, 246, 0.15) 35%, transparent 70%)',
            filter: 'blur(50px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Bright center star point */}
        <div 
          className="fixed pointer-events-none transition-none"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: '120px',
            height: '120px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.35) 20%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Main text */}
        <h1 className="text-3xl md:text-7xl lg:text-8xl font-bold tracking-wider select-none whitespace-nowrap px-8 text-gray-800">
          {name.split('').map((char, index) => {
            const isSpace = char === ' ';
            const distance = getDistanceFromCursor(lettersRef.current[index]);
            const revealRadius = 180;
            const opacity = isSpace ? 0 : Math.max(0.08, 1 - (distance / revealRadius));
            const scale = isSpace ? 1 : 0.96 + (opacity * 0.04);
            const brightness = 0.4 + (opacity * 1.5);
            
            return (
              <span
                key={index}
                ref={el => lettersRef.current[index] = el}
                className="inline-block transition-all duration-150 ease-out"
                style={{
                  color: '#ffffff',
                  opacity: opacity,
                  textShadow: opacity > 0.4
                    ? `0 0 ${opacity * 30}px rgba(255, 255, 255, ${opacity * 0.9}),
                       0 0 ${opacity * 60}px rgba(255, 255, 255, ${opacity * 0.6}),
                       0 0 ${opacity * 100}px rgba(59, 130, 246, ${opacity * 0.5}),
                       0 0 ${opacity * 140}px rgba(59, 130, 246, ${opacity * 0.3})` 
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