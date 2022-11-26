import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CAR_MODIFIER } from '../../redux/actions';

const CountCar = ({ product }) => {
  const [count, setCount] = useState(product.product_count);
  const dispatch = useDispatch();
  const handleClick = (name) => {
    if (name === 'suma') {
      setCount(count + 1);
      console.log('object');
      dispatch({
        type: CAR_MODIFIER,
        payload: {
          product,
          count: count + 1,
          add: true,
        },
      });
    } else {
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
      <button className='details__button' onClick={() => handleClick()}>
        -
      </button>
      <span className='details__span'>{count}</span>
      <button
        className='details__button'
        name='suma'
        onClick={() => handleClick('suma')}
      >
        +
      </button>
    </div>
  );
};

export default CountCar;
