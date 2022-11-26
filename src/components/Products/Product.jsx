import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination.jsx';
import { useState } from 'react';

export default function Products() {
  const dispatch = useDispatch();
  const { copieProducts: products, userlogin } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  // action para llamar al stock de los productos y que se guarden en el estado globar stockProducts

  const [actualPage, setActualPage] = useState(1);
  const productsPage = 16;
  const page = actualPage * productsPage;
  const productsforPage = products.slice(page - productsPage, page);

  function pag(number) {
    setActualPage(number);
  }

  function next() {
    const numberPage = Math.ceil(products.length / productsPage);
    if (actualPage !== numberPage) {
      setActualPage(actualPage + 1);
    }
  }
  function prev() {
    if (actualPage !== 1) {
      setActualPage(actualPage - 1);
    }
  }

  return (
    <section className='product'>
      {products.slice(0, 17).map((product) => (
        <Card key={product.product_id} product={product} login={userlogin} />
      ))}
      <div className='pagination'>
        <Pagination
          paginado={pag}
          next={next}
          prev={prev}
          actualPage={actualPage}
        />
      </div>
    </section>
  );
}
