const $orderInfo = document.getElementById("orderInfo");
const $orderImgDiv = document.getElementById("orderImgDiv");

const removeOrderInfo = () => {
  const childModel = document.querySelector("#modelOrder");
  const childPayment = document.querySelector("#paymentOrder");
  const childAccessories = document.querySelector("#accessoriesDivOrder");
  const childCost = document.querySelector("#costOrder");

  if (childModel) {
    $orderInfo.removeChild(childModel);
  }
  if (childPayment) {
    $orderInfo.removeChild(childPayment);
  }
  if (childAccessories) {
    $orderInfo.removeChild(childAccessories);
  }
  if (childCost) {
    $orderInfo.removeChild(childCost);
  }
};

export const orderInfo = () => {
  ///Check if there are any children for Order Section and remove them///
  removeOrderInfo();

  ///Display Order Info///
  function displayCarImg() {
    const carImg = sessionStorage.getItem("carImg");
    if (carImg) {
      const img = document.createElement("img");
      img.src = carImg;
      img.alt = "car model";
      img.classList = "img-fluid";

      $orderImgDiv.appendChild(img);
    }
  }
  displayCarImg();

  function displayCarModel() {
    const carModel = sessionStorage.getItem("carModel");
    if (carModel) {
      const modelH3 = document.createElement("h3");
      modelH3.id = "modelOrder";
      modelH3.textContent = carModel;

      $orderInfo.appendChild(modelH3);
    }
  }
  displayCarModel();

  function displayPayment() {
    const payment = sessionStorage.getItem("payment");
    if (payment) {
      const paymentH3 = document.createElement("h3");
      paymentH3.id = "paymentOrder";
      paymentH3.textContent = `Payment method: ${payment}`;

      $orderInfo.appendChild(paymentH3);
    }
  }
  displayPayment();

  function displayAccessories() {
    const accessories = JSON.parse(sessionStorage.getItem("accessories"));
    if (accessories) {
      const accessoriesDiv = document.createElement("div");
      accessoriesDiv.id = "accessoriesDivOrder";
      accessoriesDiv.textContent = "You chose:";

      accessories.forEach((accessory) => {
        const accessoriesP = document.createElement("p");
        accessoriesP.textContent = accessory.type;
        accessoriesDiv.appendChild(accessoriesP);
        $orderInfo.appendChild(accessoriesDiv);
      });
    }
  }
  displayAccessories();

  function displayCost() {
    const totalCost = sessionStorage.getItem("totalCost");
    if (totalCost) {
      const costH3 = document.createElement("h3");
      costH3.id = "costOrder";
      costH3.textContent = `Total cost: ${totalCost}` + "\u20AC";
      $orderInfo.appendChild(costH3);
    }
  }
  displayCost();

  function displayDate() {
    const date = sessionStorage.getItem("date");
    if (date) {
      const dateH2 = document.createElement("h2");
      dateH2.id = "dateOrder";
      dateH2.textContent = `Your car will be delivered ${date}`;
      $orderInfo.appendChild(dateH2);
    }
  }
  displayDate();
};
