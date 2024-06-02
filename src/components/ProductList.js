// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getProducts } from '../actions/productActions';
import Product from './Product';
import '../styles/ProductList.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import coloredStar from '../assets/starred.svg';
import emptyStar from '../assets/star.svg';
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { Modal } from 'react-bootstrap'; 

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const query = useQuery();
  const searchQuery = query.get('q') || '';

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete confirmation modal
  const [productToDelete, setProductToDelete] = useState(null); // State to store the product to be deleted

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      dispatch(getProducts()); // Refresh the product list after deletion
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
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
                      <FontAwesomeIcon icon={faEye} className="icon" />
                    </Link>
                    <Link to={`/edit-product/${product._id}`}>
                      <img src={editIcon} alt="Edit" className="icon" />
                    </Link>
                    <button
                      onClick={() => {
                        setProductToDelete(product);
                        setShowDeleteModal(true);
                      }}
                      className="icon-button"
                    >
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
        <p>No products found</p>
      )}

<ConfirmDeleteModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(productToDelete?._id)}
        productName={productToDelete?.name}
      />
    </div>
  );
};

export default ProductList;
