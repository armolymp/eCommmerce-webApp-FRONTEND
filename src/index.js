import React from 'react';
import { createRoot } from 'react-dom/client'; // Corrected import
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store/store';
import './styles/App.css';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Use the container directly

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
