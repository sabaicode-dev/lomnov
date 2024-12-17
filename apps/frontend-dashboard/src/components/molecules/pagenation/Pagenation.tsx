
import React from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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
    <div className="w-full flex justify-between h-[67px] p-[10px] bg-BgSoftWhite/50">
      {/* Results Info */}
      <div className="flex items-center text-Black font-medium">
        <p>
          Showing {(currentPage - 1) * resultsPerPage + 1} to{" "}
          {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults} results
        </p>
      </div>

      {/* Results Per Page Selector */}
      <div className="flex items-center gap-[10px]">
        <button
          className="bg-BgSoftWhite px-[10px] py-[8px] flex items-center gap-[10px] rounded-sm font-medium"
          onClick={() =>
            onResultsPerPageChange(resultsPerPage === 10 ? 4 : 10) // Toggle between 4 and 10 items per page
          }
        >
          {resultsPerPage} <IoIosArrowDown className="font-medium" />
        </button>
        <p className="font-medium">per page</p>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-[4px]">
        {/* Previous Page */}
        <button
          className={`px-[16px] py-[8px] rounded-sm ${
            currentPage === 1
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
          className={`px-[16px] py-[8px] rounded-sm ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-Primary text-BgSoftWhite hover:bg-blue-600"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
