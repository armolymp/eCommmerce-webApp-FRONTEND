import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (product) => axios.post(`${API_URL}/addProduct`, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/updateProduct/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/deleteProduct/${id}`);
