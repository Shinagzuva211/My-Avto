import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { FavoritesProvider } from "../context/FavoritesContext"
import { useFavorites } from "../context/useFavorites"
import type { Car } from "../Types/car"

const car = { id: 1, brand: "BMW", model: "X5", year: 2023, price: 50000, fuel: "Benzin", image: "", condition: "new", description: "", transmissio: "", mileage: 0, color: "", engine: "", driveType: "", features: [] } as Car

function Probe() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      <span data-testid="liked">{String(isFavorite(car.id))}</span>
      <button onClick={() => toggleFavorite(car)}>toggle</button>
    </div>
  )
}

describe("FavoritesContext", () => {
  it("toggles favorites", () => {
    render(
      <FavoritesProvider>
        <Probe />
      </FavoritesProvider>
    )
    expect(screen.getByTestId("count").textContent).toBe("0")
    fireEvent.click(screen.getByText("toggle"))
    expect(screen.getByTestId("count").textContent).toBe("1")
    expect(screen.getByTestId("liked").textContent).toBe("true")
  })
})
