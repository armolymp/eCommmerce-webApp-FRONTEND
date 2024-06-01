import axios from 'axios';

// Action types
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (id) => async (dispatch, getState) => {
    const { products } = getState().product;
    const product = products.find(p => p._id === id);
    const updatedProduct = { ...product, favorite: !product.favorite };
    
    const response = await axios.put(`/api/products/${id}`, updatedProduct);
    dispatch({ type: TOGGLE_FAVORITE, payload: response.data });
};

export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/products');
    dispatch({ type: 'GET_PRODUCTS', payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = product => async dispatch => {
  try {
    const res = await axios.post('/api/addProduct', product);
    dispatch({ type: 'ADD_PRODUCT', payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = (id, product) => async dispatch => {
  try {
    const res = await axios.put(`/api/updateProduct/${id}`, product);
    dispatch({ type: 'UPDATE_PRODUCT', payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/deleteProduct/${id}`);
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  } catch (error) {
    console.error(error);
  }
};
