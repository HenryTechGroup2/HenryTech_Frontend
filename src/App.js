import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductByName from './pages/ProductsByName.js';
import Filtros from './pages/Filtros.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Filtros />} />
        <Route exact path='/product' element={<ProductByName/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
