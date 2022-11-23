import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductByName from './pages/ProductsByName';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home'/>
        <Route exact path='/product' element={<ProductByName/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
