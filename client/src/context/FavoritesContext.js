import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('saarthi-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('saarthi-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) ? prev : [...prev, propertyId]
    );
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(prev => prev.filter(id => id !== propertyId));
  };

  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.includes(propertyId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      getFavoritesCount,
      clearAllFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
