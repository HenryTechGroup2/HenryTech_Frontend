import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCar } from '../../redux/actionsCar';
import { cart, favorit, stock } from '../../utils/Icons';

const Card = ({ product, login }) => {
  console.log(login);
  // product_name,
  //   product_description,
  //   product_price,
  //   product_ofer,
  //   product_stock,
  //   product_rating,
  //   product_category,
  //   product_img,
  //   product_array_img,
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCar(product));
  };
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
          <h4 className='product__name'>Nombre: {product.product_name}</h4>
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

        <button
          onClick={handleAddToCart}
          className='product__button'
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
