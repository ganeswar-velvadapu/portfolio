'use client'
import React from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import projectsData from '../../../public/projectsData.json'; // Adjust path as needed
import Link from 'next/link';


const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 mt-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-white text-center lg:text-left">
            My Projects
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-400 mb-6 mx-auto lg:mx-0"></div>
        </div>

         {/* Empty State (if no projects) */}
        {projectsData.projects.length === 0 && (
          <div className="text-center py-16">
            <Code2 size={64} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects yet</h3>
            <p className="text-gray-500">Check back soon for exciting projects!</p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 sm:p-8 transition-all duration-300 group flex flex-col"
            >
              {/* Project Icon/Number */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <Code2 size={24} className="text-white" />
                </div>
              </div>

              {/* Project Name */}
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors">
                {project.name}
              </h3>

              {/* Project Description */}
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Technologies (if available) */}
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 group/link"
                >
                  <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                  <span>Source Code</span>
                </a>
                
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 group/link"
                  >
                    <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

       

        {/* Footer Note */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-block bg-white/5 border border-white/10 rounded-lg px-6 py-4">
            <p className="text-sm sm:text-base text-gray-400">
              Want to collaborate on a project? 
              <Link href="/contact" className="text-white font-semibold hover:underline ml-1">
                Let's talk!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;