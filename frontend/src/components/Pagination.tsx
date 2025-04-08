import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        Previous
      </button>

      <span className="pagination-text">
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        className="pagination-button"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={handleNext}
      >
        Next
      </button>

      <select
        className="pagination-select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>

      <style react-jsx>{`
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 20px;
        }

        .pagination-button {
          padding: 8px 12px;
          border: none;
          background-color: #228ee5;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-text {
          color: #ebfaff;
          font-size: 14px;
        }

        .pagination-select {
          background-color: #2a2a2a;
          color: white;
          border: 1px solid #555;
          padding: 6px 10px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Pagination;
