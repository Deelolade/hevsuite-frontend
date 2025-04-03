import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePrev = async () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNext = async () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className='flex items-center gap-4'>
        <FaChevronLeft
          className='cursor-pointer hover:text-primary'
          onClick={handlePrev}
        />
        <div>
          {currentPage > 0 ? currentPage : 1} &nbsp;/&nbsp;{' '}
          {totalPages > 0 ? totalPages : 1}
        </div>
        <FaChevronRight
          className='cursor-pointer hover:text-primary'
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Pagination;
