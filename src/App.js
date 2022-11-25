import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import './css/main.css';

import Register from './pages/Register';

import React from 'react';
import Car from './pages/Car';



import ProductByName from './pages/ProductsByName.js';
import Filtros from './pages/Filtros.js'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />

        <Route path='/car' element={<Car />} />

        <Route path='/home' element={<Filtros />} />
        <Route exact path='/product' element={<ProductByName/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
