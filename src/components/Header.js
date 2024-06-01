import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = () => (
  <header className="header">
    <h1>E-commerce App</h1>
    <SearchBar />
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add">Add Product</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  </header>
);

export default Header;
