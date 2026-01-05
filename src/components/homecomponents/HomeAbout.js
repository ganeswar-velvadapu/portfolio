"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import Image from 'next/image';

const HomeAbout = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showCenter, setShowCenter] = useState(false);

  const languages = [
    { name: 'JavaScript', icon: '/svgs/js.svg', delay: 0 },
    { name: 'TypeScript', icon: '/svgs/ts.svg', delay: 300 },
    { name: 'Go', icon: '/svgs/go.svg', delay: 600 },
    { name: 'Python', icon: '/svgs/python.svg', delay: 900 },
    { name: 'Dart', icon: '/svgs/dart.svg', delay: 1200 },
  ];

  useEffect(() => {
    // Animate languages one by one
    languages.forEach((lang, index) => {
      setTimeout(() => {
        setActiveIndex(index);
      }, lang.delay);
    });

    // Show center merge after all logos appear
    setTimeout(() => {
      setShowCenter(true);
    }, 1800);
  }, []);

  return (
    <div className="md:flex-1 max-w-full lg:max-w-2xl w-full">
      {/* Animation Container */}
      <div className="relative h-96 flex items-center justify-center mb-8">
        {/* Center Point - Merging Effect */}
        <div className={`absolute z-20 transition-all duration-1000 ${
          showCenter ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <div className="relative">
            {/* Glowing core */}
            <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <Code2 size={40} className="text-white" />
            </div>
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full bg-white/5 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
          </div>
        </div>

        {/* Language Logos in Circle */}
        {languages.map((lang, index) => {
          const angle = (index * 360) / languages.length - 90; // Start from top
          const radius = 140;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          const isActive = index <= activeIndex;

          return (
            <div key={lang.name}>
              {/* Language Logo */}
              <div
                className={`absolute transition-all duration-700 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-lg transition-all hover:scale-110 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm p-2">
                  <Image 
                    src={lang.icon} 
                    alt={lang.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain opacity-80"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Language Names */}
      <div className="flex flex-wrap gap-3 mb-6 sm:mb-8 justify-center lg:justify-start px-2">
        {languages.map((lang, index) => (
          <div
            key={lang.name}
            className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 transition-all duration-500 hover:bg-white/10 ${
              index <= activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${lang.delay}ms` }}
          >
            <Image 
              src={lang.icon} 
              alt={lang.name}
              width={12}
              height={12}
              className="w-3 h-3 opacity-70"
            />
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAbout;