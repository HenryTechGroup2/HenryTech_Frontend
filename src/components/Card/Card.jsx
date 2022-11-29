import React from 'react';
import { Link } from 'react-router-dom';
import { stock as stockIcon, noStock } from '../../utils/Icons';
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite';
import Count from '../Count/Count';

const Card = ({ product, isFlex = false }) => {
  return (
    <article
      className={`product__article ${isFlex === true ? 'product__flex' : ''}`}
    >
      <div className='product__container'>
        <div className='product__favorit'>
          <span className='product__stock'>
            {product.stock.stock_amount > 0 ? (
              <div className='product__stock--icon'>{stockIcon} Stock</div>
            ) : (
              <div className='product__stock--icon'>{noStock} No Stock</div>
            )}
          </span>
          <ButtonFavorite product={product} />
        </div>
        <Link to={`/products/${product.product_id}`}>
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
          <h4 className='product__price'>
            Price: ${product.product_price}{' '}
            <span className='product__rating'>
              {'★'.repeat(product.product_rating).padEnd(5, '☆')}
            </span>
          </h4>
        </div>
        <Count product={product} />
      </div>
    </article>
  );
};

export default Card;
