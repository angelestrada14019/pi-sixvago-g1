import React,{useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import './paginationControll.css';
const PaginationControll = ({pageCount,changePage}) => {    
    
  return (
    <>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        forcePage={0}
      />
    </>
  );
};

export default PaginationControll;
