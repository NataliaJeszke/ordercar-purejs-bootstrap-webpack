import { carsList } from "./cars.js";
import { formCarInformation } from "./form.js";
import { updateCost } from "./form.js";
import { orderInfo } from "./order.js";

//Variables of the DOM
const $carsList = document.getElementById("carsList");
const $searchInput = document.querySelector("[data-search]");
const $pickCarSection = document.getElementById("cars");
const $formSection = document.getElementById("formSection");
const $searchSection = document.getElementById("searchSection");
const $orderSection = document.getElementById("orderSection");
const $btnBack = document.getElementById("btnBack");
const $btnHero = document.getElementById("heroBtn");

//Start settings to display sections: Pick a Car Section, Form Section, Search Section and Order Section
$searchSection.style.display = "block";
$pickCarSection.style.display = "block";
$formSection.style.display = "none";
$orderSection.style.display = "none";

//EventListiner to toggle pickCarSection
$btnBack.addEventListener("click", showPickCar);
$btnHero.addEventListener("click", showPickCar);

function createDivCar(car) {
  const carDiv = document.createElement("div");
  carDiv.classList = "car zoom";

  const imgCar = document.createElement("img");
  imgCar.classList = "imageCar";
  imgCar.src = car.image;
  imgCar.alt = car.model;

  const brandH3 = document.createElement("h3");
  brandH3.classList = "brand";
  brandH3.textContent = car.brand;

  const modelH3 = document.createElement("h3");
  brandH3.classList = "model";
  modelH3.textContent = car.model;

  const mileagePara = document.createElement("p");
  mileagePara.classList = "mileage";
  mileagePara.textContent = `Mileage: ` + car.mileage;

  const enginePower = document.createElement("p");
  enginePower.classList = "enginePower";
  enginePower.textContent = `Engine: ` + car.enginePower;

  const yearH4 = document.createElement("h4");
  yearH4.classList = "year";
  yearH4.textContent = `Year: ` + car.year;

  const priceH4 = document.createElement("h4");
  priceH4.classList = "price";
  priceH4.textContent = `Price: ` + car.price + " \u20AC";

  const buyBtn = document.createElement("button");
  buyBtn.classList = "buyBtn";
  buyBtn.id = car.id;
  buyBtn.textContent = "Select";
  buyBtn.setAttribute("onclick", "location.href='#formSection'");

  carDiv.append(
    imgCar,
    brandH3,
    modelH3,
    mileagePara,
    enginePower,
    yearH4,
    priceH4,
    buyBtn
  );

  $carsList.appendChild(carDiv);

  //EventListener for every "select" button. Finds unique id of a car.
  buyBtn.addEventListener("click", () => {
    handleCarSelection(car);
    formCarInformation();
    updateCost();
    showForm();
  });
}
carsList.forEach(createDivCar);

//////// FILTERING ///////////////
//Filtering cars by brand
$searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value.toLowerCase();
  const filteredCars = carsList.filter((car) => {
    return car.brand.toLowerCase().includes(searchValue);
  });
  displayFilteredCars(filteredCars);
});

function displayFilteredCars(filteredCars) {
  $carsList.innerHTML = "";
  filteredCars.forEach((car) => {
    createDivCar(car);
  });
}

////////// SEND TO LOCAL STORAGE SELECTED CAR /////////

//Function to handle selected car and send it to localStorage
function handleCarSelection(car) {
  const id = car.id;
  const selectedCar = carsList.find((car) => car.id === id);

  sendToLocalStorage(selectedCar);
  console.log(selectedCar);
}

//// Send a car to localStorage function
function sendToLocalStorage(selectedCar) {
  localStorage.setItem("car", JSON.stringify(selectedCar));
}

///////////// SHOW AND HIDE SECTIONS //////////////

//Code for showing and hidding sections and elements of the page.
//// Code to toggle Form Section
function showForm() {
  $pickCarSection.style.display = "none";
  $searchSection.style.display = "none";
  $formSection.style.display = "block";
}

//// Code to toggle Pick a Car section.
function showPickCar() {
  $searchSection.style.display = "block";
  $pickCarSection.style.display = "block";
  $formSection.style.display = "none";
  $orderSection.style.display = "none";
}

export const showOrder = () => {
  $pickCarSection.style.display = "none";
  $searchSection.style.display = "none";
  $formSection.style.display = "none";
  $orderSection.style.display = "block";

  orderInfo();
};

//// Import: style and images ////
import style from "./css/style.css";
import whyUs from "./assets/img/whyUs.png";
import contact from "./assets/img/contact.png";

const whyUsImg = document.getElementById("whyUsImg");
whyUsImg.src = `${whyUs}`;

const contactImg = document.getElementById("contactImg");
contactImg.src = `${contact}`;
