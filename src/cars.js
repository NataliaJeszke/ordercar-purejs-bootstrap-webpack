const cars = [
  {
    model: "Audi A4",
    brand: "Audi",
    mileage: 10000,
    enginePower: 250,
    year: 2021,
    price: 100000,
    image: "https://picsum.photos/id/183/200/300"
  },
  {
    model: "BMW X5",
    brand: "BMW",
    mileage: 20000,
    enginePower: 300,
    year: 2020,
    price: 120000,
    image: "https://picsum.photos/id/376/200/300"
  },
  {
    model: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    mileage: 15000,
    enginePower: 275,
    year: 2021,
    price: 110000,
    image: "https://api.lorem.space/image/car?w=200&h=300&hash=225E6693"
  },
  {
    model: "Toyota Camry",
    brand: "Toyota",
    mileage: 30000,
    enginePower: 200,
    year: 2019,
    price: 50000,
    image: "https://picsum.photos/id/111/200/300"
  },
  {
    model: "Ford Mustang",
    brand: "Ford",
    mileage: 25000,
    enginePower: 350,
    year: 2018,
    price: 80000,
    image: "https://picsum.photos/id/88/200/300"
  },
  {
    model: "Tesla Model S",
    brand: "Tesla",
    mileage: 5000,
    enginePower: 500,
    year: 2022,
    price: 130000,
    image: "https://api.lorem.space/image/car?w=200&h=300&hash=8B7BCDC2"
  },
  {
    model: "Porsche 911",
    brand: "Porsche",
    mileage: 10000,
    enginePower: 450,
    year: 2020,
    price: 200000,
    image: "https://api.lorem.space/image/car?w=200&h=300&hash=500B67FB"
  },
  {
    model: "Lamborghini Aventador",
    brand: "Lamborghini",
    mileage: 1500,
    enginePower: 700,
    year: 2021,
    price: 500000,
    image: "https://api.lorem.space/image/car?w=200&h=300&hash=A89D0DE6"
  },
  {
    model: "Honda Civic",
    brand: "Honda",
    mileage: 40000,
    enginePower: 180,
    year: 2019,
    price: 35000,
    image: "https://api.lorem.space/image/car?w=200&h=300&hash=225E6693"
  },
  {
    model: "Chevrolet Corvette",
    brand: "Chevrolet",
    mileage: 12000,
    enginePower: 400,
    year: 2020,
    price: 70000,
    image: "https://api.lorem.space/image/car?w=200&h=300&hash=9D9539E7"
  },
];

//Creating new array of cars with unique ID
export const carsList = cars.map(car => ({ ...car, id: crypto.randomUUID() }));

// module.exports = {
//   carsList
// };
