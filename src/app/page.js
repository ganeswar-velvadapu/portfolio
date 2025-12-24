"use client";

import React, { useEffect, useState } from "react";
import HomeAbout from "@/components/homecomponents/HomeAbout";
import Homeblogs from "@/components/homecomponents/Homeblogs";
import HomeHero from "@/components/homecomponents/HomeHero";
import HomeProjects from "@/components/homecomponents/HomeProjects";
import ScrollRevealName from "@/components/homecomponents/ScrollReval";

export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);

  const roles = [
    "Cybersecurity Enthusiast",
    "DevOps Practitioner",
    "Backend Developer",
  ];

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseAfterTyping = 1000;

  useEffect(() => {
    const current = roles[loopIndex % roles.length];

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && text === current) {
      delay = pauseAfterTyping;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setIsDeleting(true);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopIndex]);

  const [weeks, setWeeks] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchContributions = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN;
      const username = "ganeswar-velvadapu";

      const now = new Date();
      const isCurrentYear = year === now.getFullYear();

      const from = `${year}-01-01T00:00:00Z`;
      const to = isCurrentYear ? now.toISOString() : `${year}-12-31T23:59:59Z`;

      const query = `
  query {
    user(login: "${username}") {
      contributionsCollection(from: "${from}", to: "${to}") {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const json = await res.json();
      const calendar =
        json.data.user.contributionsCollection.contributionCalendar;

      setWeeks(calendar.weeks);
      setTotalContributions(calendar.totalContributions);
    };

    fetchContributions();
  }, [year]);

  const getColorClass = (count) => {
    if (count === 0) return "gh-0";
    if (count < 5) return "gh-1";
    if (count < 10) return "gh-2";
    if (count < 20) return "gh-3";
    return "gh-4";
  };

  return (
    <div className="bg-zinc-900 text-white">
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6">
        <ScrollRevealName />
        <HomeHero text={text} />
        <HomeAbout />
      </section>

      <HomeProjects />
      <Homeblogs />

      {/* GitHub Contributions */}
      <div className="px-6 py-24">
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">GitHub Contributions</h2>
            <p className="text-sm text-zinc-400">
              {totalContributions} contributions in {year}
            </p>
          </div>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1 text-sm"
          >
            {[...Array(6)].map((_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div>

        <div className="overflow-x-auto">
          <div className="flex justify-center min-w-max">
            <table className="gh-table">
              <tbody>
                {Array.from({ length: 7 }).map((_, day) => (
                  <tr key={day}>
                    {weeks.map((week, i) => {
                      const d = week.contributionDays[day];
                      const count = d ? d.contributionCount : 0;

                      return (
                        <td
                          key={i}
                          className={`gh-cell ${getColorClass(count)}`}
                          title={`${count} contributions`}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
