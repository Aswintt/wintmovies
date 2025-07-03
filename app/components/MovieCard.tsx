import React from "react";

interface Card {
  title: string;
  rating: number;
  posterUrl: string;
}

const MovieCard: React.FC<Card> = ({ title, rating, posterUrl }) => {
  return (
    <div className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md w-full max-w-xs transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={posterUrl}
        alt={`${title} Poster wintmovies`}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-white text-lg font-semibold truncate">{title}</h3>

        <div className="flex items-center gap-2 text-yellow-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431L24 9.748l-6 5.843L19.335 24 12 20.01 4.665 24 6 15.591 0 9.748l8.332-1.73z" />
          </svg>
          <span className="text-sm font-medium">
            {Math.round(rating * 10) / 10}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
