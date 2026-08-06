import { createContext, useState, useEffect, ReactNode } from "react";
import type { Car } from "../Types/car";

interface FavoritesContextType {
  favorites: Car[];
  toggleFavorite: (car: Car) => void;
  isFavorite: (id: number) => boolean;
  removeFromFavorites: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Car[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (car: Car) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.id === car.id);
      if (exists) {
        return prev.filter((c) => c.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((c) => c.id === id);
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}