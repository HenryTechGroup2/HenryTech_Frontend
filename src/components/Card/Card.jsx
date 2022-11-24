import React from 'react';
import { Link } from 'react-router-dom';
import { cart, favorit, stock } from '../../utils/Icons';

const Card = ({ product, login }) => {
  console.log(login);
  const handleAddToCart = () => {};
  return (
    <article className='product__article'>
      <div className='product__container'>
        <div className='product__favorit'>{favorit}</div>
        <Link to={`/products/${product.id}`}>
          <img
            className='product__img'
            src={`${product.image}`}
            alt={product.title}
          />
        </Link>
        <div className='product__top'>
          <h4 className='product__name'>Nombre: {product.title}</h4>
        </div>
        <div className='product__bottom'>
          <h4 className='product__rating'>Puntuación: {product.rating.rate}</h4>
          <h4 className='product__category'>categoría: {product.category} </h4>
          <h4 className='product__price'>precio: {product.price}</h4>
        </div>
        {/* Si usuario está logeado y hay cantidad en el stock que se habilite el carrito de compra  de lo contrario que se deshabilite*/}
        {/* Cambiar el stock una vez sepa como llega del back  */}
        {/* <p>Stock:{props.stock.find(e=>e.title===props.title? e.stock:false)} </p> */}
        <p className='product__stock'>
          {stock} Stock: {product.stock}
        </p>
        <button
          onClick={handleAddToCart}
          className='product__button'
          type='submit'
          disabled={login === false ? true : false}
        >
          {cart}
          Agregar
        </button>
      </div>
    </article>
  );
};

export default Card;
