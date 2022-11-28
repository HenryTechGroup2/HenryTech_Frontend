import React, { useState } from 'react';
import { useEffect } from 'react';
import Card from '../Card/Card';

const ProductsCarruzel = ({ translate, products }) => {
  const [direction, setDirection] = useState(translate);
  useEffect(() => {
    setDirection(translate);
    console.log(translate);
  }, [translate]);
  return (
    <div
      className='home__carruzel'
      style={{ transform: `translateX(-${direction}em)` }}
    >
      {products.map((product) => (
        <Card isFlex={true} key={product.product_id} product={product} />
      ))}
    </div>
  );
};
export default ProductsCarruzel;
