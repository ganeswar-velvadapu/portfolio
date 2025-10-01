'use client'
import HomeAbout from '@/components/homecomponents/HomeAbout';
import Homeblogs from '@/components/homecomponents/Homeblogs';
import HomeHero from '@/components/homecomponents/HomeHero';
import HomeProjects from '@/components/homecomponents/HomeProjects';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Developer',
    'Aspiring DevOps Engineer',
    'Web Designer',
    'Tech Enthusiast'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[loopIndex % roles.length];

      if (isDeleting) {
        setText(currentRole.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(currentRole.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, typingSpeed, roles]);

  return (
    <div className="bg-zinc-900">
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12  md:py-20 gap-8 sm:gap-10 md:gap-12 lg:gap-20">
        {/* Left Side - Hero/Intro */}
        <HomeHero text={text} />

        {/* Right Side - About */}
        <HomeAbout />

      </section>

      <HomeProjects />
      <Homeblogs />
    </div>
  );
}