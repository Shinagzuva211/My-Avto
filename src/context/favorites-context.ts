import { createContext } from "react";
import type { Car } from "../Types/car";

export interface FavoritesContextType {
  favorites: Car[];
  toggleFavorite: (car: Car) => void;
  isFavorite: (id: number) => boolean;
  removeFromFavorites: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
