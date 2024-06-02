import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductForm.css';
import { getProducts } from '../actions/productActions';

const ProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.find((p) => p._id === id)
  );

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    quantity: 0,
    description: '',
    featuredImage: null,
    images: []
  });

  const [selectedFeaturedImage, setSelectedFeaturedImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku,
        name: product.name,
        quantity: product.quantity,
        description: product.description,
        featuredImage: product.featuredImage || null,
        images: product.images || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFeaturedImageChange = (e) => {
    setSelectedFeaturedImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('sku', formData.sku);
    form.append('name', formData.name);
    form.append('quantity', formData.quantity);
    form.append('description', formData.description);
    if (selectedFeaturedImage) {
      form.append('featuredImage', selectedFeaturedImage);
    }
    for (let i = 0; i < selectedFiles.length; i++) {
      form.append('images', selectedFiles[i]);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/products/${id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/products', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      dispatch(getProducts());
      navigate('/');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ flex: '0 0 auto', marginRight: '50px' }}>SKU</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
        /></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ flex: '0 0 auto', marginRight: '37px' }}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ flex: '0 0 auto', marginRight: '16px' }}>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        /></div>
        <label>Product Description</label>
        <textarea
        style={{height:"90px"}}
          placeholder='A small description about the product'
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label>Featured Image</label>
        <input
          type="file"
          name="featuredImage"
          accept="image/*"
          onChange={handleFeaturedImageChange}
        />
        <label>Product Images (up to 5)</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
