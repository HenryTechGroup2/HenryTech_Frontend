import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductCar } from '../../redux/actionsCar';
import { deleteElement } from '../../utils/Icons';
import CountCar from '../CountCar/CountCar';

const CardCar = ({ product }) => {
  //Elimina un producto del carrito dependiendo el idCar que le pasamos
  const dispatch = useDispatch();
  const handleDeleteProductToCar = () => {
    dispatch(deleteProductCar(product));
  };

  return (
    <div className='car__container' key={product.idCar}>
      <img
        className='car__img'
        src={product.product_img}
        alt={product.product_name}
      />
      <div className='car__description'>
        <div className='car__product'>
          <CountCar product={product} />
          <button className='car__btn' onClick={handleDeleteProductToCar}>
            {deleteElement}
          </button>
        </div>
        <p>${product.product_price}</p>
      </div>
    </div>
  );
};

export default CardCar;
