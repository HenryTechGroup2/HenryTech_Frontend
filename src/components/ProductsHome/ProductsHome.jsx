import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsCarruzel from '../ProductsCarruzel/ProductsCarruzel';

const ProductsHome = ({ products }) => {
  const { width } = useSelector((state) => state);
  const [transform, setTransform] = useState(0);
  const [select, setSelect] = useState(1);
  const [wind, setWind] = useState(document.documentElement.clientWidth);
  window.addEventListener('resize', () =>
    setWind(document.documentElement.clientWidth)
  );
  const handleClick = (evt) => {
    const { name } = evt.currentTarget;
    if (Number(name) === 1) {
      setSelect(Number(name));
      return setTransform(0);
    }
    const WIDTH = width + 1.2;
    const widths = WIDTH * (wind <= 600 ? 2 : 3);
    setTransform(widths * (Number(name) - 1));
    setSelect(Number(name));
  };
  let buttons = [];
  // const sobra = wind <= 600 ? products.length % 2 : products.length % 3;
  //TODO SI QUIERO QUE NO ME MUESTRE VACIOS EN EL CARRUZEL COLOCAR EL PRODUCTS.LENGTH - SOBRA Y LISTO
  for (
    let i = 1;
    i <= Math.ceil(products.length / (wind <= 600 ? 2 : 3));
    i++
  ) {
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
