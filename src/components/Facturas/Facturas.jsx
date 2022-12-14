import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardFactura from './CardFactura';

const Facturas = ({ handleCLoseLeftDiv }) => {
  const { userDates } = useSelector((state) => state);
  const [view, setView] = useState(null);
  const handleOpenFactura = (index) => {
    handleCLoseLeftDiv();
    if (view === index) return setView(null);
    setView(index);
  };
  return (
    <div className='facturas'>
      {userDates?.invoices.map((item, index) => (
        <CardFactura
          item={item}
          handleOpenFactura={handleOpenFactura}
          open={view === index ? true : null}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};

export default Facturas;
