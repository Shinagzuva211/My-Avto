import { createContext } from "react"
import type { Car } from "../Types/car"

export interface CompareContextType {
  compareList: Car[]
  toggleCompare: (car: Car) => void
  isInCompare: (id: number) => boolean
  removeFromCompare: (id: number) => void
  clearCompare: () => void
}

export const CompareContext = createContext<CompareContextType | undefined>(undefined)
