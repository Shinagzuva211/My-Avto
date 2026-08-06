export interface Car {
    id: number
    brand: string
    model: string
    year: number
    price: number
    fuel: string
    image: string
    condition: "new" | "used"
    description: string;
    transmissio: string;
    mileage: number;
    color: string;
    engine: string;
    driveType: string;
    features: string[];
}