import { showOrder } from "./script.js";

const $carInfoForm = document.getElementById("carInfoForm");
const $totalCost = document.getElementById("totalCost");
const $cashBtn = document.getElementById("cash");
const $leasingBtn = document.getElementById("leasing");
const $dateCalendar = document.getElementById("date");
const $accessoriesList = document.querySelectorAll(
  ".accessoriesList input[type='checkbox']"
);
const $tyresInput = document.getElementById("tyres");
const $warrantyInput = document.getElementById("warranty");
const $polishingInput = document.getElementById("polishing");
const $buyerName = document.getElementById("name");
const $buyerSurname = document.getElementById("surname");
const $buyerEmail = document.getElementById("email");
const $btnOrder = document.getElementById("btnOrder");

///// GENERAL CAR INFORMATION: MODEL AND PRICE /////
export const formCarInformation = () => {
  getModelAndCost();
};

const getModelAndCost = () => {
  const car = JSON.parse(localStorage.getItem("car"));
  const childImg = $carInfoForm.querySelector("img");
  const childElement = $carInfoForm.querySelector("h3");
  const childCostElement = $totalCost.querySelector("h3");
  if (childImg) {
    $carInfoForm.removeChild(childImg);
  }
  if (childElement) {
    $carInfoForm.removeChild(childElement);
  }
  if (childCostElement) {
    $totalCost.removeChild(childCostElement);
  }

  const imgCar = document.createElement("img");
  imgCar.classList = "imageCar";
  imgCar.src = car.image;
  imgCar.alt = car.model;

  const modelH3 = document.createElement("h3");
  modelH3.id = "modelH3form";
  modelH3.textContent = car.model;

  $carInfoForm.appendChild(imgCar);
  $carInfoForm.appendChild(modelH3);

  const costH3 = document.createElement("h3");
  costH3.id = "costH3form";
  costH3.textContent = `Car price: ${car.price}` + "\u20AC";

  $totalCost.appendChild(costH3);
};

//// SEND STATE OF ACCESSORIES LIST TO LOCAL STORAGE AND CREATE&SAVE TOTAL COST ////
export const updateCost = () => {
  const costH3form = document.getElementById("costH3form");
  const car = JSON.parse(localStorage.getItem("car"));
  const carPrice = car.price;
  console.log(carPrice);

  let totalCost = document.getElementById("carAccessories");

  if (totalCost) {
    costH3form.removeChild(totalCost);
  }

  totalCost = document.createElement("h3");
  totalCost.id = "carAccessories";

  let cost = 0;
  cost += carPrice;

  if ($tyresInput.checked) {
    cost += 200;
  }

  if ($warrantyInput.checked) {
    cost += 500;
  }

  if ($polishingInput.checked) {
    cost += 400;
  }
  console.log(cost);

  totalCost.textContent = `Total cost: ${cost}` + "\u20AC";
  costH3form.appendChild(totalCost);

  localStorage.setItem("totalCost", cost);

  function getAccessories() {
    const accessoriesArray = [];
    for (let i = 0; i < $accessoriesList.length; i++) {
      if ($accessoriesList[i].checked) {
        const accessoriesObject = {
          type: $accessoriesList[i].value,
        };
        accessoriesArray.push(accessoriesObject);
      }
    }
    localStorage.setItem("accessories", JSON.stringify(accessoriesArray));
  }
  getAccessories();
};

$warrantyInput.addEventListener("change", updateCost);
$tyresInput.addEventListener("change", updateCost);
$polishingInput.addEventListener("change", updateCost);

///// SEND RADIO BTN STATE TO LOCAL STORAGE /////
function checkRadioBtn() {
  let payment = "";
  if ($cashBtn.checked) {
    payment = $cashBtn.value;
  } else if ($leasingBtn.checked) {
    payment = $leasingBtn.value;
  }
  localStorage.setItem("payment", payment);
}

$cashBtn.addEventListener("change", checkRadioBtn);
$leasingBtn.addEventListener("change", checkRadioBtn);

////// SELECT AND SEND DATE TO LOCAL STORAGE /////////

/// Dates enabled after plus 14 days from current date ///
function setCurrentDate() {
  const today = new Date();
  const upToDays = new Date(today);
  upToDays.setDate(today.getDate() + 14);
  $dateCalendar.min = upToDays.toISOString().split("T")[0];
  
  // Disable days before 14 days on Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    const dateFields = document.querySelectorAll('input[type="date"]');
    for (let i = 0; i < dateFields.length; i++) {
      dateFields[i].addEventListener('change', (event) => {
        const selectedDate = new Date(event.target.value);
        const minDate = new Date(upToDays.getTime());

        if (selectedDate < minDate) {
          event.target.value = minDate.toISOString().split("T")[0];
        }
      });
    }
  }
}
setCurrentDate();

