import React, { useState } from 'react';
import ProductsCarruzel from '../ProductsCarruzel/ProductsCarruzel';

const ProductsHome = ({ products }) => {
  const [transform, setTransform] = useState(0);
  const [select, setSelect] = useState(1);
  const handleClick = (evt) => {
    const { name } = evt.currentTarget;
    if (Number(name) === 1) {
      setSelect(Number(name));
      return setTransform(0);
    }
    setTransform(58.3 * (Number(name) - 1));
    setSelect(Number(name));
  };
  let buttons = [];
  const sobra = products.length % 3;
  for (let i = 1; i <= Math.ceil((products.length - sobra) / 3); i++) {
    buttons.push(i);
  }
  return (
    <div className='home__cards'>
      <ProductsCarruzel translate={transform} products={products} />
      <div className='home__buttons'>
        {buttons.map((btn) => (
          <button
            key={btn}
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
