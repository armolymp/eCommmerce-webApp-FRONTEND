import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
    <div>
      <h2>Search Results for "{query}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && results.length === 0 && <p>No results found.</p>}
      {!loading && !error && results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {results.map((product) => (
              <tr key={product._id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchResults;
