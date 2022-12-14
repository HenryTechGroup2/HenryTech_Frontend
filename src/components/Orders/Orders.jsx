import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { orderSelect } from '../../redux/actions';

const selects = [
  'mayor-precio',
  'menor-precio',
  'mayor-puntuacion',
  'menor-puntuacion',
  'mas-visto',
  'menos-visto',
];
export default function Orders() {
  let dispatch = useDispatch();
  const divRef = useRef(null);
  function handleClickChangeOrder(order) {
    dispatch(orderSelect(order));
  }
  const handleSelect = () => {
    divRef.current.classList.toggle('order__toggle');
  };
  return (
    <div className='order'>
      <div className='order__container'>
        ORDENA TUS PRODUCTOS{' '}
        <div onClick={handleSelect}>
          <img className='order__img' src='../assets/drop.png' alt='' />
        </div>
      </div>
      <div className='order__div' ref={divRef}>
        {selects.map((order) => (
          <div
            onClick={() => handleClickChangeOrder(order)}
            className='order__order'
          >
            {order.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
