import React from 'react';
import { useSelector } from 'react-redux';
import CardCar from '../components/CardCar/CardCar';
import Header from '../components/Header/Header';
import useUser from '../hooks/useUser';

const Car = () => {
  const { car, priceTotal } = useSelector((state) => state);

  // useUser();
  return (
    <div>
      <Header />
      <div className='car'>
        <div className='car__map'>
          {car.map((product) => (
            <CardCar key={product.product_id} product={product} />
          ))}
        </div>
        <div className='car__total'>Total:${priceTotal}.00</div>
      </div>
    </div>
  );
};

export default Car;
