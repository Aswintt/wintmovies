import React from "react";

interface Props {
  count?: number; // default to 10 if not provided
}

const SUIMovieCard: React.FC<Props> = ({ count = 10 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md w-full max-w-xs animate-pulse"
        >
          {/* Image placeholder */}
          <div className="w-full h-64 bg-gray-700" />

          <div className="p-4 space-y-2">
            {/* Title placeholder */}
            <div className="h-5 bg-gray-600 rounded w-3/4" />
            {/* Rating placeholder */}
            <div className="h-4 bg-gray-600 rounded w-1/4" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SUIMovieCard;