/// Get date and send to local storage ///
function getDate() {
  const date = $dateCalendar.value;
  localStorage.setItem("date", date);
  console.log(date);
}

$dateCalendar.addEventListener("change", getDate);

//// SEND BUYER DATA TO LOCAL STORAGE /////
function getBuyerData() {
  const buyerData = [
    {
      name: $buyerName.value,
      surname: $buyerSurname.value,
      email: $buyerEmail.value,
    },
  ];
  localStorage.setItem("buyerData", JSON.stringify(buyerData));
}

$buyerName.addEventListener("change", getBuyerData);
$buyerSurname.addEventListener("change", getBuyerData);
$buyerEmail.addEventListener("change", getBuyerData);

////// SET FORM AFTER REFRESH ///////
const setFormAfterRefresh = () => {
  function setModelAndCost() {
    const car = JSON.parse(localStorage.getItem("car"));
    if (car) {
      const imgCar = document.createElement("img");
      imgCar.classList = "imageCar";
      imgCar.src = car.image;
      imgCar.alt = car.model;

      const modelH3 = document.createElement("h3");
      modelH3.id = "modelH3form";
      modelH3.textContent = car.model;

      $carInfoForm.append(imgCar, modelH3);

      const costH3 = document.createElement("h3");
      costH3.id = "costH3form";
      costH3.textContent = car.price;

      $totalCost.appendChild(costH3);
    }
  }
  setModelAndCost();

  function setPayment() {
    const payment = localStorage.getItem("payment");
    if (payment === "cash") {
      $cashBtn.checked = true;
    } else if (payment === "leasing") {
      $leasingBtn.checked = true;
    }
  }
  setPayment();

  function setDate() {
    const date = localStorage.getItem("date");
    if (date) {
      $dateCalendar.value = date;
    }
  }
  setDate();

  function setAccessories() {
    const accessoriesArray = JSON.parse(localStorage.getItem("accessories"));

    if (accessoriesArray) {
      for (let i = 0; i < accessoriesArray.length; i++) {
        if (accessoriesArray[i].type === "tyres") {
          $tyresInput.checked = true;
        } else if (accessoriesArray[i].type === "warranty") {
          $warrantyInput.checked = true;
        } else if (accessoriesArray[i].type === "polishing") {
          $polishingInput.checked = true;
        }
      }
    }
  }
  setAccessories();

  function setBuyerData() {
    const buyerData = JSON.parse(localStorage.getItem("buyerData"));

    if (buyerData) {
      //destructuring object in array://
      const { name, surname, email } = buyerData[0];

      //template literals://
      $buyerName.value = `${name}`;
      $buyerSurname.value = `${surname}`;
      $buyerEmail.value = `${email}`;
    }
  }
  setBuyerData();

  function setTotalCost() {
    const cost = localStorage.getItem("totalCost");
    if (cost) {
      const costH3form = document.getElementById("costH3form");

      const totalCost = document.createElement("h3");
      totalCost.id = "carAccessories";
      totalCost.textContent = `Total cost: ${cost}`;

      costH3form.appendChild(totalCost);
    }
  }
  setTotalCost();
};

window.onload = setFormAfterRefresh();

//// CLEAR LOCAL STORAGE AND MOVE VALUES TO SESSION STORAGE ON CLICK "ORDER"

const sendToSessionStrg = () => {
  const car = JSON.parse(localStorage.getItem("car"));
  sessionStorage.setItem("carImg", car.image);
  sessionStorage.setItem("carModel", car.model);

  const payment = localStorage.getItem("payment");
  sessionStorage.setItem("payment", payment);

  const date = localStorage.getItem("date");
  sessionStorage.setItem("date", date);

  const accessoriesArray = JSON.parse(localStorage.getItem("accessories"));
  sessionStorage.setItem("accessories", JSON.stringify(accessoriesArray));

  const cost = localStorage.getItem("totalCost");
  sessionStorage.setItem("totalCost", cost);

  clearLocalStorage();
};

function clearLocalStorage() {
  localStorage.clear();
}

//////////////// FORM VALIDATION /////////////////////
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    $btnOrder.addEventListener(
      "click",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else if (form.checkValidity()) {
          sendToSessionStrg();
          showOrder();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
