import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct, getProducts } from '../actions/productActions';
import '../styles/ProductForm.css';

const ProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: '',
    quantity: '',
    name: '',
    description: '',
    featuredImage: '',
    images: []
  });
  const product = useSelector(state => id ? state.products.products.find(p => p._id === id) : null);

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku,
        quantity: product.quantity,
        name: product.name,
        description: product.description,
        featuredImage: '',
        images: []
      });
    }
    dispatch(getProducts());
  }, [dispatch, product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleImagesChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('sku', formData.sku);
    data.append('quantity', formData.quantity);
    data.append('name', formData.name);
    data.append('description', formData.description);
    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage);
    }
    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    if (id) {
      dispatch(updateProduct(id, data));
    } else {
      dispatch(addProduct(data));
    }
    navigate('/');
  };

  return (
    <div className="product-form">
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <label>SKU:</label>
        <input type="text" name="sku" value={formData.sku} onChange={handleChange} required />
        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <label>Featured Image:</label>
        <input type="file" name="featuredImage" onChange={handleFileChange} />
        <label>Images:</label>
        <input type="file" name="images" onChange={handleImagesChange} multiple />
        <button type="submit">{id ? 'Update' : 'Add'} Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
