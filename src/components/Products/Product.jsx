import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

export default function Products({ page, productsPage }) {
  const { copieProducts: products, userlogin } = useSelector((state) => state);

  return (
    <section className='product'>
      {products.slice(page - productsPage, page).map((product) => (
        <Card key={product.product_id} product={product} login={userlogin} />
      ))}
      <div className='pagination'></div>
    </section>
  );
}
