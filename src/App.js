import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions.js';
import Aboutus from "./pages/Aboutus.js"
import Details from './components/Details/Details.jsx';
import './css/main.css';
import Register from './pages/Register';
import ProductByName from './pages/ProductsByName.js';
import Filtros from './pages/Filtros.js'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' />
        <Route path='/home' element={<Filtros />} />
        <Route exact path='/product' element={<ProductByName/>}/>
        <Route path='/preguntasfrecuentes' element={<Questions/>} />
        <Route path='/sobrenosotros' element={<Aboutus/>} />
        <Route exact path='/products/:id' element={<Details/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
