// src/reducers/productReducers.js
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  TOGGLE_FAVORITE
} from '../actions/productActions';

const initialState = {
  products: [],
  loading: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_PRODUCTS:
          return { ...state, products: action.payload, loading: false };
      case ADD_PRODUCT:
          return { ...state, products: [...state.products, action.payload] };
      case UPDATE_PRODUCT:
          return {
              ...state,
              products: state.products.map((product) =>
                  product._id === action.payload._id ? action.payload : product
              ),
          };
      case DELETE_PRODUCT:
          return {
              ...state,
              products: state.products.filter((product) => product._id !== action.payload),
          };
      case TOGGLE_FAVORITE:
          return {
              ...state,
              products: state.products.map((product) =>
                  product._id === action.payload._id ? action.payload : product
              ),
          };
      default:
          return state;
  }
};

export default productReducer;
