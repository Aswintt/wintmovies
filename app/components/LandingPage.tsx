"use client";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "🔥 Popular",
    description: "Browse the most popular movies right now.",
    href: "/popular",
    bg: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
  },
  {
    title: "🚀 Upcoming",
    description: "See what's hitting theaters soon.",
    href: "/upcoming",
    bg: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
  },
  {
    title: "🌟 Top Rated",
    description: "Explore the highest-rated movies of all time.",
    href: "/toprated",
    bg: "bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500",
  },
];

const LandingPage = () => {
  return (
    <section className=" bg-[#121212] text-white py-20 px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
          🎬 Welcome to WintMovies
        </h1>
        <p className="text-gray-300 mb-12 text-lg">
          Discover movies by category and dive into detailed insights.
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 ${cat.bg}`}
            >
              <h2 className="text-2xl font-bold mb-2 text-black">
                {cat.title}
              </h2>
              <p className="text-sm text-black">{cat.description}</p>
              <div className="flex justify-end mt-4">
                <ArrowRight className="text-black" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
