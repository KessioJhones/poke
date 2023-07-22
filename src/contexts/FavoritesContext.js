// Arquivo: FavoritesContext.js
import React, { createContext, useState } from "react";

// Crie o contexto
const FavoritesContext = createContext();

// Crie o provedor do contexto
const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});

  return (
    <FavoritesContext.Provider value={[favorites, setFavorites]}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
