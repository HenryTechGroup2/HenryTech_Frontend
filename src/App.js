import React from 'react';
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
const stripePromise = loadStripe(
  'pk_test_51M77H2KiwPMfuM1YXkNCH93JIkwQGuApdRkcPsAGZEcZAvS3J5hjJRA6KOohvbPesLoToFn9R2IczZxC5rpFh5D4008JRks0Sh'
);
function App() {
  return (
    <Elements stripe={stripePromise}>
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
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
