import { BiFilter, BiSearch } from "react-icons/bi";
import "../Home.css"
import CarCard from "./CarCard";
import type { Car } from "../Types/car";
import { useState } from "react";

interface SidebarProps {
  cars: Car[];
}

export default function Sidebar({ cars }: SidebarProps) {

  const [search, setSearch] = useState<string>('')

  const [brand, setBrand] = useState<string>('')

  const [price, setPrice] = useState<number | null>(null)

  const [price2, setPrice2] = useState<number | null>(null)

  const [year, setYear] = useState<number | null>(null)

  const [fuel, setFuel] = useState<string>("")

  const searchText = search.trim().toLowerCase()

  const resetFilter = () => {
    setBrand('')
    setSearch('')
    setPrice(null)
    setPrice2(null)
    setYear(null)
    setFuel("")
  }

  const filteredCars = cars.filter((car) => {

    const matchSearch =
      car.brand.toLowerCase().includes(searchText) ||
      car.model.toLowerCase().includes(searchText);
    const matchBrand =
      brand === "" || car.brand === brand;
    const matchPrice =
      price === null || car.price >= price;
    const matchPrice2 =
      price2 === null || car.price <= price2;
    const matchYear =
      year === null || car.year === year
    const matchFuel =
      fuel === "" || car.fuel === fuel

    return (
      matchSearch &&
      matchBrand &&
      matchPrice &&
      matchYear &&
      matchFuel &&
      matchPrice2
    );

  })

  return (
    <>

      <div className="sidebar-cars">

        <div className="sidebar">

          <div className="container">

            <div className="sidebar-content">

              <div className="search-zone">

                <div className="search-npt">
                  <input
                    type="text"
                    placeholder="Mashina nomi kiriting"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <BiSearch className="icon-npt" />
                </div>

              </div>

              <hr />

              <div className="filters">

                <div className="filter">
                  Filterlar <BiFilter />
                </div>

                <div className="brands">

                  <div className="brand-title">
                    Brendlar
                  </div>

                  <input
                    id="bmw"
                    type="radio"
                    name="brand"
                    value="BMW"
                    checked={brand === "BMW"}
                    onChange={(e) => setBrand(e.target.value)}
                  /> <label htmlFor="bmw" >BMW</label> <br />
                  <input
                    id="mercedes"
                    type="radio"
                    name="brand"
                    checked={brand === "Mercedes"}
                    value="Mercedes"
                    onChange={(e) => setBrand(e.target.value)}
                  /> <label htmlFor="mercedes">Mercedes</label> <br />
                  <input
                    id="chevrolet"
                    type="radio"
                    name="brand"
                    checked={brand === "Chevrolet"}
                    value="Chevrolet"
                    onChange={(e) => setBrand(e.target.value)}
                  /> <label htmlFor="chevrolet">Chevrolet</label> <br />
                  <input
                    id="kia"
                    type="radio"
                    name="brand"
                    checked={brand === "Kia"}
                    value="Kia"
                    onChange={(e) => setBrand(e.target.value)}
                  /> <label htmlFor="kia">Kia</label>

                </div>

                <hr />

                <div className="prices">

                  <div className="price-title">
                    Narxlar
                  </div>

                  <div className="price-npts">
                    <label> Mini Narx: </label>
                    <input
                      type="number"
                      placeholder="Minimum narxi"
                      value={price ?? ""}
                      onChange={(e) =>
                        setPrice(e.target.value === "" ? null : Number(e.target.value))
                      }

                    />
                    <br />
                    <label> Max Narx: </label>
                    <input
                      type="number"
                      placeholder="Maksimum narxi"
                      value={price2 ?? ""}
                      onChange={(e) =>
                        setPrice2(e.target.value === "" ? null : Number(e.target.value))
                      }
                    />
                  </div>

                </div>

                <hr />

                <div className="years">
                  <div className="year-title">
                    Yil
                  </div>

                  <select value={year ?? ""} onChange={(e) => setYear(e.target.value === "" ? null : Number(e.target.value))}>
                    <option value="">Barchasi</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>

                </div>

                <hr />

                <div className="fuel-content">
                  <div className="fuel-title">
                    Yoqilg'i
                  </div>

                  <input
                    type="radio"
                    name="fuel"
                    value="Benzin"
                    checked={fuel === "Benzin"}
                    onChange={(e) => setFuel(e.target.value)}
                  /> <label>Benzin</label> <br />
                  <input
                    type="radio"
                    name="fuel"
                    value="Gibrid"
                    checked={fuel === "Gibrid"}
                    onChange={(e) => setFuel(e.target.value)}
                  /> <label>Gibrid</label> <br />
                  <input
                    type="radio"
                    name="fuel"
                    value="Elektra"
                    checked={fuel === "Elektra"}
                    onChange={(e) => setFuel(e.target.value)}
                  /> <label>Elektr</label> <br />

                </div>

                <button onClick={resetFilter} className="view">
                  Filterni asliga qaytarish
                </button>


              </div>

            </div>

          </div>

        </div>

        <div className="h-line"></div>

        <div className="cars-scroll">

          <div className="cars">

            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}

          </div>

        </div>

      </div>

    </>
  )
}
