import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';
import FavoriteProducts from './components/FavoriteProducts';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import './styles/App.css';
import SearchResults from './components/SearchResults';

function App() {
  
  return (
      <div className="App">
        <Header />
        {/* <SearchBar setQuery={setQuery} /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/edit-product/:id" element={<ProductForm />} />
            <Route path="/favorites" element={<FavoriteProducts />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
