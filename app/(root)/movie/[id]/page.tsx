"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NotFound from "@/app/components/NotFound";
import Credits from "@/app/components/Credits";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
interface Genre {
  id: number;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface MovieDetailsType {
  title: string;
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  production_companies: ProductionCompany[];
  spoken_languages: Language[];
  original_language: string;
  budget: number;
  revenue: number;
  status: string;
}

const MovieDetails = () => {
  const params = useParams() as { id?: string };
  const id = params.id ?? null;
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      const MOVIEDETAILS_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

      try {
        const res = await fetch(MOVIEDETAILS_URL);
        const data = await res.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <NotFound text="Loading movie details..." />;
  }

  if (!movieDetails) {
    return <NotFound text="This movie not found." />;
  }
  const {
    title,
    tagline,
    overview,
    release_date,
    runtime,
    genres = [],
    vote_average,
    vote_count,
    poster_path,
    backdrop_path,
    production_companies = [],
    spoken_languages = [],
    original_language,
    budget,
    revenue,
    status,
  } = movieDetails;

  return (
    <>
      <section className="bg-[#121212] text-white min-h-screen">
        {/* Backdrop */}
        {backdrop_path && (
          <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
              alt={`${title} backdrop`}
              layout="fill"
              objectFit="cover"
              className="opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#121212]" />
          </div>
        )}

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 -mt-40 md:-mt-64 relative z-10">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center md:justify-start">
            {poster_path ? (
              <div className="w-56 h-auto shadow-lg rounded-md overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={`${title} poster`}
                  width={500}
                  height={750}
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="w-56 h-[336px] flex items-center justify-center bg-gray-800 text-gray-400 rounded-md">
                No Image
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
              {title}
            </h1>
            {tagline && <p className="italic text-gray-400">{tagline}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mt-2">
              <span>📅 {release_date}</span>
              <span>⏱️ {runtime} min</span>
              <span>🎯 {status}</span>
              <span>🗣️ {spoken_languages[0]?.english_name || "N/A"}</span>
              <span>🧾 Lang: {original_language?.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-2 text-yellow-400 font-semibold mt-1">
              ⭐ {vote_average?.toFixed(1)}{" "}
              <span className="text-gray-400 text-sm">
                ({vote_count?.toLocaleString()} votes)
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-200 leading-relaxed text-sm md:text-base mt-2">
              {overview}
            </p>

            {/* Financials & Studio Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-300">
              <div>
                <span className="font-semibold text-white">🎬 Studio:</span>{" "}
                {production_companies[0]?.name || "N/A"}
              </div>
              <div>
                <span className="font-semibold text-white">💸 Budget:</span> $
                {budget?.toLocaleString()}
              </div>
              <div>
                <span className="font-semibold text-white">💰 Revenue:</span> $
                {revenue?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Credits Movieid={id} />
    </>
  );
};

export default MovieDetails;
