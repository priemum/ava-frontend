import React from "react";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  const elementStyle = `w-[30px] h-[30px] text-center m-auto flex justify-center items-center rounded text-[18px] cursor-pointer text-white font-bold`;
  return (
    <div className="flex justify-center items-center bg-black/50 rounded p-2 gap-x-2 my-4">
      <button
        disabled={currentPage == 1}
        className={`${elementStyle} ${currentPage == 1 && "text-white/20"}`}
        onClick={onPrevious}
      >
        <FaAngleLeft className="text-[20px]" />
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={elementStyle}>
              &#8230;
            </li>
          );
        }
        return (
          <button
            key={index}
            disabled={pageNumber == currentPage}
            className={`${elementStyle} ${
              pageNumber == currentPage && "bg-primary"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`${elementStyle} ${
          currentPage == lastPage && "text-white/20"
        }`}
        disabled={currentPage == lastPage}
        onClick={onNext}
      >
        <FaAngleRight className="text-[20px]" />
      </button>
    </div>
  );
};

export default Pagination;
