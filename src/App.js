import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions.js';
import Aboutus from './pages/Aboutus.js';
import Details from './components/Details/Details.jsx';
import Register from './pages/Register';
import Car from './pages/Car';
import ProductByName from './pages/ProductsByName.js';
import './css/main.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import TemporaryData from './pages/TemporaryData';
import ArmamentPc from './pages/ArmamentPc';
import ParticlesBackground from './components/Particles/ParticlesBackground';
import { CAR, USER } from './redux/storage/variables';
import axios from 'axios';
import {
  ADD_CART_LOCAL_STORAGE,
  CREATE_USER,
  getAllProducts,
} from './redux/actions';
import { useDispatch } from 'react-redux';
const stripePromise = loadStripe(
  'pk_test_51M77H2KiwPMfuM1YXkNCH93JIkwQGuApdRkcPsAGZEcZAvS3J5hjJRA6KOohvbPesLoToFn9R2IczZxC5rpFh5D4008JRks0Sh'
);
function App() {
  const dispatch = useDispatch();
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
  return (
    <Elements stripe={stripePromise}>
      <ParticlesBackground />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />

          <Route path='/car' element={<Car />} />

          <Route path='/home' />
          <Route exact path='/product' element={<ProductByName />} />
          <Route path='/preguntasfrecuentes' element={<Questions />} />
          <Route path='/sobrenosotros' element={<Aboutus />} />
          <Route exact path='/products/:id' element={<Details />} />
          <Route path='temporary-data' element={<TemporaryData />} />
          <Route path='armament' element={<ArmamentPc />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
