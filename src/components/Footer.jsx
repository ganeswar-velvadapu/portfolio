"use client"
import React from 'react';
import { Instagram, Linkedin, Github, Book } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm md:text-base text-gray-300 text-center md:text-left">
            © {new Date().getFullYear()} Ganeswar Velvadapu. All rights reserved. Code is licensed under the MIT License.
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 items-center">
            <a
              href="https://instagram.com/ganeswar_velvadapu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/ganeswar-velvadapu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://github.com/ganeswar-velvadapu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://hardcover.app/ganeswar-velvadapu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Hardcover"
            >
              <Book size={22} /> 
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
