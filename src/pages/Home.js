import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getAllProducts } from '../redux/actions';
import Messages from '../Messages/Messages';
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
    userDates,
  } = useSelector((state) => state);
  const [wind, setWind] = useState(document.documentElement.clientWidth);
  window.addEventListener('resize', () =>
    setWind(document.documentElement.clientWidth)
  );
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
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
  function handleOpenConfigFilter() {
    filterRef.current.classList.toggle('aside__view');
  }
  console.log(productsOfer);
  return (
    <div className='home'>
      <ButtonTop />
      <Header />
      <Images />
      {loadingHome ? (
        <div>
          {filters?.search.length > 0 || viewHome === true ? (
            <div className='home__main'>
              <Aside filterRef={filterRef} />
              <div className='home__pages'>
                {wind <= 600 ? (
                  <div className='home__res'>
                    <img
                      onClick={handleOpenConfigFilter}
                      className='home__imagesp'
                      src='../assets/responsive/config.png'
                      alt=''
                    />
                  </div>
                ) : null}
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
              Productos en oferta
              <ProductsHome products={productsOfer} />
              Productos mas vistos
              <ProductsHome products={productsMostViewHome} />
              Productos con mas rating
              <ProductsHome products={productsRating} />
              <ProductsHome products={productsView} />
            </div>
          )}
          <div className='home__message'>
            {userDates?.hasOwnProperty('user_name') ? (
              userDates.user_isAdmin === true ? null : (
                <Messages />
              )
            ) : null}
          </div>
        </div>
      ) : (
        <div className='loader'>
          <div className='spinner'></div>
        </div>
      )}
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default Home;
