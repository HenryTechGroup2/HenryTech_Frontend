import React from 'react';
import Orders from '../Orders/Orders';
import Filters from '../Filters/Filters.jsx';
const Aside = () => {
  return (
    <div className='aside' style={{ position: 'relative', zIndex: '50' }}>
      <Filters />
      <Orders />
    </div>
  );
};

export default Aside;
