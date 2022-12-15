import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

export default function Products({ page, productsPage }) {
  const { copieProducts: products, userlogin } = useSelector((state) => state);
  const pageRest = page;
  page = page === 16 ? page + 1 : page;
  return (
    <section className='product'>
      {products.slice(pageRest - productsPage, page).map((product) => (
        <Card key={product.product_id} product={product} login={userlogin} />
      ))}
      <div className='pagination'></div>
    </section>
  );
}
