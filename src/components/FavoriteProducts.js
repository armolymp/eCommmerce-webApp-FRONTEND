import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import '../styles/FavoriteProducts.css';

const FavoriteProducts = () => {
  const favoriteProducts = useSelector(state => state.products.favoriteProducts);

  return (
    <div className="favorite-products">
      <h2>Favorite Products</h2>
      {favoriteProducts.map(product => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FavoriteProducts;
