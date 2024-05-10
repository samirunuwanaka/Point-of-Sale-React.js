import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './LogIn';
import Home from './Home';
import Frame from './frame';
import Products from './Management/ItemCategory';
import Stocks from './Management/Stock';
import Purchase from './Management/Purchase';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/logIn" element={<LoginPage />} />
          <Route path='/' element={<Home />} />
          <Route path='/products editor' element={<Products />} />
          <Route path='/stocks' element={<Stocks/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
