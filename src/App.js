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

function App() {
  return (
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
        <Route exact path='/micuenta/:id' element={<MyAcount/>} />
        <Route exact path='/actualiza/:id' element={<UpdateUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
