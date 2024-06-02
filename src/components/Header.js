import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import { useState } from 'react';


const Header = () => (

  <header className="header">
    <h1>PRODUCTS</h1>
    <SearchBar />
    <div className="actions">
      <Link className="new-product-btn" to="/add-product">New Product</Link>
      <Link className="star-btn" to="/favorites">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 19.804L6.93 13.695a.5.5 0 00-.176-.544L2.712 8.36a.5.5 0 01.293-.853h5.864a.5.5 0 00.475-.32L12 2.37l2.656 4.82a.5.5 0 00.475.32h5.864a.5.5 0 01.293.853l-4.043 4.792a.5.5 0 00-.176.544l1.808 6.109a.5.5 0 01-.747.567L12 17.431l-5.456 3.094a.5.5 0 01-.747-.567z" />
        </svg>
      </Link>
    </div>
  </header>
);

export default Header;
