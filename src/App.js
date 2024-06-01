import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';
import FavoriteProducts from './components/FavoriteProducts';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
      <div className="App">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/favorites" element={<FavoriteProducts />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
