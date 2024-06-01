// src/store/store.js
import {thunk} from 'redux-thunk';
import rootReducer from '../reducers/productReducer';

import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

