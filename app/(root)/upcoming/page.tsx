"use client";
import MovieCard from "@/app/components/MovieCard";
import NotFound from "@/app/components/NotFound";
import Pagination from "@/app/components/Pagination";
import SUIMovieCard from "@/app/components/ShimmerUi/SUIMovieCard";
import React, { useEffect, useState } from "react";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Upcoming = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allmovies, setAllMoives] = useState<any | null>(null);

  const fetchAllMovies = async () => {
    // console.log(page);
    const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
    try {
      const res = await fetch(UPCOMING);
      const data = await res.json();
      setAllMoives(data?.results);
      setTotalPages(data?.total_pages);
    } catch (error) {
      console.error("Error in Upcoming", error);
    }
  };
  useEffect(() => {
    fetchAllMovies();
  }, [page]);

  // if (!allmovies || allmovies.success === false) {
  //   return <NotFound text="Upcoming movies not found." />;
  // }

  return (
    <>
      <h3 className="text-2xl md:text-3xl font-extrabold text-yellow-400 tracking-wide uppercase border-b border-yellow-400 inline-block">
        Upcoming
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

export default Upcoming;
