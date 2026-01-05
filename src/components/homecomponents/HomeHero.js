import React from 'react';
import Image from 'next/image';

const HomeHero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center md:flex-1 text-center lg:text-left max-w-full lg:max-w-2xl w-full">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-5 text-white px-2">
        Hello, I&apos;m Ganeswar Velvadapu
      </h1>
      
      <div className="flex justify-center lg:hidden mt-6 mb-8 px-2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
          
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/20 bg-white/5 backdrop-blur-sm">
            <Image
              src="/ganeswarv.jpg" // Replace with your image path
              alt="Ganeswar Velvadapu"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomeHero;