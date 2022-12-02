import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Aside from '../components/Aside/Aside';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Images from '../components/Images/Images';
import Products from '../components/Products/Product';

import { ToastContainer } from 'react-toastify';
import ProductsHome from '../components/ProductsHome/ProductsHome';
import Pagination from '../components/Pagination/Pagination';
import ButtonTop from '../components/ButtonTop/ButtonTop';
const Home = () => {
  const { filters, viewHome, products, productsOfer, copieProducts } =
    useSelector((state) => state);

  const [actualPage, setActualPage] = useState(1);
  const productsPage = 16;
  const page = actualPage * productsPage;

  function next() {
    const numberPage = Math.ceil(copieProducts.length / productsPage);
    if (actualPage !== numberPage) {
      setActualPage(actualPage + 1);
    }
  }
  function prev() {
    if (actualPage !== 1) {
      setActualPage(actualPage - 1);
    }
  }
  function handleClick(index) {
    setActualPage(index);
  }

  return (
    <div className='home'>
      <ButtonTop />
      <Header />
      <Images />
      <div>
        {filters?.search.length > 0 || viewHome === true ? (
          <div className='home__main'>
            <Aside />
            <div className='home__pages'>
              <Products page={page} productsPage={productsPage} />
              <Pagination
                handleClick={handleClick}
                next={next}
                prev={prev}
                actualPage={actualPage}
              />
            </div>
          </div>
        ) : (
          <div className='home__products'>
            <ProductsHome products={productsOfer} />
            <ProductsHome products={products} />
            <ProductsHome products={products} />
            <ProductsHome products={products} />
          </div>
        )}
      </div>
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default Home;
