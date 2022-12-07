import React from 'react';
import { useSelector } from 'react-redux';

export function Pagination({ handleClick, next, prev, actualPage }) {
  const { copieProducts } = useSelector((state) => state);
  const countButtons = [];
  for (let i = 1; i <= Math.ceil(copieProducts.length / 16); i++) {
    countButtons.push(i);
  }
  return (
    <div className='pagination__container'>
      <div className='pagination__div'>
        <button className='pagination__button' onClick={prev}>
          Prev
        </button>
        <div className='pagination__div'>
          {countButtons.map((btn) => (
            <button
              style={{
                background: `${actualPage === btn ? '#fff' : ''}`,
                color: `${actualPage === btn ? '#000' : '#fff'}`,
              }}
              name={btn}
              className='pagination__button'
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
        <button className='pagination__button' onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
