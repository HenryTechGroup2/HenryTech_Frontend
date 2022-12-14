import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useCount from '../../hooks/useCount';
import { ADD_TO_CART } from '../../redux/actionsCar';
import { cart } from '../../utils/Icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Count = ({ product_count = 1, product, view = false }) => {
  const { count, handleClick } = useCount(product_count);
  const dispatch = useDispatch();
  const [wind, setWind] = useState(document.documentElement.clientWidth);
  const handleClickAddToCar = () => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product,
        count,
      },
    });
    toast.success(`Add to car`, {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };
  window.addEventListener('resize', () =>
    setWind(document.documentElement.clientWidth)
  );
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
        disabled={product?.stock?.stock_amount > 0 ? false : true}
      >
        {cart}
        {wind <= 950 ? null : view ? '' : 'Agregar'}
      </button>
    </div>
  );
};

export default Count;
