import React from 'react';
import { useSelector } from 'react-redux';

const Payment = () => {
  const { userDates } = useSelector((state) => state);
  return (
    <div className='payment'>
      <h3 className='payment__h3'>Tus datos</h3>
      <div className='payment__dates'>
        <p className='payment__name'>
          <span className='payment__span'>Nombre </span>:{'  '}{' '}
          {userDates.user_name}
        </p>
        <p className='payment__shipping'>
          <span className='payment__span'>Shipping</span>:{'  '}
          {userDates.user_shipping_address}
        </p>
      </div>
    </div>
  );
};

export default Payment;
