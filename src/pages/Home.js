import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aside from '../components/Aside/Aside';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Images from '../components/Images/Images';
import ParticlesBackground from '../components/Particles/ParticlesBackground';
import Products from '../components/Products/Product';
import { CREATE_USER, getAllProducts } from '../redux/actions';
import { USER } from '../redux/storage/variables';
import { ToastContainer } from 'react-toastify';
import ProductsHome from '../components/ProductsHome/ProductsHome';
const Home = () => {
  const dispatch = useDispatch();
  const { filters, viewHome, products } = useSelector((state) => state);
  useEffect(() => {
    const userLogin = window.localStorage.getItem(USER);
    if (userLogin?.length > 0) {
      const userExist = JSON.parse(userLogin);
      dispatch({ type: CREATE_USER, payload: userExist[0] });
    }
    dispatch(getAllProducts());
  }, []);
  console.log(viewHome);
  return (
    <div className='home'>
      <ParticlesBackground />
      <Header />
      <Images />
      <div>
        {filters.search.length > 0 || viewHome === true ? (
          <div className='home__main'>
            <Aside />
            <Products />
          </div>
        ) : (
          <div className='home__products'>
            <ProductsHome products={products} />
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
