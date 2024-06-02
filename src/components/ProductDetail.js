import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toggleFavorite } from '../actions/productActions';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.find((p) => p._id === id)
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product._id));
  };

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>SKU: {product.sku}</p>
      <p>Quantity: {product.quantity}</p>
      <div className="images">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/uploads/${image.split('\\').pop()}`}
            alt={product.name}
          />
        ))}
      </div>
      <button onClick={handleToggleFavorite}>
        {product.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/edit-product/${product._id}`}>Edit Product</Link>
    </div>
  );
};

export default ProductDetail;
