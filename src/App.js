import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions.js';
import Aboutus from "./pages/Aboutus.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home'/>
        <Route path='/preguntasfrecuentes' element={<Questions/>} />
        <Route path='/sobrenosotros' element={<Aboutus/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
