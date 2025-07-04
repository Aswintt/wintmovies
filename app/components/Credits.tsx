"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SUIMovieCard from "./ShimmerUi/SUIMovieCard";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface ID {
  Movieid: string | null;
}
const Credits: React.FC<ID> = ({ Movieid }) => {
  const [credits, setCredits] = useState<any[]>([]);

  useEffect(() => {
    const fetchCredits = async () => {
      const CREDITS_URL = `https://api.themoviedb.org/3/movie/${Movieid}/credits?api_key=${API_KEY}&language=en-US`;
      try {
        const res = await fetch(CREDITS_URL);
        const data = await res.json();
        setCredits(data.cast);
      } catch (error) {
        console.log("Credits error", error);
      }
    };
    if (Movieid) fetchCredits();
  }, [Movieid]);
  // if (!credits || credits.length === 0) {
  //   return <SUIMovieCard />;
  // }

  return (
    <section className="bg-[#121212] text-white py-10 px-4">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 max-w-6xl mx-auto">
        Top Cast
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {!credits || credits.length === 0 ? (
          <SUIMovieCard />
        ) : (
          credits.map((actor: any) => (
            <div
              key={actor.id}
              className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="relative w-full h-64">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-sm text-gray-300">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-3 text-center space-y-1">
                <h3 className="text-md font-semibold text-white truncate">
                  {actor.name}
                </h3>
                <p className="text-sm text-yellow-500 truncate">
                  as {actor.character}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Credits;
