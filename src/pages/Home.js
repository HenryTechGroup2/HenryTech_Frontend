import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Aside from '../components/Aside/Aside';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Images from '../components/Images/Images';
import Products from '../components/Products/Product';

import { ToastContainer } from 'react-toastify';
import ProductsHome from '../components/ProductsHome/ProductsHome';
// import loader from '../loader.gif';
import Pagination from '../components/Pagination/Pagination';
import ButtonTop from '../components/ButtonTop/ButtonTop';
const Home = () => {
  const {
    filters,
    viewHome,
    products,
    productsMostView,
    productsOfer,
    productsMostRating,
    copieProducts,
    loadingHome,
  } = useSelector((state) => state);

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
  const productsView = products.slice(0, 13);
  const productsMostViewHome = productsMostView.slice(0, 24);
  const productsRating = productsMostRating.slice(0, 40);
  return (
    <div className='home'>
      <ButtonTop />
      <Header />
      <Images />
      {loadingHome ? (
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
              <ProductsHome products={productsMostViewHome} />
              <ProductsHome products={productsView} />
              <ProductsHome products={productsRating} />
            </div>
          )}
        </div>
      ) : (
        <div className='loader'>
          <div className='spinner'></div>
          {/* <img
            className='home__image-gif'
            src={loader}
            alt='Loader'
            loading='lazy'
          /> */}
        </div>
      )}
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default Home;
