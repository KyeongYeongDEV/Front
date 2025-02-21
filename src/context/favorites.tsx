import React, { createContext, useContext, useState } from 'react';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

//TODO: api 연결했을 때 되도록 수정해야 함
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};