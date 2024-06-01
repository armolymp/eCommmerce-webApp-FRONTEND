import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './Product';
import '../styles/ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="product-list">
      {products?.map(product => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
