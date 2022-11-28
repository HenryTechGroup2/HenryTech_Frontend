import React from 'react';
import Orders from '../Orders/Orders';
import Filters from '../Filters/Filters.jsx';
const Aside = () => {
  return (
    <div className='aside'>
      <Filters />
      <Orders />
    </div>
  );
};

export default Aside;
