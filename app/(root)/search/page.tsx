import MovieCard from "@/app/components/MovieCard";
import SUIMovieCard from "@/app/components/ShimmerUi/SUIMovieCard";
import React from "react";

const searchMoive = () => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <MovieCard
          title="Thunderbolts"
          rating={7.5}
          posterUrl="https://cinemahubs.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F%2FhBH50Mkcrc4m8x73CovLmY7vBx1.jpg&w=1920&q=100"
        />
        {/* {Array.from({ length: 10 }).map((_, i) => (
          <SUIMovieCard key={i} />
        ))} */}
      </div>
    </div>
  );
};

export default searchMoive;
