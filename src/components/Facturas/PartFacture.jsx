import React from 'react';

const PartFacture = ({ product }) => {
  const products = product.split(' ');
  const priceProduct = products[products.length - 2];
  const countProduct = products[0];
  products.pop();
  products.pop();
  products.shift();
  return (
    <div className='facturas__container'>
      <div className='facturas__item'>X{countProduct}</div>
      <div className='facturas__item'>{products.join(' ').slice(0, 50)}</div>
      <div className='facturas__item'>
        {Number(priceProduct).toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        })}
      </div>
    </div>
  );
};

export default PartFacture;
