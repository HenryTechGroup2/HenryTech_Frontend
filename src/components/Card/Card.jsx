import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { favorit, stock, notFavorit } from '../../utils/Icons';
import Count from '../Count/Count';

const Card = ({ product, isFlex = false }) => {
  const [favoritState, setFavoritState] = useState(false);
  const handleAddFavorit = (evt) => {
    evt.stopPropagation();
    console.log('first');
    setFavoritState(!favoritState);
  };
  return (
    <article
      className={`product__article ${isFlex === true ? 'product__flex' : ''}`}
    >
      <div className='product__container'>
        <div className='product__favorit'>
          <span className='product__stock'>{stock} Stock</span>
          <button className='product__btn' onClick={handleAddFavorit}>
            {favoritState ? notFavorit : favorit}
          </button>{' '}
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
