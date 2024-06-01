import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Product.css';

const Product = ({ product }) => {
  // Extract image filename from the provided path
  const getImageUrl = (imagePath) => {
    const imageName = imagePath.split('\\').pop();
    return `http://localhost:5000/uploads/${imageName}`;
  };

  return (
    <div className="product">
      {/* Use the complete image URL constructed from the filename */}
      <img src={getImageUrl(product.featuredImage)} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <Link to={`/products/${product._id}`}>View Details</Link>
    </div>
  );
};

export default Product;
