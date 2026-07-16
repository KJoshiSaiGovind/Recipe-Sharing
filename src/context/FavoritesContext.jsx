import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const isFav = prev.some((fav) => fav.recipe.uri === recipe.recipe.uri);
      if (isFav) {
        return prev.filter((fav) => fav.recipe.uri !== recipe.recipe.uri);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (uri) => favorites.some((fav) => fav.recipe.uri === uri);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
