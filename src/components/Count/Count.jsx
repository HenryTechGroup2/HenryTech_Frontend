import React from 'react';
import { useDispatch } from 'react-redux';
import useCount from '../../hooks/useCount';
import { ADD_TO_CART } from '../../redux/actionsCar';
import { cart } from '../../utils/Icons';

const Count = ({ product_count = 1, product }) => {
  const { count, handleClick } = useCount(product_count);
  const dispatch = useDispatch();
  const handleClickAddToCar = () => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product,
        count,
      },
    });
  };
  return (
    <div className='details__count'>
      <button className='details__button' onClick={handleClick}>
        -
      </button>
      <div className='count__div'>
        <div className='count__span'>{count}</div>
      </div>
      <button className='details__button' name='suma' onClick={handleClick}>
        +
      </button>
      <button
        onClick={handleClickAddToCar}
        className='product__button'
        // disabled={login === false ? true : false}
      >
        {cart}
        Agregar
      </button>
    </div>
  );
};

export default Count;
