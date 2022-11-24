import React from 'react';
import Aside from '../components/Aside/Aside';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Products from '../components/Products/Product';

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <div className='home__main'>
        <Aside />
        <Products />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
