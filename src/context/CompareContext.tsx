import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { Car } from "../Types/car"
import { CompareContext } from "./compare-context"

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Car[]>(() => {
    const stored = localStorage.getItem("compare")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareList))
  }, [compareList])

  const toggleCompare = (car: Car) => {
    setCompareList((prev) => {
      const exists = prev.some((c) => c.id === car.id)
      if (exists) return prev.filter((c) => c.id !== car.id)
      if (prev.length >= 3) return prev
      return [...prev, car]
    })
  }

  const isInCompare = (id: number) => compareList.some((c) => c.id === id)

  const removeFromCompare = (id: number) =>
    setCompareList((prev) => prev.filter((c) => c.id !== id))

  const clearCompare = () => setCompareList([])

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  )
}
