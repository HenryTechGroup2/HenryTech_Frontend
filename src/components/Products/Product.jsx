import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions';
import Card from '../Card/Card';
export default function Products() {
  const dispatch = useDispatch();
  const { reducerFetch } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  // action para llamar al stock de los productos y que se guarden en el estado globar stockProducts

  return (
    <section className='product'>
      {reducerFetch.products.map((product) => (
        <Card
          key={product.product_id}
          product={product}
          login={reducerFetch.userlogin}
        />
      ))}
    </section>
  );
}
