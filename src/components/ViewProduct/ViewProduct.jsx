import React from 'react';

const ViewProduct = ({ product, handleClick }) => {
  return (
    <div className='post__view'>
      <div className='post__names'>
        <div className='post__contain'>
          <div className='post__div--x'>Nombre</div>:{product.product_name}
        </div>
        <div className='post__contain'>
          <div className='post__div--x'>Precio</div>:{product.product_price}
        </div>
        <div className='post__contain'>
          <div className='post__div--x'>Cantidad</div>:{product.product_stock}
        </div>
      </div>
      <div className='post__mid'>
        <div className='post__flexx'>
          <div className='post__alldiv'>
            {product?.product_array_img?.map((image) => (
              <img
                className='post__allimages'
                src={image}
                alt={image}
                loading='lazy'
              />
            ))}
          </div>
          <div>
            <img
              className='post__img'
              src={product.product_img}
              alt={product.product_name}
            />
          </div>
        </div>
      </div>

      <div className='post__button'>
        <button className='post__btn' onClick={() => handleClick(0)}>
          VOLVER
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
