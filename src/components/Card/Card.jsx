import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_ALL_FAVORITES, WIDTH } from '../../redux/actions';
import { stock as stockIcon, noStock } from '../../utils/Icons';
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite';
import Count from '../Count/Count';

const Card = ({
  product,
  isFlex = false,
  ancho = false,
  alto = false,
  view = false,
}) => {
  const dispatch = useDispatch();

  dispatch({ type: ADD_ALL_FAVORITES });
  const divRef = useRef(null);
  const width = divRef === null ? 0 : divRef.current?.clientWidth / 16;
  useEffect(() => {
    dispatch({ type: WIDTH, payload: width });
    console.log(width);
  }, [divRef, dispatch, width]);

  return (
    <>
      {product.product_suspense === true ? null : (
        <article
          ref={divRef}
          className={`product__article ${
            isFlex === true ? 'product__flex' : ''
          }`}
          style={{ width: `${view ? '14em' : ''}` }}
        >
          <div className='product__container'>
            <div className='product__favorit'>
              <span className='product__stock'>
                {product.stock?.stock_amount > 0 ? (
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
                style={{
                  width: `${ancho ? `${ancho}em` : ''}`,
                  height: `${alto ? `${alto}em` : ''}`,
                }}
              />
            </Link>
            <div className='product__top'>
              <h4
                className='product__name'
                style={{
                  width: `${view ? '13em' : ''}`,
                  fontSize: `${view ? '.7em' : ''}`,
                }}
              >
                {product.product_name?.length > 70
                  ? `${product.product_name.slice(0, 40)}...`
                  : product.product_name}
              </h4>
            </div>
            <div className='product__bottom'>
              <h4
                className='product__price'
                style={{
                  width: `${view ? '14em' : ''}`,
                  fontSize: `${view ? '.7em' : ''}`,
                }}
              >
                {Number(product.product_price).toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}{' '}
                <span className='product__rating'>
                  {'★'.repeat(product.product_rating).padEnd(5, '☆')}
                </span>
              </h4>
            </div>
            <Count product={product} view={view} />
          </div>
        </article>
      )}
    </>
  );
};

export default Card;
