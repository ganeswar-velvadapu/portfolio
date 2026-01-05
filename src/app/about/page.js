"use client";
import React from "react";
import { Code, Briefcase, Award, GraduationCap } from "lucide-react";
import personalData from "../../../public/personalData.json";
import { Download } from "lucide-react";

const AboutPage = () => {
  const { education, experience, positions, skills, achievements } =
    personalData;

  return (
    <div className="min-h-screen bg-zinc-900 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Education Section */}
        <section className="mb-16 mt-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white">
              Education
            </h2>
          </div>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {edu.degree}
                  </h3>
                  <span className="text-sm sm:text-base text-gray-400">
                    {edu.year}
                  </span>
                </div>
                <p className="text-base text-gray-300 mb-1">
                  {edu.institution}
                </p>
                <p className="text-sm text-gray-400">
                  CGPA/Marks:{" "}
                  <span className="text-white font-semibold">{edu.cgpa}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Briefcase className="text-white" size={28} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Work Experience
            </h2>
          </div>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-base text-gray-300">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm sm:text-base text-gray-400 pl-4 border-l-2 border-gray-600"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Positions of Responsibility */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Award className="text-white" size={28} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Leadership & Positions
            </h2>
          </div>
          <div className="space-y-4">
            {positions.map((pos, index) => (
              <div
                key={index}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {pos.title}
                </h3>
                <p className="text-base text-gray-300 mb-3">{pos.org}</p>
                <ul className="space-y-2">
                  {pos.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm sm:text-base text-gray-400 pl-4 border-l-2 border-gray-600"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Code className="text-white" size={28} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Technical Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-full text-gray-300 hover:bg-white/15 hover:text-white transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievement */}
        <section>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Award className="text-white" size={28} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Achievements
            </h2>
          </div>
          {achievements.map((achievement, index) => {
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-lg p-6 sm:p-8"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-base text-gray-300 mb-2">
                  {achievement.organization}
                </p>
                <p className="text-sm sm:text-base text-gray-400">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </section>
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              window.open("/cv.pdf", "_blank");
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-300 group cursor-pointer"
          >
            Download Resume
            <Download
              size={16}
              className="group-hover:translate-y-1 transition-transform duration-300 "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
