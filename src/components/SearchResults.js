import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import arrowImage from '../assets/arrow.svg';
import'../styles/SearchResults.css'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        setError('Error fetching search results. Please try again later.');
        console.error('Error fetching search results:', error);
      }
      setLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Search Results for "{query}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && results.length === 0 && <p>No results found.</p>}
      {!loading && !error && results.length > 0 && (
        <div className="results-list">
          {results.map((product) => (
            <div className="product-item" key={product._id}>
              <div className="product-details">
                <a href={`/products/${product._id}`} className="product-sku">#{product.sku}</a>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
              </div>
              <Link to={`/products/${product._id}`} className="arrow-link">
                <img src={arrowImage} alt="View Details" className="arrow-icon" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
