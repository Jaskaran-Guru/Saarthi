import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const FavoriteButton = ({ propertyId, className = "", size = "normal" }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated, trackInteraction } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);

  const favorite = isFavorite(propertyId);

  const sizeClasses = {
    small: "w-8 h-8 text-base",
    normal: "w-12 h-12 text-xl",
    large: "w-16 h-16 text-2xl"
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Please login to save favorites');
      return;
    }
    
    setIsAnimating(true);
    toggleFavorite(propertyId);
    
    trackInteraction(favorite ? 'property_unfavorited' : 'property_favorited', {
      propertyId
    });
    
    // Remove animation class after animation completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 ${
        favorite 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
      } ${isAnimating ? 'animate-pulse scale-125' : ''} ${className}`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className={`transition-transform ${isAnimating ? 'scale-125' : ''}`}>
        {favorite ? '❤️' : '🤍'}
      </span>
    </button>
  );
};

export default FavoriteButton;
