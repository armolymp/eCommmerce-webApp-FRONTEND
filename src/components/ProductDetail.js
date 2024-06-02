import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toggleFavorite } from '../actions/productActions';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.find((p) => p._id === id)
  );

  if (!product) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-sku"><strong>SKU:</strong> {product.sku}</p>
        <p className="product-quantity"><strong>Quantity:</strong> {product.quantity}</p>
        <div className="product-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${image.split('\\').pop()}`}
              alt={product.name}
            />
          ))}
        </div>
        <Link to={`/edit-product/${product._id}`} className="favorite-button">Edit Product</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
