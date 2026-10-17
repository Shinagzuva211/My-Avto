import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import "../i18n"
import NotFound from "../Pages/NotFound"

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )
}

describe("NotFound", () => {
  it("renders 404 message", () => {
    renderNotFound()
    expect(screen.getByText("404")).toBeInTheDocument()
    expect(screen.getByText("Sahifa topilmadi")).toBeInTheDocument()
  })

  it("renders navigation links", () => {
    renderNotFound()
    expect(screen.getByRole("link", { name: "Bosh sahifaga qaytish" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Mashinalarni ko'rish" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Mashinalar" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Sevimlilar" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Taqqoslash" })).toBeInTheDocument()
  })
})
