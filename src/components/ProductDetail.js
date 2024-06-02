import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.find((p) => p._id === id)
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-sku"><strong>SKU:</strong> {product.sku}</p>
          <p className="product-quantity"><strong>Quantity:</strong> {product.quantity}</p>
          <p className="product-quantity"><strong>Description:</strong> {product.description}</p>
          <div className="edit-button-container">
        <Link to={`/edit-product/${product._id}`} className="favorite-button">Edit Product</Link>
      </div>
        </div>
        <div className="product-images">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:5000/uploads/${image.split('\\').pop()}`}
                  alt={product.name}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
