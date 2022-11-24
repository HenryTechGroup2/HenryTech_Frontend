import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Aside from '../components/Aside/Aside';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Products from '../components/Products/Product';
import { CREATE_USER } from '../redux/actions';
import { USER } from '../redux/storage/variables';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userLogin = window.localStorage.getItem(USER);
    if (userLogin?.length > 0) {
      const userExist = JSON.parse(userLogin);
      return dispatch({ type: CREATE_USER, payload: userExist[0] });
    }
  }, []);
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
