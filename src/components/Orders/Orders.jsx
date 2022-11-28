import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByPrice, orderByRating } from '../../redux/actions';

export default function Orders() {
  let dispatch = useDispatch();

  let priceOnChange = (e) => {
    dispatch(orderByPrice(e.target.value));
  };

  function ratingOnChange(e) {
    dispatch(orderByRating(e.target.value));
  }

  return (
    <div className='order'>
      <h3 className='order__h3'>Ordena por precio:</h3>
      <select
        className='order__select'
        name='select'
        id='1'
        onChange={(e) => priceOnChange(e)}
      >
        <option className='order__option' value={'price max-min'}>
          Mayor a menor
        </option>
        <option className='order__option' value={'price min-max'}>
          Menor a mayor
        </option>
      </select>
      <h3 className='order__h3'>Ordena por calificacion:</h3>
      <select
        className='order__select'
        name='select'
        id='1'
        onChange={(e) => ratingOnChange(e)}
      >
        <option className='order__option' value={'rating max-min'}>
          Mejor calificados
        </option>
        <option className='order__option' value={'rating min-max'}>
          Peor calificados
        </option>
      </select>
    </div>
  );
}
