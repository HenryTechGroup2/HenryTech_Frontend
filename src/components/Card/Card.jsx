import React from 'react';
import { Link } from 'react-router-dom';
import useCount from '../../hooks/useCount';
import { favorit, stock } from '../../utils/Icons';
import Count from '../Count/Count';

const Card = ({ product }) => {
  useCount();

  return (
    <article className='product__article'>
      <div className='product__container'>
        <div className='product__favorit'>
          <span className='product__stock'>{stock} Stock</span>
          <span>{favorit}</span>{' '}
        </div>
        <Link to={`/products/${product.product_id}`}>
          <div className='product__favorit'>{favorit}</div>

          <img
            className='product__img'
            src={`${product.product_img}`}
            alt={product.product_name}
          />
        </Link>
        <div className='product__top'>
          <h4 className='product__name'>
            {product.product_name.length > 70
              ? `${product.product_name.slice(0, 70)}...`
              : product.product_name}
          </h4>
        </div>
        <div className='product__bottom'>
          {/* <h4 className='product__category'>
            Category: {product.product_category}
            {'     '}
          </h4> */}
          <h4 className='product__price'>
            Price: ${product.product_price}{' '}
            <span className='product__rating'>
              {'★'.repeat(product.product_rating).padEnd(5, '☆')}
            </span>
          </h4>
        </div>
        {/* Si usuario está logeado y hay cantidad en el stock que se habilite el carrito de compra  de lo contrario que se deshabilite*/}
        {/* Cambiar el stock una vez sepa como llega del back  */}
        {/* <p>Stock:{props.stock.find(e=>e.title===props.title? e.stock:false)} </p> */}
        <Count product={product} />
      </div>
    </article>
  );
};

export default Card;
