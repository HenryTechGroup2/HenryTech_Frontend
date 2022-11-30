import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aside from '../components/Aside/Aside';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Images from '../components/Images/Images';
import ParticlesBackground from '../components/Particles/ParticlesBackground';
import Products from '../components/Products/Product';
import {
  ADD_CART_LOCAL_STORAGE,
  CREATE_USER,
  getAllProducts,
} from '../redux/actions';
import { CAR, USER } from '../redux/storage/variables';
import { ToastContainer } from 'react-toastify';
import ProductsHome from '../components/ProductsHome/ProductsHome';
import Pagination from '../components/Pagination/Pagination';
import ButtonTop from '../components/ButtonTop/ButtonTop';
import axios from 'axios';
import { ADD_TO_CART } from '../redux/actionsCar';
const Home = () => {
  const dispatch = useDispatch();
  const { filters, viewHome, products, productsOfer, copieProducts } =
    useSelector((state) => state);
  useEffect(() => {
    const userLogin = window.localStorage.getItem(USER);
    const car = window.localStorage.getItem(CAR);
    if (userLogin?.length > 0) {
      const userExist = JSON.parse(userLogin);
      const userLocalStorage = async () => {
        const data = await axios.post(`http://localhost:3001/api/user/login`, {
          user_email: userExist[0].user_email,
          user_password: userExist[0].user_password,
        });
        dispatch({ type: CREATE_USER, payload: data.data.user });
      };
      userLocalStorage();
    }
    console.log(JSON.parse(car));
    if (car) {
      dispatch({
        type: ADD_CART_LOCAL_STORAGE,
        payload: car,
      });
    }
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

  return (
    <div className='home'>
      <ParticlesBackground />
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
