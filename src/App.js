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
import { AUTH0, CAR, PASSWORD, USER } from './redux/storage/variables';
import axios from 'axios';
import {
  ADD_ALL_FAVORITES,
  ADD_CART_LOCAL_STORAGE,
  api,
  getAllProducts,
  LOGIN_USER,
} from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import UpdateUser from './components/UpdateUser/UpdateUser';
import MyAcount from './pages/MyAcount';

import Dashboard from './scenes/dashboard/Dashboard.jsx';
import Users from './scenes/Users.jsx';
import Products from './scenes/Products.jsx';
import Invoices from './scenes/Invoices.jsx';
import Reviews from './scenes/Reviews.jsx';
import CreateProducts from './scenes/CreateProducts';

const stripePromise = loadStripe(
  'pk_test_51M77H2KiwPMfuM1YXkNCH93JIkwQGuApdRkcPsAGZEcZAvS3J5hjJRA6KOohvbPesLoToFn9R2IczZxC5rpFh5D4008JRks0Sh'
);
function App() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);

  useEffect(() => {
    const userLogin = window.localStorage.getItem(USER);
    const car = window.localStorage.getItem(CAR);
    const password = window.localStorage.getItem(PASSWORD);
    const auth0Session = window.localStorage.getItem(AUTH0);
    const allProducts = () => {
      dispatch(getAllProducts());
    };
    allProducts();
    if (userLogin?.length > 0) {
      const userExist = JSON.parse(userLogin);
      console.log(userExist);
      const userLocalStorage = async () => {
        if (auth0Session === 'YES') {
          const data = await axios.post(`${api}/api/user/login/auth0`, {
            user_email: userExist[0].user_email,
            user_name: userExist[0].user_name,
          });
          return await dispatch({ type: LOGIN_USER, payload: data.data });
        }
        const data = await axios.post(`${api}/api/user/login`, {
          user_email: userExist[0].user_email,
          user_password: password,
        });
        await dispatch({ type: LOGIN_USER, payload: data.data.user });
      };
      userLocalStorage();
    }
    if (car) {
      dispatch({
        type: ADD_CART_LOCAL_STORAGE,
        payload: car,
      });
    }
    dispatch({ type: ADD_ALL_FAVORITES });
  }, []);

  useEffect(() => {
    dispatch({ type: ADD_ALL_FAVORITES });
  }, [products, dispatch]);
  return (
    <Elements stripe={stripePromise}>
      <ParticlesBackground />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/armament-pc' element={<ArmamentPc />} />
          <Route path='/register' element={<Register />} />
          <Route path='/car' element={<Car />} />
          <Route path='/temporary-data' element={<TemporaryData />} />
          <Route path='/product' element={<ProductByName />} />
          <Route path='/preguntasfrecuentes' element={<Questions />} />
          <Route path='/sobrenosotros' element={<Aboutus />} />

          <Route exact path='/products/:id' element={<Details />} />
          <Route exact path='/micuenta/:id' element={<MyAcount />} />
          <Route exact path='/actualiza/:id' element={<UpdateUser />} />
          <Route exact path='/admin' element={<Dashboard />} />
          <Route exact path='/admin/users' element={<Users />} />
          <Route exact path='/admin/products' element={<Products />} />
          <Route exact path='/admin/invoices' element={<Invoices />} />
          <Route exact path='/admin/reviews' element={<Reviews />} />
          <Route
            exact
            path='/admin/products/crearproducto'
            element={<CreateProducts />}
          />
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
