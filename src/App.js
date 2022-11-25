import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './css/main.css';
import Register from './pages/Register';
import React from 'react';
import Car from './pages/Car';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/car' element={<Car />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
