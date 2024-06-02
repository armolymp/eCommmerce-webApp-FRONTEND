// src/components/SearchBar.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

const SearchBar = ({ productNames = [] }) => { 
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInput(userInput);

    const suggestions = productNames.filter(name =>
      name.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredSuggestions(suggestions);
  };

  const handleSearch = () => {
    navigate(`/search?q=${input}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setFilteredSuggestions([]);
    navigate(`/search?q=${suggestion}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
