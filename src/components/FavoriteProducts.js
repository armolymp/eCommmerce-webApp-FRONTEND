// src/components/FavoriteProducts.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../actions/productActions';
import '../styles/ProductList.css';
import axios from 'axios';
import coloredStar from '../assets/starred.svg';
import emptyStar from '../assets/star.svg';
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this product?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        dispatch(getProducts()); // Refresh the product list after deletion
      } catch (error) {
        console.error("There was an error deleting the product!", error);
      }
    }
  };

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product._id)
  );

  return (
    <div className="product-list">
      {favoriteProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th style={{color:"#001EB9"}}>SKU</th>
              <th style={{color:"#001EB9"}}>IMAGE</th>
              <th style={{color:"#001EB9"}}>PRODUCT NAME</th>
              <th style={{color:"#001EB9"}}>QUANTITY</th>
              <th style={{color:"#001EB9"}}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {favoriteProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.sku}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${product.featuredImage.split('\\').pop()}`}
                    alt={product.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>
                  <div className="icon-container">
                    <Link to={`/products/${product._id}`}>
                      <FontAwesomeIcon icon={faEye} className="icon fa-eye" />
                    </Link>
                    <Link to={`/edit-product/${product._id}`}>
                      <img src={editIcon} alt="Edit" className="icon" />
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="icon-button">
                      <img src={deleteIcon} alt="Delete" className="icon" />
                    </button>
                  <img
                    src={favorites.includes(product._id) ? coloredStar : emptyStar}
                    alt="Favorite"
                    className="icon"
                    onClick={() => toggleFavorite(product._id)}
                  />
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No favorite products found</p>
      )}
    </div>
  );
};

export default FavoriteProducts;
