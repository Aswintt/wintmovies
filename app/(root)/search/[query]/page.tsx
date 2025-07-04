"use client";
import MovieCard from "@/app/components/MovieCard";
import SUIMovieCard from "@/app/components/ShimmerUi/SUIMovieCard";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Pagination from "@/app/components/Pagination";
import NotFound from "@/app/components/NotFound";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const searchMoive = () => {
  const params = useParams();
  const rawQuery = params.query;
  const query =
    typeof rawQuery === "string" ? decodeURIComponent(rawQuery) : "";

  // console.log(query);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allmovies, setAllMoives] = useState<any | null>(null);
  const fetchAllMovies = async () => {
    // console.log(page);
    const SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`;
    try {
      const res = await fetch(SEARCH);
      const data = await res.json();
      setAllMoives(data?.results);
      setTotalPages(data?.total_pages);
    } catch (error) {
      console.error("Error in search", error);
    }
  };
  useEffect(() => {
    fetchAllMovies();
  }, [page, query]);

  // if (!allmovies || allmovies.success === false) {
  //   return <NotFound text="Search movies not found." />;
  // }
  return (
    <>
      <h3 className="text-2xl md:text-3xl text-yellow-400 tracking-wide uppercase border-b border-yellow-400 inline-block">
        Showing search results for {decodeURIComponent(query)}
      </h3>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {!allmovies ? (
          // Loading state
          <SUIMovieCard />
        ) : allmovies.length === 0 ? (
          // No movies found
          <p className="text-white">No Movies Found</p>
        ) : (
          // map movie cards
          allmovies.map((movie: any) => (
            <MovieCard
              key={movie?.id}
              id={movie?.id}
              title={movie?.original_title}
              rating={movie?.vote_average || 0}
              posterUrl={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            />
          ))
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default searchMoive;
