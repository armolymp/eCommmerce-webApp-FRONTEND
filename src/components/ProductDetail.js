// src/components/ProductDetail.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../actions/productActions';

const ProductDetail = ({ match }) => {
    const dispatch = useDispatch();
    const product = useSelector(state =>
        state.products.find(p => p._id === match.params.id)
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
                    <img key={index} src={`/${image}`} alt={product.name} />
                ))}
            </div>
            <button onClick={handleToggleFavorite}>
                {product.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default ProductDetail;
