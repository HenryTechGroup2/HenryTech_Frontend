import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination.jsx';
import { useState } from 'react';

export default function Products({ page, productsPage }) {
  const { copieProducts: products, userlogin } = useSelector((state) => state);

  // action para llamar al stock de los productos y que se guarden en el estado globar stockProducts

  // const [actualPage, setActualPage] = useState(1);
  // const productsPage = 16;
  // const page = actualPage * productsPage;
  // const productsforPage = products.slice(page - productsPage, page);

  // function pag(number) {
  //   setActualPage(number);
  // }
  // const [paginate, setPaginate] = useState({
  //   value: 0,
  //   value2: 16,
  // });
  // function next() {
  //   const numberPage = Math.ceil(products.length / productsPage);
  //   if (actualPage !== numberPage) {
  //     setActualPage(actualPage + 1);
  //     setPaginate({
  //       ...paginate,
  //       value: 16,
  //       value2: 32,
  //     });
  //   }
  // }
  // function prev() {
  //   if (actualPage !== 1) {
  //     setActualPage(actualPage - 1);
  //     setPaginate({
  //       ...paginate,
  //       value: 0,
  //       value2: 16,
  //     });
  //   }
  // }

  return (
    <section className='product'>
      {products.slice(page - productsPage, page).map((product) => (
        <Card key={product.product_id} product={product} login={userlogin} />
      ))}
      <div className='pagination'>
        {/* <Pagination
          paginado={pag}
          next={next}
          prev={prev}
          actualPage={actualPage}
        /> */}
      </div>
    </section>
  );
}
