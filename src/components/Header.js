import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import AdminButton from './Profile';

const Header = () => {
  const location = useLocation();
  let heading;

  if (location.pathname.startsWith('/products/')) {
    heading = 'Product Details';
  } else if (location.pathname === '/add-product') {
    heading = 'Product - Add New Product';
  } else if (location.pathname.startsWith('/edit-product/')) {
    heading = 'Products - Edit Product';
  } else if (location.pathname === '/favorites') {
    heading = 'Favourite Products';
  } else if (location.pathname === '/search') {
    heading = 'Search Products';
  } else {
    heading = 'Products';
  }

  return (
    <>
    <AdminButton/>
    <header className="header">
      <h1>{heading}</h1>
      {location.pathname.startsWith('/favorites') || location.pathname.startsWith('/search')? <SearchBar />: <></>}
      <div className="actions">
        <Link className="new-product-btn" to="/add-product">New Product</Link>
        <Link className="star-btn" to="/favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 19.804L6.93 13.695a.5.5 0 00-.176-.544L2.712 8.36a.5.5 0 01.293-.853h5.864a.5.5 0 00.475-.32L12 2.37l2.656 4.82a.5.5 0 00.475.32h5.864a.5.5 0 01.293.853l-4.043 4.792a.5.5 0 00-.176.544l1.808 6.109a.5.5 0 01-.747.567L12 17.431l-5.456 3.094a.5.5 0 01-.747-.567z" />
          </svg>
        </Link>
      </div>
    </header>
    </>
  );
};

export default Header;
