import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-6 text-white">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Prev
      </button>

      <div className="text-sm md:text-base font-semibold">
        Page <span className="text-yellow-400">{page}</span> of{" "}
        <span className="text-yellow-400">{totalPages}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
