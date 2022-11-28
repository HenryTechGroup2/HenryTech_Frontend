import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsCarruzel from '../ProductsCarruzel/ProductsCarruzel';

const buttons = ['1', '2', '3', '4'];
const ProductsHome = ({ products }) => {
  const [transform, setTransform] = useState(58.3);
  const [select, setSelect] = useState(1);
  const handleClick = (evt) => {
    const { name } = evt.currentTarget;
    setTransform(58.3 * Number(name));
    setSelect(Number(name));
  };

  return (
    <div className='home__cards'>
      <ProductsCarruzel translate={transform} products={products} />
      <div className='home__buttons'>
        {buttons.map((btn) => (
          <button
            name={btn}
            className={`home__button ${
              Number(btn) === select ? 'home__select' : ''
            }`}
            onClick={handleClick}
          ></button>
        ))}
      </div>
    </div>
  );
};
export default ProductsHome;
