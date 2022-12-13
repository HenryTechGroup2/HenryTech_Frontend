import React from 'react';
import Orders from '../Orders/Orders';
import Filters from '../Filters/Filters.jsx';
const Aside = ({ filterRef, handleClickPage }) => {
  return (
    <div className='aside' ref={filterRef}>
      <div className='aside__container'>
        <Orders />
        <Filters handleClickPage={handleClickPage} />
      </div>
    </div>
  );
};

export default Aside;
