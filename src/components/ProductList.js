// src/components/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Product from './Product';
import { getProducts } from '../actions/productActions';
import '../styles/ProductList.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const query = useQuery();
  const searchQuery = query.get('q') || '';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
