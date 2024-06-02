// src/components/FavoriteButton.js
import React, { useEffect, useState } from 'react';
import filledStar from '../assets/starred.svg';
import emptyStar from '../assets/star.svg';

const FavoriteButton = ({ productId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Load favorite status from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(productId)) {
      favorites = favorites.filter(id => id !== productId);
    } else {
      favorites.push(productId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button onClick={toggleFavorite} className="favorite-button">
      <img src={isFavorite ? filledStar : emptyStar} alt="Favorite Icon" />
    </button>
  );
};

export default FavoriteButton;
