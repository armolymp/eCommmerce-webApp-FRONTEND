// src/components/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getProducts } from '../actions/productActions';
import '../styles/ProductList.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome styles

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      dispatch(getProducts()); // Refresh the product list after deletion
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
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
              <th>Price</th>
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
                <td>{product.price}</td>
                <td>
                  <Link to={`/products/${product._id}`} className="view-button">
                    <i className="fas fa-eye"></i>
                  </Link>
                  <button onClick={() => handleDelete(product._id)} className="delete-button">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
