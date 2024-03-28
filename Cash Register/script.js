/***********************************
 * Clase CashRegister              *
 ***********************************/
class CashRegister {
  constructor(price, cash, cid) {
    this.price = price;
    this.cash = cash;
    this.cid = cid;
    this.change = [];
    this.currencyUnit = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1,
      FIVE: 5,
      TEN: 10,
      TWENTY: 20,
      "ONE HUNDRED": 100,
    };
  }

  totalAmountCustomer(price) {
    const totalPrice = this.price.reduce((acc, price) => acc + price, 0);
    return totalPrice;
  }

  dueAmount(result) {
    const totalAmount = this.totalAmountCustomer();
    const changeDue = this.cash - totalAmount;

    if (changeDue < 0) {
      result.innerHTML = `<div id="change-due"><p>Status: INSUFFICIENT_FUNDS</p></div>`;
    } else if (changeDue === 0) {
      let changeText = `Status: CLOSED`;
      //
      for (let i = 0; i < this.cid.length; i++) {
        const [moneyTag, moneyTotal] = this.cid[i];
        if (moneyTotal > 0) {
          changeText += ` ${moneyTag}: $${moneyTotal.toFixed(2)}`;
        }
      }
      result.innerHTML = `<div id="change-due">
            <p>${changeText}</p>
        </div>`;
    } else {
      let remainingChange = changeDue;
      const change = [];

      for (let i = this.cid.length - 1; i >= 0; i--) {
        const [moneyTag, moneyTotal] = this.cid[i];
        const moneyValue = this.currencyUnit[moneyTag];

        if (moneyValue <= remainingChange && moneyTotal > 0) {
          const numBills = Math.min(
            Math.floor(remainingChange / moneyValue),
            moneyTotal / moneyValue
          );
          const billAmount = numBills * moneyValue;
          change.push([moneyTag, billAmount]);
          remainingChange -= billAmount;
          remainingChange = Math.round(remainingChange * 100) / 100;
        }
      }

      if (remainingChange > 0) {
        result.innerHTML = `<div id="change-due"><p>Status: INSUFFICIENT_FUNDS</p></div>`;
      } else {
        const formattedChange = change
          .map(
            ([moneyTag, billAmount]) => `${moneyTag}: $${billAmount.toFixed(2)}`
          )
          .join(" ");
        result.innerHTML = `<div id="change-due"><p>Status: OPEN ${formattedChange}</p></div>`;
      }
    }
  }

  printAmount() {
    // Llamar al método dueAmount() para determinar el estado y presentar el cambio debido
    this.dueAmount(result);
  }
}

/***********************************
 * Variables globales              * 
 ***********************************/
let cash = document.getElementById("cash");
const dessertCards = document.getElementById("dessert-card-container");
const totalDisplayed = document.getElementById("display-price");
const result = document.getElementById("change-due");
const resultBtn = document.getElementById("purchase-btn");
let totalPrice = 0;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

/***********************************
 * Funciones de utilidad           *
 ***********************************/
function updateTotalPrice(index) {
  totalPrice += products[index].price;
  return totalDisplayed.innerHTML = `<div id="display-price">
        <p>The current total cost is: ${totalPrice.toFixed(2)}
    </p></div>`;
}

/***********************************
 * Manejadores de eventos          *
 ***********************************/
resultBtn.addEventListener("click", () => {
  let cashRegister = new CashRegister(totalPrice, cash.value, cid);
  cashRegister.printAmount();
});

/***********************************
 * Lógica para mostrar productos   *
 ***********************************/
const products = [
  {
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
  },
  {
    name: "Coca-Cola",
    price: 1.99,
  },
  {
    name: "Snickers Bar",
    price: 1.49,
  },
  {
    name: "M&M's",
    price: 2.29,
  },
  {
    name: "Twix Bar",
    price: 1.79,
  },
  {
    name: "Lays Potato Chips",
    price: 2.99,
  },
  {
    name: "Doritos Nacho Cheese Chips",
    price: 3.49,
  },
  {
    name: "Kit Kat",
    price: 1.99,
  },
  {
    name: "Oreo Cookies",
    price: 2.79,
  },
  {
    name: "Pepsi",
    price: 1.99,
  },
  {
    name: "Hershey's Chocolate Bar",
    price: 2.29,
  }
];

products.forEach(({ name, price }, index) => {
  dessertCards.innerHTML += `
    <div class="dessert-card">
    <h2>${name}</h2>
    <p class="dessert-price">$${price}</p>
    <button 
    class="btn add-to-cart-btn" id="btn${index}">Purchasse
    </button>
    </div>
    `;
});

products.forEach((_, index) => {
  const btn = document.getElementById(`btn${index}`);
  btn.addEventListener("click", () => {
    totalDisplayed.innerHTML = updateTotalPrice(index);
  });
});