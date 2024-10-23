import React from 'react';

const Pagination = ({ totalPages = 3, currentPage = 1, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          } hover:bg-blue-300 transition duration-300`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;