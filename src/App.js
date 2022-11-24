import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './css/main.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
