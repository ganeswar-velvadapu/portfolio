'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blogs' },
  ];

  return (
    <div className="z-100 bg-zinc-900">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b border-white/10 py-3'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="text-lg md:text-xl font-semibold tracking-tight text-white">
            Ganeswar Velvadapu
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-6 lg:gap-10 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm tracking-wide transition-opacity hover:opacity-70 text-white relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:bottom-[-4px] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Contact Button */}
          <Link
            href='/contact'
            className="hidden md:block px-5 py-2 bg-white/10 border border-white/20 rounded-full text-sm transition-all hover:bg-white/15 hover:border-white/30 text-white"
          >
            Contact
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-zinc-900/95 backdrop-blur-xl border-t border-white/10">
            <ul className="flex flex-col gap-1 py-4 px-6">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`transform transition-all duration-300 ease-out ${
                    mobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-sm tracking-wide transition-opacity hover:opacity-70 text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li
                className={`pt-2 transform transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms' }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 bg-white/10 border border-white/20 rounded-full text-sm transition-all hover:bg-white/15 hover:border-white/30 text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}