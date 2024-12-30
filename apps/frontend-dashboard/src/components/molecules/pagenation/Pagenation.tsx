import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (newPage: number) => void;
  onResultsPerPageChange: (newLimit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
  onResultsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="w-full flex justify-between items-center h-[67px] p-[10px] bg-BgSoftWhite/50">
      {/* Results Info */}
      <div className="flex items-center text-Black font-medium">
        <p>
          Showing {(currentPage - 1) * resultsPerPage + 1} to{" "}
          {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults} results
        </p>
      </div>

      {/* Results Per Page Selector */}
      <div className="flex items-center gap-[10px]">
        <select
          id="results-per-page"
          className="max-w-16 w-full bg-BgSoftWhite border-none outline-none px-[10px] py-[8px] flex items-center gap-[10px] rounded-sm font-medium"
          value={resultsPerPage}
          onChange={(e) => onResultsPerPageChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
        </select>
        <p className="font-medium">per page</p>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-[4px]">
        {/* Previous Page */}
        <button
          className={`px-[16px] py-[8px] rounded-sm ${currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-Primary text-BgSoftWhite hover:bg-blue-600"
            }`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <IoIosArrowBack />
        </button>

        {/* Current Page Indicator */}
        <span className="px-[16px] py-[8px] bg-BgSoftWhite rounded-sm text-Primary">
          {currentPage}
        </span>

        {/* Next Page */}
        <button
          className={`px-[16px] py-[8px] rounded-sm ${currentPage === totalPages || totalResults === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-Primary text-BgSoftWhite hover:bg-Primary/80"
            }`}
          disabled={currentPage === totalPages || totalResults === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
