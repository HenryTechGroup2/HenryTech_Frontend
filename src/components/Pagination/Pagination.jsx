import React from 'react';
import { useSelector } from 'react-redux';

export function Pagination({ paginado, actualPage, next, prev }) {
  const products = useSelector((state) => state.products);
  const productsPage = 16;
  const numberPage = Math.ceil(products.length / productsPage);
  return (
    <div className='pagination__container'>
      <div className='pagination__div'>
        <button className='pagination__button' onClick={prev}>
          Prev
        </button>
        <button
          className='pagination__button'
          onClick={() => paginado(actualPage)}
        >
          {actualPage}
        </button>
        <button className='pagination__button' onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
