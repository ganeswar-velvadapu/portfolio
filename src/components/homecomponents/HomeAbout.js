import React from 'react'

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HomeAbout = () => {
    return (
        <div className="md:flex-1 max-w-full lg:max-w-2xl w-full">
            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white text-center lg:text-left px-2">
                About Me
            </h2>

            {/* Divider */}
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-400 mb-6 sm:mb-8 mx-auto lg:mx-0"></div>

            {/* About Description */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 mb-4 sm:mb-6 text-center lg:text-left px-2">
                I&apos;m a <span className="text-white">Cybersecurity and DevOps enthusiast</span>.  
                I frequently try to <span className="text-white">fuck my network and laptop</span> just to see what breaks and how to fix it.  
                I build scalable backend systems.
            </p>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 mb-6 sm:mb-8 text-center lg:text-left px-2">
                I love working with <span className="text-white">TypeScript</span> and <span className="text-white">Go Lang</span>.  
                Also, I use Arch btw.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start px-2">
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-full text-sm sm:text-base md:text-lg font-medium text-white transition-all duration-300 group"
                >
                    More About Me
                    <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    )
}

export default HomeAbout
