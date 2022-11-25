import React from 'react';
import { useSelector } from 'react-redux';
import CardCar from '../components/CardCar/CardCar';
import Header from '../components/Header/Header';

const Car = () => {
  const { reducerCar } = useSelector((state) => state);
  console.log(reducerCar.car);
  const priceTotal = reducerCar.car.reduce(
    (a, b) => Number(a) + Number(b.product_price),
    0
  );

  return (
    <div>
      <Header />
      <div className='car'>
        <div className='car__map'>
          {reducerCar.car.map((product) => (
            <CardCar product={product} />
          ))}
        </div>
        <div className='car__total'>Total:${priceTotal}.00</div>
      </div>
    </div>
  );
};

export default Car;
