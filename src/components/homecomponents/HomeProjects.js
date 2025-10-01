"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import projectsData from "../../../public/projectsData.json"


const HomeProjects = () => {
  const projects = projectsData.projects.slice(0, 3);
  return (
    <div className="bg-zinc-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="md:flex-1 max-w-full lg:max-w-6xl w-full mx-auto">
          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white text-center lg:text-left px-2">
            Projects
          </h2>

          {/* Divider */}
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-400 mb-8 sm:mb-12 mx-auto lg:mx-0"></div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300 group"
              >
                {/* Project Name */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors">
                  {project.name}
                </h3>

                {/* Project Description */}
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 ">
                  {project.description}
                </p>

                {/* GitHub Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start px-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-full text-sm sm:text-base md:text-lg font-medium text-white transition-all duration-300 group"
            >
              View All Projects
              <ArrowRight
                size={18}
                className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProjects;
