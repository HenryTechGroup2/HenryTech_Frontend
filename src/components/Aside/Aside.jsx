import React from 'react';
import Orders from '../Orders/Orders';
import Filters from '../Filters/Filters.jsx';
const Aside = () => {
  return (
    <div className='aside'>
      <div className='aside__container'>
        <Orders />
        <Filters />
      </div>
    </div>
  );
};

export default Aside;
