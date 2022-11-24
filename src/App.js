import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './css/main.css';
import Register from './pages/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
