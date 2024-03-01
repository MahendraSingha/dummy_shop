import logo from './logo.svg';
import './App.css';
import NavBar from './component/NavBar';
import Home from './component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './component/ProductDetails';
import Cart from './component/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product-detail/:id" element={<ProductDetails />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
