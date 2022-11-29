import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CAR_MODIFIER } from '../../redux/actions';

const CountCar = ({ product }) => {
  const [count, setCount] = useState(product.product_count);
  const dispatch = useDispatch();
  useEffect(() => {
    setCount(product.product_count);
  }, [product.product_count]);
  const handleClick = (name) => {
    if (name === 'suma') {
      setCount(count + 1);
      dispatch({
        type: CAR_MODIFIER,
        payload: {
          product,
          count: count + 1,
          add: true,
        },
      });
    } else {
      if (count - 1 < 0) return;
      setCount(count - 1);
      dispatch({
        type: CAR_MODIFIER,
        payload: {
          product,
          count: count - 1,
          add: false,
        },
      });
    }
  };
  return (
    <div className='details__count'>
      <button className='car__button' onClick={() => handleClick()}>
        -
      </button>
      <span className='car__count'>{count}</span>
      <button
        className='car__button'
        name='suma'
        onClick={() => handleClick('suma')}
      >
        +
      </button>
    </div>
  );
};

export default CountCar;
