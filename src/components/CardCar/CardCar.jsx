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
      <img className='car__img' src={product.product_img} alt='' />
      <div className='car__description'>
        <p className='car__p'>{product.product_name}</p>
        <CountCar product={product} />
        <p>Price: ${product.product_price}</p>
      </div>
      <button className='car__button' onClick={handleDeleteProductToCar}>
        {deleteElement}
      </button>
    </div>
  );
};

export default CardCar;
